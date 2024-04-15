/* Importing necessary files, module etc. */
import Order from "../models/order.model.js";
import User from "../models/user.model.js";

/* Defining class OrderController and its method */
export default class OrderController {
  async orderItem(req, res) {
    try {
      /* Destructuring id from req.user */
      const { id } = req.user;

      /* Fetching user from User collection based on id */
      const user = await User.findById(id).populate("cartItems");

      /* If user doesn't exist */
      if (!user) {
        return res.status(400).json({
          error: "User Doesn't Exist",
        });
      }

      /* If user exist creating the document for the Order Model */
      const order = await Order.create({
        user: user,
        cart: [...user.cartItems],
      });

      /* Emptying the Array and pushing the order document inside user.orders*/
      user.cartItems = [];
      user.orders.push(order);
      user.save();

      /* Responding Order Placed message */
      return res.status(201).json({
        message: "Order Placed",
      });
    } catch (err) {
      /* Handling error */
      console.log("Error in orderItem method of OrderController Class", err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
}
