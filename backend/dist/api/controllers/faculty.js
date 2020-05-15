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
const Faculty_1 = __importDefault(require("../models/Faculty"));
const Student_1 = __importDefault(require("../models/Student"));
const eNotice_1 = __importDefault(require("../models/eNotice"));
const eReports_1 = __importDefault(require("../models/eReports"));
const ProjectGroup_1 = __importDefault(require("../models/ProjectGroup"));
const ProjectFiles_1 = __importDefault(require("../models/ProjectFiles"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = require("../../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.GetAllFaculty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faculties = yield Faculty_1.default.find().select('-password');
        if (faculties.length === 0) {
            return res.status(404).json({
                error: 'No Faculties were found in our record !',
            });
        }
        res.status(200).json(faculties);
    }
    catch (err) {
        res.status(500).json({
            error: err,
        });
    }
});
exports.PostFacultyLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { enrollmentId, password } = req.body;
    try {
        // See if faculty exists or not
        const faculty = yield Faculty_1.default.findOne({ enrollmentId: enrollmentId });
        // Check if faculty not found
        if (!faculty) {
            return res.status(400).json({
                msg: 'Invalid Credentials',
            });
        }
        // Lets match given password with faculty password (from database)
        const isCorrect = yield bcryptjs_1.default.compare(password, faculty.password);
        // Check is password is not valid
        if (!isCorrect) {
            return res.status(400).json({
                msg: 'Invalid Credentials',
            });
        }
        // Sending faculty id in Payload
        const payload = {
            faculty: {
                id: faculty.id,
            },
        };
        // return json web token to frontend
        jsonwebtoken_1.default.sign(payload, config_1.jwtSecret, { expiresIn: '24h' }, (err, token) => {
            if (!err) {
                return res.json(token);
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
exports.GetIndividualFaculty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faculty = yield Faculty_1.default.findById(req.faculty.id).select('-password');
        res.status(200).json(faculty);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message,
        });
    }
});
exports.PostAddNewProjectGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectName, definition, stu01, stu02, stu03, stu04, technology, teamLeader, } = req.body;
    try {
        let faculty = yield Faculty_1.default.findById(req.faculty.id).select('-password');
        let projectGroup = new ProjectGroup_1.default({
            projectName,
            definition,
            stu01,
            stu02,
            stu03,
            stu04,
            teamLeader,
            technology: technology.split(',').map((tech) => tech.trim()),
            faculty: faculty.id,
        });
        yield Student_1.default.findOneAndUpdate({ _id: stu01 }, {
            $set: {
                projectGroupId: projectGroup._id,
            },
        }, { new: true });
        yield Student_1.default.findOneAndUpdate({ _id: stu02 }, {
            $set: {
                projectGroupId: projectGroup._id,
            },
        }, { new: true });
        yield Student_1.default.findOneAndUpdate({ _id: stu03 }, {
            $set: {
                projectGroupId: projectGroup._id,
            },
        }, { new: true });
        yield Student_1.default.findOneAndUpdate({ _id: stu04 }, {
            $set: {
                projectGroupId: projectGroup._id,
            },
        }, { new: true });
        yield projectGroup.save();
        res.status(200).json({
            msg: `Hello~ ${faculty.name}, Your Group : ${projectName} is now added Successfully`,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    }
});
exports.GetAllProjectGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectGroups = yield ProjectGroup_1.default.find().populate('stu01 stu02 stu03 stu04 teamLeader faculty', '-password');
        // check if projectGroup available or not
        if (projectGroups.length === 0) {
            return res.status(400).json({
                msg: 'No ProjectGroups Records Found!',
            });
        }
        res.status(200).json({
            data: projectGroups,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    }
});
exports.GetIndiividualFacultyAllProjectGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faculty = yield Faculty_1.default.findOne({ _id: req.faculty.id });
        const myProjectGroups = yield ProjectGroup_1.default.find({
            faculty: req.faculty.id,
        }).populate('stu01 stu02 stu03 stu04 teamLeader faculty', '-password');
        if (!myProjectGroups) {
            return res.status(400).json({
                msg: `Sorry, ${faculty.name} you have no project groups`,
            });
        }
        res.status(200).json({
            data: myProjectGroups,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    }
});
exports.GetIndividualProjectGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const faculty = yield Faculty_1.default.findOne({ _id: req.faculty.id });
        const projectGroup = yield ProjectGroup_1.default.findOne({ _id: id }).populate('faculty stu01 stu02 stu03 stu04 teamLeader', 'name profile sem enrollmentId email phone');
        if (!projectGroup) {
            return res.status(400).json({
                msg: `Hey ${faculty.name}, You have no Project Group found with this ID`,
            });
        }
        res.status(200).json(projectGroup);
    }
    catch (err) {
        console.log(err);
        res.status(200).json({
            err: err,
        });
    }
});
exports.DeleteProjectGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.DeleteProjectFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileID = req.params.fileID;
    try {
        const projectFIle = yield ProjectFiles_1.default.findOne({ _id: fileID });
        const groupId = projectFIle.projectGroup;
        const projectGroup = yield ProjectGroup_1.default.findOne({ _id: groupId });
        // If no such file found to delete
        if (!projectFIle) {
            return res.status(400).json({
                msg: 'No Such File found to delete',
            });
        }
        // Check if Faculty is Authorized or not
        if (projectGroup.faculty.toString() !== req.faculty.id) {
            return res.status(401).json({
                msg: 'Faculty Unauthorized',
            });
        }
        yield ProjectFiles_1.default.deleteOne({ _id: fileID })
            .exec()
            .then((result) => {
            if (result.deletedCount > 0) {
                return res.status(200).json({
                    msg: 'Deleted Successfully',
                });
            }
            else {
                return res.status(400).json({
                    msg: 'No Project File Found to Delete',
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
        res.status(500).json(err);
    }
});
exports.GetStudentsUploadedFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileID = req.params.fileID;
    try {
        const projectFile = yield ProjectFiles_1.default.find({ _id: fileID });
        if (!projectFile) {
            return res.status(404).json({
                msg: 'No Such File Found to View',
            });
        }
        res.json(projectFile);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
exports.PostUploadENotice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    try {
        yield new eNotice_1.default({
            faculty: req.faculty.id,
            title,
            description,
        })
            .save()
            .then((result) => {
            res.status(200).json({
                msg: 'Notice is added !',
            });
        })
            .catch((err) => {
            res.status(401).json({
                msg: err,
            });
        });
    }
    catch (err) {
        console.log('POST FACULTY E-NOTICE ROUTE ERROR', err);
        res.status(500).json({
            error: err,
        });
    }
});
exports.PostGenerateEReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { feedback, status } = req.body;
    const { filesId } = req.params;
    try {
        const projectFIle = yield ProjectFiles_1.default.findOne({ _id: filesId });
        const projectGroup = yield ProjectGroup_1.default.findOne({
            _id: projectFIle.projectGroup,
        });
        // Check if Faculty is Authorized or not
        if (projectGroup.faculty.toString() !== req.faculty.id) {
            return res.status(401).json({
                error: 'Faculty Unauthorized',
            });
        }
        yield ProjectFiles_1.default.findOneAndUpdate({ _id: filesId }, {
            $set: {
                status,
            },
        }, { new: true });
        const newReport = yield new eReports_1.default({
            discussion: projectFIle.Description,
            file: projectFIle.UploadedFile,
            feedback,
            faculty: req.faculty.id,
            projectGroup: projectFIle.projectGroup,
            status,
        });
        if (!newReport) {
            return res.status(401).json({
                error: 'Something went wrong, Please try again later',
            });
        }
        const faculty = yield Faculty_1.default.findOne({ _id: req.faculty.id });
        const facultyEmail = faculty.email;
        const stu01 = yield Student_1.default.findOne({ _id: projectGroup.stu01 });
        const stu01Email = stu01.email;
        const stu02 = yield Student_1.default.findOne({ _id: projectGroup.stu02 });
        const stu02Email = stu02.email;
        const stu03 = yield Student_1.default.findOne({ _id: projectGroup.stu03 });
        const stu03Email = stu03.email;
        const stu04 = yield Student_1.default.findOne({ _id: projectGroup.stu04 });
        const stu04Email = stu04.email;
        // This will create date as dd/mm/yyyy when report is generated
        const cDate = new Date().getDate();
        const cMonth = new Date().getMonth() + 1;
        const cYear = new Date().getFullYear();
        const FullDate = `${cDate}/${cMonth}/${cYear}`;
        // Code to send email to the above users (Faculty and Students)
        const output = `
          <div class="main" style="text-align: center; font-size: 1.3rem; font-family: Operator SSm; font-style: italic; width: 95%; border: 0.2rem solid black; border-bottom-right-radius: 4rem; border-top-left-radius: 4rem;">
              <div class="header" style="background-color: teal; padding: 1rem; color: aliceblue; border-top-left-radius: 4rem;">
                  Your Report Card
              </div>
              <hr style="border: 1rem solid rgb(104, 214, 159); border-top-right-radius: 90%;">
              <div class="content" style="margin-top: -3.5rem;">
                  <h3>: Message :</h3>
                  <p>Today We have Discusses about :- ${projectFIle.Description} </p> </br>
              </div>
              <hr style="border: 1rem solid rgb(104, 214, 159); border-top-left-radius: 90%;">
              <div class="feedback" style="margin-top: -3rem;">
                  <p>Faculty Feedback</p>
                  <h5>${newReport.feedback}</h5>
              </div>
          </div>
        `;
        const outputForFaculty = `
              <table style="padding: .2rem; user-select: none; background-color: lightgoldenrodyellow; border-radius: 5%;" cellpadding='20' cellspacing='0' align="center" width='80%' >
                  <thead   style="font-family: Operator SSm; font-style: italic; text-align: center;">
                      <td colspan="4">E-Report Project Tracking System</td>
                  </thead>
                  <tr style="background-color: darkslateblue; color: white;">
                      <th>Date</th>
                      <th>Discussion</th>
                      <th>Feedback</th>
                      <th>Uploads</th>
                  </tr>
                  <tbody  style="font-family: verdana;">
                      <tr>
                          <td align="center"> ${FullDate} </td>
                          <td> ${projectFIle.Description} </td>
                          <td> ${newReport.feedback} </td>
                          <td> <a href="${projectFIle.UploadedFile}" target="_blank" >View File</a> </td>
                      </tr>
                      <tr style="font-family: Operator SSm; font-style: bold;color:wheat; text-align: right; font-size: .8rem;">
                          <td colspan="4">
                              Contact Admin For any Query or Complain regarding e-report </br>
                              &copy; ProTraSys
                          </td>
                      </tr>
                  </tbody>
              </table>
          `;
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'badboysecurities@gmail.com',
                pass: 'LaW6rXvMANAVEguCHOZAB2V',
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        // send mail with defined transport object
        if (stu01Email !== 'undefined') {
            yield transporter.sendMail({
                from: `"Pro-Tra-Sys Team 🔖" <bhaainichaal@yahoo.in>`,
                to: stu01Email,
                subject: `${stu01.name}, Grand Project Report Card : ${FullDate}`,
                html: output,
            });
        }
        if (stu02Email !== 'undefined') {
            yield transporter.sendMail({
                from: `"Pro-Tra-Sys Team 🔖" <bhaainichaal@yahoo.in>`,
                to: stu02Email,
                subject: `${stu02.name}, Grand Project Report Card : ${FullDate}`,
                html: output,
            });
        }
        if (stu03Email !== 'undefined') {
            yield transporter.sendMail({
                from: `"Pro-Tra-Sys Team 🔖" <bhaainichaal@yahoo.in>`,
                to: stu03Email,
                subject: `${stu03.name}, Grand Project Report Card : ${FullDate}`,
                html: output,
            });
        }
        if (stu04Email !== 'undefined') {
            yield transporter.sendMail({
                from: `"Pro-Tra-Sys Team 🔖" <bhaainichaal@yahoo.in>`,
                to: stu04Email,
                subject: `${stu04.name}, Grand Project Report Card : ${FullDate}`,
                html: output,
            });
        }
        if (facultyEmail !== 'undefined') {
            yield transporter.sendMail({
                from: `"Pro-Tra-Sys Team 🔖" <bhaainichaal@yahoo.in>`,
                to: `${faculty.email}`,
                subject: ` Hello, ${faculty.name}, Grand Project Report Card : ${FullDate}`,
                html: outputForFaculty,
            });
        }
        res.status(200).json({
            message: 'Report Generated and sent to the Students Mail',
            notice: newReport,
        });
        yield newReport.save();
    }
    catch (err) {
        console.log('POST FACULTY E-REPORT ROUTE ERROR', err);
        res.status(500).json({
            error: 'Internal Server Error',
            desc: err,
        });
    }
});
exports.PostAddNewStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, sem, enrollmentId, email, phone, password } = req.body;
    // Encrypting Password using Bcrypt
    var salt = bcryptjs_1.default.genSaltSync(10);
    var encryptedPassword = bcryptjs_1.default.hashSync(password, salt);
    try {
        let student = yield Student_1.default.findOne({ enrollmentId });
        if (student) {
            return res.status(400).json({
                msg: 'Student Already exists with same enrollment ID',
            });
        }
        student = new Student_1.default({
            name,
            sem,
            enrollmentId,
            email,
            phone,
            password: encryptedPassword,
        });
        const payload = {
            student: {
                id: student.id,
            },
        };
        jsonwebtoken_1.default.sign(payload, config_1.jwtSecret, { expiresIn: '24h' }, (err, token) => {
            if (err) {
                throw err;
            }
            res.status(200).json({
                msg: `${student.name}, is now ProTraSys Member`,
                StudentData: {
                    username: `${student.enrollmentId}`,
                    password: `${password}`,
                },
            });
        });
        yield student.save();
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.errmsg || err.message,
        });
    }
});
exports.PatchStudentDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { stuId } = req.params;
    const { name, sem, enrollmentId, email, phone, password, projectGroupId, } = req.body;
    const updatedStudent = {};
    if (name)
        updatedStudent.name = name;
    if (sem)
        updatedStudent.sem = sem;
    if (enrollmentId)
        updatedStudent.enrollmentId = enrollmentId;
    if (email)
        updatedStudent.email = email;
    if (phone)
        updatedStudent.phone = phone;
    if (password) {
        var salt = bcryptjs_1.default.genSaltSync(10);
        var encryptedPassword = bcryptjs_1.default.hashSync(password, salt);
        updatedStudent.password = encryptedPassword;
    }
    if (projectGroupId)
        updatedStudent.projectGroupId = projectGroupId;
    try {
        let faculty = yield Faculty_1.default.findById(req.faculty.id).select('-password');
        let student = yield Student_1.default.findOne({ _id: stuId });
        if (!student) {
            return res.status(401).json({
                msg: `${faculty.name}, No Such Student found to update`,
            });
        }
        yield Student_1.default.findOneAndUpdate({ _id: stuId }, { $set: updatedStudent }, { new: true })
            .exec()
            .then((result) => {
            res.status(200).json({
                msg: 'Student Updated',
                result,
            });
        })
            .catch((err) => {
            res.status(401).json({
                msg: `Opps! Something went Wrong.. Please Try again after few moments`,
            });
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.errmsg || err.message,
        });
    }
});
exports.GetAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield Student_1.default.find().populate('projectGroupId');
        if (students.length === 0) {
            return res.status(404).json({
                error: 'No Students were found in our record !',
            });
        }
        res.status(200).json(students);
    }
    catch (err) {
        res.status(500).json({
            error: err,
        });
    }
});
exports.GetIndividualFacultyReportings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield eReports_1.default.find({ faculty: req.faculty.id });
        if (response.length <= 0) {
            return res.status(404).json({
                error: 'You have not done any reporting yet...',
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
exports.PatchEReportings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId } = req.params;
    const { status, feedback } = req.body;
    const updatedReport = {};
    if (status)
        updatedReport.status = status;
    if (feedback)
        updatedReport.feedback = feedback;
    try {
        const response = yield eReports_1.default.find({ projectGroup: groupId });
        if (response.length <= 0) {
            return res.status(404).json({
                error: 'There is no group with this Group Id',
            });
        }
        yield eReports_1.default
            .findOneAndUpdate({ projectGroup: groupId }, { $set: updatedReport }, { new: true })
            .exec()
            .then((result) => {
            res.status(200).json({
                data: 'Data is Updated',
                result: result,
            });
        })
            .catch((err) => {
            res.status(401).json({
                error: `Opps! Something went Wrong.. Please Try again after few moments`,
            });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
});
