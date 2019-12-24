// Importing Dependencies
const mongoose = require('mongoose');
const SchemaOptions = require('../SchemaOptions');

// Student Model
const StudentSchema = new mongoose.Schema(
  {
    name: { type: mongoose.Schema.Types.String, required: true },
    sem: { type: mongoose.Schema.Types.Number, required: true, maxlength: 1 },
    enrollmentId: {
      type: mongoose.Schema.Types.String,
      required: true,
      match: /([0-9]{4})+([A-Z]{3})+([0-9]{5})/g
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
  SchemaOptions
);

// Exporting Student Schema to a database
const temp = mongoose.model('Student', StudentSchema);

new temp({
  name: 'Manav',
  sem: 6,
  enrollmentId: '1720BCA04150',
  email: 'manavoza7@gmail.com',
  phone: 9662260013,
  password: 'admin@123'
});

temp.save();
