const mongoose = require('mongoose');
const { databaseString } = require('./index');

const connectDB = async () => {
  try {
    await mongoose.connect(databaseString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('ıllıllı мongodв connecтed ıllıllı');
  } catch (error) {
    console.log('Opps! Something Went Wrong in the Database' + error);
  }
};

module.exports = connectDB;
