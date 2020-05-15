import { isNullOrUndefined } from 'util';

export const getFormattedString = (data: any) => {
  return isNullOrUndefined(data) ? 'N/A' : data;
};
