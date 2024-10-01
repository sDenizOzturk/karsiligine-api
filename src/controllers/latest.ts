import { Request, Response, NextFunction } from 'express';
import { getLatestCalculations } from '../utils/latest';

export const getLatest = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json(getLatestCalculations());
  } catch (err) {
    next(err);
  }
};
