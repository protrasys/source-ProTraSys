// Importing Dependencies
import mongoose, { model } from 'mongoose';
import { schemaOptions } from '../SchemaOptions';

// Admin Model
const AdminSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.String,
      required: true,
      match: /[A]([0-9]{0,2})/, // it ensures the A01,A02,A03,A04 regex
      maxlength: 3,
    },
    name: { type: mongoose.Schema.Types.String, required: true },
    password: { type: mongoose.Schema.Types.String, required: true },
  },
  schemaOptions
);

// Exporting Admin Schema to a database
export default model('Admin', AdminSchema);
