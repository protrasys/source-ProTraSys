import axios, { AxiosResponse } from 'axios';
import { ApplicationError, LogServices, AuthServices } from './index';

const logger = LogServices.getInstance('Service:Network');

const MESSAGES = {
  OFFLINE: 'You are offline, Kindly turn on Internet',
  NOT_REACHABLE:
    'Sorry, We are not able to connect to the server at the moment',
  UNKNOWN: 'Something went wrong, please contact to the ProTraSys Administrator'
};

class NetworkService {
  handleError(error) {
    if (error instanceof ApplicationError) {
      throw error;
    }

    if (error.message === 'Network Error') {
      throw new ApplicationError(MESSAGES.NOT_REACHABLE);
    }

    if (error.response) {
      logger.error(error.response);
      throw new ApplicationError(MESSAGES.UNKNOWN);
    }

    logger.error(error.response);
    throw new ApplicationError(MESSAGES.UNKNOWN);
  }

  /**
   *
   * @param {AxiosResponse} response
   */
  handleResponse(response) {
    if (response.status !== 200 && response.status !== 201) {
      logger.error(response);
      throw new ApplicationError(MESSAGES.UNKNOWN);
    }
    return response.data;
  }

  getHeader(options) {
    const header = {};

    if (options && options.headers) {
      Object.assign(header, options.headers);
    }

    if (options && options.external) {
      return header;
    }

    const token = AuthServices.getToken();
    if (token) {
      header.authorization = `Bearer ${token}`;
    }

    return header;
  }

  /**
   * @param {string} url
   * @param {any} options
   */

  async get(url, options) {
    logger.debug('get', url);
    try {
      const response = await axios.get(url, {
        headers: this.getHeader(options)
      });
      logger.debug('get response', response);

      return this.handleResponse(response);
    } catch (err) {
      this.handleError(err);
    }
  }

  /**
   * @param {string} url
   * @param {any} data
   * @param {any} options
   */

  async post(url, data, options) {
    logger.debug('post', url, data);
    try {
      const response = await axios.post(url, data, {
        headers: this.getHeader(options)
      });
      logger.debug('post response', response);

      return this.handleResponse(response);
    } catch (err) {
      this.handleError(err);
    }
  }

  /**
   * @param {string} url
   * @param {any} data
   * @param {any} options
   */
  async patch(url, data, options) {
    logger.debug('patch', url, data);
    try {
      const response = await axios.patch(url, data, {
        headers: this.getHeader(options)
      });
      logger.debug('patch response', response);
      this.handleResponse(response);
    } catch (err) {
      this.handleError(err);
    }
  }

  /**
   * @param {string} url
   * @param {any} options
   */
  async delete(url, options) {
    logger.debug('delete', url);
    try {
      const response = await axios.delete(url, {
        headers: this.getHeader(options)
      });
      logger.debug('delete response', response);
      return this.handleResponse(response);
    } catch (err) {
      this.handleError(err);
    }
  }

  // For Faculty

  getFacultyHeader(options) {
    const header = {};

    if (options && options.headers) {
      Object.assign(header, options.headers);
    }

    if (options && options.external) {
      return header;
    }

    const token = AuthServices.getFacultyToken();

    if (token) {
      header.authorization = `Bearer ${token}`;
    }

    return header;
  }

  /**
   * @param {string} url
   * @param {any} options
   */

  async facultyGet(url, options) {
    logger.debug('get', url);
    try {
      const response = await axios.get(url, {
        headers: this.getFacultyHeader(options)
      });

      logger.debug('get response', response);

      return this.handleResponse(response);
    } catch (err) {
      console.log(
        'NETWORK SERVICE GET FACULTY HEADER LOG',
        this.getFacultyHeader(options)
      );
      this.handleError(err);
    }
  }

  /**
   * @param {string} url
   * @param {any} data
   * @param {any} options
   */

  async facultyPost(url, data, options) {
    logger.debug('post', url, data);
    try {
      const response = await axios.post(url, data, {
        headers: this.getFacultyHeader(options)
      });
      logger.debug('post response', response);

      return this.handleResponse(response);
    } catch (err) {
      this.handleError(err);
    }
  }

  /**
   * @param {string} url
   * @param {any} data
   * @param {any} options
   */
  async facultyPatch(url, data, options) {
    logger.debug('patch', url, data);
    try {
      const response = await axios.patch(url, data, {
        headers: this.getFacultyHeader(options)
      });
      logger.debug('patch response', response);
      this.handleResponse(response);
    } catch (err) {
      this.handleError(err);
    }
  }

  /**
   * @param {string} url
   * @param {any} options
   */
  async facultyDelete(url, options) {
    logger.debug('delete', url);
    try {
      const response = await axios.delete(url, {
        headers: this.getFacultyHeader(options)
      });
      logger.debug('delete response', response);
      return this.handleResponse(response);
    } catch (err) {
      this.handleError(err);
    }
  }
}

export default new NetworkService();
