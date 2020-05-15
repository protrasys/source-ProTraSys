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
