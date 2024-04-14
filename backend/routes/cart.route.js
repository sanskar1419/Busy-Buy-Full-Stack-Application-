import express from "express";
import CartController from "../controllers/cart.controller.js";

const cartRouter = express.Router();
const cartController = new CartController();

cartRouter.post("/add", cartController.addProductToCart);

export default cartRouter;
