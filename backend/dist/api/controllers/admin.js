"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// Importing Dependencies
const Admin_1 = tslib_1.__importDefault(require("../models/Admin"));
const eNotice_1 = tslib_1.__importDefault(require("../models/eNotice"));
const eReports_1 = tslib_1.__importDefault(require("../models/eReports"));
const Faculty_1 = tslib_1.__importDefault(require("../models/Faculty"));
const Student_1 = tslib_1.__importDefault(require("../models/Student"));
const ProjectGroup_1 = tslib_1.__importDefault(require("../models/ProjectGroup"));
const ProjectFIles_1 = tslib_1.__importDefault(require("../models/ProjectFIles"));
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const config_1 = require("../../config");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
exports.PostAddNewFaculty = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { name, from, profile, enrollmentId, email, phone, designation, skills, password, } = req.body;
    try {
        // See if Faculty already exists with same enrollment ID
        let faculty = yield Faculty_1.default.findOne({ enrollmentId: enrollmentId });
        if (faculty) {
            return res.status(400).json({
                msg: 'Faculty already exists with same enrollment ID',
            });
        }
        // Encrypting Password using Bcrypt
        var salt = bcryptjs_1.default.genSaltSync(10);
        var encryptedPassword = bcryptjs_1.default.hashSync(password, salt);
        faculty = new Faculty_1.default({
            name,
            date: {
                from,
            },
            profile,
            enrollmentId,
            email,
            phone,
            designation,
            skills: skills.split(',').map((skill) => skill.trim()),
            password: encryptedPassword,
        });
        yield faculty.save();
        const payload = {
            faculty: {
                id: faculty.id,
            },
        };
        jsonwebtoken_1.default.sign(payload, config_1.jwtSecret, { expiresIn: '24h' }, (err, token) => {
            if (err)
                throw err;
            res.status(200).json({
                msg: `${faculty.name}, You are welcome to the ProTraSys Family !🙏`,
                token,
            });
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            Error: err.errmsg || err.message,
        });
    }
});
exports.PostAddNewAdmin = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { AID, name, password } = req.body;
    try {
        // check if an admin already exists
        let admin = yield Admin_1.default.findOne({ _id: AID });
        if (admin) {
            return res.status(400).json({
                msg: `Admin already exists with same ${AID}`,
            });
        }
        // hash current admin password
        const salt = bcryptjs_1.default.genSaltSync(10);
        const encryptedPassword = bcryptjs_1.default.hashSync(password, salt);
        // Sending data to an object
        admin = new Admin_1.default({
            _id: AID,
            name,
            password: encryptedPassword,
        });
        // Creating Payload for frontend
        const payload = {
            admin: {
                id: admin.id,
            },
        };
        admin
            .save()
            .then(() => {
            // returning jwt
            jsonwebtoken_1.default.sign(payload, config_1.jwtSecret, { expiresIn: '24h' }, (err, token) => {
                if (err) {
                    throw err;
                }
                else {
                    return res.status(200).json({
                        msg: `${admin.name}, You are welcome to the ProTraSys Family !🙏`,
                        token,
                    });
                }
            });
        })
            .catch((mongoErr) => {
            return res.status(500).json({
                err: mongoErr.message,
            });
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            Error: err.errmsg || err.message,
        });
    }
});
exports.PostAdminLogin = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { AID, password } = req.body;
    try {
        // Lets FInd the Admin first
        const admin = yield Admin_1.default.findOne({ _id: AID });
        // If Admin does not found
        if (!admin) {
            return res.status(400).json({
                error: 'Invalid Credentials',
            });
        }
        // Now match the password
        const isCorrect = yield bcryptjs_1.default.compare(password, admin.password);
        if (!isCorrect) {
            return res.status(400).json({
                error: 'Invalid Credentials',
            });
        }
        // Sending Admin id in Payload
        const payload = {
            admin: {
                id: admin.id,
            },
        };
        // return json web token to frontend
        jsonwebtoken_1.default.sign(payload, config_1.jwtSecret, { expiresIn: '24h' }, (err, token) => {
            if (!err) {
                return res.json({
                    msg: `${admin.name}, Welcome Back 😉`,
                    token,
                });
            }
            throw err;
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.errmsg || err.message,
        });
    }
});
exports.GetIndividualAdmin = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield Admin_1.default.findById(req.admin.id).select('-password');
        res.status(200).json(admin);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message,
        });
    }
});
exports.GetAllAdmins = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield Admin_1.default.find().select('-password');
        // Check is no admin found
        if (admins.length === 0) {
            return res.status(400).json({
                msg: 'No More Admins Found',
            });
        }
        res.status(200).json(admins);
    }
    catch (err) {
        res.status(500).json({
            error: err,
        });
    }
});
exports.DeleteFaculty = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        // Check if Faculty exists with same id
        let faculty = yield Faculty_1.default.findById(id);
        if (!faculty) {
            return res.status(400).json({
                msg: 'No Faculty Found',
            });
        }
        yield Faculty_1.default.deleteOne({ _id: id });
        res.status(200).json({
            msg: 'Faculty Removed',
        });
    }
    catch (err) {
        res.status(500).json({
            err: err,
        });
    }
});
exports.DeleteStudent = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        // Check if Student exists with same id
        let student = yield Student_1.default.findById(id);
        if (!student) {
            return res.status(400).json({
                msg: 'No Student Found',
            });
        }
        yield Student_1.default.deleteOne({ _id: id });
        res.status(200).json({
            msg: 'Student Removed',
        });
    }
    catch (err) {
        res.status(500).json({
            err: err,
        });
    }
});
exports.DeleteProjectGroup = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield ProjectGroup_1.default.deleteOne({ _id: id })
            .exec()
            .then((result) => {
            if (result.deletedCount > 0) {
                return res.status(200).json({
                    msg: 'Deleted Successfully',
                });
            }
            else {
                return res.status(400).json({
                    msg: 'No Project Group Found to Delete',
                });
            }
        })
            .catch((err) => {
            console.log(err);
            return res.status(400).json({
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
exports.DeleteENotice = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const noticeId = req.params.noticeId;
    try {
        yield eNotice_1.default
            .deleteOne({ _id: noticeId })
            .exec()
            .then((result) => {
            if (result.deletedCount > 0) {
                return res.status(200).json({
                    msg: 'Deleted Successfully',
                });
            }
            else {
                return res.status(400).json({
                    msg: 'No eNotice Found to Delete',
                });
            }
        })
            .catch((err) => {
            console.log(err);
            return res.status(400).json({
                err: err,
            });
        });
    }
    catch (err) {
        console.log('DELETE ADMIN E-NOTICE ROUTE ERROR', err);
        res.status(500).json({
            error: 'Internal Server Error',
            desc: err,
        });
    }
});
exports.countAllDocuments = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const allStu = yield Student_1.default.countDocuments();
        const allFac = yield Faculty_1.default.countDocuments();
        const allENotices = yield eNotice_1.default.countDocuments();
        const allEReports = yield eReports_1.default.countDocuments();
        const allProjectFiles = yield ProjectFIles_1.default.countDocuments();
        const allProjectGroups = yield ProjectGroup_1.default.countDocuments();
        const allAdmins = yield Admin_1.default.countDocuments();
        res.json({
            allAdmins,
            allENotices,
            allEReports,
            allFac,
            allStu,
            allProjectGroups,
            allProjectFiles,
        });
    }
    catch (err) {
        console.log('GET ADMIN COUNTALLDOCUMENTS ROUTE ERROR', err);
        res.status(500).json({
            error: 'Internal Server Error',
            desc: err,
        });
    }
});
exports.getAllData = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const Students = yield Student_1.default.find();
        const Faculties = yield Faculty_1.default.find();
        const ENotices = yield eNotice_1.default.find();
        const EReports = yield eReports_1.default.find();
        const ProjectFiles = yield ProjectFIles_1.default.find();
        const ProjectGroups = yield ProjectGroup_1.default.find();
        res.json({
            ENotices,
            EReports,
            Faculties,
            Students,
            ProjectGroups,
            ProjectFiles,
        });
    }
    catch (err) {
        console.log('GET ALL ADMIN DATA BACKEND ERROR', err);
        res.status(500).json({
            error: 'Internal Server Error',
            desc: err,
        });
    }
});
