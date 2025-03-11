import { Router } from "express";
import { deleteModel, getModel, getModelEmbedCode, getModels, uploadModel } from "../controllers/model.controller.js";
import { checkPlanLimits } from "../middlewares/checkPlanLimits.middleware.js";
import { checkFileSizeLimit } from  '../middlewares/checkFileSizeLimit.middleware.js'
import authorize from "../middlewares/auth.middleware.js";


const modelRouter = Router();

modelRouter.get('/', getModels);

modelRouter.get('/:id', authorize, getModel);

modelRouter.get("/:id/embed", authorize, getModelEmbedCode);

modelRouter.post('/upload', authorize, checkPlanLimits, checkFileSizeLimit, uploadModel);

modelRouter.delete('/:id', authorize, deleteModel);

export default modelRouter;