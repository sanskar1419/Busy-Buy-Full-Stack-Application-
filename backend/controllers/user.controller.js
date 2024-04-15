/* Importing necessary files, module etc. */
import User from "../models/user.model.js";

/* Defining UserController and its method */
export default class UserController {
  /* getUserData method */
  async getUserData(req, res) {
    try {
      /* Destructuring id from req.user */
      const { id } = req.user;
      /* Finding the user based on id and populating it */
      const user = await User.findById(id)
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

      /* If the user is not there sending the response User Doesn't Exist */
      if (!user) {
        return res.status(400).json({
          error: "User Doesn't Exist",
        });
      }

      /* If Everything work fine sending the user data */
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
