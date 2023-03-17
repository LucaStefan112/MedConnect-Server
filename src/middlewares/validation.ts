import { Express, Request, Response, NextFunction } from "express";

export default function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { token } = req.params;
  console.log(token);
  next();
}
