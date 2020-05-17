"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// Importing Dependencies
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const SchemaOptions_1 = require("../SchemaOptions");
// Admin Model
const eReportSchema = new mongoose_1.default.Schema({
    discussion: { type: mongoose_1.default.Schema.Types.String, required: true },
    feedback: { type: mongoose_1.default.Schema.Types.String },
    faculty: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Faculty' },
    projectGroup: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'ProjectGroup' },
    status: { type: mongoose_1.default.Schema.Types.String, default: 'pending' },
}, SchemaOptions_1.schemaOptions);
// Exporting eReport Schema to a database
exports.default = mongoose_1.model('eReport', eReportSchema);
