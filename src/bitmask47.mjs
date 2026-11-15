/**
 * 47-Tile Blob & 16-Tile Dual-Grid Wang Bitmask Reducer
 * Bit layout (8 neighbors):
 *   1 = N,  2 = NE, 4 = E,  8 = SE,
 *  16 = S, 32 = SW, 64 = W, 128 = NW
 * MIT License — Camber Labs (https://camberlabs.github.io/)
 */

export const N = 1;
export const NE = 2;
export const E = 4;
export const SE = 8;
export const S = 16;
export const SW = 32;
export const W = 64;
export const NW = 128;

/**
 * Strip diagonal bits unless BOTH adjacent cardinal neighbors are present.
 * Across all 256 inputs (0..255), this yields exactly 47 unique canonical masks.
 */
export function canonicalizeMask47(rawMask) {
  const c = rawMask & (N | E | S | W);
  let d = 0;
  if ((rawMask & NE) && (c & N) && (c & E)) d |= NE;
  if ((rawMask & SE) && (c & E) && (c & S)) d |= SE;
  if ((rawMask & SW) && (c & S) && (c & W)) d |= SW;
  if ((rawMask & NW) && (c & W) && (c & N)) d |= NW;
  return c | d;
}

export const CANONICAL_MASKS_47 = (() => {
  const seen = new Set();
  for (let m = 0; m < 256; m++) seen.add(canonicalizeMask47(m));
  return Array.from(seen).sort((a, b) => a - b);
})();

const MASK_TO_INDEX = new Map(CANONICAL_MASKS_47.map((mask, idx) => [mask, idx]));

export function maskToTileIndex47(rawMask) {
  return MASK_TO_INDEX.get(canonicalizeMask47(rawMask));
}

/**
 * 16-tile Dual-Grid / Wang 2-corner index from 4 offset vertices (TL=1, TR=2, BR=4, BL=8).
 */
export function dualGridIndex16(tl, tr, br, bl) {
  return (tl ? 1 : 0) | (tr ? 2 : 0) | (br ? 4 : 0) | (bl ? 8 : 0);
}

/**
 * Compute pixel dimensions for an extruded pixel-art tileset atlas (prevents sub-pixel bleeding).
 */
export function computeExtrudedAtlasSize({
  tilePx = 16,
  cols = 12,
  rows = 4,
  extrudePx = 1,
  paddingPx = 1,
  marginPx = 0
} = {}) {
  const strideX = tilePx + 2 * extrudePx + paddingPx;
  const strideY = tilePx + 2 * extrudePx + paddingPx;
  const widthPx = marginPx * 2 + cols * strideX - paddingPx;
  const heightPx = marginPx * 2 + rows * strideY - paddingPx;
  return { widthPx, heightPx, cellWithExtrusionPx: tilePx + 2 * extrudePx };
}
