// Importing Dependencies
const router = require('express').Router();
const Admin = require('../models/Admin');
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

module.exports = router;
