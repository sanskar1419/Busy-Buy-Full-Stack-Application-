import Order from "../models/order.model.js";
import User from "../models/user.model.js";

export default class OrderController {
  async orderItem(req, res) {
    try {
      //   console.log(req.body);
      const { userId } = req.body;
      const user = await User.findById(userId).populate("cartItems");
      if (!user) {
        return res.status(400).json({
          error: "User Doesn't Exist",
        });
      }
      const order = await Order.create({
        user: user,
        cart: [...user.cartItems],
      });
      user.cartItems = [];
      user.orders.push(order);
      user.save();

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
