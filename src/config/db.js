import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
    console.log("Database connected successfully: ",connectionInstance.connection.host);
  } catch (error) {
    console.log("db error", error.message);
  }
};

export default connectDB;
