const mongoose = require('mongoose');
const { databaseString } = require('./index');

const connectDB = async () => {
  await mongoose
    .connect(databaseString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => {
      console.log('мongodв connecтed');
    })
    .catch((err) => {
      console.log('Opps! Something Went Wrong in the Database' + err);
    });
};

module.exports = connectDB;
