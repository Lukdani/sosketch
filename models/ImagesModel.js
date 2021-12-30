export class ImagesModel {
  constructor() {
    this.state = {
      images: [],
    };
  }

  setImages = (images) => {
    this.state.images = images;
  };

  getImages = () => {
    return this.state.images;
  };
}
