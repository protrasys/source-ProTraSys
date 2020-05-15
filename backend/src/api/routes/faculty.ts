// Importing Dependencies
import express, { Router } from 'express';
import { facultyAuth } from '../middlewares/auth';
import {
  DeleteProjectFile,
  DeleteProjectGroup,
  GetAllFaculty,
  GetAllProjectGroups,
  GetAllStudents,
  GetIndiividualFacultyAllProjectGroups,
  GetIndividualFaculty,
  GetIndividualProjectGroup,
  GetStudentsUploadedFile,
  PatchStudentDetails,
  PostAddNewProjectGroup,
  PostAddNewStudent,
  PostFacultyLogin,
  PostGenerateEReport,
  PostUploadENotice,
  GetIndividualFacultyReportings,
  PatchEReportings,
} from '../controllers/faculty';
const router: Router = express.Router();

router.get('/', GetAllFaculty);

router.post('/', PostFacultyLogin);

router.get('/me', facultyAuth, GetIndividualFaculty);

router.post('/addNewProjectGroup', facultyAuth, PostAddNewProjectGroup);

router.get('/getAllProjectGroups', GetAllProjectGroups);

router.get(
  '/mineProjectGroups',
  facultyAuth,
  GetIndiividualFacultyAllProjectGroups
);

router.get('/projects/:id', facultyAuth, GetIndividualProjectGroup);

router.delete('/projects/:id', facultyAuth, DeleteProjectGroup);

router.delete('/files/:fileID', facultyAuth, DeleteProjectFile);

router.get('/files/:fileID', facultyAuth, GetStudentsUploadedFile);

router.post('/enotice', facultyAuth, PostUploadENotice);

router.post('/ereport/:filesId', facultyAuth, PostGenerateEReport);

router.post('/addNewStudent', facultyAuth, PostAddNewStudent);

router.patch('/updateStudent/:stuId', facultyAuth, PatchStudentDetails);

router.get('/getAllStudents', facultyAuth, GetAllStudents);

router.get('/ereports', facultyAuth, GetIndividualFacultyReportings);

router.patch('/ereports/:groupId', facultyAuth, PatchEReportings);

export default router;
