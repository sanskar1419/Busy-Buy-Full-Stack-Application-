// Importing necessary module, component, hooks etc
import styles from "./Cart.module.css";
import NoItemInCart from "../../components/NoItemsInCart/NoItemsInCart";
import GridLoader from "react-spinners/GridLoader";
import CartItems from "../../components/CartItems/CartItems";
import { useEffect, useState } from "react";
import RingLoader from "react-spinners/RingLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  getUserDetailsAsync,
  getUserError,
  getUserLoadingState,
  getUserMessage,
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
  const dispatch = useDispatch();
  const { authUser } = useSelector(getAuthData);
  const cart = useSelector(getCart);
  const loading = useSelector(getUserLoadingState);
  const userError = useSelector(getUserError);
  const userMessage = useSelector(getUserMessage);

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

  useEffect(() => {
    if (authUser) {
      dispatch(userActions.fetchStart());
      dispatch(getUserDetailsAsync(authUser._id));
    }
  }, []);

  // Using useEffect hook to calculate totals on mounting and whenever user data changes
  useEffect(() => {
    // console.log(user);
    if (cart !== null) {
      let totalPr = 0;
      let totalDsc = 0;
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

  // Returning JSX Content
  return (
    <>
      {userMessage && <div className="alert">{userMessage}</div>}
      {userError && <div className="errorAlert">{userError}</div>}
      <div className={styles.bodyContainer}>
        {/* If loading state is true show the gridloader */}
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
                  <button>PLACE ORDER</button>
                  {/* {orderLoading ? (
                  <div className={styles.loaderContainer}>
                    <RingLoader color="blue" />
                  </div>
                ) : (
                  <button>PLACE ORDER</button>
                )} */}
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
