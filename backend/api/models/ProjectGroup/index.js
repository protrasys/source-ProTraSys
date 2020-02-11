// Importing Dependencies
const mongoose = require('mongoose');
const schmeaOptions = require('../SchemaOptions');

// ProjectGroup Model
const ProjectSchema = new mongoose.Schema(
  {
    projectName: { type: mongoose.Schema.Types.String, required: true },
    definition: { type: mongoose.Schema.Types.String, required: true },
    stu01: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    stu02: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    stu03: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    stu04: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    technology: { type: [mongoose.Schema.Types.String] },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
    teamLeader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    }
  },
  schmeaOptions
);

// Exporting Project Group Schema to a database
module.exports = mongoose.model('ProjectGroup', ProjectSchema);
