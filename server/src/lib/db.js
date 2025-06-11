import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect("mongodb://127.0.0.1:27017/livechat");
    console.log(`MongoDB connected:🎉`);
  } catch (error) {
    console.log("Error in connecting to MongoDB", error);
    process.exit(1);
  }
};
