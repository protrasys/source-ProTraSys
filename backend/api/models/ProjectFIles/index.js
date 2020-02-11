// Importing Dependencies
const mongoose = require('mongoose');
const schemaOptions = require('../SchemaOptions');

// ProjectFile MOdel
const ProjectFileSchema = new mongoose.Schema(
  {
    StudentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    projectGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProjectGroup'
    },
    UploadedFile: { type: mongoose.Schema.Types.String, required: true },
    Description: { type: mongoose.Schema.Types.String },
    status: { type: mongoose.Schema.Types.String, default: 'pending' }
  },
  schemaOptions
);

// Exporting Project File Schema to the Database
module.exports = mongoose.model('projectFile', ProjectFileSchema);
