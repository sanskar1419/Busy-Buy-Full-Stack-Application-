/* Importing necessary files, module etc. */
import express from "express";
import ProductController from "../controllers/product.controller.js";

/* Using expressRouter() to create new router object */
const productRouter = express.Router();
/* Creating the new instance of ProductController class*/
const productController = new ProductController();

/* Using productRouter to handle different request */
productRouter.get("/", productController.getAllProduct);
productRouter.post("/add/", productController.addProduct);

/* Exporting productRouter */
export default productRouter;
