export const schema = {
  minimize: false,
  writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 1000
  },
  skipVersioning: { dontVersionMe: true },
  timestamps: true
};
