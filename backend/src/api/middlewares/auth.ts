// importing dependencies
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../../config';

// Handling Middleware Function
export const adminAuth = (req: any, res: any, next: any) => {
  // Get token from headers
  const jwtToken = req.headers.authorization;
  const token = jwtToken.substr(7);

  // Check if token is not valid or not available
  if (!token) {
    return res.status(401).json({
      msg: 'Authorization Failed',
    });
  }

  // Verify the token
  try {
    const decoded: any = jwt.verify(token, jwtSecret);
    req.admin = decoded.admin;
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'Token is not Valid',
      fullEerror: err,
    });
  }
};

export const studentAuth = (req: any, res: any, next: any) => {
  // Get token from headers
  const jwtToken = req.headers.authorization;
  const token = jwtToken.substr(7);

  // Check if token is not valid or not available
  if (!token) {
    return res.status(401).json({
      msg: 'Authorization Failed',
    });
  }

  // Verify the token
  try {
    const decoded: any = jwt.verify(token, jwtSecret);
    req.student = decoded.student;
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'Token is not Valid',
      fullEerror: err,
    });
  }
};

export const facultyAuth = (req: any, res: any, next: any) => {
  // Get token from headers
  const jwtToken = req.headers.authorization;
  const token = jwtToken.substr(7);

  // Check if token is not valid or not available
  if (!token) {
    return res.status(401).json({
      msg: 'Authorization Failed',
    });
  }

  // Verify the token
  try {
    const decoded: any = jwt.verify(token, jwtSecret);
    req.faculty = decoded.faculty;
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'Token is not Valid',
      fullEerror: err,
    });
  }
};
