// Importing Dependencies
const router = require('express').Router();
const Faculty = require('../models/Faculty');
const Student = require('../models/Student');
const eNotice = require('../models/eNotice');
const eReport = require('../models/eReports');
const ProjectGroup = require('../models/ProjectGroup');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
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
router.get('/getAllProjectGroups', async (req, res) => {
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

// @route     GET   /faculty/mineProjectGroups
// @desc      Get Individual Faculties Project Groups
// @access    private
router.get('/mineProjectGroups', facultyAuth, async (req, res) => {
  try {
    const faculty = await Faculty.findOne({ _id: req.faculty.id });
    const myProjectGroups = await ProjectGroup.find({
      faculty: req.faculty.id
    });

    if (!myProjectGroups) {
      return res.status(400).json({
        msg: `Sorry, ${faculty.name} you have no project groups`
      });
    }

    res.status(200).json(myProjectGroups);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: err
    });
  }
});

// @route     GET   /faculty/projects/:id
// @desc      Get Individual Project Group
// @access    private
router.get('/projects/:id', facultyAuth, async (req, res) => {
  const id = req.params.id;
  try {
    const faculty = await Faculty.findOne({ _id: req.faculty.id });
    const projectGroup = await ProjectGroup.findOne({ _id: id }).populate(
      'faculty stu01 stu02 stu03 stu04',
      'name profile sem enrollmentId email phone'
    );

    if (!projectGroup) {
      return res.status(400).json({
        msg: `Hey ${faculty.name}, You have no Project Group found with this ID`
      });
    }

    res.status(200).json(projectGroup);
  } catch (err) {
    console.log(err);
    res.status(200).json({
      err: err
    });
  }
});

// @route     Delete   /faculty/projects/:id
// @desc      Delete Project Group
// @access    private
router.delete('/projects/:id', facultyAuth, async (req, res) => {
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
});

