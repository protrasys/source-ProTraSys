// Importing Dependencies
const router = require("express").Router();
const { adminAuth } = require("../middlewares/auth");
const {
  PostAddNewAdmin,
  PostAddNewFaculty,
  PostAdminLogin,
  GetIndividualAdmin,
  GetAllAdmins,
  DeleteStudent,
  DeleteProjectGroup,
  DeleteENotice,
  DeleteFaculty
} = require("../controllers/admin");

// @route     Post   /admin/addNewFaculty
// @desc      Add New Faculty
// @access    Private
router.post("/addNewFaculty", adminAuth, PostAddNewFaculty);

// @route     Post   /admin/addNewAdmin
// @desc      Add New Admin
// @access    Public
router.post("/addNewAdmin", PostAddNewAdmin);

// @route     Post   /admin/
// @desc      Admin Login
// @access    Public
router.post("/", PostAdminLogin);

// @route     Get   /admin/me
// @desc      Get Individual Admin
// @access    Private
router.get("/me", adminAuth, GetIndividualAdmin);

// @route     Get   /admin/
// @desc      Get All Admins
// @access    Public
router.get("/", GetAllAdmins);

// @route     Delete   /admin/deleteFaculty/:id
// @desc      Delete Faculty
// @access    Private
router.delete("/deleteFaculty/:id", adminAuth, DeleteFaculty);

// @route     Delete   /admin/deleteStudent/:id
// @desc      Delete Student
// @access    Private
router.delete("/deleteStudent/:id", adminAuth, DeleteStudent);

// @route     Delete   /admin/deleteProjectGroup/:id
// @desc      Delete Project Group
// @access    private
router.delete("/deleteProjectGroup/:id", adminAuth, DeleteProjectGroup);

// @route     Delete   /admin/deleteENotice/:noticeId
// @desc      Delete eNotice
// @access    private
router.delete("/deleteENotice/:noticeId", adminAuth, DeleteENotice);

module.exports = router;
