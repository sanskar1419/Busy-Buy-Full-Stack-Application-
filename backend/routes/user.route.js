import express from "express";
import cartRouter from "./cart.route.js";
import orderRouter from "./order.route.js";
import UserController from "../controllers/user.controller.js";

const userRouter = express.Router();
const userController = new UserController();

userRouter.get("/", userController.getUserData);
userRouter.use("/cart", cartRouter);
userRouter.use("/order", orderRouter);

export default userRouter;
