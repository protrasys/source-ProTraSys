// Importing Dependencies
import mongoose, { model } from 'mongoose';
import { schemaOptions } from '../SchemaOptions';

// ProjectFile MOdel
const ProjectFileSchema = new mongoose.Schema(
  {
    StudentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    projectGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProjectGroup',
    },
    UploadedFile: { type: mongoose.Schema.Types.String, required: true },
    Description: { type: mongoose.Schema.Types.String },
    status: { type: mongoose.Schema.Types.String },
  },
  schemaOptions
);

// Exporting Project File Schema to the Database
export default model('projectFile', ProjectFileSchema);
