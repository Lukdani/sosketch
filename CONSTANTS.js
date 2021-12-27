export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 400;

const ratioFactor = CANVAS_WIDTH / CANVAS_HEIGHT;

export const FINAL_CANVAS_WIDTH = CANVAS_WIDTH / ratioFactor;
export const FINAL_CANVAS_HEIGHT = (CANVAS_HEIGHT / ratioFactor) * 3;
