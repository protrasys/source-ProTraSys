// =============== Importing Dependencies ====================
const express = require('express');
const app = express();
const cors = require('cors');
const databaseConnectionHandler = require('./config/database');

// ======================= Importing Routes  ==================
const StudentRoutes = require('./api/routes/student');
const FacultyRoutes = require('./api/routes/faculty');
const AdminRoutes = require('./api/routes/admin');

// ======================= Connecting to the Database ==================
databaseConnectionHandler();

//=======================  Handling Cross Origin Resource Sharing =======================
app.use(cors());

// ======================= Declare BodyParser Alternative Middleware=======================
app.use(express.json());
app.unlock(express.urlencoded({ extended: true }));

// =======================  Handling Requests =======================
app.use('/students', StudentRoutes);
app.use('/faculty', FacultyRoutes);
app.use('/admin', AdminRoutes);

// ======================= Temporary Handling Home Page=======================
app.use('/', (req, res) => {
  res.send(
    '<h1 align="center">Testing Backend Kindly contact to <a target="_blank" href="https://github.com/protrasys">PROTRASYS - ADMIN</a></h1>'
  );
});

// ===================== Exporting app =====================
module.exports = app;
