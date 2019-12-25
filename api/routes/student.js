// Importing Dependencies
const router = require('express').Router();
const Student = require('../models/Student/Student');
const bcrypt = require('bcryptjs');
const config = require('config');

router.get('/', (req, res) => {
  res.send('Routes API Working');
});

router.post('/', async (req, res) => {
  const { name, sem, enrollmentId, email, phone, password } = req.body;

  // Encrypting Password using Bcrypt
  var salt = bcrypt.genSaltSync(10);
  var encryptedPassword = bcrypt.hashSync(password, salt);

  await new Student({
    name,
    sem,
    enrollmentId,
    email,
    phone,
    password: encryptedPassword
  })
    .save()
    .then((response) => {
      if (response) {
        console.log(response);
        return res.status(200).json({
          Message: 'Student Registered Successfully'
        });
      }
      return res.status(401).json({
        Message: 'Bad Request'
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        Error: err.errmsg || err.message
      });
    });
});

module.exports = router;
