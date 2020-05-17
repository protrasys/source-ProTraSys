"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const index_1 = require("./index");
const connectDB = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default
        .connect(index_1.databaseString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
        .then(() => {
        console.log('мongodв connecтed');
    })
        .catch((err) => {
        console.log('Opps! Something Went Wrong in the Database' + err);
    });
});
exports.default = connectDB;
