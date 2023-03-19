import { checkAuth } from '../controllers/token.controller';

const express = require("express");
const tokenRouter = express.Router();

tokenRouter.get("/:token", checkAuth);

export default tokenRouter;