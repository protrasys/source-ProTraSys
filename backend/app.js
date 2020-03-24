// =============== Importing Dependencies ====================
const express = require("express");
const app = express();
const cors = require("cors");
const databaseConnectionHandler = require("./config/database");
const path = require("path");

// ======================= Importing Routes  ==================
const StudentRoutes = require("./api/routes/student");
const FacultyRoutes = require("./api/routes/faculty");
const AdminRoutes = require("./api/routes/admin");

// ======================= Connecting to the Database ==================
databaseConnectionHandler();

//=======================  Handling Cross Origin Resource Sharing =======================
app.use(cors());

// ======================= Declare BodyParser Alternative Middleware=======================
app.use(express.json());
app.unlock(express.urlencoded({ extended: true }));

// =======================  Handling Requests =======================
app.use("/students", StudentRoutes);
app.use("/faculty", FacultyRoutes);
app.use("/admin", AdminRoutes);

// ======================= Serve Static assets in production =======================
app.use(express.static("../frontend/build/"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// ===================== Exporting app =====================
module.exports = app;
