import axios from 'axios';
import { ApplicationError, LogServices, AuthServices } from './index';

const logger = LogServices.getInstance('Service:Network');

const MESSAGES = {
  OFFLINE: 'You are offline, Kindly turn on Internet',
  NOT_REACHABLE:
    'Sorry, We are not able to connect to the server at the moment',
  UNKNOWN:
    'Something went wrong, please contact to the ProTraSys Administrator',
};

class NetworkService {
  handleError(error: any) {
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
  handleResponse(response: any) {
    if (response.status !== 200 && response.status !== 201) {
      logger.error(response);
      throw new ApplicationError(MESSAGES.UNKNOWN);
    }
    return response.data;
  }

  getHeader(options?: any) {
    const header: any = {};

    if (options && options.headers) {
      Object.assign(header, options.headers);
    }

    if (options && options.external) {
      return header;
    }

    const token: any = AuthServices.getToken();
    if (token) {
      header.authorization = `Bearer ${token}`;
    }

    return header;
  }

  async get(url: string, options?: any) {
    logger.debug('get', url);
    try {
      const response = await axios.get(url, {
        headers: this.getHeader(options),
      });
      logger.debug('get response', response);

      return this.handleResponse(response);
    } catch (err) {
      this.handleError(err);
    }
  }

  async post(url: string, data: any, options?: any) {
    logger.debug('post', url, data);
    try {
      const response = await axios.post(url, data, {
        headers: this.getHeader(options),
      });
      logger.debug('post response', response);

      return this.handleResponse(response);
    } catch (err) {
      this.handleError(err);
    }
  }

  async patch(url: string, data: any, options?: any) {
    logger.debug('patch', url, data);
    try {
      const response = await axios.patch(url, data, {
        headers: this.getHeader(options),
      });
      logger.debug('patch response', response);
      this.handleResponse(response);
    } catch (err) {
      this.handleError(err);
    }
  }

  async delete(url: string, options?: any) {
    logger.debug('delete', url);
    try {
      const response = await axios.delete(url, {
        headers: this.getHeader(options),
      });
      logger.debug('delete response', response);
      return this.handleResponse(response);
    } catch (err) {
      this.handleError(err);
    }
  }

  // For Faculty
  getFacultyHeader(options?: any) {
    const header: any = {};

    if (options && options.headers) {
      Object.assign(header, options.headers);
    }

    if (options && options.external) {
      return header;
    }

    const token: any = AuthServices.getFacultyToken();

    if (token) {
      header.authorization = `Bearer ${token}`;
    }

    return header;
  }

  async facultyGet(url: string, options?: any) {
    logger.debug('get', url);
    try {
      const response = await axios.get(url, {
        headers: this.getFacultyHeader(options),
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

  async facultyPost(url: string, data: any, options?: any) {
    logger.debug('post', url, data);
    try {
      const response = await axios.post(url, data, {
        headers: this.getFacultyHeader(options),
      });
      logger.debug('post response', response);

      return this.handleResponse(response);
    } catch (err) {
      this.handleError(err);
    }
  }

  async facultyPatch(url: string, data: any, options?: any) {
    logger.debug('patch', url, data);
    try {
      const response = await axios.patch(url, data, {
        headers: this.getFacultyHeader(options),
      });
      logger.debug('patch response', response);
      this.handleResponse(response);
      return response;
    } catch (err) {
      this.handleError(err);
      return err;
    }
  }

  async facultyDelete(url: string, options?: any) {
    logger.debug('delete', url);
    try {
      const response = await axios.delete(url, {
        headers: this.getFacultyHeader(options),
      });
      logger.debug('delete response', response);
      return this.handleResponse(response);
    } catch (err) {
      this.handleError(err);
    }
  }

  // For Admin
  getAdminHeader(options?: any) {
    const header: any = {};

    if (options && options.headers) {
      Object.assign(header, options.headers);
    }

    if (options && options.external) {
      return header;
    }

    const token = AuthServices.getAdminToken();

    if (token) {
      header.authorization = `Bearer ${token}`;
    }

    return header;
  }

  async adminGet(url: string, options?: any) {
    logger.debug('get', url);
    try {
      const response = await axios.get(url, {
        headers: this.getAdminHeader(options),
      });

      logger.debug('get response', response);

      return this.handleResponse(response);
    } catch (err) {
      console.log(
        'NETWORK SERVICE GET ADMIN HEADER LOG',
        this.getAdminHeader(options)
      );
      this.handleError(err);
    }
  }

  async adminPost(url: string, data: any, options?: any) {
    logger.debug('post', url, data);
    try {
      const response = await axios.post(url, data, {
        headers: this.getAdminHeader(options),
      });
      logger.debug('post response', response);

      return this.handleResponse(response);
    } catch (err) {
      this.handleError(err);
    }
  }

  async adminPatch(url: string, data: any, options?: any) {
    logger.debug('patch', url, data);
    try {
      const response = await axios.patch(url, data, {
        headers: this.getAdminHeader(options),
      });
      logger.debug('patch response', response);
      this.handleResponse(response);
      return response;
    } catch (err) {
      this.handleError(err);
      return err;
    }
  }

  async adminDelete(url: string, options?: any) {
    logger.debug('delete', url);
    try {
      const response = await axios.delete(url, {
        headers: this.getAdminHeader(options),
      });
      logger.debug('delete response', response);
      return this.handleResponse(response);
    } catch (err) {
      this.handleError(err);
    }
  }
}

export default new NetworkService();
