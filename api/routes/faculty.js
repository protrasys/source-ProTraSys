// Importing Dependencies
const router = require('express').Router();
const Faculty = require('../models/Faculty');
const ProjectGroup = require('../models/ProjectGroup');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { facultyAuth } = require('../middlewares/auth');

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

// @route     POST  /faculty/
// @desc      Faculty Login
// @access    Public
router.post('/', async (req, res) => {
  const { enrollmentId, password } = req.body;

  try {
    // See if faculty exists or not
    const faculty = await Faculty.findOne({ enrollmentId: enrollmentId });

    // Check if faculty not found
    if (!faculty) {
      return res.status(400).json({
        msg: 'Invalid Credentials'
      });
    }

    // Lets match given password with faculty password (from database)
    const isCorrect = await bcrypt.compare(password, faculty.password);

    // Check is password is not valid
    if (!isCorrect) {
      return res.status(400).json({
        msg: 'Invalid Credentials'
      });
    }

    // Sending faculty id in Payload
    const payload = {
      faculty: {
        id: faculty.id
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
            msg: `${faculty.name}, Welcome Back 😉`,
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

// @route     GET   /faculty/me
// @desc      Get Individual Faculty
// @access    Private
router.get('/me', facultyAuth, async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.faculty.id).select('-password');
    res.status(200).json(faculty);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message
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
    await faculty.save();

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
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      Error: err.errmsg || err.message
    });
  }
});

// @route     Post   /faculty/addNewProjectGroup
// @desc      Add New Project Group
// @access    Private
router.post('/addNewProjectGroup', facultyAuth, async (req, res) => {
  const {
    projectName,
    definition,
    stu01,
    stu02,
    stu03,
    stu04,
    technology
  } = req.body;
  try {
    let faculty = await Faculty.findById(req.faculty.id).select('-password');
    let projectGroup = new ProjectGroup({
      projectName,
      definition,
      stu01,
      stu02,
      stu03,
      stu04,
      technology: technology.split(',').map((tech) => tech.trim()),
      faculty: faculty.id
    });

    await projectGroup.save();
    res.status(200).json({
      msg: `Hey ${faculty.name}, Your Group : ${projectName} is now added Successfully`
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: err
    });
  }
});

// @route     GET   /faculty/getAllProjectGroups
// @desc      Get All Project Groups
// @access    public
router.get('/getAllProjectGroups', facultyAuth, async (req, res) => {
  try {
    const projectGroups = await ProjectGroup.find();

    // check if projectGroup available or not
    if (projectGroups.length === 0) {
      return res.status(400).json({
        msg: 'No ProjectGroups Records Found!'
      });
    }

    res.status(200).json({
      projectGroups
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: err
    });
  }
});

module.exports = router;
