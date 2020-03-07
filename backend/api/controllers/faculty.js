// Importing Dependencies
const Faculty = require('../models/Faculty');
const Student = require('../models/Student');
const eNotice = require('../models/eNotice');
const eReport = require('../models/eReports');
const ProjectGroup = require('../models/ProjectGroup');
const ProjectFiles = require('../models/ProjectFIles');
const bcrypt = require('bcryptjs');
const { jwtSecret } = require('../../config');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// @route     GET   /faculty/
// @desc      Get All Faculty
// @access    Public
module.exports.GetAllFaculty = async (req, res) => {
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
};

// @route     POST  /faculty/
// @desc      Faculty Login
// @access    Public
module.exports.PostFacultyLogin = async (req, res) => {
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
    jwt.sign(payload, jwtSecret, { expiresIn: '24h' }, (err, token) => {
      if (!err) {
        return res.json({
          msg: `${faculty.name}, Welcome Back 😉`,
          token
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

// @route     GET   /faculty/me
// @desc      Get Individual Faculty
// @access    Private
module.exports.GetIndividualFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.faculty.id).select('-password');
    res.status(200).json(faculty);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message
    });
  }
};

// @route     Post   /faculty/addNewProjectGroup
// @desc      Add New Project Group
// @access    Private
module.exports.PostAddNewProjectGroup = async (req, res) => {
  const {
    projectName,
    definition,
    stu01,
    stu02,
    stu03,
    stu04,
    technology,
    teamLeader
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
      teamLeader,
      technology: technology.split(',').map((tech) => tech.trim()),
      faculty: faculty.id
    });

    await projectGroup.save();
    res.status(200).json({
      msg: `Hello~ ${faculty.name}, Your Group : ${projectName} is now added Successfully`
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: err
    });
  }
};

// @route     GET   /faculty/getAllProjectGroups
// @desc      Get All Project Groups
// @access    public
module.exports.GetAllProjectGroups = async (req, res) => {
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
};

// @route     GET   /faculty/mineProjectGroups
// @desc      Get Individual Faculties Project Groups
// @access    private
module.exports.GetIndiividualFacultyAllProjectGroups = async (req, res) => {
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
};

