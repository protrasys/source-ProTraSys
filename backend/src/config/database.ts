import mongoose from 'mongoose';
import { databaseString } from './index';

const connectDB = async () => {
  await mongoose
    .connect(databaseString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log('мongodв connecтed');
    })
    .catch((err: any) => {
      console.log('Opps! Something Went Wrong in the Database' + err);
    });
};

export default connectDB;
