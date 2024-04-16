// Importing necessary module, component, hooks etc.
import { useEffect, useState } from "react";
import styles from "./Orders.module.css";
import GridLoader from "react-spinners/GridLoader";
import Order from "../../components/Order/Order";
import NoOrders from "../../components/NoOrder/NoOrder";
import { useDispatch, useSelector } from "react-redux";
import { getAuthData } from "../../redux/slice/authSlice";
import {
  getCart,
  getOrders,
  getUserDetailsAsync,
  getUserLoadingState,
  userActions,
} from "../../redux/slice/userSlice";

// Defining Orders functional component
function Orders() {
  const dispatch = useDispatch();
  const { authUser } = useSelector(getAuthData);
  const orders = useSelector(getOrders);
  const loading = useSelector(getUserLoadingState);
  console.log(orders);

  useEffect(() => {
    if (authUser) {
      dispatch(userActions.fetchStart());
      dispatch(getUserDetailsAsync(authUser._id));
    }
  }, []);

  // Returning the JSX content
  return (
    <div className={styles.mainContainer}>
      {loading ? (
        <GridLoader color="blue" />
      ) : (
        <div className={styles.orderItemsContainer}>
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
