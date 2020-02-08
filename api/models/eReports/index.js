// Importing Dependencies
const mongoose = require('mongoose');

// Admin Model
const eReportSchema = new mongoose.Schema(
  {
    discussion: { type: [mongoose.Schema.Types.String], required: true },
    feedback: { type: [mongoose.Schema.Types.String] },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
    projectGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'ProjectGroup' },
    status: { type: mongoose.Schema.Types.String, default: 'pending' }
  },
  {
    minimize: false,
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000
    },
    versionKey: false,
    timestamps: true
  }
);

// Exporting eReport Schema to a database
module.exports = mongoose.model('eReport', eReportSchema);
