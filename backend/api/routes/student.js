// Importing Dependencies
const router = require('express').Router();
const { studentAuth } = require('../middlewares/auth');
const {
  GetIndividualStudent,
  GetViewNotice,
  PostStudentLogin,
  PostUploadFile,
  GetEReports
} = require('../controllers/student');

// @route     GET   /students/me
// @desc      Get Individual Student
// @access    Private
router.get('/me', studentAuth, GetIndividualStudent);

// @route     POST  /students/
// @desc      Student Login
// @access    Public
router.post('/', PostStudentLogin);

// @route     POST   /students/uploadProjectFiles/:projectId
// @desc      save Uploaded file String to the Database
// @access    Private
router.post('/uploadProjectFiles/:projectId', studentAuth, PostUploadFile);

// @route     GET   /students/enotice
// @desc      View eNotice
// @access    public
router.get('/enotice', studentAuth, GetViewNotice);

// @route     GET /students/ereports/:groupId
// @desc      View Individual Project Group eReport
// @access    private
router.get('/ereports/:groupId', studentAuth, GetEReports);

module.exports = router;
