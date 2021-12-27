export class ImagesModel {
  constructor() {
    this.state = {
      images: [],
    };
  }

  setImages = (images) => {
    this.state.images = images;
    console.log(this.state.images);
  };

  getImages = () => {
    return this.state.images;
  };
}
