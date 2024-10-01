import { CurrencyResult } from '../models/CurrencyResult';
import usdInflationRates from './usdInflationRates';

export const getUsdInflation = (startYear: number, endYear: number) => {
  if (!(startYear < endYear)) {
    return 1;
  }

  let rate = 1;
  while (startYear++ < endYear) {
    const _rate = usdInflationRates[startYear] || 1;
    rate *= _rate;
  }
  return rate;
};

export const calculateTlInflation = (
  usdInflation: number,
  startDateCurrency: CurrencyResult,
  endDateCurrency: CurrencyResult,
  amount: number
) => {
  const inflation =
    (endDateCurrency.currency / startDateCurrency.currency) * usdInflation;
  const result = amount * inflation;

  if (
    +startDateCurrency.date < 2005 ||
    +startDateCurrency.date.split('.')[2] < 2005 ||
    +startDateCurrency.date.split('/')[2] < 2005
  ) {
    return {
      tlInflation: inflation * 1000000,
      result: result,
    };
  }
  return {
    tlInflation: inflation,
    result,
  };
};
