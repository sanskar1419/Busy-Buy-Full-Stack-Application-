// Importing necessary file, module and package , and creating instances of them
import mongoose from "mongoose";

// Defining cartItemSchema
const cartItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Creating variable through which we are going to access db
const CartItem = mongoose.model("CartItem", cartItemSchema);

// Exporting CartItem Model
export default CartItem;
