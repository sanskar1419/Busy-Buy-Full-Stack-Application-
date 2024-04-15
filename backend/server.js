// Importing necessary files,module etc.
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectUsingMongoose } from "./config/connectToMongoDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import userRouter from "./routes/user.route.js";
import jwtAuth from "./middlewares/jwt.auth.middleware.js";

// Initializing the app
const app = new express();
// Defining Constants
const PORT = process.env.PORT || 8000;

/* Using Middlewares */
app.use(cors());
app.use(express.json());
app.use(cookieParser());

/* Handle Request */
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/user", jwtAuth, userRouter);

// Listening to app
app.listen(PORT, () => {
  connectUsingMongoose();
  console.log(`Server is listening to port :: ${PORT}`);
});
