"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// Importing Dependencies
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const SchemaOptions_1 = require("../SchemaOptions");
// ProjectFile MOdel
const ProjectFileSchema = new mongoose_1.default.Schema({
    StudentID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Student' },
    projectGroup: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'ProjectGroup',
    },
    UploadedFile: { type: mongoose_1.default.Schema.Types.String, required: true },
    Description: { type: mongoose_1.default.Schema.Types.String },
    status: { type: mongoose_1.default.Schema.Types.String },
}, SchemaOptions_1.schemaOptions);
// Exporting Project File Schema to the Database
exports.default = mongoose_1.model('projectFile', ProjectFileSchema);
