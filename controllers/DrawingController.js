export class DrawingController {
  constructor(drawingModel, drawingView) {
    this.drawingModel = drawingModel;
    this.drawingView = drawingView;
    this.drawingView.bindStartDrawingButton(this.startDrawing);
    this.drawingView.bindNextTurnButton(this.changeTurn);
    this.canvas = null;
    this.canvasContext = null;
    this.prevX = null;
    this.prevY = null;
    this.draw = false;
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
    this.canvas = document.getElementById(
      `canvas-${this.drawingModel.state.currentImage}`
    );

    this.canvasContext = this.canvas.getContext("2d");

    this.canvas.addEventListener("mousemove", this.drawLine);
    this.canvas.addEventListener("mousedown", (e) => (this.draw = true));
    this.canvas.addEventListener("mouseup", (e) => (this.draw = false));
  };

  changeTurn = () => {
    const prevCanvas = this.canvas;
    this.drawingView.hideCanvas(this.drawingModel.state.currentImage);
    this.drawingModel.changeTurn(this.canvas);

    if (this.drawingModel.state.canvas.length === 3) {
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
      180,
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
  };

  endDrawing = () => {
    const finalDrawing = this.drawingView.addFinalCanvas();
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
  };

  drawLine = (e) => {
    console.log(this.prevX);
    if (this.prevX == null || this.prevY == null || !this.draw) {
      this.prevX = e.clientX - this.canvas.offsetLeft;
      this.prevY = e.clientY - this.canvas.offsetTop;
      return;
    }

    let currentX = e.clientX - this.canvas.offsetLeft;
    let currentY = e.clientY - this.canvas.offsetTop;

    this.canvasContext.beginPath();
    this.canvasContext.moveTo(this.prevX, this.prevY);
    this.canvasContext.lineTo(currentX, currentY);
    this.canvasContext.stroke();

    this.prevX = e.clientX - this.canvas.offsetLeft;
    this.prevY = e.clientY - this.canvas.offsetTop;
  };
}
