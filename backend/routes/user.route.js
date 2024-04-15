/* Importing necessary file, module and package , and creating instances of them */
import express from "express";
import cartRouter from "./cart.route.js";
import orderRouter from "./order.route.js";
import UserController from "../controllers/user.controller.js";

/* Using express.Router() to create new router object */
const userRouter = express.Router();
/* Creating instance of class CartController to access its method */
const userController = new UserController();

/* Handling Request */
userRouter.get("/", userController.getUserData);
userRouter.use("/cart", cartRouter);
userRouter.use("/order", orderRouter);

/* Exporting */
export default userRouter;
