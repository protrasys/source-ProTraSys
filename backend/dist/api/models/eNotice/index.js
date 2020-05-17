"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// Importing Dependencies
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const SchemaOptions_1 = require("../SchemaOptions");
// Admin Model
const eNoticeSchema = new mongoose_1.default.Schema({
    faculty: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Faculty' },
    title: { type: mongoose_1.default.Schema.Types.String, required: true },
    image: { type: mongoose_1.default.Schema.Types.String },
    file: { type: mongoose_1.default.Schema.Types.String },
    description: { type: mongoose_1.default.Schema.Types.String, required: true },
}, SchemaOptions_1.schemaOptions);
// Exporting eNotice Schema to a database
exports.default = mongoose_1.model('eNotice', eNoticeSchema);
