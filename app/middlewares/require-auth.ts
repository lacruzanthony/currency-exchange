import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";
// Require auth middleware.
export const requireAuth = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.session?.user) {
    throw new NotAuthorizedError();
  }
  next();
};
