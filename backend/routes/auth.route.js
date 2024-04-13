/* Importing Necessary file, module etc. */
import express from "express";
import AuthController from "../controllers/auth.controller.js";
import signUpDataMiddleware from "../middlewares/signUpDataMiddleware.js";

/* Using express.Router() to create a new router object */
const authRouter = express.Router();
/* Create an instance of an object that has a constructor function. */
const authController = new AuthController();

/* Using authRouter object to handle different request */
authRouter.post("/signup", signUpDataMiddleware, authController.signUp);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);

/* Default Export */
export default authRouter;
