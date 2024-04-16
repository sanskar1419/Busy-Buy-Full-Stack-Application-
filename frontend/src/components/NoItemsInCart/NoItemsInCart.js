// Importing necessary module, hooks, images etc.
import { useEffect, useState } from "react";
import emptyCartImg from "../../images/empty-cart.png";
import styles from "./NoItemsInCart.module.css";
import { useNavigate } from "react-router-dom";

// Creating NoItemInCart functional component
function NoItemInCart() {
  const navigate = useNavigate();
  // Using useState to define state variable
  const [loading, setLoading] = useState(false);
  // Setting the loading status
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Returning the JSX Content
  return (
    <div className={styles.emptyCartContainer}>
      <img src={emptyCartImg} alt="empty cart" />
      <div className={styles.emptyText}>Your cart is empty!</div>
      <div>Add items to it now.</div>
      <button
        className={styles.btnAdd}
        onClick={() => {
          navigate("/");
        }}
      >
        SHOP NOW
      </button>
    </div>
  );
}

// Exporting NoItemInCart component
export default NoItemInCart;
