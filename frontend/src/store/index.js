import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from './reducers';
import { loggerMiddleware } from './logger';

const appReducers = combineReducers({
  root: rootReducers,
});

const middleware = composeWithDevTools(applyMiddleware(...loggerMiddleware));

export const store = createStore(appReducers, middleware);

export default store;
