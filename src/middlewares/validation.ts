import { Express, Request, Response, NextFunction } from "express";
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = dotenv.config().parsed;

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // this middleware will be called for every request but the check-auth one
  // so when it will that path it will skip
  if (req.path.split("/")[1] === "check-auth") {
    next();
    return;
  }

  const { token } = req.cookies;
  try {
    const user = jwt.verify(token, ACCESS_TOKEN_SECRET);
    res.locals.user = user;
    next();
    // console.log(token);
  } catch (err) {
    console.log(err);
    console.log(token);
    res.clearCookie("token");
    res.status(401).send({
      success: false,
      message:
        "Unauthorised: Cookie not found, please send a GET request to /check-auth/:token",
    });
  }
};
