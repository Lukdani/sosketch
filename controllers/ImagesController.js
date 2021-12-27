import { getRequest } from "/sosketch/utils/getRequest.js";

export class ImagesController {
  constructor(imagesModel, imagesView) {
    this.imagesModel = imagesModel;
    this.imagesView = imagesView;
    this.fetchImages();
  }

  fetchImages = async () => {
    const images = await getRequest("/sosketch/api/getImages.php");
    this.imagesModel.setImages(images);
    this.imagesView.renderImages(this.imagesModel.getImages());
  };
}
