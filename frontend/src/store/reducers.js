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

// Actions for Student
export const eNoticeListingAction = getDataAction('GET_ENOTICE');
export const getStudentAction = getDataAction('GET_STUDENT');
export const eReportingListingAction = getDataAction('GET_E-REPORTING');
export const fetchOurProjectFiles = getDataAction('GET_PROJECTFILES');
export const getAllStudentsAction = getDataAction('GET_ALL_STUDENTS');

// Actions for Faculty
export const getFacultyAction = getDataAction('GET_FACULTY');
export const getAllFacultiesAction = getDataAction('GET_ALL_FACULTIES');
export const getAllProjectGroupsAction = getDataAction('GET_ALL_PROJECTGROUPS');
export const getMineProjectGroups = getDataAction('GET_MINE_PROJECTGROUPS');

// Actions for Administrator
export const setAlert = getDataAction('SET_ALERT');
export const countAllDocuments = getDataAction('COUNT_ALL_DOCUMENTS');

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
  eReporting: {
    initialized: false,
    loading: false,
    error: null,
    data: null
  },
  projectFiles: {
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
  },
  faculty: {
    initialized: false,
    loading: false,
    error: null,
    data: null
  },
  allFaculties: {
    initialized: false,
    loading: false,
    error: null,
    data: null
  },
  allStudents: {
    initialized: false,
    loading: false,
    error: null,
    data: null
  },
  allProjectGroups: {
    initialized: false,
    loading: false,
    error: null,
    data: null
  },
  admin: {
    initialized: false,
    loading: false,
    error: null,
    data: null
  },
  alerts: {
    initialized: false,
    loading: false,
    error: null,
    data: null
  },
  mineGroups: {
    initialized: false,
    loading: false,
    error: null,
    data: null
  },
  AllDocuments: {
    initialized: false,
    loading: false,
    error: null,
    data: null
  }
};

const reducer = new ReducerFactory(initialState)
  .addCustom(addDataAction(eNoticeListingAction, 'eNotices'))
  .addCustom(addDataAction(eReportingListingAction, 'eReporting'))
  .addCustom(addDataAction(fetchOurProjectFiles, 'projectFiles'))
  .addCustom(addDataAction(getStudentAction, 'student'))
  .addCustom(addDataAction(getFacultyAction, 'faculty'))
  .addCustom(addDataAction(getAllFacultiesAction, 'allFaculties'))
  .addCustom(addDataAction(getAllStudentsAction, 'allStudents'))
  .addCustom(addDataAction(getAllProjectGroupsAction, 'allProjectGroups'))
  .addCustom(addDataAction(setAlert, 'alerts'))
  .addCustom(addDataAction(getMineProjectGroups, 'mineGroups'))
  .addCustom(addDataAction(countAllDocuments, 'AllDocuments'))
  .toReducer();

export default reducer;
