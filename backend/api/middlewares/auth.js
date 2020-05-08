// importing dependencies
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config');

// Handling Middleware Function
module.exports.adminAuth = (req, res, next) => {
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
    const decoded = jwt.verify(token, jwtSecret);
    req.admin = decoded.admin;
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'Token is not Valid',
      fullEerror: err,
    });
  }
};

module.exports.studentAuth = (req, res, next) => {
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
    const decoded = jwt.verify(token, jwtSecret);
    req.student = decoded.student;
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'Token is not Valid',
      fullEerror: err,
    });
  }
};

module.exports.facultyAuth = (req, res, next) => {
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
    const decoded = jwt.verify(token, jwtSecret);
    req.faculty = decoded.faculty;
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'Token is not Valid',
      fullEerror: err,
    });
  }
};
