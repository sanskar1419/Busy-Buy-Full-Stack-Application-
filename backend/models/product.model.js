// Importing necessary file, module and package , and creating instances of them
import mongoose from "mongoose";

// Defining productSchema
const productSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
    },
    imageURL: {
      type: String,
    },
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    mrp: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Creating variable through which we are going to access db
const Product = mongoose.model("Product", productSchema);

// Exporting Product Model
export default Product;
