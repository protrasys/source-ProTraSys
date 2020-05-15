"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing Dependencies
const Student_1 = __importDefault(require("../models/Student"));
const eNotice_1 = __importDefault(require("../models/eNotice"));
const eReports_1 = __importDefault(require("../models/eReports"));
const ProjectGroup_1 = __importDefault(require("../models/ProjectGroup"));
const ProjectFIles_1 = __importDefault(require("../models/ProjectFIles"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = require("../../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.GetIndividualStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield Student_1.default.findById(req.student.id)
            .select('-password')
            .populate('projectGroupId')
            .exec();
        const projectGroup = yield ProjectGroup_1.default.findById(student.projectGroupId._id).populate('stu01 stu02 stu03 stu04 teamLeader faculty');
        if (!student) {
            return res.status(404).json({
                msg: 'No Student Record Found',
            });
        }
        res.status(200).json({ student, group: projectGroup });
    }
    catch (err) {
        res.status(500).json({
            error: err,
        });
    }
});
exports.PostStudentLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { enrollmentId, password } = req.body;
    try {
        // See if student exists or not
        const student = yield Student_1.default.findOne({ enrollmentId: enrollmentId });
        // Check if student not found
        if (!student) {
            return res.status(400).json({
                msg: 'Invalid Credentials',
            });
        }
        // Lets match given password with students password (from database)
        const isCorrect = yield bcryptjs_1.default.compare(password, student.password);
        // Check is password is not valid
        if (!isCorrect) {
            return res.status(400).json({
                msg: 'Invalid Credentials',
            });
        }
        // Sending Student id in Payload
        const payload = {
            student: {
                id: student.id,
            },
        };
        // return json web token to frontend
        jsonwebtoken_1.default.sign(payload, config_1.jwtSecret, { expiresIn: '24h' }, (err, token) => {
            if (!err) {
                return res.json({
                    msg: `${student.name}, Welcome Back 😉`,
                    token,
                    student,
                });
            }
            throw err;
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Internal Server Error',
            description: err,
        });
    }
});
exports.PostUploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params.projectId;
    const { UploadedFile, Description } = req.body;
    try {
        const projectGroup = yield ProjectGroup_1.default.findOne({ _id: projectId });
        if (!projectGroup) {
            return res.status(400).json({
                msg: 'No Project Group Found',
            });
        }
        yield new ProjectFIles_1.default({
            StudentID: req.student.id,
            projectGroup: projectId,
            UploadedFile: UploadedFile,
            Description: Description,
        })
            .save()
            .then((result) => __awaiter(void 0, void 0, void 0, function* () {
            yield ProjectGroup_1.default.findOneAndUpdate({ _id: projectId }, {
                $set: {
                    projectFiles: result._id,
                },
            }, { new: true });
            res.status(200).json({
                msg: 'File Uploaded...',
                result,
            });
        }))
            .catch((err) => {
            res.status(403).json({
                msg: 'Opps! Something Went Wrong... Please try after few moments',
                err: err,
            });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            err: err,
        });
    }
});
exports.GetViewNotice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield eNotice_1.default
            .find()
            .populate('faculty', 'name')
            .exec()
            .then((result) => {
            if (result.length > 0) {
                return res.status(200).json({
                    eNotice: result,
                });
            }
            else {
                return res.status(404).json({
                    message: 'No more eNotice, Kindly visit sometimes later',
                });
            }
        })
            .catch((err) => {
            res.status(401).json({
                message: 'Something went wrong, Please try again later',
                desc: err,
            });
        });
    }
    catch (err) {
        console.log('GET STUDENT E-NOTICE ROUTE ERROR', err);
        res.status(500).json({
            error: 'Internal Server Error',
            desc: err,
        });
    }
});
exports.GetEReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId } = req.params;
    try {
        const response = yield eReports_1.default.find({ projectGroup: groupId });
        if (response.length <= 0) {
            return res.status(404).json({
                error: 'There is No reporting done yet from your Group...',
            });
        }
        res.status(200).json({
            data: response,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
});
exports.GetUploadedProjectFileByMyGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId } = req.params;
    try {
        const response = yield ProjectFIles_1.default.find({ projectGroup: groupId });
        if (response.length <= 0) {
            return res.status(404).json({
                error: 'There is No File uploaded yet from your Group...',
            });
        }
        res.status(200).json({
            data: response,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
});
