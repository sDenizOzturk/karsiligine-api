export const stringToDate = (str: string) => {
  let dd, mm, yyyy;
  if (str.includes('/')) {
    const _date = str.split('/');
    mm = +_date[0];
    dd = +_date[1];
    yyyy = +_date[2];
  } else {
    const _date = str.split('.');
    dd = +_date[0];
    mm = +_date[1];
    yyyy = +_date[2];
  }

  if (dd && mm && yyyy) {
    return new Date(yyyy, mm + 1, dd);
  }
  throw new Error('Incorrect date');
};
