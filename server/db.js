import mongoose from "mongoose";
import { MONGO_URL } from "./config.js";

export async function connectDB() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(MONGO_URL, { serverSelectionTimeoutMS: 15000 });
  console.log("[db] connected:", mongoose.connection.name);
  return mongoose.connection;
}
