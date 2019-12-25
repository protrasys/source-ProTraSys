// Importing Dependencies
const router = require('express').Router();
const Student = require('../models/Student/Student');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  res.send('Routes API Working');
});

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
