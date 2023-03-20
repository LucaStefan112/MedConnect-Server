import express from "express";
import {
    getAnalyses,
    getAnalysis,
} from "../controllers/analysis.controller";

const analysisRouter = express.Router();

analysisRouter.get("/", getAnalyses);
analysisRouter.get("/:id", getAnalysis);

export default analysisRouter;