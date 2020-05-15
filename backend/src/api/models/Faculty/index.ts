// Importing Dependencies
import mongoose, { model } from 'mongoose';
import { schemaOptions } from '../SchemaOptions';

// Faculty Model
const FacultySchema = new mongoose.Schema(
  {
    name: { type: mongoose.Schema.Types.String, required: true },
    date: {
      from: {
        type: mongoose.Schema.Types.Date,
        required: true,
      },
    },
    profile: {
      type: mongoose.Schema.Types.String,
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
      match: /^([a-z0-9\.-]+)@([a-z0-9-]+).([a-z]{2,8}).([a-z]{2,8})/,
    },
    phone: {
      type: mongoose.Schema.Types.Number,
      required: true,
      maxlength: 10,
    },
    enrollmentId: {
      type: mongoose.Schema.Types.String,
      required: true,
      // match: /([0-9]{4})+([A-Z]{3})+([0-9]{5})/g    // Put this at frontend
    },
    designation: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    skills: {
      type: [mongoose.Schema.Types.String],
    },
    password: { type: mongoose.Schema.Types.String, required: true },
  },
  schemaOptions
);

// Exporting Faculty Schema to a database
export default model('Faculty', FacultySchema);
