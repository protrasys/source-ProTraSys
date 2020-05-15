// Importing Dependencies
import Admin from '../models/Admin';
import eNotice from '../models/eNotice';
import eReports from '../models/eReports';
import Faculty from '../models/Faculty';
import Student from '../models/Student';
import ProjectGroup from '../models/ProjectGroup';
import ProjectFIles from '../models/ProjectFIles';
import bcrypt from 'bcryptjs';
import { jwtSecret } from '../../config';
import jwt from 'jsonwebtoken';

export const PostAddNewFaculty = async (req: any, res: any) => {
  const {
    name,
    from,
    profile,
    enrollmentId,
    email,
    phone,
    designation,
    skills,
    password,
  } = req.body;

  try {
    // See if Faculty already exists with same enrollment ID
    let faculty: any = await Faculty.findOne({ enrollmentId: enrollmentId });

    if (faculty) {
      return res.status(400).json({
        msg: 'Faculty already exists with same enrollment ID',
      });
    }

    // Encrypting Password using Bcrypt
    var salt = bcrypt.genSaltSync(10);
    var encryptedPassword = bcrypt.hashSync(password, salt);

    faculty = new Faculty({
      name,
      date: {
        from,
      },
      profile,
      enrollmentId,
      email,
      phone,
      designation,
      skills: skills.split(',').map((skill: any) => skill.trim()),
      password: encryptedPassword,
    });
    await faculty.save();

    const payload = {
      faculty: {
        id: faculty.id,
      },
    };

    jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: '24h' },
      (err: any, token: any) => {
        if (err) throw err;
        res.status(200).json({
          msg: `${faculty.name}, You are welcome to the ProTraSys Family !🙏`,
          token,
        });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      Error: err.errmsg || err.message,
    });
  }
};

export const PostAddNewAdmin = async (req: any, res: any) => {
  const { AID, name, password } = req.body;
  try {
    // check if an admin already exists
    let admin: any = await Admin.findOne({ _id: AID });

    if (admin) {
      return res.status(400).json({
        msg: `Admin already exists with same ${AID}`,
      });
    }

    // hash current admin password
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(password, salt);

    // Sending data to an object
    admin = new Admin({
      _id: AID,
      name,
      password: encryptedPassword,
    });

    // Creating Payload for frontend
    const payload = {
      admin: {
        id: admin.id,
      },
    };

    admin
      .save()
      .then(() => {
        // returning jwt
        jwt.sign(
          payload,
          jwtSecret,
          { expiresIn: '24h' },
          (err: any, token: any) => {
            if (err) {
              throw err;
            } else {
              return res.status(200).json({
                msg: `${admin.name}, You are welcome to the ProTraSys Family !🙏`,
                token,
              });
            }
          }
        );
      })
      .catch((mongoErr: any) => {
        return res.status(500).json({
          err: mongoErr.message,
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      Error: err.errmsg || err.message,
    });
  }
};

export const PostAdminLogin = async (req: any, res: any) => {
  const { AID, password } = req.body;
  try {
    // Lets FInd the Admin first
    const admin: any = await Admin.findOne({ _id: AID });

    // If Admin does not found
    if (!admin) {
      return res.status(400).json({
        error: 'Invalid Credentials',
      });
    }

    // Now match the password
    const isCorrect = await bcrypt.compare(password, admin.password);

    if (!isCorrect) {
      return res.status(400).json({
        error: 'Invalid Credentials',
      });
    }

    // Sending Admin id in Payload
    const payload = {
      admin: {
        id: admin.id,
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
            msg: `${admin.name}, Welcome Back 😉`,
            token,
          });
        }
        throw err;
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.errmsg || err.message,
    });
  }
};

export const GetIndividualAdmin = async (req: any, res: any) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    res.status(200).json(admin);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

export const GetAllAdmins = async (req: any, res: any) => {
  try {
    const admins = await Admin.find().select('-password');

    // Check is no admin found
    if (admins.length === 0) {
      return res.status(400).json({
        msg: 'No More Admins Found',
      });
    }

    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

export const DeleteFaculty = async (req: any, res: any) => {
  const id = req.params.id;
  try {
    // Check if Faculty exists with same id
    let faculty = await Faculty.findById(id);

    if (!faculty) {
      return res.status(400).json({
        msg: 'No Faculty Found',
      });
    }

    await Faculty.deleteOne({ _id: id });
    res.status(200).json({
      msg: 'Faculty Removed',
    });
  } catch (err) {
    res.status(500).json({
      err: err,
    });
  }
};

export const DeleteStudent = async (req: any, res: any) => {
  const id = req.params.id;
  try {
    // Check if Student exists with same id
    let student = await Student.findById(id);

    if (!student) {
      return res.status(400).json({
        msg: 'No Student Found',
      });
    }

    await Student.deleteOne({ _id: id });
    res.status(200).json({
      msg: 'Student Removed',
    });
  } catch (err) {
    res.status(500).json({
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

export const DeleteENotice = async (req: any, res: any) => {
  const noticeId = req.params.noticeId;
  try {
    await eNotice
      .deleteOne({ _id: noticeId })
      .exec()
      .then((result: any) => {
        if (result.deletedCount > 0) {
          return res.status(200).json({
            msg: 'Deleted Successfully',
          });
        } else {
          return res.status(400).json({
            msg: 'No eNotice Found to Delete',
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
    console.log('DELETE ADMIN E-NOTICE ROUTE ERROR', err);
    res.status(500).json({
      error: 'Internal Server Error',
      desc: err,
    });
  }
};

export const countAllDocuments = async (req: any, res: any) => {
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
      allProjectFiles,
    });
  } catch (err) {
    console.log('GET ADMIN COUNTALLDOCUMENTS ROUTE ERROR', err);
    res.status(500).json({
      error: 'Internal Server Error',
      desc: err,
    });
  }
};

export const getAllData = async (req: any, res: any) => {
  try {
    const Students = await Student.find();
    const Faculties = await Faculty.find();
    const ENotices = await eNotice.find();
    const EReports = await eReports.find();
    const ProjectFiles = await ProjectFIles.find();
    const ProjectGroups = await ProjectGroup.find();

    res.json({
      ENotices,
      EReports,
      Faculties,
      Students,
      ProjectGroups,
      ProjectFiles,
    });
  } catch (err) {
    console.log('GET ALL ADMIN DATA BACKEND ERROR', err);
    res.status(500).json({
      error: 'Internal Server Error',
      desc: err,
    });
  }
};
