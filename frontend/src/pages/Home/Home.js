import { useDispatch, useSelector } from "react-redux";
// import Products from "../../components/Products/Products";
import styles from "./Home.module.css";
// import { getAuthUser, getSignInUserAsync } from "../../redux/slice/userSlice";
import { useEffect } from "react";
import { authActions, getAuthData } from "../../redux/slice/authSlice";

function Home() {
  const dispatch = useDispatch();
  const { message } = useSelector(getAuthData);
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(authActions.resetMessage());
      }, 2000);
    }
  }, [message]);

  return (
    <>
      {message && <div className="alert">{message}</div>}
      <div className={styles.homeContainer}>
        {/* If the state of loading the product from cloud firestore in process the it will show Gridloader otherwise Products component */}
        {/* <Products /> */}
        <h1>This is our home page.</h1>
      </div>
    </>
  );
}

export default Home;
