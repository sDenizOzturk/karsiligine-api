import { CalculationForm } from '../models/CalculationForm';

const latestCalculations: CalculationForm[] = [
  { date: '28.08.2019', amount: '1' },
  { date: '28.08.2019', amount: '2' },
  { date: '28.08.2019', amount: '3' },
  { date: '28.08.2019', amount: '4' },
  { date: '28.08.2019', amount: '5' },
  { date: '28.08.2019', amount: '6' },
  { date: '28.08.2019', amount: '7' },
  { date: '28.08.2019', amount: '8' },
  { date: '28.08.2019', amount: '9' },
  { date: '28.08.2019', amount: '10' },
  { date: '28.08.2019', amount: '11' },
  { date: '28.08.2019', amount: '12' },
  { date: '28.08.2019', amount: '13' },
  { date: '28.08.2019', amount: '14' },
  { date: '28.08.2019', amount: '15' },
  { date: '28.08.2019', amount: '16' },
  { date: '28.08.2019', amount: '17' },
  { date: '28.08.2019', amount: '18' },
  { date: '28.08.2019', amount: '19' },
  { date: '28.08.2019', amount: '20' },
  { date: '28.08.2019', amount: '21' },
  { date: '28.08.2019', amount: '22' },
  { date: '28.08.2019', amount: '23' },
  { date: '28.08.2019', amount: '24' },
];

export const getLatestCalculations = () => {
  return latestCalculations;
};

export const pushCalculation = (calculation: CalculationForm) => {
  latestCalculations.pop();
  latestCalculations.unshift(calculation);
};
