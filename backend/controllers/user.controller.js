import User from "../models/user.model.js";

export default class UserController {
  async getUserData(req, res) {
    try {
      const { userId } = req.body;

      const user = await User.findById(userId)
        .populate({
          path: "orders",
          populate: {
            path: "cart",
            populate: {
              path: "product",
            },
          },
        })
        .populate({
          path: "cartItems",
          populate: {
            path: "product",
          },
        });
      if (!user) {
        return res.status(400).json({
          error: "User Doesn't Exist",
        });
      }
      return res.status(200).json({
        id: user._id,
        username: user.username,
        cartItems: [...user.cartItems],
        orders: [...user.orders],
      });
    } catch (err) {
      /* If there are some error then printing the error and sending the internal server error */
      console.log("Error in getUserData method of UserController class", err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
}
