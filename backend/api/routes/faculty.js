// Importing Dependencies
const router = require('express').Router();
const { facultyAuth } = require('../middlewares/auth');
const {
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
  PostAddNewFaculty,
  PostAddNewProjectGroup,
  PostAddNewStudent,
  PostFacultyLogin,
  PostGenerateEReport,
  PostUploadENotice
} = require('../controllers/faculty');

// @route     GET   /faculty/
// @desc      Get All Faculty
// @access    Public
router.get('/', GetAllFaculty);

// @route     POST  /faculty/
// @desc      Faculty Login
// @access    Public
router.post('/', PostFacultyLogin);

// @route     GET   /faculty/me
// @desc      Get Individual Faculty
// @access    Private
router.get('/me', facultyAuth, GetIndividualFaculty);

// @route     Post   /faculty/addNewFaculty
// @desc      Add New Faculty
// @access    Public
router.post('/addNewFaculty', PostAddNewFaculty);

// @route     Post   /faculty/addNewProjectGroup
// @desc      Add New Project Group
// @access    Private
router.post('/addNewProjectGroup', facultyAuth, PostAddNewProjectGroup);

// @route     GET   /faculty/getAllProjectGroups
// @desc      Get All Project Groups
// @access    public
router.get('/getAllProjectGroups', GetAllProjectGroups);

// @route     GET   /faculty/mineProjectGroups
// @desc      Get Individual Faculties Project Groups
// @access    private
router.get(
  '/mineProjectGroups',
  facultyAuth,
  GetIndiividualFacultyAllProjectGroups
);

// @route     GET   /faculty/projects/:id
// @desc      Get Individual Project Group
// @access    private
router.get('/projects/:id', facultyAuth, GetIndividualProjectGroup);

// @route     Delete   /faculty/projects/:id
// @desc      Delete Project Group
// @access    private
router.delete('/projects/:id', facultyAuth, DeleteProjectGroup);

// @route     Delete   /faculty/projects/files/:projectID/:fileID
// @desc      Delete Project Files
// @access    private
router.delete('/files/:fileID', facultyAuth, DeleteProjectFile);

// @route     GET   /faculty/files/:fileID
// @desc      View Students Uploaded Files
// @access    Private
router.get('/files/:fileID', facultyAuth, GetStudentsUploadedFile);

// @route     POST   /faculty/enotice
// @desc      Upload eNotice
// @access    Private
router.post('/enotice', facultyAuth, PostUploadENotice);

// @route     POST   /faculty/ereport
// @desc      Generate E-Reporting
// @access    Private
router.post('/ereport/:filesId', facultyAuth, PostGenerateEReport);

// @route     POST  /faculty/addNewStudent
// @desc      Add New Student
// @access    Private
router.post('/addNewStudent', facultyAuth, PostAddNewStudent);

// @route     PATCH  /faculty/updateStudent/:stuId
// @desc      Update the details of existing Student
// @access    Private
router.patch('/updateStudent/:stuId', facultyAuth, PatchStudentDetails);

// @route     GET   /faculty/getAllStudents
// @desc      Get All Students
// @access    Private
router.get('/getAllStudents', facultyAuth, GetAllStudents);

module.exports = router;
