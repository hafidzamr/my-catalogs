export const currencyFormatter = (value: number, nation: string = 'en-EN', currency: string = 'USD'): string => {
  return new Intl.NumberFormat(nation, {
    style: 'currency',
    currency,
  }).format(value);
};
