"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing Dependencies
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const admin_1 = require("../controllers/admin");
const router = express_1.default.Router();
router.post('/', admin_1.PostAdminLogin);
router.get('/me', auth_1.adminAuth, admin_1.GetIndividualAdmin);
router.post('/addNewFaculty', auth_1.adminAuth, admin_1.PostAddNewFaculty);
router.post('/addNewAdmin', admin_1.PostAddNewAdmin);
router.get('/alladmin', admin_1.GetAllAdmins);
router.delete('/deleteFaculty/:id', auth_1.adminAuth, admin_1.DeleteFaculty);
router.delete('/deleteStudent/:id', auth_1.adminAuth, admin_1.DeleteStudent);
router.delete('/deleteProjectGroup/:id', auth_1.adminAuth, admin_1.DeleteProjectGroup);
router.delete('/deleteENotice/:noticeId', auth_1.adminAuth, admin_1.DeleteENotice);
router.get('/countAllDocuments', admin_1.countAllDocuments);
router.get('/data', auth_1.adminAuth, admin_1.getAllData);
exports.default = router;
