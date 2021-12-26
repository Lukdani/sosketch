import { createElement } from "/sosketch/utils/createElement.js";

export class DrawingView {
  constructor() {
    this.rootElement = document.getElementById("drawingContainer");
    this.toolsContainer = createElement("div", ["toolbar"], null);
    this.rootElement.appendChild(this.toolsContainer);
    this.startDrawingButton = createElement(
      "button",
      ["primary"],
      "startDrawingButton"
    );
    this.startDrawingButton.textContent = "Start!";
    this.toolsContainer.appendChild(this.startDrawingButton);

    this.nextTurn = createElement("button", ["primary"], "nextTurnButton");
    this.nextTurn.textContent = "Next turn!";
    this.toolsContainer.appendChild(this.nextTurn);
  }

  addCanvas = (prevCanvas, id) => {
    const newCanvas = createElement(
      "canvas",
      ["drawingCanvas"],
      `canvas-${id}`
    );
    newCanvas.height = 200;
    newCanvas.width = 300;
    this.rootElement.appendChild(newCanvas);
  };

  addFinalCanvas = () => {
    const newCanvas = createElement(
      "canvas",
      ["drawingCanvas", "finalCanvas"],
      `canvas-final`
    );
    newCanvas.height = 400;
    newCanvas.width = 600;
    this.rootElement.appendChild(newCanvas);
    return document.getElementById("canvas-final");
  };

  hideCanvas = (id) => {
    const canvas = document.getElementById(`canvas-${id}`);
    canvas.style["display"] = "none";
  };

  bindStartDrawingButton = (callback) => {
    document
      .getElementById("startDrawingButton")
      .addEventListener("click", (e) => {
        callback();
      });
  };

  bindNextTurnButton = (callback) => {
    document.getElementById("nextTurnButton").addEventListener("click", (e) => {
      callback();
    });
  };
}
