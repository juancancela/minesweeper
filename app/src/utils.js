export function getPosKeyCodes() {
  return {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    Q: 81,
    W: 87,
    E: 69,
  };
}

export function fill2DArray(val, x, y) {
  return new Array(x).fill(val).map(() => new Array(y).fill(val));
}

export const errorMsg = (msg) =>
  `It looks something is not OK on the API. Please try again later. Details: ${msg}`;
