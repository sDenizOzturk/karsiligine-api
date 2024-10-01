import { CurrencyResult } from './CurrencyResult';

export interface InflationResult {
  amount: number;
  result: number;
  usdRateIncrease: number;
  usdInflation: number;
  tlInflation: number;
  startDateCurrency: CurrencyResult;
  endDateCurrency: CurrencyResult;
}