// @route     Delete   /faculty/projects/files/:projectID/:fileID
// @desc      Delete Project Files
// @access    private
router.delete(
  '/projects/files/:projectID/:fileID',
  facultyAuth,
  async (req, res) => {
    const fileID = req.params.fileID;
    const projectID = req.params.projectID;
    try {
      const projectGroup = await ProjectGroup.findById(projectID);

      // find Uploaded Files
      const uploadedFile = projectGroup.files.find(
        (file) => file.id === fileID
      );

      // If no such file found to delete
      if (!uploadedFile) {
        return res.status(400).json({
          msg: 'No Such File found to delete'
        });
      }

      // Check if Faculty is Authorized or not
      if (projectGroup.faculty.toString() !== req.faculty.id) {
        return res.status(401).json({
          msg: 'Faculty Unauthorized'
        });
      }

      // Finding Index of File to Delete
      const removeIndex = projectGroup.files
        .map((file) => file.id.toString())
        .indexOf(fileID);

      projectGroup.files.splice(removeIndex, 1);

      await projectGroup.save();

      if (projectGroup.files.length === 0) {
        return res.status(200).json({
          msg: 'File Successfully Deleted'
        });
      }
      res.status(400).json({
        msg: 'Something Went Wrong, Kindly Contact to DB Admin'
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

// @route     GET   /faculty/projects/files/:projectID/:fileID
// @desc      View Students Uploaded Files
// @access    Private
router.get(
  '/projects/files/:projectID/:fileID',
  facultyAuth,
  async (req, res) => {
    const projectID = req.params.projectID;
    const fileID = req.params.fileID;
    try {
      const projectGroup = await ProjectGroup.findById(projectID).select(
        'files'
      );

      // Finding Index fo File
      const uploadFileIndex = projectGroup.files
        .map((file) => file.id.toString())
        .indexOf(fileID);

      res.json(projectGroup.files[uploadFileIndex]);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

// @route     POST   /faculty/enotice
// @desc      Upload eNotice
// @access    Private
router.post('/enotice', facultyAuth, async (req, res) => {
  const { title, description } = req.body;
  try {
    await new eNotice({
      faculty: req.faculty.id,
      title,
      description
    })
      .save()
      .then((result) => {
        res.status(200).json({
          message: 'Notice is added !',
          notice: result
        });
      })
      .catch((err) => {
        res.status(401).json({
          message: 'Something went wrong, Please try again later',
          desc: err
        });
      });
  } catch (err) {
    console.log('POST FACULTY E-NOTICE ROUTE ERROR', err);
    res.status(500).json({
      error: 'Internal Server Error',
      desc: err
    });
  }
});

// @route     POST   /faculty/ereport
// @desc      Generate E-Reporting
// @access    Private
router.post(
  '/ereport/:projectGroupId/:filesId',
  facultyAuth,
  async (req, res) => {
    const { discussion, feedback } = req.body;
    const { projectGroupId, filesId } = req.params;
    try {
      const newReport = await new eReport({
        discussion,
        feedback,
        faculty: req.faculty.id,
        projectGroup: projectGroupId
      });

      if (!newReport) {
        return res.status(401).json({
          message: 'Something went wrong, Please try again later',
          desc: err
        });
      }

      const projectGroup = await ProjectGroup.findOne({ _id: projectGroupId });

      const faculty = await Faculty.findOne({ _id: req.faculty.id });
      const facultyEmail = faculty.email;

      const stu01 = await Student.findOne({ _id: projectGroup.stu01 });
      const stu01Email = stu01.email;
      const stu02 = await Student.findOne({ _id: projectGroup.stu02 });
      const stu02Email = stu02.email;
      const stu03 = await Student.findOne({ _id: projectGroup.stu03 });
      const stu03Email = stu03.email;
      const stu04 = await Student.findOne({ _id: projectGroup.stu04 });
      const stu04Email = stu04.email;

      const cDate = projectGroup.updatedAt.getDate();
      const cMonth = projectGroup.updatedAt.getMonth() + 1;
      const cYear = projectGroup.updatedAt.getFullYear();

      // Code to send email to the above users (Faculty and Students)
      const output = `
    Hello , </br> Your Report Card </br>
    <h3>: Message :</h3>
    <p>Today We have Discusses about :- ${newReport.discussion} </p> </br>
    <h6 align='right'>Faculty Feedback</h6>
    <p align='right'>${newReport.feedback}</p>
    `;

      const outputForFaculty = `
        
      `;

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'badboysecurities@gmail.com', // generated ethereal user
          pass: 'LaW6rXvEguCHB2V' // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      // send mail with defined transport object
      if (stu01Email !== 'undefined') {
        await transporter.sendMail({
          from: `"Pro-Tra-Sys Team 🔖" <bhaainichaal@yahoo.in>`, // sender address
          to: stu01Email, // list of receivers
          subject: `${
            stu01.name
          }, Grand Project Report Card : ${new Date().toISOString()}`, // Subject line
          html: output // html body
        });
      }
      if (stu02Email !== 'undefined') {
        await transporter.sendMail({
          from: `"Pro-Tra-Sys Team 🔖" <bhaainichaal@yahoo.in>`, // sender address
          to: stu02Email, // list of receivers
          subject: `${
            stu02.name
          }, Grand Project Report Card : ${new Date().toISOString()}`, // Subject line
          html: output // html body
        });
      }
      if (stu03Email !== 'undefined') {
        await transporter.sendMail({
          from: `"Pro-Tra-Sys Team 🔖" <bhaainichaal@yahoo.in>`, // sender address
          to: stu03Email, // list of receivers
          subject: `${
            stu03.name
          }, Grand Project Report Card : ${new Date().toISOString()}`, // Subject line
          html: output // html body
        });
      }
      if (stu04Email !== 'undefined') {
        await transporter.sendMail({
          from: `"Pro-Tra-Sys Team 🔖" <bhaainichaal@yahoo.in>`, // sender address
          to: stu04Email, // list of receivers
          subject: `${
            stu04.name
          }, Grand Project Report Card : ${new Date().toISOString()}`, // Subject line
          html: output // html body
        });
      }

      if (facultyEmail !== 'undefined') {
        await transporter.sendMail({
          from: `"Pro-Tra-Sys Team 🔖" <bhaainichaal@yahoo.in>`, // sender address
          to: 'manavoza7@gmail.com', // list of receivers
          subject: ` Hello, ${
            faculty.name
          }, Grand Project Report Card : ${new Date()}`, // Subject line
          html: outputForFaculty // html body
        });
      }

      res.status(200).json({
        message: 'Report Generated and sent to the Students Mail',
        notice: newReport
      });

      await newReport.save();
    } catch (err) {
      console.log('POST FACULTY E-REPORT ROUTE ERROR', err);
      res.status(500).json({
        error: 'Internal Server Error',
        desc: err
      });
    }
  }
);

module.exports = router;
