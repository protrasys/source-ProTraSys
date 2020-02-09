// Importing Dependencies
const mongoose = require('mongoose');
const schmeaOptions = require('../SchemaOptions');

// Admin Model
const AdminSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.String,
      required: true,
      match: /[A]([0-9]{0,2})/, // it ensures the A01,A02,A03,A04 regex
      maxlength: 3
    },
    name: { type: mongoose.Schema.Types.String, required: true },
    password: { type: mongoose.Schema.Types.String, required: true }
  },
  schmeaOptions
);

// Exporting Admin Schema to a database
module.exports = mongoose.model('Admin', AdminSchema);
