import { addBar, addPin, type Vec3 } from "./mechanism-mesh";

const STAGES = 6;
const BAR_LENGTH = 1;
// One scale for every pose: the mechanism stays centered without resizing.
const VIEW_SCALE = 0.48 / 3.85;

/** Original six-stage reacher; progress squeezes the handles and extends the train. */
export function createReacherMesh(progress: number): Float64Array {
  const t = Number.isFinite(progress) ? Math.min(1, Math.max(0, progress)) : 0;
  const cosine = 0.33 + 0.64 * t;
  const sine = Math.sqrt(1 - cosine * cosine);
  const span = BAR_LENGTH * cosine;
  const halfHeight = BAR_LENGTH * sine / 2;
  const left = -STAGES * span / 2;
  const right = -left;
  const out: number[] = [];
  const axis: Vec3 = [0, 0, 1];

  // The two sandwich layers meet on the same continuous endpoint axes.
  // Each diagonal is exactly BAR_LENGTH at every setting.
  for (const side of [-1, 1]) {
    for (let stage = 0; stage < STAGES; stage++) {
      const x = left + stage * span;
      const zRising = side * 0.071;
      const zFalling = side * 0.025;
      addBar(out, [x, -halfHeight, zRising], [x + span, halfHeight, zRising], 0.067, 0.035);
      addBar(out, [x, halfHeight, zFalling], [x + span, -halfHeight, zFalling], 0.067, 0.035);
    }
  }
  for (let stage = 0; stage <= STAGES; stage++) {
    const x = left + stage * span;
    for (const sign of [-1, 1]) {
      addPin(out, [x, sign * halfHeight, 0], axis, 0.057, 0.218, 10);
    }
  }
  for (let stage = 0; stage < STAGES; stage++) {
    addPin(out, [left + (stage + 0.5) * span, 0, 0], axis, 0.055, 0.218, 10);
  }

  // Rigid polygonal finger loops follow the rotation of the first links.
  // Their open centers remain visible in the triangle rendering.
  for (const sign of [-1, 1]) {
    const root: Vec3 = [left, sign * halfHeight, 0];
    const forward: Vec3 = [-cosine, sign * sine, 0];
    const normal: Vec3 = [-sign * sine, -cosine, 0];
    const point = (along: number, across: number): Vec3 => [
      root[0] + forward[0] * along + normal[0] * across,
      root[1] + forward[1] * along + normal[1] * across,
      0,
    ];
    addBar(out, root, point(0.23, 0), 0.094, 0.118);
    const loop = [
      [0.18, -0.087], [0.24, -0.15], [0.51, -0.15], [0.60, -0.087],
      [0.60, 0.087], [0.51, 0.15], [0.24, 0.15], [0.18, 0.087],
    ];
    for (let i = 0; i < loop.length; i++) {
      const a = loop[i];
      const b = loop[(i + 1) % loop.length];
      addBar(out, point(a[0], a[1]), point(b[0], b[1]), 0.06, 0.118);
    }
  }

  // Each jaw is a rigid hooked finger mounted at the final end pivot.
  // As the end pivots approach, the two tips close to a small clearance.
  for (const sign of [-1, 1]) {
    const angle = 0.03 + 0.01 * t;
    const root: Vec3 = [right, sign * halfHeight, 0];
    const point = (along: number, inward: number): Vec3 => [
      root[0] + along * Math.cos(angle) - inward * Math.sin(angle),
      root[1] - sign * (along * Math.sin(angle) + inward * Math.cos(angle)),
      0,
    ];
    addBar(out, root, point(0.41, 0), 0.096, 0.125);
    addBar(out, point(0.41, 0), point(0.49, 0.038), 0.085, 0.125);
    addBar(out, point(0.49, 0.038), point(0.49, 0.070), 0.074, 0.15);
  }

  const low = [Infinity, Infinity, Infinity];
  const high = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < out.length; i++) {
    const axisIndex = i % 3;
    low[axisIndex] = Math.min(low[axisIndex], out[i]);
    high[axisIndex] = Math.max(high[axisIndex], out[i]);
  }
  const center = low.map((value, i) => (value + high[i]) / 2);
  return Float64Array.from(out, (coordinate, i) => (coordinate - center[i % 3]) * VIEW_SCALE);
}
