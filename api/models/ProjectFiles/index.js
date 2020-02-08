const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Importing Dependencies
const mongoose = require('mongoose');

// ProjectGroup Model
const fileSchema = new mongoose.Schema(
  {
    files: {
      StudentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
      StudentName: { type: mongoose.Schema.Types.String, required: true },
      UploadedFile: { type: mongoose.Schema.Types.String, required: true },
      Description: { type: mongoose.Schema.Types.String },
      Date: { type: mongoose.Schema.Types.Date, default: Date.now },
      status: { type: mongoose.Schema.Types.String, default: 'pending' }
    }
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

fileSchema.index({ name: 1, type: -1 }); // Schema Level

// Exporting Project Group Schema to a database
module.exports = mongoose.model('fileSchema', fileSchema);
