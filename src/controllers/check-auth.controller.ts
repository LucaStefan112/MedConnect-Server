import { Request, Response } from "express";
import { verify, decode, JsonWebTokenError, sign, JwtPayload } from 'jsonwebtoken';

export interface ITokenUser {
  id: string,
  iat?: number,
  exp?: number
}

export const checkAuth = async (req: Request, res: Response) => {
  // get token from cookies
  const token = req.cookies.token;

  try{
    if (!token) {
      return res.status(401).send({ success: false, message: 'Unauthorized: Token not found' });
    }
  
    let currentUser: ITokenUser;
  
    verify(token, process.env.JWT_KEY, (err, tokenUser: ITokenUser) => {
      if (err) {
        return res.status(401).send({ success: false, message: 'Unauthorized: Bad token' });
      } else {
        return res.status(200).send({ success: true, message: 'Authorized', currentUser });
      }
    });
  } catch (err) {
    return res.status(401).send({ success: false, message: 'Unauthorized: Bad token' });
  }  
};