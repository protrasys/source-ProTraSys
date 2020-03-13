// Importing Dependencies
const Student = require('../models/Student');
const eNotice = require('../models/eNotice');
const eReport = require('../models/eReports');
const ProjectGroup = require('../models/ProjectGroup');
const ProjectFile = require('../models/ProjectFIles');
const bcrypt = require('bcryptjs');
const { jwtSecret } = require('../../config');
const jwt = require('jsonwebtoken');

// @route     GET   /students/me
// @desc      Get Individual Student
// @access    Private
module.exports.GetIndividualStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.student.id)
      .select('-password')
      .populate('projectGroupId')
      .exec();
    const projectGroup = await ProjectGroup.findById(
      student.projectGroupId._id
    ).populate('stu01 stu02 stu03 stu04 teamLeader faculty');

    if (!student) {
      return res.status(404).json({
        msg: 'No Student Record Found'
      });
    }
    res.status(200).json({ student, group: projectGroup });
  } catch (err) {
    res.status(500).json({
      error: err
    });
  }
};

// @route     POST  /students/
// @desc      Student Login
// @access    Public
module.exports.PostStudentLogin = async (req, res) => {
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
          token,
          student
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
};

// @route     POST   /students/uploadProjectFiles/:projectId
// @desc      save Uploaded file String to the Database
// @access    Private
module.exports.PostUploadFile = async (req, res) => {
  const projectId = req.params.projectId;
  const { UploadedFile, Description } = req.body;
  try {
    const projectGroup = await ProjectGroup.findOne({ _id: projectId });

    if (!projectGroup) {
      return res.status(400).json({
        msg: 'No Project Group Found'
      });
    }

    await new ProjectFile({
      StudentID: req.student.id,
      projectGroup: projectId,
      UploadedFile: UploadedFile,
      Description: Description
    })
      .save()
      .then((result) => {
        res.status(200).json({
          msg: 'File Uploaded...',
          result
        });
      })
      .catch((err) => {
        res.status(403).json({
          msg: 'Opps! Something Went Wrong... Please try after few moments',
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

// @route     GET   /students/enotice
// @desc      View eNotice
// @access    public
module.exports.GetViewNotice = async (req, res) => {
  try {
    await eNotice
      .find()
      .populate('faculty', 'name')
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
};

// @route     GET /students/ereports
// @desc      View Individual Project Group eReport
// @access    private
module.exports.GetEReports = async (req, res) => {
  const { groupId } = req.params;
  try {
    const response = await eReport.find({ projectGroup: groupId });

    if (response.length <= 0) {
      return res.status(404).json({
        error: 'There is No reporting done yet from your Group...'
      });
    }

    res.status(200).json({
      data: response
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};

// @route     GET /students/projectfiles/:groupId
// @desc      View Uploaded File by Project Group
// @access    private
module.exports.GetUploadedProjectFileByMyGroup = async (req, res) => {
  const { groupId } = req.params;
  try {
    const response = await ProjectFile.find({ projectGroup: groupId });

    if (response.length <= 0) {
      return res.status(404).json({
        error: 'There is No File uploaded yet from your Group...'
      });
    }

    res.status(200).json({
      data: response
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};
