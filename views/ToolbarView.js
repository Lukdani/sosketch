import { createElement } from "/sosketch/utils/createElement.js";

export class ToolbarView {
  constructor() {
    this.rootElement = document.getElementById("toolbarContainer");
    this.toolsContainer = createElement("div", ["toolbar"], null);
    this.rootElement.appendChild(this.toolsContainer);

    this.colorPopoverOpen = false;
    this.widthPopoverOpen = false;
    this.toolPopoverOpen = false;

    // Color popover;
    this.chooseColorButton = createElement(
      "button",
      ["btn", "btn-secondary", "toolButton"],
      "colorButtonPopover"
    );
    this.chooseColorButtonToolIcon = createElement(
      "i",
      ["fas", "fa-palette", "toolIcon"],
      "colorIcon"
    );
    this.chooseColorButtonIcon = createElement(
      "i",
      ["fas", "fa-circle"],
      "chooseColorButtonIcon"
    );
    this.chooseColorButton.appendChild(this.chooseColorButtonToolIcon);
    this.chooseColorButton.appendChild(this.chooseColorButtonIcon);
    this.chooseColorButton.addEventListener(
      "click",
      this.toggleColorPopoverButton
    );
    this.toolsContainer.appendChild(this.chooseColorButton);

    this.colorButtonContainer = createElement(
      "div",
      ["colorPopover"],
      "colorPopover"
    );
    this.chooseColorButton.appendChild(this.colorButtonContainer);

    // Width popover;
    this.chooseWidthButton = createElement(
      "button",
      ["btn", "btn-secondary", "toolButton"],
      "widthButtonPopover"
    );
    this.chooseWidthButtonToolIcon = createElement(
      "i",
      ["fas", "fa-dot-circle", "toolIcon"],
      null
    );
    this.chooseWidthButtonIcon = createElement(
      "i",
      ["fas", "fa-circle"],
      "chooseWidthButtonIcon"
    );
    this.chooseWidthButton.appendChild(this.chooseWidthButtonToolIcon);
    this.chooseWidthButton.appendChild(this.chooseWidthButtonIcon);
    this.chooseWidthButton.addEventListener(
      "click",
      this.toggleWidthPopoverButton
    );
    this.toolsContainer.appendChild(this.chooseWidthButton);

    this.widthButtonContainer = createElement(
      "div",
      ["widthPopover"],
      "widthPopover"
    );
    this.chooseWidthButton.appendChild(this.widthButtonContainer);

    // Tool popover;
    this.chooseToolButton = createElement(
      "button",
      ["btn", "btn-secondary", "toolButton"],
      "toolButtonPopover"
    );
    this.chooseToolButtonIcon = createElement(
      "i",
      ["fas", "fa-dot-circle", "toolIcon"],
      "toolIcon"
    );

    this.chooseToolButton.appendChild(this.chooseToolButtonIcon);
    this.chooseToolButton.addEventListener(
      "click",
      this.toggleToolPopoverButton
    );
    this.toolsContainer.appendChild(this.chooseToolButton);

    this.toolButtonContainer = createElement(
      "div",
      ["toolPopover"],
      "toolPopover"
    );
    this.chooseToolButton.appendChild(this.toolButtonContainer);

    // Popup close listener;
    window.addEventListener("click", this.closePopovers);
  }

  // Color selector
  toggleColorPopoverButton = () => {
    const colorPopover = document.getElementById("colorPopover");
    this.colorPopoverOpen = colorPopover.style.display === "block";
    if (!this.colorPopoverOpen) {
      colorPopover.style["display"] = "block";
      this.colorPopoverOpen = !this.colorPopoverOpen;
    } else if (this.colorPopoverOpen) {
      this.closeColorPopover();
    }
  };

  closeColorPopover = () => {
    const colorPopover = document.getElementById("colorPopover");
    if (colorPopover) {
      colorPopover.style["display"] = "none";
      this.colorPopoverOpen = !this.colorPopoverOpen;
    }
  };

  setColorButtonColor = (color) => {
    const colorButtonIcon = document.getElementById("chooseColorButtonIcon");
    colorButtonIcon.style["color"] = color;
  };

  renderColorButtons = (colors) => {
    const colorPopover = document.getElementById("colorPopover");
    const buttonsRow = createElement("div", ["row", "g-0"], null);
    colorPopover.appendChild(buttonsRow);
    colors?.forEach((color) => {
      const buttonContainer = createElement("div", ["col-4"], null);
      buttonsRow.appendChild(buttonContainer);
      const colorButton = createElement(
        "button",
        ["btn", "colorButton", "col-4"],
        null
      );
      const colorButtonIcon = createElement("i", ["fas", "fa-circle"], null);
      colorButtonIcon.style["color"] = color.hex;
      colorButton.appendChild(colorButtonIcon);
      colorButton.setAttribute("data-color", color.hex);
      buttonContainer.appendChild(colorButton);
    });
  };

  handleColorButtonClicked = (e, callback) => {
    const selectedColor = e.currentTarget.getAttribute("data-color");
    const colorIndicator = document.getElementById("chooseColorButtonIcon");
    colorIndicator.style["color"] = selectedColor;
    callback(selectedColor);
  };

  bindColorButtons = (callback) => {
    const colorButtons = document.querySelectorAll(".colorButton");

    colorButtons?.forEach((colorButtonItem) => {
      colorButtonItem.addEventListener("click", (e) =>
        this.handleColorButtonClicked(e, callback)
      );
    });
  };

