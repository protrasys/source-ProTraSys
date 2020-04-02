import { store } from './index';
import { handleError } from './helper';
import { NetworkServices } from '../Services';
import {
  eNoticeListingAction,
  getStudentAction,
  getFacultyAction,
  eReportingListingAction,
  fetchOurProjectFiles,
  getAllFacultiesAction,
  getAllStudentsAction,
  setAlert,
  getAllProjectGroupsAction,
  getMineProjectGroups,
  countAllDocuments
} from './reducers';
import Config from '../Config';

export const fetchENoticeListing = async () => {
  try {
    store.dispatch(eNoticeListingAction.init());
    const response = await NetworkServices.get(
      `${Config.SERVER_URL}/students/enotice`
    );
    // Save Data To Redux
    store.dispatch(eNoticeListingAction.success(response.eNotice || {}));
  } catch (err) {
    handleError(err);
    store.dispatch(
      eNoticeListingAction.failed({
        internalMessage: err.message,
        displayMessage: 'Error in fetchENoticeListing'
      })
    );
  }
};

export const getIndividualStudent = async () => {
  try {
    store.dispatch(getStudentAction.init());
    const response = await NetworkServices.get(
      `${Config.SERVER_URL}/students/me`
    );
    store.dispatch(getStudentAction.success(response || {}));
  } catch (err) {
    handleError(err);
    store.dispatch(
      getStudentAction.failed({
        internalMessage: err.message,
        displayMessage: 'Error in GetIndividualStudent'
      })
    );
  }
};

export const getIndividualFaculty = async () => {
  try {
    store.dispatch(getFacultyAction.init());
    const response = await NetworkServices.facultyGet(
      `${Config.SERVER_URL}/faculty/me`
    );
    store.dispatch(getFacultyAction.success(response || {}));
  } catch (err) {
    handleError(err);
    store.dispatch(
      getFacultyAction.failed({
        internalMessage: err.message,
        displayMessage: 'Error in GetIndividualFaculty'
      })
    );
  }
};

export const fetchEReportListing = async (groupId) => {
  try {
    store.dispatch(eReportingListingAction.init());
    const response = await NetworkServices.get(
      `${Config.SERVER_URL}/students/ereports/${groupId}`
    );
    if (response.error) {
      store.dispatch(
        eReportingListingAction.failed({
          internalMessage: response.error,
          displayMessage: 'Error in fetchEReportListing'
        })
      );
    } else {
      store.dispatch(eReportingListingAction.success(response.data || {}));
    }
  } catch (err) {
    handleError(err);
    store.dispatch(
      eReportingListingAction.failed({
        internalMessage: err.message,
        displayMessage: 'Error in fetchEReportListing'
      })
    );
  }
};

export const fetchProjectFiles = async (groupId) => {
  try {
    store.dispatch(fetchOurProjectFiles.init());
    const response = await NetworkServices.get(
      `${Config.SERVER_URL}/students/projectfiles/${groupId}`
    );
    if (response.error) {
      store.dispatch(
        fetchOurProjectFiles.failed({
          internalMessage: response.error,
          displayMessage: 'Error in FetchOurProjectFiles'
        })
      );
    } else {
      store.dispatch(fetchOurProjectFiles.success(response.data || {}));
    }
  } catch (err) {
    handleError(err);
    store.dispatch(
      fetchOurProjectFiles.failed({
        internalMessage: err.message,
        displayMessage: 'Error in FetchOurProjectFiles'
      })
    );
  }
};

export const GetAllFaculties = async () => {
  try {
    store.dispatch(getAllFacultiesAction.init());
    const response = await NetworkServices.facultyGet(
      `${Config.SERVER_URL}/faculty`
    );
    if (response.error) {
      store.dispatch(
        getAllFacultiesAction.failed({
          internalMessage: response.error,
          displayMessage: 'Error to GetAllFaculties'
        })
      );
    } else {
      store.dispatch(getAllFacultiesAction.success(response || {}));
    }
  } catch (err) {
    handleError(err);
    store.dispatch(
      getAllFacultiesAction.failed({
        internalMessage: err.message,
        displayMessage: 'Error in Get All Faculties'
      })
    );
  }
};

export const GetAllStudents = async () => {
  try {
    store.dispatch(getAllStudentsAction.init());
    const response = await NetworkServices.facultyGet(
      `${Config.SERVER_URL}/faculty/getAllStudents`
    );
    if (response.error) {
      store.dispatch(
        getAllStudentsAction.failed({
          internalMessage: response.error,
          displayMessage: 'Error in getting All Students Action'
        })
      );
    } else {
      store.dispatch(getAllStudentsAction.success(response || {}));
    }
  } catch (err) {
    handleError(err);
    store.dispatch(
      getAllStudentsAction.failed({
        internalMessage: err.message,
        displayMessage: 'Error in Get All Students'
      })
    );
  }
};

