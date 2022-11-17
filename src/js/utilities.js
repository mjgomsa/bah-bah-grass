/**
 * utilities.js

 *
 */

export function pointInRect(p, r) {
  return (
    p.x >= r.x && // format wrapped
    p.x <= r.x + r.w &&
    p.y >= r.y &&
    p.y <= r.y + r.h
  );
}

export function array2D(width, height, value) {
  return Array.from({ length: width }, () =>
    Array.from({ length: height }, () => value)
  );
}
