export let CANVAS_WIDTH = 800;
export let CANVAS_HEIGHT = 300;

const ratioFactor = CANVAS_WIDTH / CANVAS_HEIGHT;

if (window.innerWidth < CANVAS_WIDTH - 50) {
  CANVAS_WIDTH = window.innerWidth - 50;
  CANVAS_HEIGHT = CANVAS_WIDTH / ratioFactor;
}
export const FINAL_CANVAS_WIDTH = CANVAS_WIDTH / ratioFactor;
export const FINAL_CANVAS_HEIGHT = (CANVAS_HEIGHT / ratioFactor) * 3;
