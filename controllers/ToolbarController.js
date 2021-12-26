export class ToolbarController {
  constructor(toolbarModel, toolbarView, selectedColor, selectedWidth) {
    this.toolbarModel = toolbarModel;
    this.toolbarView = toolbarView;
    this.toolbarView.setColorButtonColor(this.toolbarModel.getSelectedColor());

    // Setup color buttons;
    this.toolbarView.renderColorButtons(
      this.toolbarModel.getColors(),
      selectedColor
    );
    this.toolbarView.bindColorButtons(this.colorSelected);

    //Setup width buttons;
    this.toolbarView.renderWidthButtons(
      this.toolbarModel.getWidths(),
      selectedWidth
    );
    this.toolbarView.bindWidthButtons(this.widthSelected);
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
    console.log(selectedWidth);
    this.toolbarModel.changeWidth(selectedWidth);
    this.toolbarView.setWidthButtonSize(selectedWidth);
  };

  getSelectedWidth = () => {
    return this.toolbarModel.getSelectedWidth();
  };
}
