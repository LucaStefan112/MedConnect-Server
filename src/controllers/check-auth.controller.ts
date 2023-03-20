import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const checkAuth = async (req: Request, res: Response) => {
  const { token } = req.params;

  if (!token) {
    return res.status(401).send({ succes: false, message: 'Unauthorized: Token not found' });
  }

  let currentUser: string | jwt.JwtPayload;

  jwt.verify(token, process.env.JWT_KEY, (err, tokenUser) => {
    if (err) {
      return res.status(401).send({ succes: false, message: 'Unauthorized: Bad token' });
    }
    currentUser = tokenUser;
  });

  const newToken = jwt.sign(currentUser, process.env.JWT_KEY,
    {
      expiresIn: process.env.TOKEN_EXPIRATION
    }
  );

  return res.cookie("token", newToken, { httpOnly: true }).status(200).send({ succes: true, message: 'Access granted' });
};