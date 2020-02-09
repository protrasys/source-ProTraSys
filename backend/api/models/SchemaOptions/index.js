const schemaOptions = {
  minimize: false,
  writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 1000
  },
  versionKey: false,
  timestamps: true
};

module.exports = schemaOptions;
