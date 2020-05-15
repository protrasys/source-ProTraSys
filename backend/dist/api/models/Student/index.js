"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing Dependencies
const mongoose_1 = __importStar(require("mongoose"));
const SchemaOptions_1 = require("../SchemaOptions");
// Student Model
const StudentSchema = new mongoose_1.default.Schema({
    name: { type: mongoose_1.default.Schema.Types.String, required: true },
    sem: { type: mongoose_1.default.Schema.Types.Number, required: true, maxlength: 1 },
    enrollmentId: {
        type: mongoose_1.default.Schema.Types.String,
        required: true,
        unique: true,
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
    password: { type: mongoose_1.default.Schema.Types.String, required: true },
    projectGroupId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'ProjectGroup',
    },
}, SchemaOptions_1.schemaOptions);
// Exporting Student Schema to a database
exports.default = mongoose_1.model('Student', StudentSchema);
