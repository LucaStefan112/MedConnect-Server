import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  
  try {
    res.locals.userId = jwt.verify(token, process.env.JWT_KEY);
    const user = User.findById(res.locals.userId);

    if(!user) {
      return res.clearCookie("token").status(401).send({
        success: false,
        message: "Unauthorised: User not found",
      });
    }

    next();
  } catch (err) {
    return res.clearCookie("token").status(401).send({
      success: false,
      message: "Unauthorised: Token not found",
    });
  }
};
