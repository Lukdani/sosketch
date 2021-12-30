// CANVAS SIZING;
export let CANVAS_WIDTH = 1600;
export let CANVAS_HEIGHT = 800;

export let CANVAS_CSS_WIDTH = CANVAS_WIDTH / 2;
export let CANVAS_CSS_HEIGHT = CANVAS_HEIGHT / 2;

const ratioFactor = CANVAS_CSS_WIDTH / CANVAS_CSS_HEIGHT;

if (window.innerWidth < CANVAS_CSS_WIDTH) {
  CANVAS_CSS_WIDTH = window.innerWidth;
  CANVAS_CSS_HEIGHT = CANVAS_CSS_WIDTH / ratioFactor;
}
export const FINAL_CANVAS_WIDTH = CANVAS_WIDTH;
export const FINAL_CANVAS_HEIGHT = CANVAS_HEIGHT * 3;

export const FINAL_CSS_CANVAS_WIDTH = CANVAS_CSS_WIDTH / ratioFactor / 1.5;
export const FINAL_CSS__CANVAS_HEIGHT =
  ((CANVAS_CSS_HEIGHT / ratioFactor) * 3) / 1.5;
