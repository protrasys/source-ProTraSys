// importing dependencies
const jwt = require('jsonwebtoken');
const config = require('config');

// Handling Middleware Function
module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if token is not valid or not available
  if (!token) {
    return res.status(401).json({
      msg: 'Authorization Failed'
    });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.student = decoded.student;
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'Token is not Valid',
      fullEerror: err
    });
  }
};
