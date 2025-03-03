import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(
      "Successfully connected to MongoDB",
      connection.connection.host
    );
  } catch (error) {
    console.error("MongoDb connection error: ", error);
    process.exit(1);
  }
};
