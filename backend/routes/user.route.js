import express from "express";
import cartRouter from "./cart.route.js";

const userRouter = express.Router();

userRouter.use("/cart", cartRouter);

export default userRouter;
