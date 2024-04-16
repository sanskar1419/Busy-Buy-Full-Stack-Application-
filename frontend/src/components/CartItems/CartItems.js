// Importing necessary module, hooks etc.
import { getCart } from "../../redux/slice/userSlice";
import CartItem from "../CartItem/CartItem";
import styles from "./CartItems.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Creating CartItems functional component
function CartItems() {
  const cart = useSelector(getCart);
  // Returning the JSX Content
  return (
    <div className={styles.cartItemsContainer}>
      {cart.map((cartItem, index) => (
        <CartItem
          key={index}
          product={cartItem.product}
          quantity={cartItem.quantity}
        />
      ))}
    </div>
  );
}

// Exporting CartItems component
export default CartItems;
