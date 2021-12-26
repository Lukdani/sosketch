import { createElement } from "/sosketch/utils/createElement.js";

export class DrawingView {
  constructor() {
    this.rootElement = document.getElementById("drawingContainer");
    this.toolbarContainer = document.getElementById("toolbarContainer");

    this.startDrawingButton = createElement(
      "button",
      ["btn", "btn-primary", "primary"],
      "startDrawingButton"
    );
    this.startDrawingButton.textContent = "Start!";
    this.rootElement.appendChild(this.startDrawingButton);

    this.nextTurn = createElement(
      "button",
      ["btn", "btn-secondary", "primary"],
      "nextTurnButton"
    );
    this.nextTurn.textContent = "Next turn!";
    this.toolbarContainer.appendChild(this.nextTurn);
  }

  addCanvas = (prevCanvas, id) => {
    this.rootElement.innerHTML = "";
    const canvasContainer = createElement(
      "span",
      ["canvasContainer"],
      `canvasContainer-${id}`
    );
    this.rootElement.appendChild(canvasContainer);
    const newCanvas = createElement(
      "canvas",
      ["drawingCanvas"],
      `canvas-${id}`
    );
    newCanvas.height = (60 * window.innerHeight) / 100;
    newCanvas.width = (80 * window.innerHeight) / 100;
    canvasContainer.appendChild(newCanvas);
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

  disableNextTurn = (disable) => {
    const nextTurnButton = document.getElementById("nextTurnButton");
    if (nextTurnButton)
      nextTurnButton.style["display"] = disable ? "none" : "inline-block";
  };

  setFinalDrawingView = () => {
    const nextTurnButton = document.getElementById("nextTurnButton");
    if (nextTurnButton) nextTurnButton.textContent = "Finish drawing";
  };

  displayCutLineWarning = (canvasId, hide) => {
    const canvas = document.getElementById(`canvasContainer-${canvasId}`);
    console.log(canvas.getBoundingClientRect().y);
    const warning = createElement("p", ["cutlineWarning"], null);
    warning.style.top = `${
      (canvas.getBoundingClientRect().height / 100) * 94 +
      canvas.getBoundingClientRect().y -
      1
    }px`;
    warning.style.transform = "translateY(-100%)";
    warning.style.width = `${canvas.getBoundingClientRect().width}px`;
    const warningText = createElement("span", null, null);
    warningText.innerHTML = "Draw below <br> this line!";
    warning.appendChild(warningText);

    const warningIcon = createElement("i", ["fas", "fa-arrow-down"], null);
    warning.appendChild(warningIcon);
    canvas.appendChild(warning);
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
