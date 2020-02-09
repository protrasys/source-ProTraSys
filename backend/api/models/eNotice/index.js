// Importing Dependencies
const mongoose = require('mongoose');

// Admin Model
const eNoticeSchema = new mongoose.Schema(
  {
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
    title: { type: mongoose.Schema.Types.String, required: true },
    image: { type: mongoose.Schema.Types.String },
    file: { type: mongoose.Schema.Types.String },
    description: { type: mongoose.Schema.Types.String, required: true }
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

// Exporting eNotice Schema to a database
module.exports = mongoose.model('eNotice', eNoticeSchema);
