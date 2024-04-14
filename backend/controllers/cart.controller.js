import CartItem from "../models/cartItem.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export default class CartController {
  async addProductToCart(req, res) {
    try {
      const { productId, userId } = req.body;
      const user = await User.findById(userId).populate("cartItems");
      if (!user) {
        return res.status(400).json({
          error: "User Doesn't Exist",
        });
      }
      // console.log("User : ", user);
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(400).json({
          error: "Product Doesn't Exist",
        });
      }

      // console.log("Product : ", product);
      const productIndex = user.cartItems.findIndex(
        (p) => p.product.toString() === product.id
      );

      if (productIndex === -1) {
        const newCartItem = await CartItem.create({
          user: user,
          product: product,
          quantity: 1,
        });
        user.cartItems.push(newCartItem);
      } else {
        const existingCartItem = await CartItem.findOne({
          product: product.id,
          user: user.id,
        });
        existingCartItem.quantity++;
        existingCartItem.save();
        user.cartItems[productIndex].quantity++;
      }
      user.save();
      console.log(user);
      return res.status(200).json({
        message: "Product Added Successfully",
      });
    } catch (err) {
      /* If there are some error then printing the error and sending the internal server error */
      console.log(
        "Error in addProductToCart method of CartController class",
        err
      );
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
}
