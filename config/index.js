const dotenv = require('dotenv');

// ======================== Reading .env Variables ===============
dotenv.config();

// ===================== Exporting Credentials =========================
module.exports = {
  databaseString: process.env.MONGOURL,
  jwtSecret: process.env.jwtSecret,
  port: process.env.PORT || 5000
};
