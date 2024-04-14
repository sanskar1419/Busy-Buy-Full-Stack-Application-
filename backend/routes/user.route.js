import express from "express";
import cartRouter from "./cart.route.js";
import orderRouter from "./order.route.js";

const userRouter = express.Router();

userRouter.use("/cart", cartRouter);
userRouter.use("/order", orderRouter);

export default userRouter;
