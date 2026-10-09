export type Vec3 = [number, number, number];

const add = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const scale = (a: Vec3, value: number): Vec3 => [a[0] * value, a[1] * value, a[2] * value];
const cross = (a: Vec3, b: Vec3): Vec3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const unit = (a: Vec3): Vec3 => scale(a, 1 / (Math.hypot(...a) || 1));

export function addQuad(out: number[], a: Vec3, b: Vec3, c: Vec3, d: Vec3) {
  out.push(...a, ...b, ...c, ...a, ...c, ...d);
}

/** A rigid rectangular link between two joint centers. */
export function addBar(out: number[], a: Vec3, b: Vec3, width: number, depth = width) {
  const direction = unit([b[0] - a[0], b[1] - a[1], b[2] - a[2]]);
  const reference: Vec3 = Math.abs(direction[2]) < 0.9 ? [0, 0, 1] : [0, 1, 0];
  const u = scale(unit(cross(direction, reference)), width / 2);
  const v = scale(unit(cross(direction, u)), depth / 2);
  const corners = (p: Vec3) => [add(add(p, u), v), add(add(p, scale(u, -1)), v), add(add(p, scale(u, -1)), scale(v, -1)), add(add(p, u), scale(v, -1))];
  const start = corners(a);
  const end = corners(b);
  addQuad(out, start[3], start[2], start[1], start[0]);
  addQuad(out, end[0], end[1], end[2], end[3]);
  for (let i = 0; i < 4; i += 1) addQuad(out, start[i], start[(i + 1) % 4], end[(i + 1) % 4], end[i]);
}

export function addPin(out: number[], center: Vec3, axis: Vec3, radius: number, depth: number, sides = 8) {
  const normal = unit(axis);
  const reference: Vec3 = Math.abs(normal[2]) < 0.9 ? [0, 0, 1] : [0, 1, 0];
  const u = scale(unit(cross(normal, reference)), radius);
  const v = scale(unit(cross(normal, u)), radius);
  const front = add(center, scale(normal, depth / 2));
  const back = add(center, scale(normal, -depth / 2));
  const ringPoint = (p: Vec3, angle: number) => add(add(p, scale(u, Math.cos(angle))), scale(v, Math.sin(angle)));
  for (let i = 0; i < sides; i += 1) {
    const a = i * Math.PI * 2 / sides;
    const b = (i + 1) * Math.PI * 2 / sides;
    const f1 = ringPoint(front, a); const f2 = ringPoint(front, b);
    const b1 = ringPoint(back, a); const b2 = ringPoint(back, b);
    addQuad(out, f1, b1, b2, f2);
    out.push(...front, ...f1, ...f2, ...back, ...b2, ...b1);
  }
}

/** Original illustrative sock cradle, independent of the third-party STL. */
export function createSockGuideMesh(): Float64Array {
  const out: number[] = [];
  const segments = 20;
  const rows = 5;
  const point = (angle: number, t: number, inner: boolean): Vec3 => {
    const thickness = inner ? 0.023 : 0;
    const radius = 0.225 + t * 0.075 - thickness;
    return [Math.sin(angle) * radius, -0.29 + t * 0.52, Math.cos(angle) * (0.145 + t * 0.055 - thickness)];
  };
  for (let row = 0; row < rows; row += 1) {
    for (let i = 0; i < segments; i += 1) {
      const a = -Math.PI / 2 + Math.PI * i / segments;
      const b = -Math.PI / 2 + Math.PI * (i + 1) / segments;
      const t0 = row / rows; const t1 = (row + 1) / rows;
      addQuad(out, point(a, t0, false), point(b, t0, false), point(b, t1, false), point(a, t1, false));
      addQuad(out, point(a, t1, true), point(b, t1, true), point(b, t0, true), point(a, t0, true));
      if (row === 0) addQuad(out, point(a, 0, true), point(b, 0, true), point(b, 0, false), point(a, 0, false));
      if (row === rows - 1) addQuad(out, point(a, 1, false), point(b, 1, false), point(b, 1, true), point(a, 1, true));
      if (i === 0 || i === segments - 1) {
        const edge = i === 0 ? a : b;
        addQuad(out, point(edge, t0, false), point(edge, t1, false), point(edge, t1, true), point(edge, t0, true));
      }
    }
  }
  // Broad side tabs give the illustrative cradle an easy place to hold.
  for (const side of [-1, 1]) addBar(out, [side * 0.27, 0.17, 0.018], [side * 0.36, 0.08, -0.035], 0.08, 0.028);
  // A short socket shows where a longer positioning handle could attach.
  addPin(out, [0, -0.31, 0.12], [0, 1, 0], 0.055, 0.10, 12);
  return new Float64Array(out);
}
