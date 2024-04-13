/* Importing necessary files,module etc. */
import generateTokenAndSetCookie from "../utils/generateJwt.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

/* Defining AuthController class and there asynchronous method */
export default class AuthController {
  /* SignUp method */
  async signUp(req, res) {
    try {
      /* Destructuring data from request body */
      const { username, password } = req.body;
      /* Checking weather user with the given user name already exist or not */
      const user = await User.findOne({ username });
      /* If user with the received username already exist then just return */
      if (user) {
        return res.status(400).json({ error: "User Already Exist" });
      }

      /* If user with the received username doesn't exist then first hashed the password using bcrypt */
      /* Hashing Password */
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      /* Creating the newUser document using create method of mongoDB inside user collection */
      const newUser = await User.create({
        username,
        password: hashedPassword,
      });

      /* If document created in User collection */
      if (newUser) {
        /* Using  generateTokenAndSetCookie function to generate JWT token and setting it to res.cookie*/
        generateTokenAndSetCookie(newUser._id, res);
        /* Sending the json response to frontend with 201 created status */
        return res.status(201).json({
          _id: newUser._id,
          username: newUser.username,
        });
      } else {
        /* If for some reason the new user document doesn't created into the User collection sending the 400 bad request response */
        return res.status(400).json({
          error: "Something went wrong",
        });
      }
    } catch (err) {
      /* If there are some error then printing the error and sending the internal server error */
      console.log("Error in Sign Up Controller Action", err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }

  /* Login Method */
  async login(req, res) {
    try {
      /* Destructuring the the data from req.body */
      const { username, password } = req.body;
      /* Checking weather user with the requested username exist in our User collection or not */
      const user = await User.findOne({ username: username });
      /* If not exist returning the response 400 bad request */
      if (!user) {
        return res.status(400).json({
          error: "Invalid Credentials",
        });
      }
      /* If user name matches checking weather received password is user password */
      const passwordMatch = await bcrypt.compare(password, user.password);

      /* If password didn't matches returning the 400 bad request response */
      if (!passwordMatch) {
        return res.status(400).json({
          error: "Invalid Credentials",
        });
      }

      /* If password matches generation the jwt token and setting the token to res.cookie */
      generateTokenAndSetCookie(user._id, res);

      /* Sending the ok response */
      res.status(200).json({
        _id: user._id,
        username: user.username,
      });
    } catch (err) {
      /* If there are some error then printing the error and sending the internal server error */
      console.log("Error in Login Controller", err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }

  /* Logout Method */
  async logout(req, res) {
    try {
      /* Emptying the jwt token from the cookie */
      res.cookie("jwt", "", { maxAge: 0 });
      /* Sending the ok response */
      res.status(200).json({
        message: "Logged out successfully",
      });
    } catch (err) {
      /* If there are some error then printing the error and sending the internal server error */
      console.log("Error in logout Controller", err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
}
