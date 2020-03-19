import Config from "../Config";
import { NetworkServices, LogServices } from "./index";
import { store } from "../store";
import {
  getFacultyAction,
  getStudentAction,
  eNoticeListingAction,
  fetchOurProjectFiles,
  eReportingListingAction
} from "../store/reducers";

const logger = LogServices.getInstance("AuthServices");
const AUTH_LOCALSTORAGEKEY = "badboysecurities";
const FACULTY_AUTH_LOCALSTORAGEKEY = "badboysecurities_FACULTY";

class AuthService {
  constructor() {
    const authString = localStorage.getItem(AUTH_LOCALSTORAGEKEY);
    const FacultyAuthString = localStorage.getItem(
      FACULTY_AUTH_LOCALSTORAGEKEY
    );
    if (authString) {
      this._auth = JSON.parse(authString);
    }
    if (FacultyAuthString) {
      this._facultyAuth = JSON.parse(FacultyAuthString);
    }
  }

  /**
   * @param {string} enrollmentId
   * @param {string} password
   */

  async login(enrollmentId, password) {
    const response = await NetworkServices.post(
      `${Config.SERVER_URL}/students`,
      { enrollmentId, password }
    );

    if (response) {
      localStorage.setItem(AUTH_LOCALSTORAGEKEY, JSON.stringify(response));
      this._auth = response;
    } else {
      console.log("STUDENT LOGIN AUTHSERVICE ERROR: NO RESPONSE FOUND");
    }
    logger.debug(response);
    return response;
  }

  isAuthenticated() {
    if (!this._auth) {
      return false;
    }
    return true;
  }

  getToken() {
    if (!this._auth) {
      return null;
    }
    return this._auth.token;
  }

  async logout() {
    localStorage.removeItem(AUTH_LOCALSTORAGEKEY);
    this._auth = undefined;
    store.dispatch(getStudentAction.reset());
    store.dispatch(eNoticeListingAction.reset());
    store.dispatch(eReportingListingAction.reset());
    store.dispatch(fetchOurProjectFiles.reset());
  }

  /**
   * @param {string} enrollmentId
   * @param {string} password
   */

  async FacultyLogin(enrollmentId, password) {
    const response = await NetworkServices.facultyPost(
      `${Config.SERVER_URL}/faculty`,
      { enrollmentId, password }
    );

    if (response) {
      localStorage.setItem(
        FACULTY_AUTH_LOCALSTORAGEKEY,
        JSON.stringify(response)
      );
      this._facultyAuth = response;
    } else {
      console.log("FACULTY LOGIN AUTHSERVICE ERROR: NO RESPONSE FOUND");
    }
    logger.debug(response);
    return response;
  }

  isFacultyAuthenticated() {
    if (!this._facultyAuth) {
      return false;
    }
    return true;
  }

  getFacultyToken() {
    if (!this._facultyAuth) {
      return null;
    }

    return this._facultyAuth;
  }

  async facultyLogout() {
    localStorage.removeItem(FACULTY_AUTH_LOCALSTORAGEKEY);
    this._facultyAuth = undefined;
    store.dispatch(getFacultyAction.reset());
  }
}

export default new AuthService();
