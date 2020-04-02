// Importing Dependencies
const Admin = require('../models/Admin');
const eNotice = require('../models/eNotice');
const eReports = require('../models/eReports');
const Faculty = require('../models/Faculty');
const Student = require('../models/Student');
const ProjectGroup = require('../models/ProjectGroup');
const ProjectFIles = require('../models/ProjectFIles');
const bcrypt = require('bcryptjs');
const { jwtSecret } = require('../../config');
const jwt = require('jsonwebtoken');

// @route     Post   /faculty/addNewFaculty
// @desc      Add New Faculty
// @access    Public
module.exports.PostAddNewFaculty = async (req, res) => {
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

    jwt.sign(payload, jwtSecret, { expiresIn: '24h' }, (err, token) => {
      if (err) throw err;
      res.status(200).json({
        msg: `${faculty.name}, You are welcome to the ProTraSys Family !🙏`,
        token
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      Error: err.errmsg || err.message
    });
  }
};

// @route     Post   /admin/addNewAdmin
// @desc      Add New Admin
// @access    Public
module.exports.PostAddNewAdmin = async (req, res) => {
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
        jwt.sign(payload, jwtSecret, { expiresIn: '24h' }, (err, token) => {
          if (err) {
            throw err;
          } else {
            return res.status(200).json({
              msg: `${admin.name}, You are welcome to the ProTraSys Family !🙏`,
              token
            });
          }
        });
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
};

// @route     Post   /admin/
// @desc      Admin Login
// @access    Public
module.exports.PostAdminLogin = async (req, res) => {
  const { AID, password } = req.body;
  try {
    // Lets FInd the Admin first
    const admin = await Admin.findOne({ _id: AID });

    // If Admin does not found
    if (!admin) {
      return res.status(400).json({
        error: 'Invalid Credentials'
      });
    }

    // Now match the password
    const isCorrect = await bcrypt.compare(password, admin.password);

    if (!isCorrect) {
      return res.status(400).json({
        error: 'Invalid Credentials'
      });
    }

    // Sending Admin id in Payload
    const payload = {
      admin: {
        id: admin.id
      }
    };
    // return json web token to frontend
    jwt.sign(payload, jwtSecret, { expiresIn: '24h' }, (err, token) => {
      if (!err) {
        return res.json({
          msg: `${admin.name}, Welcome Back 😉`,
          token
        });
      }
      throw err;
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.errmsg || err.message
    });
  }
};

// @route     Get   /admin/me
// @desc      Get Individual Admin
// @access    Private
module.exports.GetIndividualAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    res.status(200).json(admin);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message
    });
  }
};

// @route     Get   /admin/
// @desc      Get All Admins
// @access    Public
module.exports.GetAllAdmins = async (req, res) => {
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
};

// @route     Delete   /admin/deleteFaculty/:id
// @desc      Delete Faculty
// @access    Private
module.exports.DeleteFaculty = async (req, res) => {
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
};

// @route     Delete   /admin/deleteStudent/:id
// @desc      Delete Student
// @access    Private
module.exports.DeleteStudent = async (req, res) => {
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
};

// @route     Delete   /admin/deleteProjectGroup/:id
// @desc      Delete Project Group
// @access    private
module.exports.DeleteProjectGroup = async (req, res) => {
  const id = req.params.id;
  try {
    await ProjectGroup.deleteOne({ _id: id })
      .exec()
      .then((result) => {
        if (result.deletedCount > 0) {
          return res.status(200).json({
            msg: 'Deleted Successfully'
          });
        } else {
          return res.status(400).json({
            msg: 'No Project Group Found to Delete'
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          err: err
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: err
    });
  }
};

// @route     Delete   /admin/deleteENotice/:noticeId
// @desc      Delete eNotice
// @access    private
module.exports.DeleteENotice = async (req, res) => {
  const noticeId = req.params.noticeId;
  try {
    await eNotice
      .deleteOne({ _id: noticeId })
      .exec()
      .then((result) => {
        if (result.deletedCount > 0) {
          return res.status(200).json({
            msg: 'Deleted Successfully'
          });
        } else {
          return res.status(400).json({
            msg: 'No eNotice Found to Delete'
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          err: err
        });
      });
  } catch (err) {
    console.log('DELETE ADMIN E-NOTICE ROUTE ERROR', err);
    res.status(500).json({
      error: 'Internal Server Error',
      desc: err
    });
  }
};

// @route     Get   /admin/countAllDocuments
// @desc      This Request will count all documents from the database and send it to frontend
// @access    private
module.exports.countAllDocuments = async (req, res) => {
  try {
    const allStu = await Student.countDocuments();
    const allFac = await Faculty.countDocuments();
    const allENotices = await eNotice.countDocuments();
    const allEReports = await eReports.countDocuments();
    const allProjectFiles = await ProjectFIles.countDocuments();
    const allProjectGroups = await ProjectGroup.countDocuments();
    const allAdmins = await Admin.countDocuments();

    res.json({
      allAdmins,
      allENotices,
      allEReports,
      allFac,
      allStu,
      allProjectGroups,
      allProjectFiles
    });
  } catch (err) {
    console.log('GET ADMIN COUNTALLDOCUMENTS ROUTE ERROR', err);
    res.status(500).json({
      error: 'Internal Server Error',
      desc: err
    });
  }
};
