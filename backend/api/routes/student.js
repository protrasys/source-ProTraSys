// Importing Dependencies
const router = require('express').Router();
const Student = require('../models/Student');
const eNotice = require('../models/eNotice');
const ProjectGroup = require('../models/ProjectGroup');
const bcrypt = require('bcryptjs');
const { jwtSecret } = require('../../config');
const jwt = require('jsonwebtoken');
const { studentAuth } = require('../middlewares/auth');

// @route     GET   /students/me
// @desc      Get Individual Student
// @access    Private
router.get('/me', studentAuth, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select('-password');
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({
      error: err
    });
  }
});

// @route     POST  /students/
// @desc      Student Login
// @access    Public
router.post('/', async (req, res) => {
  const { enrollmentId, password } = req.body;

  try {
    // See if student exists or not
    const student = await Student.findOne({ enrollmentId: enrollmentId });

    // Check if student not found
    if (!student) {
      return res.status(400).json({
        msg: 'Invalid Credentials'
      });
    }

    // Lets match given password with students password (from database)
    const isCorrect = await bcrypt.compare(password, student.password);

    // Check is password is not valid
    if (!isCorrect) {
      return res.status(400).json({
        msg: 'Invalid Credentials'
      });
    }

    // Sending Student id in Payload
    const payload = {
      student: {
        id: student.id
      }
    };

    // return json web token to frontend
    jwt.sign(payload, jwtSecret, { expiresIn: '24h' }, (err, token) => {
      if (!err) {
        return res.json({
          msg: `${student.name}, Welcome Back 😉`,
          token
        });
      }
      throw err;
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: 'Internal Server Error',
      description: err
    });
  }
});

// @route     POST   /students/uploadProjectFiles/:projectId
// @desc      save Uploaded file String to the Database
// @access    Private
router.post('/uploadProjectFiles/:projectId', studentAuth, async (req, res) => {
  const projectId = req.params.projectId;
  const { UploadedFile, Description } = req.body;
  try {
    const student = await Student.findOne({ _id: req.student.id });
    const projectGroup = await ProjectGroup.findOne({ _id: projectId });

    if (!projectGroup) {
      return res.status(400).json({
        msg: 'No Project Group Found'
      });
    }

    const newFile = {
      StudentID: student.id,
      StudentName: student.name,
      UploadedFile,
      Description
    };

    projectGroup.files.unshift(newFile);
    await projectGroup.save();

    res.status(200).json(projectGroup);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: err
    });
  }
});

// @route     GET   /students/enotice
// @desc      View eNotice
// @access    public
router.get('/enotice', async (req, res) => {
  try {
    await eNotice
      .find()
      .exec()
      .then((result) => {
        if (result.length > 0) {
          return res.status(200).json({
            eNotice: result
          });
        } else {
          return res.status(404).json({
            message: 'No more eNotice, Kindly visit sometimes later'
          });
        }
      })
      .catch((err) => {
        res.status(401).json({
          message: 'Something went wrong, Please try again later',
          desc: err
        });
      });
  } catch (err) {
    console.log('GET STUDENT E-NOTICE ROUTE ERROR', err);
    res.status(500).json({
      error: 'Internal Server Error',
      desc: err
    });
  }
});

module.exports = router;