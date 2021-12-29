import { ToolbarModel } from "../models/ToolbarModel.js";
import { postRequest } from "../utils/postRequest.js";
import { ToolbarView } from "../views/ToolbarView.js";
import { ToolbarController } from "./toolbarController.js";

export class DrawingController {
  constructor(drawingModel, drawingView, imagesController) {
    this.drawingModel = drawingModel;
    this.drawingView = drawingView;
    this.imagesController = imagesController;

    this.canvas = null;
    this.canvasContext = null;

    this.prevX = null;
    this.prevY = null;
    this.draw = false;

    // To keep track of if the cut line has been crossed;
    this.hasCrossedCutLine = false;

    this.toolbarModel = new ToolbarModel();
    this.toolbarView = new ToolbarView();
    this.toolbarController = new ToolbarController(
      this.toolbarModel,
      this.toolbarView
    );

    // "Next" and "Reset" buttons;
    this.drawingView.renderGameButtons();
    this.drawingView.bindStartDrawingButton(this.startDrawing);
    this.drawingView.bindNextTurnButton(this.changeTurn);
    this.drawingView.bindRestartGameButton(this.restartGame);

    // These buttons should not be displayed before the game has started;
    this.drawingView.disableNextTurn(true);
    this.drawingView.disableRestartGame(true);

    // Disabled drawing, so the drawing doesn't continue when the cursor re-enters the canvas.
    window.addEventListener("mousemove", this.drawingOutOfBounds);
  }

  drawingOutOfBounds = (e) => {
    if (this.draw) {
      if (!e.target.classList.contains("drawingCanvas")) {
        this.draw = false;
      }
    }
  };

  restartGame = () => {
    const proceed = window.confirm(
      "Are you sure you want to delete all pieces of the drawing and start over?"
    );
    if (!proceed) {
      return;
    }
    this.drawingModel.resetModel();
    this.hasCrossedCutLine = false;
    this.startDrawing();
  };

  // Appends the needed event listeners to draw based on user mouse events;
  appendDrawListeners = () => {
    this.canvas.addEventListener("mousemove", this.drawLine);
    this.canvas.addEventListener("mousedown", (e) => (this.draw = true));
    this.canvas.addEventListener("mouseup", (e) => (this.draw = false));

    this.canvas.addEventListener("touchstart", (e) => (this.draw = true));

    // Needed for mobile support.
    // It changes the touch move into a mouse event and dispatches this to the canvas.
    this.canvas.addEventListener("touchmove", (e) => {
      var touch = e.touches[0];
      var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      this.canvas.dispatchEvent(mouseEvent);
    });
    this.canvas.addEventListener("touchend", (e) => (this.draw = false));
  };

  startDrawing = () => {
    this.drawingModel.startDrawing();

    this.drawingView.addCanvas(null, 1);

    this.drawingView.disableNextTurn(false);
    this.drawingView.disableRestartGame(false);

    this.canvas = document.getElementById(
      `canvas-${this.drawingModel.state.currentImage}`
    );

    this.canvasContext = this.canvas.getContext("2d");
    this.canvasContext.translate(0.5, 0.5);

    this.appendDrawListeners();
  };

  changeTurn = () => {
    // Show warning if user did not cross the cut line;
    if (!this.hasCrossedCutLine && !this.drawingModel.isLastTurn()) {
      this.drawingView.displayCutLineWarning(
        this.drawingModel.state.currentImage
      );
      return;
    }

    const prevCanvas = this.canvas;
    this.drawingView.hideCanvas(this.drawingModel.state.currentImage);
    this.drawingModel.changeTurn(this.canvas);

    if (this.drawingModel.state.canvas.length === 2) {
      this.drawingView.setFinalDrawingView();
    }
    if (this.drawingModel.state.canvas.length === 3) {
      this.drawingView.disableNextTurn(true);
      this.endDrawing();
      return;
    }
    this.drawingView.addCanvas(null, this.drawingModel.state.currentImage);
    this.canvas = document.getElementById(
      `canvas-${this.drawingModel.state.currentImage}`
    );
    this.canvasContext = this.canvas.getContext("2d");

    this.appendDrawListeners();

    // Adds previous images to the new canvas, so the next drawer knows where to begin;
    this.canvasContext.drawImage(
      prevCanvas,
      0,
      (this.canvas.height / 100) * 94,
      this.canvas.width,
      this.canvas.height,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.prevX = null;
    this.prevY = null;
    this.draw = false;
    this.hasCrossedCutLine = false;
  };

  endDrawing = async () => {
    const finalDrawing = this.drawingView.addFinalCanvas();

    this.canvasContext = finalDrawing.getContext("2d");

    this.drawingModel.state.canvas.forEach((drawing, index) => {
      this.canvasContext.drawImage(
        drawing,
        0,
        (drawing.height / 100) * 6,
        drawing.width,
        (drawing.height / 100) * 94,
        0,
        index * (finalDrawing.height / 3),
        finalDrawing.width,
        finalDrawing.height / 3
      );
    });
    const imageToPost = finalDrawing.toDataURL("image/png");
    const imageId = await postRequest("/sosketch/api/postImage.php", {
      image: imageToPost,
    });
    this.imagesController.fetchImages();
  };

  drawCutLine = () => {
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(1, (this.canvas.height / 100) * 94);
    this.canvasContext.lineTo(
      this.canvas.width,
      (this.canvas.height / 100) * 94
    );
    this.canvasContext.strokeStyle = "red";
    this.canvasContext.lineWidth = 1;
    this.canvasContext.stroke();
  };

  drawLine = (e) => {
    // Attempt to hinder page scrolling etc.;
    e.preventDefault();
    e.stopPropagation();

    if (this.prevX == null || this.prevY == null || !this.draw) {
      this.prevX = e.clientX - this.canvas.offsetLeft;
      this.prevY = e.clientY - this.canvas.offsetTop;
      return;
    }

    let currentX = e.clientX - this.canvas.offsetLeft;
    let currentY = e.clientY - this.canvas.offsetTop;

    if (!this.hasCrossedCutLine) {
      if (currentY > (this.canvas.height / 100) * 94) {
        this.hasCrossedCutLine = true;
      }
    }

    this.canvasContext.beginPath();

    // Pen tool;
    if (this.toolbarModel.getSelectedTool().label === "penTool") {
      this.canvasContext.globalCompositeOperation = "source-over";
      this.canvasContext.strokeStyle =
        this.toolbarController.getSelectedColor();
      this.canvasContext.lineWidth = this.toolbarController.getSelectedWidth();
      this.canvasContext.moveTo(this.prevX, this.prevY);
      this.canvasContext.lineCap = "round";

      this.canvasContext.lineTo(currentX, currentY);
      this.canvasContext.stroke();
    }

    // Eraser tool;
    else if (this.toolbarModel.getSelectedTool().label === "eraser") {
      this.canvasContext.globalCompositeOperation = "destination-out";
      this.canvasContext.arc(
        this.prevX,
        this.prevY,
        this.toolbarController.getSelectedWidth(),
        0,
        Math.PI * 2,
        false
      );
      this.canvasContext.fill();
    }

    this.prevX = e.clientX - this.canvas.offsetLeft;
    this.prevY = e.clientY - this.canvas.offsetTop;
  };
}
