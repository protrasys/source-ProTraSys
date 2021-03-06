// Importing Dependencies
import Faculty from '../models/Faculty';
import Student from '../models/Student';
import eNotice from '../models/eNotice';
import eReport from '../models/eReports';
import ProjectGroup from '../models/ProjectGroup';
import ProjectFiles from '../models/ProjectFIles';
import bcrypt from 'bcryptjs';
import { jwtSecret } from '../../config';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export const GetAllFaculty = async (req: any, res: any) => {
  try {
    const faculties = await Faculty.find().select('-password');

    if (faculties.length === 0) {
      return res.status(404).json({
        error: 'No Faculties were found in our record !',
      });
    }
    res.status(200).json(faculties);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

export const PostFacultyLogin = async (req: any, res: any) => {
  const { enrollmentId, password } = req.body;

  try {
    // See if faculty exists or not
    const faculty: any = await Faculty.findOne({ enrollmentId: enrollmentId });

    // Check if faculty not found
    if (!faculty) {
      return res.status(400).json({
        msg: 'Invalid Credentials',
      });
    }

    // Lets match given password with faculty password (from database)
    const isCorrect = await bcrypt.compare(password, faculty.password);

    // Check is password is not valid
    if (!isCorrect) {
      return res.status(400).json({
        msg: 'Invalid Credentials',
      });
    }

    // Sending faculty id in Payload
    const payload = {
      faculty: {
        id: faculty.id,
      },
    };

    // return json web token to frontend
    jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: '24h' },
      (err: any, token: any) => {
        if (!err) {
          return res.json(token);
        }
        throw err;
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: 'Internal Server Error',
      description: err,
    });
  }
};

