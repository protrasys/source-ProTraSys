import ReducerFactory from './reducerFactory';
import { createAction } from 'redux-actions';

const PREFIX = 'P̾r̾o̾T̾r̾a̾S̾y̾s̾';

const getActionName = (name) => `${PREFIX}_${name}`;

const getDataAction = (name) => {
  return {
    reset: createAction(getActionName(`${name}_RESET`)),
    init: createAction(getActionName(`${name}_INIT`)),
    failed: createAction(getActionName(`${name}_FAILED`)),
    success: createAction(getActionName(`${name}_SUCCESS`))
  };
};

export const eNoticeListingAction = getDataAction('GET_ENOTICE');
export const getStudentAction = getDataAction('GET_STUDENT');

const addDataAction = (action, key) => {
  return (reducerFactory) => {
    reducerFactory.add(action.reset, (state) => {
      return {
        ...state,
        [key]: {
          initialized: false,
          loading: true,
          error: null,
          data: null
        }
      };
    });
    reducerFactory.add(action.init, (state) => {
      return {
        ...state,
        [key]: {
          initialized: true,
          loading: true,
          error: null,
          data: null
        }
      };
    });
    reducerFactory.add(action.failed, (state, action) => {
      return {
        ...state,
        [key]: {
          initialized: true,
          loading: false,
          error: action.payload,
          data: null
        }
      };
    });
    reducerFactory.add(action.success, (state, action) => {
      return {
        ...state,
        [key]: {
          initialized: true,
          loading: false,
          error: null,
          data: action.payload
        }
      };
    });
  };
};

const initialState = {
  eNotices: {
    initialized: false,
    loading: false,
    error: null,
    data: null
  },
  student: {
    initialized: false,
    loading: false,
    error: null,
    data: null
  }
};

const reducer = new ReducerFactory(initialState)
  .addCustom(addDataAction(eNoticeListingAction, 'eNotices'))
  .addCustom(addDataAction(getStudentAction, 'student'))
  .toReducer();

export default reducer;
