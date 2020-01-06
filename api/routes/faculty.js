// Importing Dependencies
const router = require('express').Router();
const Faculty = require('../models/Faculty');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth');

// @route     GET   /faculty/
// @desc      Get All Faculty
// @access    Public
router.get('/', async (req, res) => {
  try {
    const faculties = await Faculty.find().select('-password');

    if (faculties.length === 0) {
      return res.status(404).json({
        msg: 'No Faculties were found in our record !'
      });
    }
    res.status(200).json(faculties);
  } catch (err) {
    res.status(500).json({
      error: err
    });
  }
});

// @route     Post   /faculty/addNewFaculty
// @desc      Add New Faculty
// @access    Public
router.post('/addNewFaculty', async (req, res) => {
  const {
    name,
    from,
    profile,
    enrollmentId,
    email,
    phone,
    designation,
    skills,
    password
  } = req.body;

  try {
    // See if Faculty already exists with same enrollment ID
    let faculty = await Faculty.findOne({ enrollmentId: enrollmentId });

    if (faculty) {
      return res.status(400).json({
        msg: 'Faculty already exists with same enrollment ID'
      });
    }

    // Encrypting Password using Bcrypt
    var salt = bcrypt.genSaltSync(10);
    var encryptedPassword = bcrypt.hashSync(password, salt);

    faculty = new Faculty({
      name,
      date: {
        from
      },
      profile,
      enrollmentId,
      email,
      phone,
      designation,
      skills: skills.split(',').map((skill) => skill.trim()),
      password: encryptedPassword
    });

    const payload = {
      faculty: {
        id: faculty.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          msg: `${faculty.name}, You are welcome to the ProTraSys Family !🙏`,
          token
        });
      }
    );

    await faculty.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      Error: err.errmsg || err.message
    });
  }
});

module.exports = router;
