import { store } from './index';
import { handleError } from './helper';
import { NetworkServices } from '../Services';
import {
  eNoticeListingAction,
  getStudentAction,
  getFacultyAction,
  eReportingListingAction,
  fetchOurProjectFiles,
  getAllFacultiesAction
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
