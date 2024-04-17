import { useDispatch, useSelector } from "react-redux";
// import Products from "../../components/Products/Products";
import styles from "./Home.module.css";
// import { getAuthUser, getSignInUserAsync } from "../../redux/slice/userSlice";
import { useEffect } from "react";
import { authActions, getAuthData } from "../../redux/slice/authSlice";
import { getError, productActions } from "../../redux/slice/productSlice";
import Products from "../../components/Products/Products";
import {
  getCart,
  getOrders,
  getUserDetailsAsync,
  getUserError,
  getUserMessage,
  userActions,
} from "../../redux/slice/userSlice";

function Home() {
  const dispatch = useDispatch();
  const { message, authUser } = useSelector(getAuthData);
  const productMessage = useSelector(getError);
  const userMessage = useSelector(getUserMessage);
  const userError = useSelector(getUserError);

  useEffect(() => {
    if (authUser) {
      dispatch(getUserDetailsAsync(authUser._id));
    }
  }, []);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(authActions.resetMessage());
      }, 2000);
    }
    if (productMessage) {
      setTimeout(() => {
        dispatch(productActions.resetError());
      }, 2000);
    }
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
  }, [message, productMessage]);

  return (
    <>
      {message && <div className="alert">{message}</div>}
      {productMessage && <div className="errorAlert">{productMessage}</div>}
      {userMessage && <div className="alert">{userMessage}</div>}
      {userError && <div className="errorAlert">{userError}</div>}
      <div className={styles.homeContainer}>
        <Products />
      </div>
    </>
  );
}

export default Home;
