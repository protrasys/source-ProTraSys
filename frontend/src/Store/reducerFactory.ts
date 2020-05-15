import { handleActions } from 'redux-actions';

// creating Reducers Factory
class ReducerFactory {
  reducerMap: any;
  intiState: any;

  // Initialized the ReducerMap and initial State
  constructor(intiState: any) {
    this.intiState = intiState;
    this.reducerMap = {};
  }

  add(actionTypeOrActionCreator: any, reducer: any) {
    return this.addReducerInternal(actionTypeOrActionCreator, reducer);
  }

  addCustom(fn: any) {
    fn(this);
    return this.asAllowingPayload();
  }

  addReducerInternal(actionTypeOrActionCreator: any, reducer: any) {
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
