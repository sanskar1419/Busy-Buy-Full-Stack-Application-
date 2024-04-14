import express from "express";
import OrderController from "../controllers/order.controller.js";

const orderRouter = express.Router();
const orderController = new OrderController();

orderRouter.post("/", orderController.orderItem);

export default orderRouter;
