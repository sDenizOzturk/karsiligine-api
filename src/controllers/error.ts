import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../models/CustomError';

export const errorController = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;
  const data = err.data;
  res.status(status).json({
    message: message,
    data: data,
  });
};
