import Config from '../Config';
class LogServices {
  _key: any;
  _console: any;
  constructor(key: string) {
    this._key = key;
    if (Config.DEBUG) {
      this._console = console;
    } else {
      this._console = {
        error: () => undefined,
        info: () => undefined,
        log: () => undefined,
        warn: () => undefined,
        debug: () => undefined,
      };
    }
  }
  error(message: string, ...optionalParams: any) {
    this._console.log(`error${this._key}`, message, ...optionalParams);
  }
  info(message: string, ...optionalParams: any) {
    this._console.log(`info${this._key}`, message, ...optionalParams);
  }
  log(message: string, ...optionalParams: any) {
    this._console.log(`log${this._key}`, message, ...optionalParams);
  }
  warn(message: string, ...optionalParams: any) {
    this._console.warn(`warn${this._key}`, message, ...optionalParams);
  }
  debug(message: string, ...optionalParams: any) {
    this._console.log(`debug${this._key}`, message, ...optionalParams);
  }

  getInstance(key: string) {
    return new LogServices(`${this._key}:${key}`);
  }
}

export default new LogServices('app');
