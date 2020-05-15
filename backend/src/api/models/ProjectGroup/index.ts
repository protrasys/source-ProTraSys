// Importing Dependencies
import mongoose, { model } from 'mongoose';
import { schemaOptions } from '../SchemaOptions';

// ProjectGroup Model
const ProjectSchema = new mongoose.Schema(
  {
    projectName: { type: mongoose.Schema.Types.String, required: true },
    projectFiles: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'projectFile',
    },
    definition: { type: mongoose.Schema.Types.String, required: true },
    stu01: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
    stu02: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
    stu03: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
    stu04: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
    technology: { type: [mongoose.Schema.Types.String] },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
    teamLeader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
  },
  schemaOptions
);

// Exporting Project Group Schema to a database
export default model('ProjectGroup', ProjectSchema);
