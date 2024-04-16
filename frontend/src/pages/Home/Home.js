import { useDispatch, useSelector } from "react-redux";
// import Products from "../../components/Products/Products";
import styles from "./Home.module.css";
// import { getAuthUser, getSignInUserAsync } from "../../redux/slice/userSlice";
import { useEffect } from "react";
import { authActions, getAuthData } from "../../redux/slice/authSlice";
import {
  getAllProductsAsync,
  getError,
  getProducts,
  productActions,
} from "../../redux/slice/productSlice";
import Products from "../../components/Products/Products";

function Home() {
  const dispatch = useDispatch();
  const { message } = useSelector(getAuthData);
  const productMessage = useSelector(getError);

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
  }, [message, productMessage]);

  return (
    <>
      {message && <div className="alert">{message}</div>}
      {productMessage && <div className="errorAlert">{productMessage}</div>}
      <div className={styles.homeContainer}>
        <Products />
      </div>
    </>
  );
}

export default Home;
