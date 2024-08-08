import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log('db connected');
    return connection;
  } catch (error) {
    console.log({ error });
  }
};


export default connectDb;
