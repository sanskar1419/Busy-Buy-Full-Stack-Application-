// Importing necessary module, component etc.
import { useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.css";
import { useEffect } from "react";
import { authActions, getAuthData } from "../../redux/slice/authSlice";
import { getError, productActions } from "../../redux/slice/productSlice";
import Products from "../../components/Products/Products";
import {
  getUserDetailsAsync,
  getUserError,
  getUserMessage,
  userActions,
} from "../../redux/slice/userSlice";

// Defining Home functional Component
function Home() {
  /* Defining Dispatcher */
  const dispatch = useDispatch();
  /* Destructuring message and authUser state from the redux store using useSelector */
  const { message, authUser } = useSelector(getAuthData);
  /* Getting errorMessage from productReducer of Redux Store using useSelector*/
  const productMessage = useSelector(getError);
  /* Getting userMessage and userError from userReducer of Redux Store using useSelector*/
  const userMessage = useSelector(getUserMessage);
  const userError = useSelector(getUserError);

  /* Using useEffect hook find the cart and order array from the Mongodb on mounting */
  useEffect(() => {
    /* If only authUser exist */
    if (authUser) {
      /* Dispatching getUserDetailsAsync function of asyncThunk to make API call and get the data*/
      dispatch(getUserDetailsAsync(authUser._id));
    }
  }, []);

  /* Using useEffect Hook to reset message and error whenever they changes */
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
  }, [message, productMessage, userMessage, userError]);

  /* Returning the JSX */
  return (
    <>
      {/* If there are error or messages showing the them */}
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

/* Exporting Home */
export default Home;
