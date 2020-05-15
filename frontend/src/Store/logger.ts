import { logger } from 'redux-logger';
import Config from '../Config';

export const loggerMiddleware: any = [];

if (Config.DEBUG) {
  loggerMiddleware.push(logger);
}
