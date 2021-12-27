import { DrawingModel } from "./models/DrawingModel.js";
import { DrawingView } from "./views/DrawingView.js";
import { DrawingController } from "./controllers/DrawingController.js";
import { ImagesModel } from "./models/ImagesModel.js";
import { ImagesView } from "./views/ImagesView.js";
import { ImagesController } from "./controllers/ImagesController.js";

const imagesModel = new ImagesModel();
const imagesView = new ImagesView();
const imagesController = new ImagesController(imagesModel, imagesView);

const drawingModel = new DrawingModel();
const drawingView = new DrawingView();

const drawingController = new DrawingController(
  drawingModel,
  drawingView,
  imagesController
);
