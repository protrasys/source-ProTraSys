// Importing Dependencies
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const databaseConnectionHandler = require('./config/database');

// Importing Routes
const StudentRoutes = require('./api/routes/student');

// Database Connection
databaseConnectionHandler();

// Handling Cross Origin Resource Sharing
app.use(cors());

// Declare Middleware
app.use(
  express.json({
    extended: false
  })
);

app.use('/', StudentRoutes);

// Temporary Handling Home Page
app.use('/', (req, res) => {
  res.send(
    '<h1 align="center">Testing Backend Kindly contact to <a target="_blank" href="https://github.com/protrasys">PROTRASYS - ADMIN</a></h1>'
  );
});

// Listening port to create server
app.listen(port, (error) => {
  if (!error) {
    console.log(`Backend Port: ${port}`);
  }
});
