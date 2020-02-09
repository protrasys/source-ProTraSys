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
      ref: 'Student',
      require: true
    },
    stu02: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      require: true
    },
    stu03: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      require: true
    },
    stu04: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      require: true
    },
    technology: { type: [mongoose.Schema.Types.String] },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
    teamLeader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      require: true
    },
    files: [
      {
        StudentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
        StudentName: { type: mongoose.Schema.Types.String, required: true },
        UploadedFile: { type: mongoose.Schema.Types.String, required: true },
        Description: { type: mongoose.Schema.Types.String },
        Date: { type: mongoose.Schema.Types.Date, default: Date.now }
      }
    ]
  },
  schmeaOptions
);

// Exporting Project Group Schema to a database
module.exports = mongoose.model('ProjectGroup', ProjectSchema);
