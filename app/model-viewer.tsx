"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Model = {
  vertices: Float64Array;
  projected: Float64Array;
  depths: Float64Array;
  order: number[];
};
type Status = "idle" | "loading" | "ready" | "error";

function parseStl(buffer: ArrayBuffer): Model {
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
  for (let index = 0; index < vertices.length; index += 1) {
    vertices[index] = (vertices[index] - center[index % 3]) / span;
  }
  const triangleCount = vertices.length / 9;
  return {
    vertices,
    projected: new Float64Array(vertices.length),
    depths: new Float64Array(triangleCount),
    order: Array.from({ length: triangleCount }, (_, index) => index),
  };
}

export function ModelViewer({ file, label }: { file: string; label: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modelRef = useRef<Model | null>(null);
  const rotationRef = useRef({ x: -0.35, y: 0.55 });
  const dragRef = useRef<{ x: number; y: number } | null>(null);
  const frameRef = useRef<number | null>(null);
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
        const response = await fetch(`/assets/${file}`, { signal: controller.signal });
        if (!response.ok) throw new Error("Model download failed");
        const buffer = await response.arrayBuffer();
        if (disposed) return;
        modelRef.current = parseStl(buffer);
        setStatus("ready");
      } catch {
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
  }, [file]);

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
    const scale = Math.min(bounds.width, bounds.height) * 0.72;
    const { x: rotX, y: rotY } = rotationRef.current;
    const cy = Math.cos(rotY); const sy = Math.sin(rotY);
    const cx = Math.cos(rotX); const sx = Math.sin(rotX);
    for (let index = 0; index < vertices.length; index += 3) {
      const x = vertices[index]; const y = vertices[index + 1]; const z = vertices[index + 2];
      const x1 = x * cy - z * sy;
      const z1 = x * sy + z * cy;
      projected[index] = bounds.width / 2 + x1 * scale;
      projected[index + 1] = bounds.height / 2 - (y * cx - z1 * sx) * scale;
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
    // Dense meshes are shaded without black facet edges, which would obscure
    // the surface. Wireframe still displays every edge of the source geometry.
    const outline = solid && order.length <= 10000;
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
        context.fillStyle = outline
          ? `rgb(${244 - shade}, ${242 - shade}, ${235 - shade})`
          : `rgb(${114 - shade}, ${134 - shade}, ${223 - shade})`;
        context.fill();
        if (outline) context.stroke();
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

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (status !== "ready") return;
    dragRef.current = { x: event.clientX, y: event.clientY };
    // Preserve vertical page scrolling on touch screens.
    if (event.pointerType !== "touch") event.currentTarget.setPointerCapture(event.pointerId);
  };
  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current) return;
    rotationRef.current.y += (event.clientX - dragRef.current.x) * 0.012;
    rotationRef.current.x += (event.clientY - dragRef.current.y) * 0.012;
    dragRef.current = { x: event.clientX, y: event.clientY };
    scheduleDraw();
  };
  const stopDragging = () => { dragRef.current = null; };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (status !== "ready" || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "ArrowLeft") rotationRef.current.y -= 0.15;
    if (event.key === "ArrowRight") rotationRef.current.y += 0.15;
    if (event.key === "ArrowUp") rotationRef.current.x -= 0.15;
    if (event.key === "ArrowDown") rotationRef.current.x += 0.15;
    scheduleDraw();
  };

  return (
    <div className="model-viewer" data-status={status}>
      <canvas ref={canvasRef} tabIndex={0} role="img" aria-label={`${label}. Drag or use arrow keys to rotate.`} onKeyDown={handleKeyDown} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={stopDragging} onPointerCancel={stopDragging} onPointerLeave={stopDragging} onLostPointerCapture={stopDragging} />
      {status !== "ready" && <span role="status" style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", padding: "2rem", textAlign: "center", pointerEvents: "none", color: "#5267c9", fontSize: ".8rem", fontWeight: 700 }}>{status === "error" ? "Preview unavailable. You can still download the model below." : status === "loading" ? "Loading model…" : "Preview loads when in view"}</span>}
      <span className="model-hint">Drag to rotate</span>
      <span className="model-badge">STL preview</span>
      <button className="model-mode-toggle" type="button" disabled={status !== "ready"} onClick={() => setSolid((value) => !value)}>{solid ? "View wireframe" : "View solid"}</button>
    </div>
  );
}
