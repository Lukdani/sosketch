import { DrawingModel } from "./models/DrawingModel.js";
import { DrawingView } from "./views/DrawingView.js";
import { DrawingController } from "./controllers/DrawingController.js";

const drawingModel = new DrawingModel();
const drawingView = new DrawingView();

const drawingController = new DrawingController(drawingModel, drawingView);
