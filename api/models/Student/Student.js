// Importing Dependencies
const mongoose = require('mongoose');

// Student Model
const StudentSchema = new mongoose.Schema(
  {
    name: { type: mongoose.Schema.Types.String, required: true },
    sem: { type: mongoose.Schema.Types.Number, required: true, maxlength: 1 },
    enrollmentId: {
      type: mongoose.Schema.Types.String,
      required: true
      // match: /([0-9]{4})+([A-Z]{3})+([0-9]{5})/g    // Put this at frontend
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
      match: /^([a-z0-9\.-]+)@([a-z0-9-]+).([a-z]{2,8}).([a-z]{2,8})/
    },
    phone: {
      type: mongoose.Schema.Types.Number,
      required: true,
      maxlength: 10
    },
    password: { type: mongoose.Schema.Types.String, required: true }
  },
  {
    minimize: false,
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000
    },
    versionKey: false
  }
);

StudentSchema.index({ name: 1, type: -1 }); // Schema Level

// Exporting Student Schema to a database
module.exports = mongoose.model('Student', StudentSchema);
