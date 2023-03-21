import { Request, Response } from "express";
import { verify, decode, JsonWebTokenError, sign, JwtPayload } from 'jsonwebtoken';

export const checkAuth = async (req: Request, res: Response) => {
  const { token } = req.params;

  if (!token) {
    return res.status(401).send({ succes: false, message: 'Unauthorized: Token not found' });
  }

  let currentUser: string | JwtPayload;

  verify(token, process.env.JWT_KEY, (err, tokenUser) => {
    if (err) {
      return res.status(401).send({ succes: false, message: 'Unauthorized: Bad token' });
    }
    currentUser = tokenUser;
  });

  const newToken = sign(currentUser, process.env.JWT_KEY, { expiresIn: '1h' });

  return res.cookie("token", newToken,
    {
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000 // 1 hour
    })
    .status(200).send({ success: true, message: 'Access granted' });
};