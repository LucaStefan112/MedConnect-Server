import express from "express";
import {
    getAnalyses,
    getAnalysis,
} from "../controllers/analysis.controller";

// middlewares
import { validateToken } from "../middlewares/tokenValidation";

const analysisRouter = express.Router();

analysisRouter.get("/", validateToken, getAnalyses);
analysisRouter.get("/:id", validateToken, getAnalysis);

export default analysisRouter;