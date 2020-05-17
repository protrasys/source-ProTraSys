"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// Importing Dependencies
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const SchemaOptions_1 = require("../SchemaOptions");
// ProjectGroup Model
const ProjectSchema = new mongoose_1.default.Schema({
    projectName: { type: mongoose_1.default.Schema.Types.String, required: true },
    projectFiles: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: 'projectFile',
    },
    definition: { type: mongoose_1.default.Schema.Types.String, required: true },
    stu01: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Student',
    },
    stu02: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Student',
    },
    stu03: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Student',
    },
    stu04: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Student',
    },
    technology: { type: [mongoose_1.default.Schema.Types.String] },
    faculty: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Faculty' },
    teamLeader: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Student',
    },
}, SchemaOptions_1.schemaOptions);
// Exporting Project Group Schema to a database
exports.default = mongoose_1.model('ProjectGroup', ProjectSchema);
