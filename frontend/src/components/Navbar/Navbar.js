// Importing necessary module, hooks, images etc.
import styles from "./Navbar.module.css";
import logoImg from "../../images/family.png";
import HorizontalMenuList from "../HorizontalMenuList/HorizontalMenuList";
import { Link, Outlet } from "react-router-dom";

// Creating Navbar functional component
function Navbar() {
  // Returning the JSX Content
  return (
    <>
      <div className={styles.navBarContainer}>
        <div className={styles.logoContainer}>
          <Link to="/">
            <img src={logoImg} alt="logo" />
          </Link>
          <Link to="/">
            <h3 className={styles.logoHeading}>Buy Busy</h3>
          </Link>
        </div>
        <HorizontalMenuList />
      </div>
      <Outlet />
    </>
  );
}

// Exporting Navbar component
export default Navbar;
