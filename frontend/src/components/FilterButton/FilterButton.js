// Importing necessary module, hooks etc.
import { useDispatch } from "react-redux";
import styles from "./FilterButton.module.css";
import { filterActions } from "../../redux/slice/filterSlice";

// Creating FilterButton functional component
function FilterButton() {
  /* Defining Dispatcher */
  const dispatch = useDispatch();

  /* Function to handle click */
  const handleClick = () => {
    /* Dispatching filterActions.setVisibility function to set the visibility to true */
    dispatch(filterActions.setVisibility());
  };

  // Returning the JSX Content
  return (
    <div className={styles.filterMenuContainer} onClick={handleClick}>
      <h3>Filter Products</h3>
    </div>
  );
}

// Exporting FilterButton component
export default FilterButton;
