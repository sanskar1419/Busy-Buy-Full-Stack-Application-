// Importing necessary module, hooks etc.
import styles from "./CartItem.module.css";
import plusImg from "../../images/plus.png";
import minusImg from "../../images/remove.png";
import starImg from "../../images/star.png";

// Creating CartItem functional component
function CartItem({ product, quantity }) {
  // Destructuring removeFromCart, increaseQuantity, decreaseQuantity from useCart custom hook

  // Returning the JSX Content
  return (
    <div className={styles.itemContainer}>
      <div className={styles.imageAndQuantityContainer}>
        <div className={styles.imageContainer}>
          <img src={product.imageURL}></img>
        </div>
        <div className={styles.quantityContainer}>
          <button>
            <img src={minusImg} alt="minus" />
          </button>
          <span className={styles.quantity}>{quantity}</span>
          <button>
            <img src={plusImg} alt="plus" />
          </button>
        </div>
      </div>
      <div className={styles.productDetailContainer}>
        <div className={styles.brandContainer}>
          <span>{product.brand}</span>
        </div>
        <div className={styles.productNameContainer}>
          <span>{product.name}</span>
        </div>
        <div className={styles.itemPriceContainer}>
          <span>&#8377; {product.price * quantity}</span>
        </div>
        <div className={styles.mainPriceContainer}>
          MRP{" "}
          <span className={styles.mrp}>&#8377; {product.mrp * quantity}</span>{" "}
          <span className={styles.discount}>
            ({Math.round(((product.mrp - product.price) / product.mrp) * 100)}%
            OFF)
          </span>
        </div>
        <div className={styles.ratingsContainer}>
          <div className={styles.ratingValue}>
            <span>{product.rating}</span>
            <img src={starImg} alt="star" />
          </div>
          <div>Ratings</div>
        </div>
        <div className={styles.removeItem}>
          <button>Remove Item</button>
        </div>
      </div>
    </div>
  );
}

// Exporting CartItem component
export default CartItem;
