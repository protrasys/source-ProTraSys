// Importing Dependencies
import Student from '../models/Student';
import eNotice from '../models/eNotice';
import eReport from '../models/eReports';
import ProjectGroup from '../models/ProjectGroup';
import ProjectFIles from '../models/ProjectFIles';
import bcrypt from 'bcryptjs';
import { jwtSecret } from '../../config';
import jwt from 'jsonwebtoken';

export const GetIndividualStudent = async (req: any, res: any) => {
  try {
    const student: any = await Student.findById(req.student.id)
      .select('-password')
      .populate('projectGroupId')
      .exec();
    const projectGroup = await ProjectGroup.findById(
      student.projectGroupId._id
    ).populate('stu01 stu02 stu03 stu04 teamLeader faculty');

    if (!student) {
      return res.status(404).json({
        msg: 'No Student Record Found',
      });
    }
    res.status(200).json({ student, group: projectGroup });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

export const PostStudentLogin = async (req: any, res: any) => {
  const { enrollmentId, password } = req.body;

  try {
    // See if student exists or not
    const student: any = await Student.findOne({ enrollmentId: enrollmentId });

    // Check if student not found
    if (!student) {
      return res.status(400).json({
        msg: 'Invalid Credentials',
      });
    }

    // Lets match given password with students password (from database)
    const isCorrect = await bcrypt.compare(password, student.password);

    // Check is password is not valid
    if (!isCorrect) {
      return res.status(400).json({
        msg: 'Invalid Credentials',
      });
    }

    // Sending Student id in Payload
    const payload = {
      student: {
        id: student.id,
      },
    };

    // return json web token to frontend
    jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: '24h' },
      (err: any, token: any) => {
        if (!err) {
          return res.json({
            msg: `${student.name}, Welcome Back 😉`,
            token,
            student,
          });
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

export const PostUploadFile = async (req: any, res: any) => {
  const projectId = req.params.projectId;
  const { UploadedFile, Description } = req.body;
  try {
    const projectGroup = await ProjectGroup.findOne({ _id: projectId });

    if (!projectGroup) {
      return res.status(400).json({
        msg: 'No Project Group Found',
      });
    }

    await new ProjectFIles({
      StudentID: req.student.id,
      projectGroup: projectId,
      UploadedFile: UploadedFile,
      Description: Description,
      status: 'pending',
    })
      .save()
      .then(async (result: any) => {
        await ProjectGroup.findOneAndUpdate(
          { _id: projectId },
          {
            $set: {
              projectFiles: result._id,
            },
          },
          { new: true }
        );
        res.status(200).json({
          msg: 'File Uploaded...',
          result,
        });
      })
      .catch((err: any) => {
        res.status(403).json({
          msg: 'Opps! Something Went Wrong... Please try after few moments',
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

export const GetViewNotice = async (req: any, res: any) => {
  try {
    await eNotice
      .find()
      .populate('faculty', 'name')
      .exec()
      .then((result: any) => {
        if (result.length > 0) {
          return res.status(200).json({
            eNotice: result,
          });
        } else {
          return res.status(404).json({
            message: 'No more eNotice, Kindly visit sometimes later',
          });
        }
      })
      .catch((err: any) => {
        res.status(401).json({
          message: 'Something went wrong, Please try again later',
          desc: err,
        });
      });
  } catch (err) {
    console.log('GET STUDENT E-NOTICE ROUTE ERROR', err);
    res.status(500).json({
      error: 'Internal Server Error',
      desc: err,
    });
  }
};

export const GetEReports = async (req: any, res: any) => {
  const { groupId } = req.params;
  try {
    const response = await eReport.find({ projectGroup: groupId });

    if (response.length <= 0) {
      return res.status(404).json({
        error: 'There is No reporting done yet from your Group...',
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

export const GetUploadedProjectFileByMyGroup = async (req: any, res: any) => {
  const { groupId } = req.params;
  try {
    const response = await ProjectFIles.find({ projectGroup: groupId });

    if (response.length <= 0) {
      return res.status(404).json({
        error: 'There is No File uploaded yet from your Group...',
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
