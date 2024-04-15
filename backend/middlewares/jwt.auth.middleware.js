// Importing necessary file, module and package , and creating instances of them
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
dotenv.config();

const jwtAuth = async (req, res, next) => {
  // Read the token
  const token = req.cookies.jwt;
  //   console.log("This is your token : ", token);

  // If no token, return error
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // check if token is valid or not
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload) {
      return res.status(401).json({ error: "Unauthorized - invalid token" });
    }

    const user = await User.findById(payload.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // console.log(user);
    req.user = user;
  } catch (error) {
    // return err
    console.log(error);
    return res.status(401).send("Unauthorized");
  }
  // call the next middleware
  next();
};

// Exporting jwtAuth
export default jwtAuth;
