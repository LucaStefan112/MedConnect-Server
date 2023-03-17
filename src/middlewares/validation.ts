import { Express, Request, Response, NextFunction } from "express";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;
  console.log(token);
  //   req.params.id = findIdFromToken(token);
  req.body.id = token;
  next();
};
