import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  FINAL_CANVAS_HEIGHT,
  FINAL_CANVAS_WIDTH,
  CANVAS_CSS_HEIGHT,
  CANVAS_CSS_WIDTH,
  FINAL_CSS_CANVAS_WIDTH,
  FINAL_CS__CANVAS_HEIGHT,
} from "../CONSTANTS.js";

import { createElement } from "/sosketch/utils/createElement.js";

export class DrawingView {
  constructor() {
    this.rootElement = document.getElementById("drawingContainer");
    this.toolbarContainer = document.getElementById("toolbarContainer");
  }

  renderGameButtons = () => {
    const prevGameButtonContainer = document.getElementById(
      "gameButtonContainer"
    );
    if (prevGameButtonContainer) {
      prevGameButtonContainer.remove();
    }
    const gameButtonsContainer = createElement(
      "span",
      ["gameButtonsContainer"],
      "gameButtonContainer"
    );
    this.toolbarContainer.appendChild(gameButtonsContainer);
    this.startDrawingButton = createElement(
      "button",
      ["btn", "btn-primary", "primary"],
      "startDrawingButton"
    );
    this.startDrawingButton.textContent = "Start!";
    this.rootElement.appendChild(this.startDrawingButton);

    this.nextTurn = createElement(
      "button",
      ["btn", "btn-primary"],
      "nextTurnButton"
    );
    this.nextTurn.textContent = "Next";
    gameButtonsContainer.appendChild(this.nextTurn);

    this.restartGame = createElement(
      "button",
      ["btn", "btn-danger", "primary"],
      "restartGameButton"
    );
    this.restartGame.textContent = "Reset";
    gameButtonsContainer.appendChild(this.restartGame);
  };

  addCanvas = (prevCanvas, id, backgroundColor) => {
    this.rootElement.innerHTML = "";
    const canvasContainer = createElement(
      "span",
      ["canvasContainer"],
      `canvasContainer-${id}`
    );
    this.rootElement.appendChild(canvasContainer);

    const progressInformation = createElement(
      "p",
      ["noSelect"],
      "progressInformation"
    );
    canvasContainer.appendChild(progressInformation);

    const newCanvas = createElement(
      "canvas",
      ["drawingCanvas"],
      `canvas-${id}`
    );
    newCanvas.height = CANVAS_HEIGHT;
    newCanvas.width = CANVAS_WIDTH;
    newCanvas.style["height"] = `${CANVAS_CSS_HEIGHT}px`;
    newCanvas.style["width"] = `${CANVAS_CSS_WIDTH}px`;

    canvasContainer.appendChild(newCanvas);
  };

  addFinalCanvas = () => {
    const newCanvas = createElement(
      "canvas",
      ["drawingCanvas", "finalCanvas"],
      `canvas-final`
    );
    newCanvas.height = FINAL_CANVAS_HEIGHT;
    newCanvas.width = FINAL_CANVAS_WIDTH;
    newCanvas.style.height = FINAL_CS__CANVAS_HEIGHT;
    newCanvas.style.width = FINAL_CSS_CANVAS_WIDTH;

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

  disableRestartGame = (disable) => {
    const restartGameButton = document.getElementById("restartGameButton");
    if (restartGameButton)
      restartGameButton.style["display"] = disable ? "none" : "inline-block";
  };

  setFinalDrawingView = () => {
    const nextTurnButton = document.getElementById("nextTurnButton");
    if (nextTurnButton) nextTurnButton.textContent = "Finish drawing";
  };

  displayCutLineWarning = (canvasId, hide) => {
    const canvas = document.getElementById(`canvasContainer-${canvasId}`);
    const warning = createElement("p", ["cutlineWarning"], null);
    warning.style.top = `${
      (CANVAS_CSS_HEIGHT / 100) * 94 + canvas.getBoundingClientRect().y - 1
    }px`;
    warning.style.transform = "translateY(-100%)";
    warning.style.width = `${canvas.getBoundingClientRect().width}px`;
    const warningText = createElement("span", null, null);
    warningText.innerHTML =
      "Draw below this line! <br> (so the next person knows where to begin)";
    warning.appendChild(warningText);

    const warningIcon = createElement("i", ["fas", "fa-arrow-down"], null);
    warning.appendChild(warningIcon);
    canvas.appendChild(warning);
  };

  setProgressInformation = (progress, itemsToDraw) => {
    const progressInformationElement = document.getElementById(
      "progressInformation"
    );
    if (progressInformationElement) {
      const progressInfoElement = createElement("span", null, null);
      progressInfoElement.textContent = progress;
      progressInformationElement.appendChild(progressInfoElement);
      const itemsToDrawElement = createElement(
        "span",
        ["progressInformation-itemsToDraw"],
        null
      );
      itemsToDrawElement.textContent = ` Draw ${itemsToDraw}`;
      progressInformationElement.appendChild(itemsToDrawElement);
    }
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

  bindRestartGameButton = (callback) => {
    document
      .getElementById("restartGameButton")
      .addEventListener("click", (e) => {
        callback();
      });
  };
}
