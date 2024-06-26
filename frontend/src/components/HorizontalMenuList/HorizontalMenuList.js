// Importing necessary module, hooks, images etc.
import homeImg from "../../images/home.png";
import cartImg from "../../images/Cart.png";
import orderImg from "../../images/order.png";
import logoutImg from "../../images/logout.png";
import menuImg from "../../images/menus.png";
import logInImg from "../../images/access.png";
import styles from "./HorizontalMenuList.module.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  authActions,
  getAuthData,
  getAuthUser,
  logoutUserAsync,
} from "../../redux/slice/authSlice";
import MoonLoader from "react-spinners/MoonLoader";

// Creating HorizontalMenuList functional component
function HorizontalMenuList() {
  /* Getting authUser state from the redux store using useSelector */
  const authUser = useSelector(getAuthUser);
  /* Destructuring loading state from the redux store using useSelector */
  const { loading } = useSelector(getAuthData);
  /* Defining Dispatcher */
  const dispatch = useDispatch();

  /* Function to logout the user */
  const handleLogout = () => {
    dispatch(authActions.fetchStart());
    /* Dispatching logoutUserAsync asyncThunk function to make API call and logout user and remove its id from localStorage */
    dispatch(logoutUserAsync());
  };

  // Returning the JSX Content
  return (
    <>
      <div className={styles.buttonsContainer}>
        <div className={styles.individualButtonContainer}>
          <img src={homeImg} alt="Home" />
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? { color: "blue" } : undefined)}
          >
            <h4>Home</h4>
          </NavLink>
        </div>
        {authUser ? (
          <>
            <div className={styles.individualButtonContainer}>
              <img src={orderImg} alt="Orders" />
              <NavLink
                to="/order"
                style={({ isActive }) =>
                  isActive ? { color: "blue" } : undefined
                }
              >
                <h4>Orders</h4>
              </NavLink>
            </div>
            <div className={styles.individualButtonContainer}>
              <img src={cartImg} alt="Cart" />
              <NavLink
                to="cart"
                style={({ isActive }) =>
                  isActive ? { color: "blue" } : undefined
                }
              >
                <h4>Cart</h4>
              </NavLink>
            </div>
            <div
              className={styles.individualButtonContainer}
              onClick={handleLogout}
            >
              <img src={logoutImg} alt="Logout" />
              {loading ? <MoonLoader color="#36d7b7" /> : <h4>Logout</h4>}
            </div>
          </>
        ) : (
          <div className={styles.individualButtonContainer}>
            <img src={logInImg} alt="login" />
            <NavLink
              to="signIn"
              style={({ isActive }) =>
                isActive ? { color: "blue" } : undefined
              }
            >
              <h4>Sign In</h4>
            </NavLink>
          </div>
        )}
      </div>
      <div className={styles.menuLogoContainer}>
        <img src={menuImg} alt="menu" />
      </div>
    </>
  );
}

// Exporting HorizontalMenuList component
export default HorizontalMenuList;
