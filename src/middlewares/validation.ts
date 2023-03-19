import { Express, Request, Response, NextFunction } from "express";
const dotenv = require("dotenv");
import { verify, decode, JsonWebTokenError, sign } from 'jsonwebtoken';
/*
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
*/
export const verifyToken = async (req, res, next) => {
  console.log("verifyToken");
  console.log("req:", req.rawHeaders[15].split("=")[1]);
  const token = req.rawHeaders[15].split("=")[1] || '';
  console.log("token:", token);
  try {
    if (!token) {
      return res.status(401).json('You need to Login')
    }
    console.log("flag2");
    const { JWT_KEY } = process.env;
    const decrypt = verify(token, JWT_KEY);
    console.log("decrypt:", decrypt);
    req.body.user = {
      _id: decrypt.user._id,
      fullName: decrypt.user.fullName,
    };
    console.log("req.body.user:", req.body.user)
    next();
  } catch (err) {
    console.log("flag1");
    return res.status(500).send({
      success: false,
      message: 'Invalid Token',
      error: err.toString()
    });
  }
};