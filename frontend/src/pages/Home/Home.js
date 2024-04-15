import { useDispatch, useSelector } from "react-redux";
// import Products from "../../components/Products/Products";
import styles from "./Home.module.css";
// import { getAuthUser, getSignInUserAsync } from "../../redux/slice/userSlice";
import { useEffect } from "react";

function Home() {
  const dispatch = useDispatch();
  //   const authUser = useSelector(getAuthUser);
  //   useEffect(() => {
  //     if (authUser) {
  //       // console.log(authUser);
  //       dispatch(getSignInUserAsync(authUser._id));
  //     }
  //   }, []);
  return (
    <div className={styles.homeContainer}>
      {/* If the state of loading the product from cloud firestore in process the it will show Gridloader otherwise Products component */}
      {/* <Products /> */}
      <h1>This is our home page.</h1>
    </div>
  );
}

export default Home;
