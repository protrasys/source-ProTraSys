// Importing Dependencies
import express, { Router } from 'express';
import { studentAuth } from '../middlewares/auth';
import {
  GetIndividualStudent,
  GetViewNotice,
  PostStudentLogin,
  PostUploadFile,
  GetEReports,
  GetUploadedProjectFileByMyGroup,
} from '../controllers/student';
const router: Router = express.Router();

router.get('/me', studentAuth, GetIndividualStudent);

router.post('/', PostStudentLogin);

router.post('/uploadProjectFiles/:projectId', studentAuth, PostUploadFile);

router.get('/enotice', studentAuth, GetViewNotice);

router.get('/ereports/:groupId', studentAuth, GetEReports);

router.get(
  '/projectfiles/:groupId',
  studentAuth,
  GetUploadedProjectFileByMyGroup
);

export default router;
