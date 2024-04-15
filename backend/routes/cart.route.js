/* Importing necessary file, module and package , and creating instances of them */
import express from "express";
import CartController from "../controllers/cart.controller.js";

/* Using express.Router() to create new router object */
const cartRouter = express.Router();
/* Creating instance of class CartController to access its method */
const cartController = new CartController();

/* Handling Request */
cartRouter.post("/add", cartController.addProductToCart);
cartRouter.delete("/delete", cartController.deleteProduct);
cartRouter.post("/increaseQuantity", cartController.increaseProductQuantity);
cartRouter.post("/decreaseQuantity", cartController.decreaseProductQuantity);

/* Exporting */
export default cartRouter;
