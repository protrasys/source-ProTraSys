"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing Dependencies
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const faculty_1 = require("../controllers/faculty");
const router = express_1.default.Router();
router.get('/', faculty_1.GetAllFaculty);
router.post('/', faculty_1.PostFacultyLogin);
router.get('/me', auth_1.facultyAuth, faculty_1.GetIndividualFaculty);
router.post('/addNewProjectGroup', auth_1.facultyAuth, faculty_1.PostAddNewProjectGroup);
router.get('/getAllProjectGroups', faculty_1.GetAllProjectGroups);
router.get('/mineProjectGroups', auth_1.facultyAuth, faculty_1.GetIndiividualFacultyAllProjectGroups);
router.get('/projects/:id', auth_1.facultyAuth, faculty_1.GetIndividualProjectGroup);
router.delete('/projects/:id', auth_1.facultyAuth, faculty_1.DeleteProjectGroup);
router.delete('/files/:fileID', auth_1.facultyAuth, faculty_1.DeleteProjectFile);
router.get('/files/:fileID', auth_1.facultyAuth, faculty_1.GetStudentsUploadedFile);
router.post('/enotice', auth_1.facultyAuth, faculty_1.PostUploadENotice);
router.post('/ereport/:filesId', auth_1.facultyAuth, faculty_1.PostGenerateEReport);
router.post('/addNewStudent', auth_1.facultyAuth, faculty_1.PostAddNewStudent);
router.patch('/updateStudent/:stuId', auth_1.facultyAuth, faculty_1.PatchStudentDetails);
router.get('/getAllStudents', auth_1.facultyAuth, faculty_1.GetAllStudents);
router.get('/ereports', auth_1.facultyAuth, faculty_1.GetIndividualFacultyReportings);
router.patch('/ereports/:groupId', auth_1.facultyAuth, faculty_1.PatchEReportings);
exports.default = router;
