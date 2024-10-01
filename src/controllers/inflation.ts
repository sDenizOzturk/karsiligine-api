import { Request, Response, NextFunction } from 'express';
import { getUsdInflation, calculateTlInflation } from '../utils/inflation';
import { fetchCurrency, getCurrency } from '../utils/currency';
import { stringToDate } from '../utils/utils';
import { InflationResult } from '../models/InflationResult';
import { pushCalculation } from '../utils/latest';

export const getInflation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const date = req.query.date as string;
    const amount = +(req.query.amount as string) || 1;

    const startDate = stringToDate(date);
    const endDate = new Date();

    if (startDate > endDate) {
      throw new Error('Date cannot be greater than today');
    }

    if (startDate < new Date(1950, 1, 1)) {
      throw new Error('Date cannot be earlier than 1/1/1997');
    }

    const startYear = startDate.getFullYear();

    const endYear = endDate.getFullYear();

    const startDateCurrency =
      startDate < new Date(1997, 1, 1)
        ? getCurrency(startYear)
        : await fetchCurrency('USD', date);

    if (!startDateCurrency) {
      throw new Error('Could not fetch start date currency');
    }

    const endDateCurrency = await fetchCurrency(
      'USD',
      endDate.toLocaleDateString()
    );

    if (!endDateCurrency) {
      throw new Error('Could not fetch end date currency');
    }

    const usdInflation = getUsdInflation(startYear, endYear)!;

    const { tlInflation, result } = calculateTlInflation(
      usdInflation,
      startDateCurrency!,
      endDateCurrency!,
      amount
    );

    const usdRateIncrease =
      +startDateCurrency.date < 2005 ||
      +startDateCurrency.date.split('.')[2] < 2005 ||
      +startDateCurrency.date.split('/')[2] < 2005
        ? (endDateCurrency.currency / startDateCurrency.currency) * 1000000
        : endDateCurrency.currency / startDateCurrency.currency;

    const response: InflationResult = {
      amount,
      result,
      usdRateIncrease,
      usdInflation,
      tlInflation,
      startDateCurrency,
      endDateCurrency,
    };

    pushCalculation({ date, amount: String(req.query.amount) });
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
