import { ToolbarModel } from "../models/ToolbarModel.js";
import { postRequest } from "../utils/postRequest.js";
import { ToolbarView } from "../views/ToolbarView.js";
import { ToolbarController } from "./toolbarController.js";

export class DrawingController {
  constructor(drawingModel, drawingView) {
    this.drawingModel = drawingModel;
    this.drawingView = drawingView;
    this.drawingView.bindStartDrawingButton(this.startDrawing);
    this.drawingView.bindNextTurnButton(this.changeTurn);
    this.drawingView.disableNextTurn(true);
    this.canvas = null;
    this.canvasContext = null;
    this.prevX = null;
    this.prevY = null;
    this.draw = false;

    const hasCrossedCutLine = false;
    this.toolbarModel = new ToolbarModel();
    this.toolbarView = new ToolbarView();
    this.toolbarController = new ToolbarController(
      this.toolbarModel,
      this.toolbarView
    );

    window.addEventListener("mousemove", this.drawingOutOfBounds);
  }

  drawingOutOfBounds = (e) => {
    if (this.draw) {
      if (!e.target.classList.contains("drawingCanvas")) {
        console.log(e.target);
        this.draw = false;
      }
    }
  };

  startDrawing = () => {
    this.drawingModel.startDrawing();
    this.drawingView.addCanvas(null, 1);
    this.drawingView.disableNextTurn(false);
    this.canvas = document.getElementById(
      `canvas-${this.drawingModel.state.currentImage}`
    );

    this.canvasContext = this.canvas.getContext("2d");

    this.canvas.addEventListener("mousemove", this.drawLine);
    this.canvas.addEventListener("mousedown", (e) => (this.draw = true));
    this.canvas.addEventListener("mouseup", (e) => (this.draw = false));
  };

  changeTurn = () => {
    if (!this.hasCrossedCutLine) {
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
    console.log(this.drawingModel);
    this.canvas = document.getElementById(
      `canvas-${this.drawingModel.state.currentImage}`
    );
    this.canvasContext = this.canvas.getContext("2d");

    this.canvas.addEventListener("mousemove", this.drawLine);
    this.canvas.addEventListener("mousedown", (e) => (this.draw = true));
    this.canvas.addEventListener("mouseup", (e) => (this.draw = false));

    this.canvasContext.drawImage(
      prevCanvas,
      1,
      (this.canvas.height / 100) * 95,
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
    const imageToPost = finalDrawing.toDataURL("image/png");
    this.canvasContext = finalDrawing.getContext("2d");

    this.drawingModel.state.canvas.forEach((drawing, index) => {
      console.log(drawing);
      this.canvasContext.drawImage(
        drawing,
        0,
        0,
        drawing.width,
        drawing.height,
        0,
        index * (finalDrawing.height / 3),
        finalDrawing.width,
        finalDrawing.height / 3
      );
    });
    const imageId = await postRequest(
      "/sosketch/api/postImage.php",
      imageToPost
    );
    console.log(imageId);
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
    this.canvasContext.moveTo(this.prevX, this.prevY);
    this.canvasContext.lineTo(currentX, currentY);
    this.canvasContext.strokeStyle = this.toolbarController.getSelectedColor();
    this.canvasContext.lineWidth = this.toolbarController.getSelectedWidth();
    this.canvasContext.stroke();

    this.prevX = e.clientX - this.canvas.offsetLeft;
    this.prevY = e.clientY - this.canvas.offsetTop;
  };
}
