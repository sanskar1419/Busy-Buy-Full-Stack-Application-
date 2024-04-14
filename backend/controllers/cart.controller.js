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

  async deleteProduct(req, res) {
    try {
      const { productId, userId } = req.body;
      const user = await User.findById(userId).populate("cartItems");
      if (!user) {
        return res.status(400).json({
          error: "User Doesn't Exist",
        });
      }

      const productIndex = user.cartItems.findIndex(
        (p) => p.product.toString() === productId
      );

      if (productIndex === -1) {
        return res.status(400).json({
          error: "Product Not Available In Cart",
        });
      }

      user.cartItems.splice(productIndex, 1);
      await CartItem.deleteOne({ product: productId, user: userId });

      user.save();

      res.status(200).json({
        message: "Product Deleted Successfully",
      });
    } catch (err) {
      /* If there are some error then printing the error and sending the internal server error */
      console.log("Error in deleteProduct method of CartController class", err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }

  async increaseProductQuantity(req, res) {
    try {
      const { productId, userId } = req.body;
      const user = await User.findById(userId).populate("cartItems");
      if (!user) {
        return res.status(400).json({
          error: "User Doesn't Exist",
        });
      }

      const productIndex = user.cartItems.findIndex(
        (p) => p.product.toString() === productId
      );

      const cartItem = await CartItem.findOne({
        product: productId,
        user: userId,
      });

      if (productIndex === -1 || !cartItem) {
        return res.status(400).json({
          error: "Product Doesn't Exist In Cart",
        });
      }

      cartItem.quantity++;
      user.cartItems[productIndex].quantity++;
      cartItem.save();
      user.save();

      return res.status(200).json({
        message: "Quantity Increased by One",
      });
    } catch (err) {
      /* If there are some error then printing the error and sending the internal server error */
      console.log(
        "Error in increaseProductQuantity method of CartController class",
        err
      );
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }

  async decreaseProductQuantity(req, res) {
    try {
      const { productId, userId } = req.body;
      const user = await User.findById(userId).populate("cartItems");
      if (!user) {
        return res.status(400).json({
          error: "User Doesn't Exist",
        });
      }

      const productIndex = user.cartItems.findIndex(
        (p) => p.product.toString() === productId
      );

      const cartItem = await CartItem.findOne({
        product: productId,
        user: userId,
      });

      if (productIndex === -1 || !cartItem) {
        return res.status(400).json({
          error: "Product Doesn't Exist In Cart",
        });
      }

      if (cartItem.quantity > 1 || user.cartItems[productIndex].quantity > 1) {
        cartItem.quantity--;
        user.cartItems[productIndex].quantity--;
        cartItem.save();
        user.save();
        console.log(user);
      } else {
        return res.status(400).json({
          error: "Can't decrease quantity below 1 ",
        });
      }
    } catch (err) {
      /* If there are some error then printing the error and sending the internal server error */
      console.log(
        "Error in decreaseProductQuantity method of CartController class",
        err
      );
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
}
