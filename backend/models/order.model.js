// Importing necessary file, module and package , and creating instances of them
import mongoose from "mongoose";

// Defining user schema
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CartItem",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Creating variable through which we are going to access db
const Order = mongoose.model("Order", orderSchema);

// Exporting User Model
export default Order;
