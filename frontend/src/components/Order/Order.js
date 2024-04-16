// Importing Styles
import styles from "./Order.module.css";

// Creating Order functional component
function Order({ order }) {
  // Destructuring order
  const { createdAt, cart } = order;

  // Returning the JSX Content
  return (
    <div className={styles.individualOrderContainer}>
      <div className={styles.orderDateContainer}>
        Ordered Date : {new Date(createdAt).toDateString()}
      </div>
      <div className={styles.itemsAndTotalContainer}>
        {cart.map((cartItem, index) => (
          <div className={styles.itemsContainer} key={order.id}>
            <div className={styles.imageContainer}>
              <img src={cartItem.product.imageURL} alt="Item" />
            </div>
            <div className={styles.nameContainer}>{cartItem.product.name}</div>
            <div className={styles.priceContainer}>
              {" "}
              &#8377;{cartItem.product.price}
            </div>
            <div className={styles.quantityContainer}>X{cartItem.quantity}</div>
            <div className={styles.totalContainer}>
              &#8377;{cartItem.quantity * cartItem.product.price}
            </div>
          </div>
        ))}
        <div className={styles.totalOrderValueContainer}>
          <div className={styles.totalValue}>
            <h4>Total Ordered Value</h4>
            <h4>&#8377; 150000</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

// Exporting Order component
export default Order;
