// Importing necessary module, hooks, images etc.
import styles from "./Product.module.css";
import starImg from "../../images/star.png";
import bagImg from "../../images/shopping.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAuthUser } from "../../redux/slice/authSlice";
import {
  addProductToCartAsync,
  getUserLoadingState,
  userActions,
} from "../../redux/slice/userSlice";
import SyncLoader from "react-spinners/SyncLoader";

// Creating Product functional component
function Product({ product }) {
  /* Defining Dispatcher */
  const dispatch = useDispatch();
  /* Getting authUser state from the redux store using useSelector */
  const authUser = useSelector(getAuthUser);
  /* Defining Navigator */
  const navigate = useNavigate();
  /* Getting loading state from user redux store using useSelector */
  const loading = useSelector(getUserLoadingState);

  // Function to handle the addToCart click
  const handleAddToCart = () => {
    /* If the user is not signed in redirecting to signIn page */
    if (!authUser) {
      navigate("/signIn");
      return;
    }
    /* Dispatching fetchStart reducer to set the loading state to true */
    dispatch(userActions.fetchStart());
    /* Dispatching addProductToCartAsync asyncThunk function to add the product to cart*/
    dispatch(
      addProductToCartAsync({ productId: product._id, userId: authUser._id })
    );
  };

  // Returning the JSX Content
  return (
    <div className={styles.productContainer}>
      <div className={styles.imageContainer}>
        <img src={product.imageURL} alt="product" loading="lazy" />
      </div>
      <div className={styles.brandContainer}>
        <span>{product.brand}</span>
      </div>
      <div className={styles.productNameContainer}>
        <span>{product.name}</span>
      </div>
      <div className={styles.itemPriceContainer}>
        <span>&#8377; {product.price}</span>
      </div>
      <div className={styles.mainPriceContainer}>
        MRP <span className={styles.mrp}>&#8377; {product.mrp}</span>{" "}
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
      <div className={styles.loader}>
        {loading ? (
          <SyncLoader
            color="rgb(102, 102, 240)"
            style={{ marginBottom: "15px" }}
          />
        ) : (
          <button className={styles.btnAdd} onClick={handleAddToCart}>
            <img src={bagImg} alt="bag" /> ADD TO BAG
          </button>
        )}
      </div>
    </div>
  );
}

// Exporting Product component
export default Product;
