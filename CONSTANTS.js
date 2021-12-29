export let CANVAS_WIDTH = 1600;
export let CANVAS_HEIGHT = 600;

export let CANVAS_CSS_WIDTH = 800;
export let CANVAS_CSS_HEIGHT = 300;

const ratioFactor = CANVAS_CSS_WIDTH / CANVAS_CSS_HEIGHT;

if (window.innerWidth < CANVAS_CSS_WIDTH - 50) {
  CANVAS_CSS_WIDTH = window.innerWidth - 50;
  CANVAS_CSS_HEIGHT = CANVAS_CSS_WIDTH / ratioFactor;
}
export const FINAL_CANVAS_WIDTH = CANVAS_WIDTH / ratioFactor;
export const FINAL_CANVAS_HEIGHT = (CANVAS_HEIGHT / ratioFactor) * 3;

export const FINAL_CSS_CANVAS_WIDTH = CANVAS_CSS_WIDTH / ratioFactor;
export const FINAL_CS__CANVAS_HEIGHT = (CANVAS_CSS_HEIGHT / ratioFactor) * 3;
