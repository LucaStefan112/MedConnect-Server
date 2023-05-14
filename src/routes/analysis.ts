import express from "express";
import {
  getAnalyses,
  getAnalysis,
  register,
} from "../controllers/analysis.controller";

// middlewares
import { validateToken } from "../middlewares/tokenValidation";

const analysisRouter = express.Router();

analysisRouter.post("/register", validateToken, register);
analysisRouter.get("/:id", validateToken, getAnalysis);
analysisRouter.get("/", validateToken, getAnalyses);

export default analysisRouter;
