"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// Importing Dependencies
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const SchemaOptions_1 = require("../SchemaOptions");
// Admin Model
const AdminSchema = new mongoose_1.default.Schema({
    _id: {
        type: mongoose_1.default.Schema.Types.String,
        required: true,
        match: /[A]([0-9]{0,2})/,
        maxlength: 3,
    },
    name: { type: mongoose_1.default.Schema.Types.String, required: true },
    password: { type: mongoose_1.default.Schema.Types.String, required: true },
}, SchemaOptions_1.schemaOptions);
// Exporting Admin Schema to a database
exports.default = mongoose_1.model('Admin', AdminSchema);
