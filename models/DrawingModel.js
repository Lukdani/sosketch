export class DrawingModel {
  constructor() {
    this.state = {
      id: null,
      canvas: [],
      images: 0,
      currentImage: null,
      date: null,
      players: [0, 1],
      playerTurn: null,
    };
  }

  updateModel = (key, value) => {
    newState = Object.assign({}, this.state);
    newState[key] = value;
    this.state = newState;
  };

  startDrawing = () => {
    this.state.id = "test";
    this.state.currentImage = 1;
    this.state.playerTurn = 0;
  };

  changeTurn = (canvasContext) => {
    this.state.canvas.push(canvasContext);
    this.state.images = this.state.images + 1;
    this.state.currentImage = this.state.currentImage + 1;
    this.state.playerTurn = this.state.playerTurn == 0 ? 1 : 0;
  };
}
