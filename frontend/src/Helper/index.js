import { isNullOrUndefined } from 'util';

export const getFormattedString = (data) => {
  return isNullOrUndefined(data) ? 'N/A' : data;
};
