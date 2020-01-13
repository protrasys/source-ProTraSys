// Importing Dependencies
const router = require('express').Router();
const Admin = require('../models/Admin');
const Faculty = require('../models/Faculty');
const Student = require('../models/Student');
const ProjectGroup = require('../models/ProjectGroup');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { adminAuth } = require('../middlewares/auth');

// @route     Post   /admin/addNewAdmin
// @desc      Add New Admin
// @access    Public
router.post('/addNewAdmin', async (req, res) => {
  const { AID, name, password } = req.body;
  try {
    // check if an admin already exists
    let admin = await Admin.findOne({ _id: AID });

    if (admin) {
      return res.status(400).json({
        msg: `Admin already exists with same ${AID}`
      });
    }

    // hash current admin password
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(password, salt);

    // Sending data to an object
    admin = new Admin({
      _id: AID,
      name,
      password: encryptedPassword
    });

    // Creating Payload for frontend
    const payload = {
      admin: {
        id: admin.id
      }
    };

    admin
      .save()
      .then(() => {
        // returning jwt
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: '24h' },
          (err, token) => {
            if (err) {
              throw err;
            } else {
              return res.status(200).json({
                msg: `${admin.name}, You are welcome to the ProTraSys Family !🙏`,
                token
              });
            }
          }
        );
      })
      .catch((mongoErr) => {
        return res.status(500).json({
          err: mongoErr.message
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      Error: err.errmsg || err.message
    });
  }
});

// @route     Post   /admin/
// @desc      Admin Login
// @access    Public
router.post('/', async (req, res) => {
  const { AID, password } = req.body;
  try {
    // Lets FInd the Admin first
    const admin = await Admin.findOne({ _id: AID });

    // If Admin does not found
    if (!admin) {
      return res.status(400).json({
        msg: 'Invalid Credentials'
      });
    }

    // Now match the password
    const isCorrect = await bcrypt.compare(password, admin.password);

    if (!isCorrect) {
      return res.status(400).json({
        msg: 'Invalid Credentials'
      });
    }

    // Sending Admin id in Payload
    const payload = {
      admin: {
        id: admin.id
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
            msg: `${admin.name}, Welcome Back 😉`,
            token
          });
        }
        throw err;
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      Error: err.errmsg || err.message
    });
  }
});

// @route     Get   /admin/me
// @desc      Get Individual Admin
// @access    Private
router.get('/me', adminAuth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    res.status(200).json(admin);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message
    });
  }
});

// @route     Get   /admin/
// @desc      Get All Admins
// @access    Public
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');

    // Check is no admin found
    if (admins.length === 0) {
      return res.status(400).json({
        msg: 'No More Admins Found'
      });
    }

    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({
      error: err
    });
  }
});

// @route     Delete   /admin/deleteFaculty/:id
// @desc      Delete Faculty
// @access    Private
router.delete('/deleteFaculty/:id', adminAuth, async (req, res) => {
  const id = req.params.id;
  try {
    // Check if Faculty exists with same id
    let faculty = await Faculty.findById(id);

    if (!faculty) {
      return res.status(400).json({
        msg: 'No Faculty Found'
      });
    }

    await Faculty.deleteOne({ _id: id });
    res.status(200).json({
      msg: 'Faculty Removed'
    });
  } catch (err) {
    res.status(500).json({
      err: err
    });
  }
});

// @route     Delete   /admin/deleteStudent/:id
// @desc      Delete Student
// @access    Private
router.delete('/deleteStudent/:id', adminAuth, async (req, res) => {
  const id = req.params.id;
  try {
    // Check if Student exists with same id
    let student = await Student.findById(id);

    if (!student) {
      return res.status(400).json({
        msg: 'No Student Found'
      });
    }

    await Student.deleteOne({ _id: id });
    res.status(200).json({
      msg: 'Student Removed'
    });
  } catch (err) {
    res.status(500).json({
      err: err
    });
  }
});

module.exports = router;
