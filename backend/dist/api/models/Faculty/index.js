"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// Importing Dependencies
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const SchemaOptions_1 = require("../SchemaOptions");
// Faculty Model
const FacultySchema = new mongoose_1.default.Schema({
    name: { type: mongoose_1.default.Schema.Types.String, required: true },
    date: {
        from: {
            type: mongoose_1.default.Schema.Types.Date,
            required: true,
        },
    },
    profile: {
        type: mongoose_1.default.Schema.Types.String,
    },
    email: {
        type: mongoose_1.default.Schema.Types.String,
        required: true,
        unique: true,
        match: /^([a-z0-9\.-]+)@([a-z0-9-]+).([a-z]{2,8}).([a-z]{2,8})/,
    },
    phone: {
        type: mongoose_1.default.Schema.Types.Number,
        required: true,
        maxlength: 10,
    },
    enrollmentId: {
        type: mongoose_1.default.Schema.Types.String,
        required: true,
    },
    designation: {
        type: mongoose_1.default.Schema.Types.String,
        required: true,
    },
    skills: {
        type: [mongoose_1.default.Schema.Types.String],
    },
    password: { type: mongoose_1.default.Schema.Types.String, required: true },
}, SchemaOptions_1.schemaOptions);
// Exporting Faculty Schema to a database
exports.default = mongoose_1.model('Faculty', FacultySchema);
