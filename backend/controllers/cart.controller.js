/* Importing necessary files, module etc. */
import CartItem from "../models/cartItem.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

/* Defining class CartController and its method */
export default class CartController {
  /* addProductToCart method */
  async addProductToCart(req, res) {
    try {
      /* Destructuring id from req.user */
      const { id } = req.user;
      /* Destructuring productId from req.body */
      const { productId } = req.body;
      /* Finding the user based on id and populating it */
      const user = await User.findById(id).populate("cartItems");
      /* If the user is not there sending the response User Doesn't Exist */
      if (!user) {
        return res.status(400).json({
          error: "User Doesn't Exist",
        });
      }
      /* Finding the product based on productId */
      const product = await Product.findById(productId);
      /* If the product is not there sending the response Product Doesn't Exist */
      if (!product) {
        return res.status(400).json({
          error: "Product Doesn't Exist",
        });
      }

      /* Finding the productIndex if the product exist in cart*/
      const productIndex = user.cartItems.findIndex(
        (p) => p.product.toString() === product.id
      );

      /* If product doesn't in cart creating a new CartItem Document and pushing it to user.cartItems array */
      if (productIndex === -1) {
        const newCartItem = await CartItem.create({
          user: user,
          product: product,
          quantity: 1,
        });
        user.cartItems.push(newCartItem);
      } else {
        /* If product exist Finding the existingProduct in cart and increasing its quantity */
        const existingCartItem = await CartItem.findOne({
          product: product.id,
          user: user.id,
        });
        existingCartItem.quantity++;
        existingCartItem.save();
        user.cartItems[productIndex].quantity++;
      }
      user.save();
      /* Sending the Product Added Successfully response */
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

  /* deleteProduct method */
  async deleteProduct(req, res) {
    try {
      /* Destructuring id from req.user */
      const { id } = req.user;
      /* Destructuring productId from req.body */
      const { productId } = req.body;
      /* Finding the user based on id and populating it */
      const user = await User.findById(id).populate("cartItems");
      /* If the user is not there sending the response User Doesn't Exist */
      if (!user) {
        return res.status(400).json({
          error: "User Doesn't Exist",
        });
      }
      /* Finding the productIndex if the product exist in cart*/
      const productIndex = user.cartItems.findIndex(
        (p) => p.product.toString() === productId
      );

      /* If productIndex is -1 sending the response Product Not Available In Cart*/
      if (productIndex === -1) {
        return res.status(400).json({
          error: "Product Not Available In Cart",
        });
      }

      /* If product exist removing the product from cart array and also deleting document also */
      user.cartItems.splice(productIndex, 1);
      await CartItem.deleteOne({ product: productId, user: id });
      user.save();

      /* Sending the Product Deleted Successfully response */
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

  /* increaseProductQuantity method */
  async increaseProductQuantity(req, res) {
    try {
      /* Destructuring id from req.user */
      const { id } = req.user;
      /* Destructuring productId from req.body */
      const { productId } = req.body;
      /* Finding the user based on id and populating it */
      const user = await User.findById(id).populate("cartItems");
      /* If the user is not there sending the response User Doesn't Exist */
      if (!user) {
        return res.status(400).json({
          error: "User Doesn't Exist",
        });
      }

      /* Finding the productIndex if the product exist in cart*/
      const productIndex = user.cartItems.findIndex(
        (p) => p.product.toString() === productId
      );

      /* Finding the CartItem */
      const cartItem = await CartItem.findOne({
        product: productId,
        user: id,
      });

      /* If one of them doesn't exist responding Product Doesn't Exist In Cart */
      if (productIndex === -1 || !cartItem) {
        return res.status(400).json({
          error: "Product Doesn't Exist In Cart",
        });
      }

      /* Increasing Quantity */
      cartItem.quantity++;
      user.cartItems[productIndex].quantity++;
      cartItem.save();
      user.save();

      /* Returning response */
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
      /* Destructuring id from req.user */
      const { id } = req.user;
      /* Destructuring productId from req.body */
      const { productId } = req.body;
      /* Finding the user based on id and populating it */
      const user = await User.findById(id).populate("cartItems");
      /* If the user is not there sending the response User Doesn't Exist */
      if (!user) {
        return res.status(400).json({
          error: "User Doesn't Exist",
        });
      }

      /* Finding the productIndex if the product exist in cart*/
      const productIndex = user.cartItems.findIndex(
        (p) => p.product.toString() === productId
      );

      /* Finding the cart item */
      const cartItem = await CartItem.findOne({
        product: productId,
        user: id,
      });

      /* If one of them doesn't exist responding Product Doesn't Exist In Cart */
      if (productIndex === -1 || !cartItem) {
        return res.status(400).json({
          error: "Product Doesn't Exist In Cart",
        });
      }

      /* If the quantity greater then one then only increase the quantity */
      if (cartItem.quantity > 1 || user.cartItems[productIndex].quantity > 1) {
        cartItem.quantity--;
        user.cartItems[productIndex].quantity--;
        cartItem.save();
        user.save();
        /* Returning response */
        return res.status(200).json({
          message: "Quantity Decreased by One",
        });
      } else {
        /* Returning response Can't decrease quantity below 1*/
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
