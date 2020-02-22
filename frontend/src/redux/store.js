// Importing Dependencies for Redux
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// Creating Initial State for Redux
const initialState = {};

// Thunk Middleware
const middleware = [thunk];

// Creating The Store
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
