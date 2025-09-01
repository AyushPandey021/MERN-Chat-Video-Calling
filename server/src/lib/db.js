import mongoose from "mongoose";

export const connectDB = async () => {
  try {
      const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected:🎉`);
  } catch (error) {
    console.log("Error in connecting to MongoDB", error);
    process.exit(1);
  }
};
