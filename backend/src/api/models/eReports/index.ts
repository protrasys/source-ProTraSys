// Importing Dependencies
import mongoose, { model } from 'mongoose';
import { schemaOptions } from '../SchemaOptions';

// Admin Model
const eReportSchema = new mongoose.Schema(
  {
    discussion: { type: mongoose.Schema.Types.String, required: true },
    feedback: { type: mongoose.Schema.Types.String },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
    projectGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'ProjectGroup' },
    status: { type: mongoose.Schema.Types.String, default: 'pending' },
  },
  schemaOptions
);

// Exporting eReport Schema to a database
export default model('eReport', eReportSchema);
