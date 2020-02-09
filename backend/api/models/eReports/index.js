// Importing Dependencies
const mongoose = require('mongoose');
const schmeaOptions = require('../SchemaOptions');

// Admin Model
const eReportSchema = new mongoose.Schema(
  {
    discussion: { type: mongoose.Schema.Types.String, required: true },
    feedback: { type: mongoose.Schema.Types.String },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
    projectGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'ProjectGroup' },
    status: { type: mongoose.Schema.Types.String, default: 'pending' }
  },
  schmeaOptions
);

// Exporting eReport Schema to a database
module.exports = mongoose.model('eReport', eReportSchema);
