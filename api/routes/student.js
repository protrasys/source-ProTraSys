// Importing Dependencies
const router = require('express').Router();
const Student = require('../models/Student/Student');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth');

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
router.get('/me', authMiddleware, async (req, res) => {
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
router.post('/', async (req, res) => {
  const { name, sem, enrollmentId, email, phone, password } = req.body;

  // Encrypting Password using Bcrypt
  var salt = bcrypt.genSaltSync(10);
  var encryptedPassword = bcrypt.hashSync(password, salt);

  try {
    let student = await Student.findOne({ enrollmentId });

    if (student) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Student Already Exists with this Enrollment ID'
          }
        ]
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

module.exports = router;
