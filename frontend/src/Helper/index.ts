import { isNullOrUndefined } from 'util';

export const getFormattedString = (data: any) => {
  return isNullOrUndefined(data) ? 'N/A' : data;
};

export const randomNumber = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
