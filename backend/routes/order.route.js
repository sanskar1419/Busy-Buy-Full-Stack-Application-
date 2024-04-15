/* Importing necessary file, module and package , and creating instances of them */
import express from "express";
import OrderController from "../controllers/order.controller.js";

/* Using express.Router() to create new Router Object */
const orderRouter = express.Router();
/* Creating new instance of class OrderController to access it method */
const orderController = new OrderController();

/* Handle Request */
orderRouter.post("/", orderController.orderItem);

/* Exporting */
export default orderRouter;
