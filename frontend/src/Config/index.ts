const config = {
  get SERVER_URL() {
    return process.env.REACT_APP_SERVER_URL;
  },
  get DEBUG() {
    return process.env.NODE_ENV !== 'production';
  },
  get NODE_ENV() {
    return process.env.NODE_ENV;
  }
};

export default config;