// @route     GET   /faculty/projects/:id
// @desc      Get Individual Project Group
// @access    private
module.exports.GetIndividualProjectGroup = async (req, res) => {
  const id = req.params.id;
  try {
    const faculty = await Faculty.findOne({ _id: req.faculty.id });
    const projectGroup = await ProjectGroup.findOne({ _id: id }).populate(
      'faculty stu01 stu02 stu03 stu04 teamLeader',
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
};

// @route     Delete   /faculty/projects/:id
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

// @route     Delete   /faculty/projects/files/:projectID/:fileID
// @desc      Delete Project Files
// @access    private
module.exports.DeleteProjectFile = async (req, res) => {
  const fileID = req.params.fileID;
  try {
    const projectFIle = await ProjectFiles.findOne({ _id: fileID });

    const groupId = projectFIle.projectGroup;
    const projectGroup = await ProjectGroup.findOne({ _id: groupId });

    // If no such file found to delete
    if (!projectFIle) {
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
    await ProjectFiles.deleteOne({ _id: fileID })
      .exec()
      .then((result) => {
        if (result.deletedCount > 0) {
          return res.status(200).json({
            msg: 'Deleted Successfully'
          });
        } else {
          return res.status(400).json({
            msg: 'No Project File Found to Delete'
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
    res.status(500).json(err);
  }
};

// @route     GET   /faculty/files/:fileID
// @desc      View Students Uploaded Files
// @access    Private
module.exports.GetStudentsUploadedFile = async (req, res) => {
  const fileID = req.params.fileID;
  try {
    const projectFile = await ProjectFiles.find({ _id: fileID });

    if (!projectFile) {
      return res.status(404).json({
        msg: 'No Such File Found to View'
      });
    }

    res.json(projectFile);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// @route     POST   /faculty/enotice
// @desc      Upload eNotice
// @access    Private
module.exports.PostUploadENotice = async (req, res) => {
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
};

// @route     POST   /faculty/ereport
// @desc      Generate E-Reporting
// @access    Private
module.exports.PostGenerateEReport = async (req, res) => {
  const { feedback, status } = req.body;
  const { filesId } = req.params;
  try {
    const projectFIle = await ProjectFiles.findOne({ _id: filesId });
    const projectGroup = await ProjectGroup.findOne({
      _id: projectFIle.projectGroup
    });

    // Check if Faculty is Authorized or not
    if (projectGroup.faculty.toString() !== req.faculty.id) {
      return res.status(401).json({
        msg: 'Faculty Unauthorized'
      });
    }

    const newReport = await new eReport({
      discussion: projectFIle.Description,
      feedback,
      faculty: req.faculty.id,
      projectGroup: projectFIle.projectGroup,
      status
    });

    if (!newReport) {
      return res.status(401).json({
        message: 'Something went wrong, Please try again later',
        desc: err
      });
    }

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

    // This will create date as dd/mm/yyyy when report is generated
    const cDate = new Date().getDate();
    const cMonth = new Date().getMonth() + 1;
    const cYear = new Date().getFullYear();

    const FullDate = `${cDate}/${cMonth}/${cYear}`;

    // Code to send email to the above users (Faculty and Students)
    const output = `
          <div class="main" style="text-align: center; font-size: 1.3rem; font-family: Operator SSm; font-style: italic; width: 95%; border: 0.2rem solid black; border-bottom-right-radius: 4rem; border-top-left-radius: 4rem;">
              <div class="header" style="background-color: teal; padding: 1rem; color: aliceblue; border-top-left-radius: 4rem;">
                  Your Report Card
              </div>
              <hr style="border: 1rem solid rgb(104, 214, 159); border-top-right-radius: 90%;">
              <div class="content" style="margin-top: -3.5rem;">
                  <h3>: Message :</h3>
                  <p>Today We have Discusses about :- ${projectFIle.Description} </p> </br>
              </div>
              <hr style="border: 1rem solid rgb(104, 214, 159); border-top-left-radius: 90%;">
              <div class="feedback" style="margin-top: -3rem;">
                  <p>Faculty Feedback</p>
                  <h5>${newReport.feedback}</h5>
              </div>
          </div>
        `;

    const outputForFaculty = `
              <table style="padding: .2rem; user-select: none; background-color: lightgoldenrodyellow; border-radius: 5%;" cellpadding='20' cellspacing='0' align="center" width='80%' >
                  <thead   style="font-family: Operator SSm; font-style: italic; text-align: center;">
                      <td colspan="4">E-Report Project Tracking System</td>
                  </thead>
                  <tr style="background-color: darkslateblue; color: white;">
                      <th>Date</th>
                      <th>Discussion</th>
                      <th>Feedback</th>
                      <th>Uploads</th>
                  </tr>
                  <tbody  style="font-family: verdana;">
                      <tr>
                          <td align="center"> ${FullDate} </td>
                          <td> ${projectFIle.Description} </td>
                          <td> ${newReport.feedback} </td>
                          <td> <a href="${projectFIle.UploadedFile}" target="_blank" >View File</a> </td>
                      </tr>
                      <tr style="font-family: Operator SSm; font-style: bold;color:wheat; text-align: right; font-size: .8rem;">
                          <td colspan="4">
                              Contact Admin For any Query or Complain regarding e-report </br>
                              &copy; ProTraSys
                          </td>
                      </tr>
                  </tbody>
              </table>
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
        subject: `${stu01.name}, Grand Project Report Card : ${FullDate}`, // Subject line
        html: output // html body
      });
    }
    if (stu02Email !== 'undefined') {
      await transporter.sendMail({
        from: `"Pro-Tra-Sys Team 🔖" <bhaainichaal@yahoo.in>`, // sender address
        to: stu02Email, // list of receivers
        subject: `${stu02.name}, Grand Project Report Card : ${FullDate}`, // Subject line
        html: output // html body
      });
    }
    if (stu03Email !== 'undefined') {
      await transporter.sendMail({
        from: `"Pro-Tra-Sys Team 🔖" <bhaainichaal@yahoo.in>`, // sender address
        to: stu03Email, // list of receivers
        subject: `${stu03.name}, Grand Project Report Card : ${FullDate}`, // Subject line
        html: output // html body
      });
    }
    if (stu04Email !== 'undefined') {
      await transporter.sendMail({
        from: `"Pro-Tra-Sys Team 🔖" <bhaainichaal@yahoo.in>`, // sender address
        to: stu04Email, // list of receivers
        subject: `${stu04.name}, Grand Project Report Card : ${FullDate}`, // Subject line
        html: output // html body
      });
    }

    if (facultyEmail !== 'undefined') {
      await transporter.sendMail({
        from: `"Pro-Tra-Sys Team 🔖" <bhaainichaal@yahoo.in>`, // sender address
        to: `${faculty.email}`, // list of receivers
        subject: ` Hello, ${faculty.name}, Grand Project Report Card : ${FullDate}`, // Subject line
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
};

// @route     POST  /faculty/addNewStudent
// @desc      Add New Student
// @access    Private
module.exports.PostAddNewStudent = async (req, res) => {
  const { name, sem, enrollmentId, email, phone, password } = req.body;

  // Encrypting Password using Bcrypt
  var salt = bcrypt.genSaltSync(10);
  var encryptedPassword = bcrypt.hashSync(password, salt);

  try {
    let student = await Student.findOne({ enrollmentId });

    if (student) {
      return res.status(400).json({
        msg: 'Student Already exists with same enrollment ID'
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

    jwt.sign(payload, jwtSecret, { expiresIn: '24h' }, (err, token) => {
      if (err) {
        throw err;
      }
      res.status(200).json({
        msg: `${student.name}, is now ProTraSys Member`,
        StudentData: {
          username: `${student.enrollmentId}`,
          password: `${password}`
        }
      });
    });
    await student.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      Error: err.errmsg || err.message
    });
  }
};

// @route     PATCH  /faculty/updateStudent/:stuId
// @desc      Update the details of existing Student
// @access    Private
module.exports.PatchStudentDetails = async (req, res) => {
  const { stuId } = req.params;
  const {
    name,
    sem,
    enrollmentId,
    email,
    phone,
    password,
    projectGroupId,
    teamLeader
  } = req.body;
  const updatedStudent = {};
  if (name) updatedStudent.name = name;
  if (sem) updatedStudent.sem = sem;
  if (enrollmentId) updatedStudent.enrollmentId = enrollmentId;
  if (email) updatedStudent.email = email;
  if (phone) updatedStudent.phone = phone;
  if (password) {
    const genSalt = bcrypt.genSalt(10);
    const newPassword = bcrypt.hashSync(password, genSalt);
    updatedStudent.password = newPassword;
  }
  if (projectGroupId) updatedStudent.projectGroupId = projectGroupId;
  if (teamLeader) updatedStudent.teamLeader = teamLeader;

  try {
    let faculty = await Faculty.findById(req.faculty.id).select('-password');
    let student = await Student.findOne({ _id: stuId });
    if (!student) {
      return res.status(401).json({
        msg: `${faculty.name}, No Such Student found to update`
      });
    }
    await Student.findOneAndUpdate(
      { _id: stuId },
      { $set: updatedStudent },
      { new: true }
    )
      .exec()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(401).json({
          msg: `Opps! Something went Wrong.. Please Try again after few moments`
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      Error: err.errmsg || err.message
    });
  }
};

// @route     GET   /faculty/getAllStudents
// @desc      Get All Students
// @access    Private
module.exports.GetAllStudents = async (req, res) => {
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
};

// @route     GET /faculty/ereports
// @desc      View All Reportings from your ProjectGroups
// @access    Private
module.exports.GetIndividualFacultyReportings = async (req, res) => {
  try {
    let response = await eReport.find({ faculty: req.faculty.id });

    if (response.length <= 0) {
      return res.status(404).json({
        error: 'You have not done any reporting yet...'
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

// @route     PATCH /faculty/ereports/:groupId
// @desc      Update Reporting Status
// @access    Private
module.exports.PatchEReportings = async (req, res) => {
  const { groupId } = req.params;
  const { status, feedback } = req.body;
  const updatedReport = {};
  if (status) updatedReport.status = status;
  if (feedback) updatedReport.feedback = feedback;

  try {
    const response = await eReport.find({ projectGroup: groupId });

    if (response.length <= 0) {
      return res.status(404).json({
        error: 'There is no group with this Group Id'
      });
    }

    await eReport
      .findOneAndUpdate(
        { projectGroup: groupId },
        { $set: updatedReport },
        { new: true }
      )
      .exec()
      .then((result) => {
        res.status(200).json({
          data: 'Data is Updated',
          result: result
        });
      })
      .catch((err) => {
        res.status(401).json({
          error: `Opps! Something went Wrong.. Please Try again after few moments`
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};
