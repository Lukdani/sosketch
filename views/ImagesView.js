import { createElement } from "../utils/createElement.js";

export class ImagesView {
  constructor() {
    this.rootElement = document.getElementById("imagesContainer");
  }

  renderImages = (images) => {
    if (images?.length > 0) {
      this.rootElement.innerHTML = "";

      const imagesHeader = createElement("h4", ["mb-2"], null);
      imagesHeader.textContent = "Latest contributions";
      this.rootElement.appendChild(imagesHeader);

      const imagesRow = createElement("div", ["row"], null);
      this.rootElement.appendChild(imagesRow);
      images.forEach((imageItem) => {
        const imageCol = createElement("div", ["col-6", "col-lg-2"], null);
        imagesRow.appendChild(imageCol);

        const image = createElement("img", ["submittedImage"], null);
        image.src = `/sosketch/uploads/submittedImages/${imageItem.imgId}.png`;

        imageCol.appendChild(image);
      });
    }
  };
}
