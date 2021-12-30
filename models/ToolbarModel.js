const tools = [
  {
    label: "penTool",
    icon: "fa-pen",
    color: "cornflowerblue",
  },
  {
    label: "eraser",
    icon: "fa-eraser",
    color: "#fd13b4",
  },
];

const widths = [1, 4, 5, 10, 20, 30, 50];

export class ToolbarModel {
  constructor() {
    this.state = {
      selectedColor: "#000",
      selectedWidth: widths[2],
      selectedTool: tools[0],
      tools: [...tools],
      colors: [
        { label: "black", hex: "#1D201F" },
        { label: "gray", hex: "#97A7B3" },
        { label: "brown", hex: "brown" },
        { label: "red", hex: "#DB162F" },
        { label: "pink", hex: "#F7A1C4" },
        { label: "mageneta", hex: "#8F2D56" },
        { lable: "green", hex: "#218380" },
        { label: "skyBlue", hex: "#73D2DE" },
        { label: "blue", hex: "#30C5FF" },
        { label: "yellow", hex: "#FBD87F" },
        { label: "orange", hex: "orange" },
        { label: "rose", hex: "#FFD9CE" },
      ],
      widths: [...widths],
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

  getTools = () => this.state.tools;

  changeTool = (tool) => {
    this.state.selectedTool = this.state.tools.find(
      (toolItem) => toolItem.label === tool
    );
  };

  getSelectedTool = () => {
    return this.state.selectedTool;
  };
}
