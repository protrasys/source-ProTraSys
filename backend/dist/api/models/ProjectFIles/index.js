"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importing Dependencies
const mongoose_1 = require("mongoose");
const SchemaOptions_1 = require("../SchemaOptions");
// ProjectFile MOdel
const ProjectFileSchema = new mongoose_1.Schema({
    StudentID: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'Student' },
    projectGroup: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: 'ProjectGroup',
    },
    UploadedFile: { type: mongoose_1.SchemaTypes.String, required: true },
    Description: { type: mongoose_1.SchemaTypes.String },
    status: { type: mongoose_1.SchemaTypes.String, default: 'pending' },
}, SchemaOptions_1.schemaOptions);
// Exporting Project File Schema to the Database
exports.default = mongoose_1.model('projectFile', ProjectFileSchema);
