// Importing necessary module, hooks etc.
import styles from "./CartItem.module.css";
import plusImg from "../../images/plus.png";
import minusImg from "../../images/remove.png";
import starImg from "../../images/star.png";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "../../redux/slice/authSlice";
import {
  decreaseQuantityAsync,
  getCart,
  increaseQuantityAsync,
  removeProductFromCart,
} from "../../redux/slice/userSlice";

// Creating CartItem functional component
function CartItem({ product, quantity }) {
  /* Defining Dispatcher */
  const dispatch = useDispatch();
  /* Getting authUser state from the redux store using useSelector */
  const authUser = useSelector(getAuthUser);

  /* Function to remove the item from the cart */
  const handleRemove = () => {
    /* Dispatching removeProductFromCart asyncThunk function to make API call and remove the product from cart */
    dispatch(
      removeProductFromCart({ productId: product._id, userId: authUser._id })
    );
  };

  /* Function to increase product quantity in the cart*/
  const increaseQuantity = () => {
    /* Dispatching increaseQuantityAsync asyncThunk function to make API call and increase product quantity by one */
    dispatch(
      increaseQuantityAsync({ productId: product._id, userId: authUser._id })
    );
  };

  /* Function to decrease product quantity in the cart*/
  const decreaseQuantity = () => {
    /* Dispatching decreaseQuantityAsync asyncThunk function to make API call and decrease product quantity by one */
    dispatch(
      decreaseQuantityAsync({ productId: product._id, userId: authUser._id })
    );
  };

  // Returning the JSX Content
  return (
    <div className={styles.itemContainer}>
      <div className={styles.imageAndQuantityContainer}>
        <div className={styles.imageContainer}>
          <img src={product.imageURL}></img>
        </div>
        <div className={styles.quantityContainer}>
          <button
            onClick={decreaseQuantity}
            /* If the quantity is one making the button disabled */
            disabled={quantity === 1 ? true : false}
          >
            <img src={minusImg} alt="minus" />
          </button>
          <span className={styles.quantity}>{quantity}</span>
          <button onClick={increaseQuantity}>
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
          <button onClick={handleRemove}>Remove Item</button>
        </div>
      </div>
    </div>
  );
}

// Exporting CartItem component
export default CartItem;