export const AddNewProjectGroup = async (data) => {
  try {
    store.dispatch(setAlert.init());
    const response = await NetworkServices.facultyPost(
      `${Config.SERVER_URL}/faculty/addNewProjectGroup`,
      data
    );
    if (response.error) {
      store.dispatch(
        setAlert.failed({
          internalMessage: response.error,
          displayMessage:
            'Error in Adding New Project Group from Faculty Control Panel'
        })
      );
    } else {
      store.dispatch(setAlert.success(response.msg || {}));
    }
  } catch (err) {
    handleError(err);
    store.dispatch(
      setAlert.failed({
        internalMessage: err.message,
        displayMessage:
          'Error in Adding New Project Group from Faculty Control Panel'
      })
    );
  }
};

export const fetchAllProjectGroups = async () => {
  try {
    store.dispatch(getAllProjectGroupsAction.init());
    const response = await NetworkServices.facultyGet(
      `${Config.SERVER_URL}/faculty/getAllProjectGroups`
    );
    if (response.error) {
      store.dispatch(
        getAllProjectGroupsAction.failed({
          internalMessage: response.error,
          displayMessage: 'Error in fetch All Project Groups'
        })
      );
    } else if (response.msg) {
      store.dispatch(setAlert.success(response.msg || {}));
    } else {
      store.dispatch(getAllProjectGroupsAction.success(response.data || {}));
    }
  } catch (err) {
    handleError(err);
    store.dispatch(
      getAllProjectGroupsAction.failed({
        internalMessage: err.message,
        displayMessage: 'Error in fetch All Project Groups'
      })
    );
  }
};

export const fetchMineProjectGroups = async () => {
  try {
    store.dispatch(getMineProjectGroups.init());
    const response = await NetworkServices.facultyGet(
      `${Config.SERVER_URL}/faculty/mineProjectGroups`
    );
    if (response.error) {
      store.dispatch(
        getMineProjectGroups.failed({
          internalMessage: response.error,
          displayMessage: 'Error in Fetching Mine Projects'
        })
      );
    } else if (response.msg) {
      store.dispatch(setAlert.success(response.msg || {}));
    } else {
      store.dispatch(getMineProjectGroups.success(response.data || {}));
    }
  } catch (err) {
    handleError(err);
    store.dispatch(
      getMineProjectGroups.failed({
        internalMessage: err.message,
        displayMessage: 'Error in Fetching Mine Projects'
      })
    );
  }
};

export const AddNewENotice = async (data) => {
  try {
    store.dispatch(setAlert.init());
    const response = await NetworkServices.facultyPost(
      `${Config.SERVER_URL}/faculty/enotice`,
      data
    );
    if (response.error) {
      store.dispatch(
        setAlert.failed({
          internalMessage: response.error,
          displayMessage: 'Error in Adding New E Notice'
        })
      );
    } else {
      store.dispatch(setAlert.success(response.msg || {}));
    }
  } catch (err) {
    handleError(err);
    store.dispatch(
      setAlert.failed({
        internalMessage: err.message,
        displayMessage:
          'Error in Adding new E Notice from Faculty Control Panel'
      })
    );
  }
};

export const AddNewStudent = async (data) => {
  try {
    store.dispatch(setAlert.init());
    const response = await NetworkServices.facultyPost(
      `${Config.SERVER_URL}/faculty/addNewStudent`,
      data
    );
    if (response.error) {
      store.dispatch(
        setAlert.failed({
          internalMessage: response.error,
          displayMessage: 'Error in Adding New Student'
        })
      );
    } else {
      let msg = `${response.msg}\n Username : ${response.StudentData.username}\n and Passwword : ${response.StudentData.password}`;
      store.dispatch(setAlert.success(msg || {}));
    }
  } catch (err) {
    handleError(err);
    store.dispatch(
      setAlert.failed({
        internalMessage: err.message,
        displayMessage: 'Error in Adding New Student from Faculty Control Panel'
      })
    );
  }
};

export const patchStudent = async (data, stuId) => {
  try {
    store.dispatch(setAlert.init());
    const response = await NetworkServices.facultyPatch(
      `${Config.SERVER_URL}/faculty/updateStudent/${stuId}`,
      data
    );
    if (response.error) {
      console.log('Testing PAtch Student Response', response.error);
      store.dispatch(
        setAlert.failed({
          internalMessage: response.error,
          displayMessage: 'Error in Updating Student'
        })
      );
    } else {
      store.dispatch(setAlert.success(response.msg || 'Student Updated'));
    }
  } catch (err) {
    handleError(err);
    store.dispatch(
      setAlert.failed({
        internalMessage: err.message,
        displayMessage: 'Error in Updating Student'
      })
    );
  }
};

export const fetchCountAllDocuments = async () => {
  try {
    store.dispatch(countAllDocuments.init());
    const response = await NetworkServices.adminGet(
      `${Config.SERVER_URL}/admin/countalldocuments`
    );
    if (response.error) {
      store.dispatch(
        countAllDocuments.failed({
          internalMessage: response.error,
          displayMessage: 'Error While Making Get Request of CountAllDocuments'
        })
      );
    } else {
      store.dispatch(countAllDocuments.success(response || {}));
    }
  } catch (err) {
    handleError(err);
    store.dispatch(
      countAllDocuments.failed({
        internalMessage: err.message,
        displayMessage: 'Error in CountAllDocuments at Actions in Redux Store'
      })
    );
  }
};
