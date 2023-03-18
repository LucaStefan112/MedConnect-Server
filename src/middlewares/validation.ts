import { Express, Request, Response, NextFunction } from "express";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;
  console.log(token);
  //   req.params.id = findIdFromToken(token);
  res.locals.user.id = token;
  next();
};
