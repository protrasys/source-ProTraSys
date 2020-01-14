// Importing Dependencies
const router = require('express').Router();
const Student = require('../models/Student');
const ProjectGroup = require('../models/ProjectGroup');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { studentAuth } = require('../middlewares/auth');

// @route     GET   /students/
// @desc      Get All Students
// @access    Public
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().select('-password');

    if (students.length === 0) {
      return res.status(404).json({
        msg: 'No Students were found in our record !'
      });
    }
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({
      error: err
    });
  }
});

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
// @desc      Add New Student
// @access    Public
router.post('/addNewStudent', async (req, res) => {
  const { name, sem, enrollmentId, email, phone, password } = req.body;

  // Encrypting Password using Bcrypt
  var salt = bcrypt.genSaltSync(10);
  var encryptedPassword = bcrypt.hashSync(password, salt);

  try {
    let student = await Student.findOne({ enrollmentId });

    if (student) {
      return res.status(400).json({
        msg: 'Student Already exists with same enrollment ID'
      });
    }

    student = new Student({
      name,
      sem,
      enrollmentId,
      email,
      phone,
      password: encryptedPassword
    });

    const payload = {
      student: {
        id: student.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '24h' },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.status(200).json({
          msg: `${student.name}, You are welcome to the ProTraSys Family !🙏`,
          token
        });
      }
    );
    await student.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      Error: err.errmsg || err.message
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
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '24h' },
      (err, token) => {
        if (!err) {
          return res.json({
            msg: `${student.name}, Welcome Back 😉`,
            token
          });
        }
        throw err;
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: 'Internal Server Error',
      description: err
    });
  }
});

// @route     POST   /students/uploadProjectFiles
// @desc      save Uploaded file String to the Database
// @access    Private

module.exports = router;
