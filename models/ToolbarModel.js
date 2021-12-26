export class ToolbarModel {
  constructor() {
    this.state = {
      selectedColor: "#000",
      selectedWidth: 1,
      selectedTool: "draw",
      colors: [
        { label: "black", hex: "#1D201F" },
        { label: "gray", hex: "#97A7B3" },
        { label: "red", hex: "#DB162F" },
        { lable: "green", hex: "#218380" },
        { label: "mageneta", hex: "#8F2D56" },
        { label: "skyBlue", hex: "#73D2DE" },
        { label: "yellow", hex: "#FBD87F  " },
        { label: "blue", hex: "#30C5FF" },
        { label: "rose", hex: "#FFD9CE" },
        { label: "pink", hex: "#F7A1C4" },
      ],
      widths: [1, 2, 3, 4],
    };
  }

  getColors = () => {
    return this.state.colors;
  };

  changeColor = (color) => {
    this.state.selectedColor = color;
  };

  getSelectedColor = () => this.state.selectedColor;

  getWidths = () => {
    return this.state.widths;
  };

  changeWidth = (width) => {
    this.state.selectedWidth = width;
  };

  getSelectedWidth = () => this.state.selectedWidth;

  changeTool = (tool) => {
    this.state.selectedTool = tool;
  };
}