  // Width selector
  toggleWidthPopoverButton = () => {
    const colorPopover = document.getElementById("widthPopover");
    this.widthPopoverOpen = colorPopover.style.display === "block";

    if (!this.widthPopoverOpen) {
      colorPopover.style["display"] = "block";
      this.widthPopoverOpen = !this.widthPopoverOpen;
    } else if (this.widthPopoverOpen) {
      colorPopover.style["display"] = "none";
    }
  };

  closeWidthPopover = () => {
    const widthPopover = document.getElementById("widthPopover");
    this.widthPopoverOpen = widthPopover.style.display === "block";
    if (widthPopover && this.widthPopoverOpen) {
      widthPopover.style["display"] = "none";
      this.widthPopoverOpen = !this.widthPopoverOpen;
    }
  };

  setWidthButtonSize = (fontSize) => {
    const widthButtonICon = document.getElementById("chooseWidthButtonIcon");
    widthButtonICon.style["font-size"] = `${(10 + +fontSize) / 30}rem`;
  };

  renderWidthButtons = (widths) => {
    const widthPopover = document.getElementById("widthPopover");
    const buttonsRow = createElement("div", ["row", "g-0"], null);
    widthPopover.appendChild(buttonsRow);
    widths?.forEach((width) => {
      const buttonContainer = createElement("div", ["col-12"], null);
      buttonsRow.appendChild(buttonContainer);
      const widthButton = createElement(
        "button",
        ["btn", "widthButton", "col-12"],
        null
      );
      const widthButtonIcon = createElement("i", ["fas", "fa-circle"], null);
      widthButtonIcon.style["font-size"] = `${width * 2 + 5}px`;
      widthButton.appendChild(widthButtonIcon);
      widthButton.setAttribute("data-width", width);
      buttonContainer.appendChild(widthButton);
    });
  };

  handleWidthButtonClicked = (e, callback) => {
    const selectedWidth = e.currentTarget.getAttribute("data-width");
    callback(selectedWidth);
  };

  bindWidthButtons = (callback) => {
    const widthButtons = document.querySelectorAll(".widthButton");

    widthButtons?.forEach((widthButtonItem) => {
      widthButtonItem.addEventListener("click", (e) =>
        this.handleWidthButtonClicked(e, callback)
      );
    });
  };

  // Tool selector;
  toggleToolPopoverButton = () => {
    const toolPopover = document.getElementById("toolPopover");
    this.toolPopoverOpen = toolPopover.style.display === "block";

    if (!this.toolPopoverOpen) {
      toolPopover.style["display"] = "block";
      this.toolPopoverOpen = !this.toolPopoverOpen;
    } else if (this.toolPopoverOpen) {
      toolPopover.style["display"] = "none";
    }
  };

  closeToolPopover = () => {
    const toolPopover = document.getElementById("toolPopover");
    this.toolPopoverOpen = toolPopover.style.display === "block";
    if (toolPopover && this.toolPopoverOpen) {
      toolPopover.style["display"] = "none";
      this.toolPopoverOpen = !this.toolPopoverOpen;
    }
  };

  setToolIcon = (tool) => {
    const toolIcon = document.getElementById("toolIcon");
    const classArray = Array.from(toolIcon.classList);
    const prevIcon =
      classArray[
        classArray.findIndex((classItem) => classItem.includes("fa-"))
      ];
    toolIcon.style.color = tool.color;
    toolIcon.classList.remove(prevIcon);
    toolIcon.classList.add(tool.icon);
  };

  renderToolButtons = (tools) => {
    const toolPopover = document.getElementById("toolPopover");
    const buttonsRow = createElement("div", ["row", "g-0"], null);
    toolPopover.appendChild(buttonsRow);
    tools?.forEach((tool) => {
      console.log(tool);
      const buttonContainer = createElement("div", ["col-12"], null);
      buttonsRow.appendChild(buttonContainer);
      const toolButton = createElement(
        "button",
        ["btn", "toolSelectorButton", "col-12"],
        null
      );
      const toolButtonIcon = createElement("i", ["fas", tool.icon], null);
      toolButton.style.color = tool.color;
      toolButton.appendChild(toolButtonIcon);
      toolButton.setAttribute("data-tool", tool.label);
      buttonContainer.appendChild(toolButton);
    });
  };

  handleToolButtonClicked = (e, callback) => {
    const selectedTool = e.currentTarget.getAttribute("data-tool");
    console.log(selectedTool);
    callback(selectedTool);
  };

  bindToolButtons = (callback) => {
    const toolButtons = document.querySelectorAll(".toolSelectorButton");
    toolButtons?.forEach((toolButtonItem) => {
      toolButtonItem.addEventListener("click", (e) =>
        this.handleToolButtonClicked(e, callback)
      );
    });
  };

  // Helpers

  closePopovers = (e) => {
    const clickedId = e.target?.getAttribute("id");
    if (
      this.colorPopoverOpen &&
      !e.target.matches("#colorButtonPopover, #colorButtonPopover *")
    ) {
      console.log(clickedId + " color");
      this.closeColorPopover();
    }
    if (
      this.widthPopoverOpen &&
      !e.target.matches("#widthButtonPopover, #widthButtonPopover *")
    ) {
      console.log(clickedId + " width");
      this.closeWidthPopover();
    }
    if (
      this.toolPopoverOpen &&
      !e.target.matches("#toolButtonPopover, #toolButtonPopover *")
    ) {
      console.log(clickedId + " width");
      this.closeToolPopover();
    }
  };
}
