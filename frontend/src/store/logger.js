import { logger } from 'redux-logger';

export const loggerMiddleware = [];

if (process.env.NODE_ENV !== 'production') {
  loggerMiddleware.push(logger);
}
