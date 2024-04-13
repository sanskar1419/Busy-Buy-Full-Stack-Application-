/* Importing necessary files, module etc. */
import Product from "../models/product.model.js";

/* Defining  ProductController class and its method*/
export default class ProductController {
  /* Get all products method */
  async getAllProduct(req, res) {
    try {
      /* Fetching all the products from the database */
      const products = await Product.find({});
      /* Sending the product array in response */
      res.status(200).json(products);
    } catch (err) {
      /* Handling error */
      console.log(
        "Error in getAllProduct method of ProductController Class",
        err
      );
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }

  /* Add New Product Method */
  async addProduct(req, res) {
    try {
      /* Destructuring values from req body */
      const { brand, imageURL, name, type, mrp, rating, price } = req.body;
      /* Creating new document for product in Product collection */
      const product = await Product.create({
        brand,
        imageURL,
        name,
        type,
        mrp,
        price,
        rating,
      });
      /* Sending the created product document */
      res.status(201).json(product);
    } catch (err) {
      /* Handling Error */
      console.log("Error in addProduct method of ProductController", err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
}
