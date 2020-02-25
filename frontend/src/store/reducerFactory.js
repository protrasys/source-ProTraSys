import { handleActions } from 'redux-actions';

// creating Reducers Factory
class ReducerFactory {
  reducerMap;
  intiState;

  // Initialized the ReducerMap and initial State
  constructor(intiState) {
    this.intiState = intiState;
    this.reducerMap = {};
  }

  add(actionTypeOrActionCreator, reducer) {
    return this.addReducerInternal(actionTypeOrActionCreator, reducer);
  }

  addCustom(fn) {
    fn(this);
    return this.asAllowingPayload();
  }

  addReducerInternal(actionTypeOrActionCreator, reducer) {
    this.reducerMap[actionTypeOrActionCreator.toString()] = reducer;
    return this.asAllowingPayload();
  }

  asAllowingPayload() {
    return this;
  }

  toReducer() {
    return handleActions(this.reducerMap, this.intiState);
  }
}

export default ReducerFactory;
