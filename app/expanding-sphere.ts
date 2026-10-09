import { addPin, type Vec3 } from './mechanism-mesh';

// The source's supported assembly: three perpendicular 12-gon scissor rings.
const SECTORS = 12;
const HALF_SECTOR = Math.PI / SECTORS;
const HALF_ARM = 0.111;
const WIDTH = 0.012;
const THICKNESS = 0.005;
const LAYER = 0.0035;
const PLANES: { u: Vec3; v: Vec3; normal: Vec3 }[] = [
  { u: [1, 0, 0], v: [0, 1, 0], normal: [0, 0, 1] },
  { u: [0, 1, 0], v: [0, 0, 1], normal: [1, 0, 0] },
  { u: [0, 0, 1], v: [1, 0, 0], normal: [0, 1, 0] },
];
function point(u: Vec3, v: Vec3, n: Vec3, x: number, y: number, z = 0): Vec3 {
  return [u[0] * x + v[0] * y + n[0] * z,
    u[1] * x + v[1] * y + n[1] * z,
    u[2] * x + v[2] * y + n[2] * z];
}
// Thin plate with its broad face in the ring's plane.
function plate(out: number[], a: Vec3, b: Vec3, n: Vec3) {
  const delta: Vec3 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const length = Math.hypot(...delta);
  const side: Vec3 = [(n[1] * delta[2] - n[2] * delta[1]) * WIDTH / (2 * length),
    (n[2] * delta[0] - n[0] * delta[2]) * WIDTH / (2 * length),
    (n[0] * delta[1] - n[1] * delta[0]) * WIDTH / (2 * length)];
  const vertices: Vec3[] = [];
  for (const end of [a, b]) for (const s of [-1, 1]) for (const h of [-1, 1]) {
    vertices.push([end[0] + s * side[0] + h * n[0] * THICKNESS / 2,
      end[1] + s * side[1] + h * n[1] * THICKNESS / 2,
      end[2] + s * side[2] + h * n[2] * THICKNESS / 2]);
  }
  for (const [a, b, c, d] of [[0, 1, 3, 2], [4, 6, 7, 5], [0, 4, 5, 1],
    [2, 3, 7, 6], [0, 2, 6, 4], [1, 5, 7, 3]]) {
    out.push(...vertices[a], ...vertices[b], ...vertices[c],
      ...vertices[a], ...vertices[c], ...vertices[d]);
  }
}
/** Assembled expanding scissor sphere, at a constant display scale.
 * Every rigid V arm retains its length and 150-degree bend. The identity
 * R = L cos(phi) / sin(pi/12) closes all rings with coincident end pivots.
 * This is a conceptual reconstruction, not manufacturing geometry.
 */
export function createSphereMesh(progress: number): Float64Array {
  const t = Number.isFinite(progress) ? Math.max(0, Math.min(1, progress)) : 0;
  const phi = (68 - 53 * t) * Math.PI / 180;
  const radius = HALF_ARM * Math.cos(phi) / Math.sin(HALF_SECTOR);
  const inner = radius * Math.cos(HALF_SECTOR) - HALF_ARM * Math.sin(phi);
  const outer = radius * Math.cos(HALF_SECTOR) + HALF_ARM * Math.sin(phi);
  const out: number[] = [];
  for (const { u, v, normal } of PLANES) {
    for (let i = 0; i < SECTORS; i++) {
      const theta = (i + 0.5) * 2 * HALF_SECTOR;
      const cx = radius * Math.cos(theta), cy = radius * Math.sin(theta);
      for (const direction of [-1, 1]) {
        const layer = direction * LAYER;
        const center = point(u, v, normal, cx, cy, layer);
        for (const end of [-1, 1]) {
          const angle = theta + direction * phi + end * (Math.PI / 2 + HALF_SECTOR);
          const tip = point(u, v, normal,
            cx + HALF_ARM * Math.cos(angle), cy + HALF_ARM * Math.sin(angle), layer);
          plate(out, center, tip, normal);
        }
      }
      addPin(out, point(u, v, normal, cx, cy), normal, 0.008, 0.018, 8);
      const edgeAngle = i * 2 * HALF_SECTOR;
      for (const r of [inner, outer]) {
        const hub = point(u, v, normal, r * Math.cos(edgeAngle), r * Math.sin(edgeAngle));
        // Perpendicular pins from the two rings meet at every axial hub.
        const axialHub = i % 3 === 0;
        addPin(out, hub, normal, axialHub ? 0.011 : 0.008, axialHub ? 0.027 : 0.018, 8);
      }
    }
  }
  return new Float64Array(out);
}
