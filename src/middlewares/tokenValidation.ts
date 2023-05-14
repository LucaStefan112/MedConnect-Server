import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import {
  verify,
  decode,
  JsonWebTokenError,
  sign,
  JwtPayload,
} from "jsonwebtoken";
import { ITokenUser } from "../controllers/check-auth.controller";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  // console.log(req.cookies)

  if (!token) {
    return res
      .status(401)
      .send({ succes: false, message: "Unauthorized: Token not found" });
  }

  try {
    let decodedToken: ITokenUser;

    verify(token, process.env.JWT_KEY, (err, tokenUser: ITokenUser) => {
      if (err) {
        return res
          .clearCookie("token")
          .status(401)
          .send({ succes: false, message: "Unauthorized: Bad token" });
      }
      decodedToken = { id: tokenUser.id };
    });

    if (!decodedToken.id) {
      return res
        .clearCookie("token")
        .status(401)
        .send({ success: false, message: "Unauthorised: User not found" });
    }

    res.locals.userId = decodedToken.id;
    next();
  } catch (err) {
    return res
      .clearCookie("token")
      .status(401)
      .send({ success: false, message: "Unauthorised: Token not found" });
  }
};
