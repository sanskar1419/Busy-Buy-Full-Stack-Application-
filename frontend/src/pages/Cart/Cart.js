// Importing necessary module, component, hooks etc
import styles from "./Cart.module.css";
import NoItemInCart from "../../components/NoItemsInCart/NoItemsInCart";
import GridLoader from "react-spinners/GridLoader";
import CartItems from "../../components/CartItems/CartItems";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  getUserDetailsAsync,
  getUserError,
  getUserLoadingState,
  getUserMessage,
  orderItemAsync,
  userActions,
} from "../../redux/slice/userSlice";
import { getAuthData } from "../../redux/slice/authSlice";

// Defining Cart functional component
function Cart() {
  // Defining useState hook name priceBreakup to store totals
  const [priceBreakUp, setPriceBreakup] = useState({
    totalPrice: 0,
    totalDiscount: 0,
    totalItem: 0,
    totalMRP: 0,
  });
  /* Defining Dispatcher */
  const dispatch = useDispatch();
  /* Destructuring authUser state from the redux store using useSelector */
  const { authUser } = useSelector(getAuthData);
  /* Getting cart, loading, userError and userMessage from userReducer of Redux Store using useSelector*/
  const cart = useSelector(getCart);
  const loading = useSelector(getUserLoadingState);
  const userError = useSelector(getUserError);
  const userMessage = useSelector(getUserMessage);

  /* Using useEffect hook to reset error or message whenever error or message state is changed */
  useEffect(() => {
    if (userMessage) {
      setTimeout(() => {
        dispatch(userActions.resetMessage());
      }, 2000);
    }
    if (userError) {
      setTimeout(() => {
        dispatch(userActions.resetError());
      }, 2000);
    }
  }, [userMessage, userError]);

  /* Using useEffect hook find the cart and order array from the Mongodb on mounting */
  useEffect(() => {
    /* If only authUser exist */
    if (authUser) {
      /* Dispatching fetchStart reducer to set the loading state to true */
      dispatch(userActions.fetchStart());
      /* Dispatching getUserDetailsAsync function of asyncThunk to make API call and get the data*/
      dispatch(getUserDetailsAsync(authUser._id));
    }
  }, []);

  // Using useEffect hook to calculate totals on mounting and whenever user data changes
  useEffect(() => {
    if (cart !== null) {
      let totalPr = 0;
      let totalMrp = 0;
      cart.map((cartItem) => {
        totalPr += cartItem.product.price * cartItem.quantity;
        totalMrp += cartItem.product.mrp * cartItem.quantity;
      });
      setPriceBreakup({
        totalPrice: totalPr,
        totalDiscount: totalMrp - totalPr,
        totalItem: cart.length,
        totalMRP: totalMrp,
      });
    }
  }, [cart]);

  /* Function to place order */
  const placeOrder = () => {
    /* Dispatching asyncThunk function orderItemAsync make API call and place the order */
    dispatch(orderItemAsync(authUser._id));
  };

  // Returning JSX Content
  return (
    <>
      {/* If there are error or messages showing the them */}
      {userMessage && <div className="alert">{userMessage}</div>}
      {userError && <div className="errorAlert">{userError}</div>}
      <div className={styles.bodyContainer}>
        {/* If loading state is true show the gridLoader */}
        {loading ? (
          <div className={styles.loaderContainer}>
            <GridLoader color="blue" />
          </div>
        ) : cart.length === 0 ? (
          <NoItemInCart />
        ) : (
          <div className={styles.cartContainer}>
            <div className={styles.cartItemsAndPriceContainer}>
              <div className={styles.cartItemsAndOrderContainer}>
                <CartItems />
                <div className={styles.placeButtonContainer}>
                  <button onClick={placeOrder}>PLACE ORDER</button>
                </div>
              </div>
              <div className={styles.priceBreakUpContainer}>
                <div className={styles.priceDetailsHeader}>
                  <p>PRICE DETAILS</p>
                </div>
                <div className={styles.priceContainer}>
                  <p>Price ({priceBreakUp.totalItem} Items)</p>
                  <p>&#8377; {priceBreakUp.totalMRP}</p>
                </div>
                <div className={styles.priceContainer}>
                  <p>Discount</p>
                  <p className={styles.textGreen}>
                    - &#8377; {priceBreakUp.totalDiscount}
                  </p>
                </div>
                <div className={styles.priceContainer}>
                  <p>Delivery Charges</p>
                  <p>
                    <span className={styles.delivery}>&#8377;240</span>
                    <span className={styles.textGreen}> Free</span>
                  </p>
                </div>
                <div className={styles.totalAmountContainer}>
                  <h4>Total Amount</h4>
                  <h4>&#8377; {priceBreakUp.totalPrice}</h4>
                </div>
                <div className={styles.priceContainer}>
                  <p className={styles.textGreen}>
                    You will save ₹{priceBreakUp.totalDiscount + 240} on this
                    order
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// Exporting Cart Component
export default Cart;
