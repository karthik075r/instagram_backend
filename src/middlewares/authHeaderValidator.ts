import { Request, Response, NextFunction } from "express";
import { eMessages } from "../utils/constants";

export function validateAuthHeader(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const code = req.query.code;
  if (!code) {
    return res.status(401).json({ errorMessage: eMessages.noCodeProvided });
  }

  next();
}
