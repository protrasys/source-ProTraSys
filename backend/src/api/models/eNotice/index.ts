// Importing Dependencies
import mongoose, { model } from 'mongoose';
import { schemaOptions } from '../SchemaOptions';

// Admin Model
const eNoticeSchema = new mongoose.Schema(
  {
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
    title: { type: mongoose.Schema.Types.String, required: true },
    image: { type: mongoose.Schema.Types.String },
    file: { type: mongoose.Schema.Types.String },
    description: { type: mongoose.Schema.Types.String, required: true },
  },
  schemaOptions
);

// Exporting eNotice Schema to a database
export default model('eNotice', eNoticeSchema);
