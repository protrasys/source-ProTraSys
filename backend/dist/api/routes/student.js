"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// Importing Dependencies
const express_1 = tslib_1.__importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const student_1 = require("../controllers/student");
const router = express_1.default.Router();
router.get('/me', auth_1.studentAuth, student_1.GetIndividualStudent);
router.post('/', student_1.PostStudentLogin);
router.post('/uploadProjectFiles/:projectId', auth_1.studentAuth, student_1.PostUploadFile);
router.get('/enotice', auth_1.studentAuth, student_1.GetViewNotice);
router.get('/ereports/:groupId', auth_1.studentAuth, student_1.GetEReports);
router.get('/projectfiles/:groupId', auth_1.studentAuth, student_1.GetUploadedProjectFileByMyGroup);
exports.default = router;
