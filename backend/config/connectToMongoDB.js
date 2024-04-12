/* Importing the necessary file, module etc */
import mongoose from "mongoose";
import dotenv from "dotenv";

/* Loading the environment variables */
dotenv.config();
const url = process.env.DB_URL;

/* Function to connect to the mongoDB database */
export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(url);
    console.log("Mongodb connected using mongoose");
  } catch (err) {
    console.log("Error while connecting to db");
    console.log(err);
  }
};
