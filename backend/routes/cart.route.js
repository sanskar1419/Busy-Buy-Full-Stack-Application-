import express from "express";
import CartController from "../controllers/cart.controller.js";

const cartRouter = express.Router();
const cartController = new CartController();

cartRouter.post("/add", cartController.addProductToCart);
cartRouter.delete("/delete", cartController.deleteProduct);
cartRouter.post("/increaseQuantity", cartController.increaseProductQuantity);
cartRouter.post("/decreaseQuantity", cartController.decreaseProductQuantity);

export default cartRouter;
