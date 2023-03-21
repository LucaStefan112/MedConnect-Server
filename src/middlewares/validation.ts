import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import { verify, decode, JsonWebTokenError, sign, JwtPayload } from 'jsonwebtoken';

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  try {

    const decodedToken = verify(token, process.env.JWT_KEY);
    console.log("decodedToken:", decodedToken);

    if (!decodedToken.user) {
      return res.clearCookie("token").status(401).send({
        success: false,
        message: "Unauthorised: User not found",
      });
    }

    res.locals = decodedToken;
    console.log("res.locals:", res.locals);
    next();
  } catch (err) {
    return res.clearCookie("token").status(401).send({
      success: false,
      message: "Unauthorised: Token not found",
    });
  }
};
