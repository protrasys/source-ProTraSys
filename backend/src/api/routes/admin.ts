// Importing Dependencies
import express, { Router } from 'express';
import { adminAuth } from '../middlewares/auth';
import {
  PostAddNewAdmin,
  PostAddNewFaculty,
  PostAdminLogin,
  GetIndividualAdmin,
  GetAllAdmins,
  DeleteStudent,
  DeleteProjectGroup,
  DeleteENotice,
  DeleteFaculty,
  countAllDocuments,
  getAllData,
} from '../controllers/admin';
const router: Router = express.Router();

router.post('/', PostAdminLogin);

router.get('/me', adminAuth, GetIndividualAdmin);

router.post('/addNewFaculty', adminAuth, PostAddNewFaculty);

router.post('/addNewAdmin', PostAddNewAdmin);

router.get('/alladmin', GetAllAdmins);

router.delete('/deleteFaculty/:id', adminAuth, DeleteFaculty);

router.delete('/deleteStudent/:id', adminAuth, DeleteStudent);

router.delete('/deleteProjectGroup/:id', adminAuth, DeleteProjectGroup);

router.delete('/deleteENotice/:noticeId', adminAuth, DeleteENotice);

router.get('/countAllDocuments', countAllDocuments);

router.get('/data', adminAuth, getAllData);

export default router;
