"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

type Model = {
  vertices: Float64Array;
  projected: Float64Array;
  depths: Float64Array;
  order: number[];
  assembly?: { movingStart: number; centerZ: number; span: number; travel: number; twistRadians: number };
};
type Status = "idle" | "loading" | "ready" | "error";

function parseStl(buffer: ArrayBuffer, normalize = true): Model {
  const view = new DataView(buffer);
  const count = buffer.byteLength >= 84 ? view.getUint32(80, true) : 0;
  const binary = count > 0 && 84 + count * 50 <= buffer.byteLength;
  let vertices: Float64Array;
  if (binary) {
    vertices = new Float64Array(count * 9);
    for (let triangle = 0; triangle < count; triangle += 1) {
      const offset = 84 + triangle * 50 + 12;
      for (let component = 0; component < 9; component += 1) {
        vertices[triangle * 9 + component] = view.getFloat32(offset + component * 4, true);
      }
    }
  } else {
    const text = new TextDecoder().decode(buffer);
    if (!/^\s*solid\b/i.test(text) || !/\bendsolid\b/i.test(text)) throw new Error("Invalid STL");
    const values: number[] = [];
    for (const match of text.matchAll(/\bvertex\s+(\S+)\s+(\S+)\s+(\S+)/gi)) {
      values.push(Number(match[1]), Number(match[2]), Number(match[3]));
    }
    if (values.length % 9 !== 0) throw new Error("Incomplete STL triangles");
    vertices = new Float64Array(values);
  }
  if (!vertices.length) throw new Error("Empty STL");
  const mins = [Infinity, Infinity, Infinity];
  const maxs = [-Infinity, -Infinity, -Infinity];
  for (let index = 0; index < vertices.length; index += 1) {
    const value = vertices[index];
    if (!Number.isFinite(value)) throw new Error("Invalid STL coordinates");
    const axis = index % 3;
    mins[axis] = Math.min(mins[axis], value);
    maxs[axis] = Math.max(maxs[axis], value);
  }
  const span = Math.max(...maxs.map((value, axis) => value - mins[axis]));
  if (!Number.isFinite(span) || span <= 0) throw new Error("Invalid STL dimensions");
  const center = mins.map((value, axis) => value + (maxs[axis] - value) / 2);
  // Center and scale once. Every source triangle remains in the preview.
  if (normalize) {
    for (let index = 0; index < vertices.length; index += 1) {
      vertices[index] = (vertices[index] - center[index % 3]) / span;
    }
  }
  const triangleCount = vertices.length / 9;
  return {
    vertices,
    projected: new Float64Array(vertices.length),
    depths: new Float64Array(triangleCount),
    order: Array.from({ length: triangleCount }, (_, index) => index),
  };
}

type Assembly = { file: string; travel: number; twistRadians: number };

function assembleModel(fixed: Model, moving: Model, assembly: Assembly): Model {
  if (!Number.isFinite(assembly.travel) || !Number.isFinite(assembly.twistRadians)) throw new Error("Invalid assembly motion");
  const vertices = new Float64Array(fixed.vertices.length + moving.vertices.length);
  vertices.set(fixed.vertices);
  vertices.set(moving.vertices, fixed.vertices.length);
  let radius = 0;
  let minZ = Infinity;
  let maxZ = -Infinity;
  for (let index = 0; index < vertices.length; index += 3) {
    radius = Math.max(radius, Math.hypot(vertices[index], vertices[index + 1]));
    const travel = index >= fixed.vertices.length ? assembly.travel : 0;
    minZ = Math.min(minZ, vertices[index + 2], vertices[index + 2] + travel);
    maxZ = Math.max(maxZ, vertices[index + 2], vertices[index + 2] + travel);
  }
  // One fixed envelope covers both parts, every motion position and every view angle.
  // Source coordinates stay shared; rotation is about the original source Z axis.
  const span = 2 * Math.hypot(radius, (maxZ - minZ) / 2);
  const triangleCount = vertices.length / 9;
  return {
    vertices,
    projected: new Float64Array(vertices.length),
    depths: new Float64Array(triangleCount),
    order: Array.from({ length: triangleCount }, (_, index) => index),
    assembly: { movingStart: fixed.vertices.length, centerZ: (minZ + maxZ) / 2, span, travel: assembly.travel, twistRadians: assembly.twistRadians },
  };
}

