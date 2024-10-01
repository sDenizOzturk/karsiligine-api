import { XMLParser } from 'fast-xml-parser';
import usdRates from './usdRates';

export const fetchCurrency = async (currency: string, date: string) => {
  let day: number;
  let month: number;
  let year: number;

  if (date.includes('/')) {
    const dateArray = date.split('/');
    day = +dateArray[1];
    month = +dateArray[0];
    year = +dateArray[2];
  } else {
    const dateArray = date.split('.');
    day = +dateArray[0];
    month = +dateArray[1];
    year = +dateArray[2];
  }

  for (let i = 0; i < 30; i++) {
    const dd = day < 10 ? '0' + String(day) : String(day);
    const mm = month < 10 ? '0' + String(month) : String(month);
    const yyyy = String(year);
    try {
      const response = await fetch(
        `https://www.tcmb.gov.tr/kurlar/${yyyy}${mm}/${dd}${mm}${yyyy}.xml`
      );
      const xml = await response.text();

      const options = {
        ignoreAttributes: false,
        attributeNamePrefix: '@_',
      };
      const parser = new XMLParser(options);
      let xmlObject = parser.parse(xml);

      const date = xmlObject.Tarih_Date['@_Tarih'];
      const data = xmlObject.Tarih_Date.Currency.find(
        (el: any) => el['@_CurrencyCode'] === currency
      );
      return {
        currency: data.ForexBuying,
        date,
      };
    } catch {
      const date = new Date(`${mm}/${dd}/${yyyy} 00:00:00`);
      const yesterday = new Date(date.getTime() - 24 * 60 * 60 * 1000);
      day = yesterday.getDate();
      month = yesterday.getMonth() + 1;
      year = yesterday.getFullYear();
    }
  }
};

export const getCurrency = (startYear: number) => {
  return {
    currency: usdRates[startYear],
    date: startYear,
  };
};
