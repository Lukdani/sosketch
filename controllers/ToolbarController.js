export class ToolbarController {
  constructor(toolbarModel, toolbarView) {
    this.toolbarModel = toolbarModel;
    this.toolbarView = toolbarView;
    this.toolbarView.setColorButtonColor(this.toolbarModel.getSelectedColor());

    // Setup color buttons;
    this.toolbarView.renderColorButtons(
      this.toolbarModel.getColors(),
      this.toolbarModel.getSelectedColor()
    );
    this.toolbarView.bindColorButtons(this.colorSelected);

    //Setup width buttons;
    this.toolbarView.renderWidthButtons(
      this.toolbarModel.getWidths(),
      this.toolbarModel.getSelectedWidth()
    );
    this.toolbarView.bindWidthButtons(this.widthSelected);

    //Setup tool buttons;
    this.toolbarView.renderToolButtons(
      this.toolbarModel.getTools(),
      this.toolbarModel.getSelectedTool()
    );
    this.toolbarView.bindToolButtons(this.toolSelected);
    this.toolbarView.setToolIcon(this.toolbarModel.getSelectedTool());
  }

  colorSelected = (selectedColor) => {
    console.log(selectedColor);
    this.toolbarModel.changeColor(selectedColor);
  };

  getSelectedColor = () => {
    return this.toolbarModel.getSelectedColor();
  };

  getSelectedWidth = () => {
    return this.toolbarModel.getSelectedWidth();
  };

  widthSelected = (selectedWidth) => {
    this.toolbarModel.changeWidth(selectedWidth);
    this.toolbarView.setWidthButtonSize(selectedWidth);
  };

  toolSelected = (selectedTool) => {
    this.toolbarModel.changeTool(selectedTool);
    this.toolbarView.setToolIcon(this.toolbarModel.getSelectedTool());
  };

  getSelectedWidth = () => {
    return this.toolbarModel.getSelectedWidth();
  };
}
