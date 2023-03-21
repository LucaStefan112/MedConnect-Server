import { Request, Response } from "express";
import { verify, decode, JsonWebTokenError, sign, JwtPayload } from 'jsonwebtoken';

export interface ITokenUser {
  id: string,
  iat?: number,
  exp?: number
}

export const checkAuth = async (req: Request, res: Response) => {
  const { token } = req.params;
  
  if (!token) {
    return res.status(401).send({ succes: false, message: 'Unauthorized: Token not found' });
  }

  let currentUser: ITokenUser;

  verify(token, process.env.JWT_KEY, (err, tokenUser: ITokenUser) => {
    if (err) {
      return res.status(401).send({ succes: false, message: 'Unauthorized: Bad token' });
    }
    currentUser = { id: tokenUser.id };
  });

  const newToken = sign(currentUser, process.env.JWT_KEY, { expiresIn: '1h' });
  
  if (req.cookies.token) {
    return res.send({ success: false, message: 'Already has cookie' });
  }

  res.cookie("token", newToken, {
    httpOnly: true,
    maxAge: 1 * 60 * 60 * 1000 // 1 hour
  });

  return res.status(200).send({ success: true, message: 'Access granted' });
};