// Importing necessary module, component, hooks etc.
import { useEffect } from "react";
import styles from "./Orders.module.css";
import GridLoader from "react-spinners/GridLoader";
import Order from "../../components/Order/Order";
import NoOrders from "../../components/NoOrder/NoOrder";
import { useDispatch, useSelector } from "react-redux";
import { getAuthData } from "../../redux/slice/authSlice";
import {
  getOrders,
  getUserDetailsAsync,
  getUserLoadingState,
  userActions,
} from "../../redux/slice/userSlice";

// Defining Orders functional component
function Orders() {
  /* Defining Dispatcher */
  const dispatch = useDispatch();
  /* Destructuring authUser state from the redux store using useSelector */
  const { authUser } = useSelector(getAuthData);
  /* Getting orders and loading from userReducer of Redux Store using useSelector*/
  const orders = useSelector(getOrders);
  const loading = useSelector(getUserLoadingState);

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

  // Returning the JSX content
  return (
    <div className={styles.mainContainer}>
      {/* If loading state is true showing the GridLoader component*/}
      {loading ? (
        <GridLoader color="blue" />
      ) : (
        <div className={styles.orderItemsContainer}>
          {/* If there are no order showing the NoOrders component */}
          {orders.length === 0 ? (
            <NoOrders />
          ) : (
            <>
              <h3>Order Details</h3>
              {orders.map((order, index) => (
                <Order key={index} order={order} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// Exporting the Orders content
export default Orders;
