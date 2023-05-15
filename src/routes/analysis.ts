import express from "express";
import {
    getAnalyses,
    getAnalysis,
    addAnalises,
    deleteAnalysis,
} from "../controllers/analysis.controller";

import fileUpload from "express-fileupload";

// middlewares
import { validateToken } from "../middlewares/tokenValidation";

const analysisRouter = express.Router();

analysisRouter.get("/", validateToken, getAnalyses);
analysisRouter.post("/", fileUpload({ createParentPath: true }), validateToken, addAnalises);
analysisRouter.get("/:id", validateToken, getAnalysis);
analysisRouter.delete("/:id", validateToken, deleteAnalysis);

export default analysisRouter;