export const GetIndividualFaculty = async (req: any, res: any) => {
  try {
    const faculty = await Faculty.findById(req.faculty.id).select('-password');
    res.status(200).json(faculty);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

export const PostAddNewProjectGroup = async (req: any, res: any) => {
  const {
    projectName,
    definition,
    stu01,
    stu02,
    stu03,
    stu04,
    technology,
    teamLeader,
  } = req.body;
  try {
    let faculty: any = await Faculty.findById(req.faculty.id).select(
      '-password'
    );
    let projectGroup = new ProjectGroup({
      projectName,
      definition,
      stu01,
      stu02,
      stu03,
      stu04,
      teamLeader,
      technology: technology.split(',').map((tech: any) => tech.trim()),
      faculty: faculty.id,
    });

    await Student.findOneAndUpdate(
      { _id: stu01 },
      {
        $set: {
          projectGroupId: projectGroup._id,
        },
      },
      { new: true }
    );
    await Student.findOneAndUpdate(
      { _id: stu02 },
      {
        $set: {
          projectGroupId: projectGroup._id,
        },
      },
      { new: true }
    );
    await Student.findOneAndUpdate(
      { _id: stu03 },
      {
        $set: {
          projectGroupId: projectGroup._id,
        },
      },
      { new: true }
    );
    await Student.findOneAndUpdate(
      { _id: stu04 },
      {
        $set: {
          projectGroupId: projectGroup._id,
        },
      },
      { new: true }
    );

    await projectGroup.save();
    res.status(200).json({
      msg: `Hello~ ${faculty.name}, Your Group : ${projectName} is now added Successfully`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

export const GetAllProjectGroups = async (req: any, res: any) => {
  try {
    const projectGroups = await ProjectGroup.find().populate(
      'stu01 stu02 stu03 stu04 teamLeader faculty',
      '-password'
    );

    // check if projectGroup available or not
    if (projectGroups.length === 0) {
      return res.status(400).json({
        msg: 'No ProjectGroups Records Found!',
      });
    }

    res.status(200).json({
      data: projectGroups,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

export const GetIndiividualFacultyAllProjectGroups = async (
  req: any,
  res: any
) => {
  try {
    const faculty: any = await Faculty.findOne({ _id: req.faculty.id });
    const myProjectGroups = await ProjectGroup.find({
      faculty: req.faculty.id,
    }).populate('stu01 stu02 stu03 stu04 teamLeader faculty', '-password');

    if (!myProjectGroups) {
      return res.status(400).json({
        msg: `Sorry, ${faculty.name} you have no project groups`,
      });
    }

    res.status(200).json({
      data: myProjectGroups,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

export const GetIndividualProjectGroup = async (req: any, res: any) => {
  const id = req.params.id;
  try {
    const faculty: any = await Faculty.findOne({ _id: req.faculty.id });
    const projectGroup = await ProjectGroup.findOne({ _id: id }).populate(
      'faculty stu01 stu02 stu03 stu04 teamLeader',
      'name profile sem enrollmentId email phone'
    );

    if (!projectGroup) {
      return res.status(400).json({
        msg: `Hey ${faculty.name}, You have no Project Group found with this ID`,
      });
    }

    res.status(200).json(projectGroup);
  } catch (err) {
    console.log(err);
    res.status(200).json({
      err: err,
    });
  }
};

export const DeleteProjectGroup = async (req: any, res: any) => {
  const id = req.params.id;
  try {
    await ProjectGroup.deleteOne({ _id: id })
      .exec()
      .then((result: any) => {
        if (result.deletedCount > 0) {
          return res.status(200).json({
            msg: 'Deleted Successfully',
          });
        } else {
          return res.status(400).json({
            msg: 'No Project Group Found to Delete',
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
        return res.status(400).json({
          err: err,
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: err,
    });
  }
};

export const DeleteProjectFile = async (req: any, res: any) => {
  const fileID = req.params.fileID;
  try {
    const projectFIle: any = await ProjectFiles.findOne({ _id: fileID });

    const groupId = projectFIle.projectGroup;
    const projectGroup: any = await ProjectGroup.findOne({ _id: groupId });

    // If no such file found to delete
    if (!projectFIle) {
      return res.status(400).json({
        msg: 'No Such File found to delete',
      });
    }

    // Check if Faculty is Authorized or not
    if (projectGroup.faculty.toString() !== req.faculty.id) {
      return res.status(401).json({
        msg: 'Faculty Unauthorized',
      });
    }
    await ProjectFiles.deleteOne({ _id: fileID })
      .exec()
      .then((result: any) => {
        if (result.deletedCount > 0) {
          return res.status(200).json({
            msg: 'Deleted Successfully',
          });
        } else {
          return res.status(400).json({
            msg: 'No Project File Found to Delete',
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
        return res.status(400).json({
          err: err,
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const GetStudentsUploadedFile = async (req: any, res: any) => {
  const fileID = req.params.fileID;
  try {
    const projectFile = await ProjectFiles.find({ _id: fileID });

    if (!projectFile) {
      return res.status(404).json({
        msg: 'No Such File Found to View',
      });
    }

    res.json(projectFile);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const PostUploadENotice = async (req: any, res: any) => {
  const { title, description } = req.body;
  try {
    await new eNotice({
      faculty: req.faculty.id,
      title,
      description,
    })
      .save()
      .then((result: any) => {
        res.status(200).json({
          msg: 'Notice is added !',
        });
      })
      .catch((err: any) => {
        res.status(401).json({
          msg: err,
        });
      });
  } catch (err) {
    console.log('POST FACULTY E-NOTICE ROUTE ERROR', err);
    res.status(500).json({
      error: err,
    });
  }
};

export const PostGenerateEReport = async (req: any, res: any) => {
  const { feedback, status } = req.body;
  const { filesId } = req.params;
  try {
    const projectFIle: any = await ProjectFiles.findOne({ _id: filesId });
    const projectGroup: any = await ProjectGroup.findOne({
      _id: projectFIle.projectGroup,
    });

    // Check if Faculty is Authorized or not
    if (projectGroup.faculty.toString() !== req.faculty.id) {
      return res.status(401).json({
        error: 'Faculty Unauthorized',
      });
    }

    await ProjectFiles.findOneAndUpdate(
      { _id: filesId },
      {
        $set: {
          status,
        },
      },
      { new: true }
    );

    const newReport: any = await new eReport({
      discussion: projectFIle.Description,
      file: projectFIle.UploadedFile,
      feedback,
      faculty: req.faculty.id,
      projectGroup: projectFIle.projectGroup,
      status,
    });

    if (!newReport) {
      return res.status(401).json({
        error: 'Something went wrong, Please try again later',
      });
    }

    const faculty: any = await Faculty.findOne({ _id: req.faculty.id });
    const facultyEmail = faculty.email;

    const stu01: any = await Student.findOne({ _id: projectGroup.stu01 });
    const stu01Email = stu01.email;
    const stu02: any = await Student.findOne({ _id: projectGroup.stu02 });
    const stu02Email = stu02.email;
    const stu03: any = await Student.findOne({ _id: projectGroup.stu03 });
    const stu03Email = stu03.email;
    const stu04: any = await Student.findOne({ _id: projectGroup.stu04 });
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
        pass: 'LaW6rXvMANAVEguCHOZAB2V', // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    if (stu01Email !== 'undefined') {
      await transporter.sendMail({
        from: `"Pro-Tra-Sys Team 🔖" <bhaainichaal@yahoo.in>`, // sender address
        to: stu01Email, // list of receivers
        subject: `${stu01.name}, Grand Project Report Card : ${FullDate}`, // Subject line
        html: output, // html body
      });
    }
    if (stu02Email !== 'undefined') {
      await transporter.sendMail({
        from: `"Pro-Tra-Sys Team 🔖" <bhaainichaal@yahoo.in>`, // sender address
        to: stu02Email, // list of receivers
        subject: `${stu02.name}, Grand Project Report Card : ${FullDate}`, // Subject line
        html: output, // html body
      });
    }
    if (stu03Email !== 'undefined') {
      await transporter.sendMail({
        from: `"Pro-Tra-Sys Team 🔖" <bhaainichaal@yahoo.in>`, // sender address
        to: stu03Email, // list of receivers
        subject: `${stu03.name}, Grand Project Report Card : ${FullDate}`, // Subject line
        html: output, // html body
      });
    }
    if (stu04Email !== 'undefined') {
      await transporter.sendMail({
        from: `"Pro-Tra-Sys Team 🔖" <bhaainichaal@yahoo.in>`, // sender address
        to: stu04Email, // list of receivers
        subject: `${stu04.name}, Grand Project Report Card : ${FullDate}`, // Subject line
        html: output, // html body
      });
    }

    if (facultyEmail !== 'undefined') {
      await transporter.sendMail({
        from: `"Pro-Tra-Sys Team 🔖" <bhaainichaal@yahoo.in>`, // sender address
        to: `${faculty.email}`, // list of receivers
        subject: ` Hello, ${faculty.name}, Grand Project Report Card : ${FullDate}`, // Subject line
        html: outputForFaculty, // html body
      });
    }

    res.status(200).json({
      message: 'Report Generated and sent to the Students Mail',
      notice: newReport,
    });

    await newReport.save();
  } catch (err) {
    console.log('POST FACULTY E-REPORT ROUTE ERROR', err);
    res.status(500).json({
      error: 'Internal Server Error',
      desc: err,
    });
  }
};

export const PostAddNewStudent = async (req: any, res: any) => {
  const { name, sem, enrollmentId, email, phone, password } = req.body;

  // Encrypting Password using Bcrypt
  var salt = bcrypt.genSaltSync(10);
  var encryptedPassword = bcrypt.hashSync(password, salt);

  try {
    let student: any = await Student.findOne({ enrollmentId });

    if (student) {
      return res.status(400).json({
        msg: 'Student Already exists with same enrollment ID',
      });
    }

    student = new Student({
      name,
      sem,
      enrollmentId,
      email,
      phone,
      password: encryptedPassword,
    });

    const payload = {
      student: {
        id: student.id,
      },
    };

    jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: '24h' },
      (err: any, token: any) => {
        if (err) {
          throw err;
        }
        res.status(200).json({
          msg: `${student.name}, is now ProTraSys Member`,
          StudentData: {
            username: `${student.enrollmentId}`,
            password: `${password}`,
          },
        });
      }
    );
    await student.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.errmsg || err.message,
    });
  }
};

export const PatchStudentDetails = async (req: any, res: any) => {
  const { stuId } = req.params;
  const {
    name,
    sem,
    enrollmentId,
    email,
    phone,
    password,
    projectGroupId,
  } = req.body;
  const updatedStudent: any = {};
  if (name) updatedStudent.name = name;
  if (sem) updatedStudent.sem = sem;
  if (enrollmentId) updatedStudent.enrollmentId = enrollmentId;
  if (email) updatedStudent.email = email;
  if (phone) updatedStudent.phone = phone;
  if (password) {
    var salt = bcrypt.genSaltSync(10);
    var encryptedPassword = bcrypt.hashSync(password, salt);
    updatedStudent.password = encryptedPassword;
  }
  if (projectGroupId) updatedStudent.projectGroupId = projectGroupId;

  try {
    let faculty: any = await Faculty.findById(req.faculty.id).select(
      '-password'
    );
    let student: any = await Student.findOne({ _id: stuId });
    if (!student) {
      return res.status(401).json({
        msg: `${faculty.name}, No Such Student found to update`,
      });
    }
    await Student.findOneAndUpdate(
      { _id: stuId },
      { $set: updatedStudent },
      { new: true }
    )
      .exec()
      .then((result: any) => {
        res.status(200).json({
          msg: 'Student Updated',
          result,
        });
      })
      .catch((err: any) => {
        res.status(401).json({
          msg: `Opps! Something went Wrong.. Please Try again after few moments`,
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.errmsg || err.message,
    });
  }
};

export const GetAllStudents = async (req: any, res: any) => {
  try {
    const students = await Student.find().populate('projectGroupId');

    if (students.length === 0) {
      return res.status(404).json({
        error: 'No Students were found in our record !',
      });
    }
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

export const GetIndividualFacultyReportings = async (req: any, res: any) => {
  try {
    let response = await eReport.find({ faculty: req.faculty.id });

    if (response.length <= 0) {
      return res.status(404).json({
        error: 'You have not done any reporting yet...',
      });
    }

    res.status(200).json({
      data: response,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

export const PatchEReportings = async (req: any, res: any) => {
  const { groupId } = req.params;
  const { status, feedback } = req.body;
  const updatedReport: any = {};
  if (status) updatedReport.status = status;
  if (feedback) updatedReport.feedback = feedback;

  try {
    const response = await eReport.find({ projectGroup: groupId });

    if (response.length <= 0) {
      return res.status(404).json({
        error: 'There is no group with this Group Id',
      });
    }

    await eReport
      .findOneAndUpdate(
        { projectGroup: groupId },
        { $set: updatedReport },
        { new: true }
      )
      .exec()
      .then((result: any) => {
        res.status(200).json({
          data: 'Data is Updated',
          result: result,
        });
      })
      .catch((err: any) => {
        res.status(401).json({
          error: `Opps! Something went Wrong.. Please Try again after few moments`,
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};
