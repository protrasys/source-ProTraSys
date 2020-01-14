// Importing Dependencies
const mongoose = require('mongoose');

// ProjectGroup Model
const ProjectSchema = new mongoose.Schema(
  {
    projectName: { type: mongoose.Schema.Types.String, required: true },
    definition: { type: mongoose.Schema.Types.String, required: true },
    stu01: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    stu02: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    stu03: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    stu04: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    technology: { type: [mongoose.Schema.Types.String] },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
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

ProjectSchema.index({ name: 1, type: -1 }); // Schema Level

// Exporting Project Group Schema to a database
module.exports = mongoose.model('ProjectGroup', ProjectSchema);
