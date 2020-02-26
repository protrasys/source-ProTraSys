import Config from '../Config';
import { NetworkServices, LogServices } from './index';
// import { store } from '../store';
// import { getStudentAction } from '../store/reducers';

const logger = LogServices.getInstance('AuthServices');
const AUTH_LOCALSTORAGEKEY = 'badboysecurities';

class AuthService {
  constructor() {
    const authString = localStorage.getItem(AUTH_LOCALSTORAGEKEY);
    if (authString) {
      this._auth = JSON.parse(authString);
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
      console.log('STUDENT LOGIN');
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
  }
}

export default new AuthService();
