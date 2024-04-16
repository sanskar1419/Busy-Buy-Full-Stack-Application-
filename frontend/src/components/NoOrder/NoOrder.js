// Importing necessary module, hooks, images etc.
import { useEffect, useState } from "react";
import emptyCartImg from "../../images/noOrder.png";
import styles from "./NoOrder.module.css";
import { useNavigate } from "react-router-dom";

// Creating NoOrders functional component
function NoOrders() {
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
      <img src={emptyCartImg} alt="empty order" loading="lazy" />
      <div className={styles.emptyText}>No Items has been Ordered Yet</div>
      <div>See you soon with orders</div>
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

// Exporting NoOrders component
export default NoOrders;