export function ModelViewer({ file, label, badge = "STL preview", assembly }: { file: string; label: string; badge?: string; assembly?: Assembly }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modelRef = useRef<Model | null>(null);
  const rotationRef = useRef({ x: -0.35, y: 0.55 });
  const dragRef = useRef<{ x: number; y: number } | null>(null);
  const frameRef = useRef<number | null>(null);
  const motionRef = useRef(0);
  const [motion, setMotion] = useState(0);
  const [interaction, setInteraction] = useState<"move" | "rotate">("move");
  const motionId = useId();
  const assemblyFile = assembly?.file;
  const travel = assembly?.travel ?? 0;
  const twistRadians = assembly?.twistRadians ?? 0;
  const [solid, setSolid] = useState(true);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let started = false;
    const controller = new AbortController();
    modelRef.current = null;
    const load = async () => {
      if (started || disposed) return;
      started = true;
      setStatus("loading");
      try {
        const download = async (name: string) => {
          const response = await fetch(`/assets/${name}`, { signal: controller.signal });
          if (!response.ok) throw new Error("Model download failed");
          return response.arrayBuffer();
        };
        const [fixedBuffer, movingBuffer] = await Promise.all([
          download(file),
          assemblyFile ? download(assemblyFile) : Promise.resolve(null),
        ]);
        if (disposed) return;
        modelRef.current = movingBuffer && assemblyFile
          ? assembleModel(parseStl(fixedBuffer, false), parseStl(movingBuffer, false), { file: assemblyFile, travel, twistRadians })
          : parseStl(fixedBuffer);
        motionRef.current = 0;
        setMotion(0);
        setStatus("ready");
      } catch {
        controller.abort();
        if (!disposed) setStatus("error");
      }
    };
    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver === "undefined") {
      void Promise.resolve().then(load);
    } else {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer?.disconnect();
          void load();
        }
      }, { rootMargin: "250px" });
      observer.observe(canvas);
    }
    return () => {
      disposed = true;
      controller.abort();
      observer?.disconnect();
    };
  }, [file, assemblyFile, travel, twistRadians]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const bounds = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(bounds.width * dpr));
    const height = Math.max(1, Math.round(bounds.height * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    const context = canvas.getContext("2d");
    if (!context) return;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.fillStyle = "#e6e5df";
    context.fillRect(0, 0, bounds.width, bounds.height);
    context.strokeStyle = "rgba(82,103,201,.18)";
    context.lineWidth = 1;
    context.beginPath();
    for (let x = 0; x < bounds.width; x += 20) { context.moveTo(x, 0); context.lineTo(x, bounds.height); }
    for (let y = 0; y < bounds.height; y += 20) { context.moveTo(0, y); context.lineTo(bounds.width, y); }
    context.stroke();
    const model = modelRef.current;
    if (!model) return;
    const { vertices, projected, depths, order } = model;
    const viewportHeight = model.assembly ? Math.max(1, bounds.height - 120) : bounds.height;
    const centerY = model.assembly ? 40 + viewportHeight / 2 : bounds.height / 2;
    const scale = Math.min(bounds.width, viewportHeight) * (model.assembly ? 0.96 : 0.72);
    const { x: rotX, y: rotY } = rotationRef.current;
    const cy = Math.cos(rotY); const sy = Math.sin(rotY);
    const cx = Math.cos(rotX); const sx = Math.sin(rotX);
    const mechanism = model.assembly;
    const angle = motionRef.current * (mechanism?.twistRadians ?? 0);
    const motionCos = Math.cos(angle); const motionSin = Math.sin(angle);
    for (let index = 0; index < vertices.length; index += 3) {
      let x = vertices[index]; let y = vertices[index + 1]; let z = vertices[index + 2];
      if (mechanism) {
        if (index >= mechanism.movingStart) {
          const sourceX = x;
          x = sourceX * motionCos - y * motionSin;
          y = sourceX * motionSin + y * motionCos;
          z += motionRef.current * mechanism.travel;
        }
        const sourceY = y;
        x /= mechanism.span;
        y = (z - mechanism.centerZ) / mechanism.span;
        z = -sourceY / mechanism.span;
      }
      const x1 = x * cy - z * sy;
      const z1 = x * sy + z * cy;
      projected[index] = bounds.width / 2 + x1 * scale;
      projected[index + 1] = centerY - (y * cx - z1 * sx) * scale;
      projected[index + 2] = y * sx + z1 * cx;
    }
    if (solid) {
      for (let triangle = 0; triangle < order.length; triangle += 1) {
        const offset = triangle * 9;
        depths[triangle] = (projected[offset + 2] + projected[offset + 5] + projected[offset + 8]) / 3;
      }
      order.sort((a, b) => depths[a] - depths[b]);
    }
    context.strokeStyle = solid ? "#151719" : "#5267c9";
    context.lineWidth = solid ? 0.65 : 0.9;
    let wireframeFaces = 0;
    if (!solid) context.beginPath();
    for (const triangle of order) {
      const offset = triangle * 9;
      if (solid) context.beginPath();
      context.moveTo(projected[offset], projected[offset + 1]);
      context.lineTo(projected[offset + 3], projected[offset + 4]);
      context.lineTo(projected[offset + 6], projected[offset + 7]);
      context.closePath();
      if (solid) {
        const shade = Math.max(0, Math.min(40, Math.round((depths[triangle] + 0.5) * 35)));
        context.fillStyle = `rgb(${244 - shade}, ${242 - shade}, ${235 - shade})`;
        context.fill();
        context.stroke();
      } else if (++wireframeFaces % 128 === 0) {
        // Keep each stroked path small so dense meshes do not stall the page.
        context.stroke();
        context.beginPath();
      }
    }
    if (!solid) context.stroke();
  }, [solid]);

  const scheduleDraw = useCallback(() => {
    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      draw();
    });
  }, [draw]);

  useEffect(() => {
    scheduleDraw();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(scheduleDraw) : null;
    if (canvasRef.current) observer?.observe(canvasRef.current);
    window.addEventListener("resize", scheduleDraw);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", scheduleDraw);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [scheduleDraw, status]);

  const updateMotion = (value: number) => {
    const next = Math.max(0, Math.min(1, value));
    motionRef.current = next;
    setMotion(next);
    scheduleDraw();
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (status !== "ready" || (assembly && event.pointerType === "touch") || event.button !== 0) return;
    dragRef.current = { x: event.clientX, y: event.clientY };
    // Preserve vertical page scrolling on touch screens.
    if (event.pointerType !== "touch") event.currentTarget.setPointerCapture(event.pointerId);
  };
  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current) return;
    if (assembly && interaction === "move") {
      const distance = Math.max(100, event.currentTarget.getBoundingClientRect().height * 0.5);
      updateMotion(motionRef.current + (dragRef.current.y - event.clientY) / distance);
    } else {
      rotationRef.current.y += (event.clientX - dragRef.current.x) * 0.012;
      rotationRef.current.x += (event.clientY - dragRef.current.y) * 0.012;
    }
    dragRef.current = { x: event.clientX, y: event.clientY };
    scheduleDraw();
  };
  const stopDragging = () => { dragRef.current = null; };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (status !== "ready") return;
    if (assembly && interaction === "move") {
      if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      updateMotion(event.key === "Home" ? 0 : event.key === "End" ? 1 : motionRef.current + (event.key === "ArrowUp" ? 0.05 : -0.05));
      return;
    }
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "ArrowLeft") rotationRef.current.y -= 0.15;
    if (event.key === "ArrowRight") rotationRef.current.y += 0.15;
    if (event.key === "ArrowUp") rotationRef.current.x -= 0.15;
    if (event.key === "ArrowDown") rotationRef.current.x += 0.15;
    scheduleDraw();
  };

  return (
    <div className={`model-viewer${assembly ? " model-viewer-assembly" : ""}`} data-status={status} data-motion-progress={assembly ? Math.round(motion * 100) : undefined}>
      <canvas ref={canvasRef} tabIndex={0} role="img" aria-label={`${label}. ${assembly && interaction === "move" ? "Drag up or down, or use up and down arrow keys, to move the sleeve. Home assembles; End extends." : "Drag or use arrow keys to rotate."}`} onKeyDown={handleKeyDown} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={stopDragging} onPointerCancel={stopDragging} onPointerLeave={stopDragging} onLostPointerCapture={stopDragging} />
      {status !== "ready" && <span role="status" style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", padding: "2rem", textAlign: "center", pointerEvents: "none", color: "#5267c9", fontSize: ".8rem", fontWeight: 700 }}>{status === "error" ? "Preview unavailable. You can still download the model below." : status === "loading" ? "Loading model…" : "Preview loads when in view"}</span>}
      {assembly ? <>
        <div className="model-motion-modes">
          <button className="model-motion-mode" type="button" onClick={() => { stopDragging(); setInteraction((value) => value === "move" ? "rotate" : "move"); }}>{interaction === "move" ? "Rotate view" : "Move sleeve"}</button>
        </div>
        <div className="model-motion-controls">
          <label className="model-motion-label" htmlFor={motionId}><span>Twist Cone movement</span><span aria-hidden="true">{Math.round(motion * 100)}%</span></label>
          <input id={motionId} className="model-motion-slider" type="range" min="0" max="100" step="1" value={Math.round(motion * 100)} disabled={status !== "ready"} onChange={(event) => updateMotion(Number(event.target.value) / 100)} aria-valuetext={`${Math.round(motion * 100)} percent extended`} />
          <span className="model-motion-hint">{interaction === "move" ? "Drag up / down to move · or use slider" : "Drag to rotate · slider moves sleeve"}</span>
        </div>
      </> : <span className="model-hint">Drag to rotate</span>}
      <span className="model-badge">{badge}</span>
      <button className="model-mode-toggle" type="button" disabled={status !== "ready"} onClick={() => setSolid((value) => !value)}>{solid ? "View wireframe" : "View solid"}</button>
    </div>
  );
}
