// Importing Styles
import styles from "./FilterMenu.module.css";

// Creating FilterMenu functional component
function FilterMenu({ handleChange, price, handleCategoryChange }) {
  // Returning the JSX Content
  return (
    <div className={styles.filterMenuContainer}>
      <div className={styles.heading}>Filter</div>
      <div className={styles.priceFilter}>
        <label>Price : {price}</label>
        <input
          type="range"
          name="price"
          id="price"
          min="0"
          max="100000"
          step="100"
          value={price}
          onChange={handleChange}
        />
      </div>
      <div className={styles.categoryContainer}>
        <span>Category</span>
        <div className={styles.category}>
          <div className={styles.inputElement}>
            <input
              type="checkbox"
              value="men"
              onChange={handleCategoryChange}
            />
            <label> Men's Clothing </label>
          </div>
          <div className={styles.inputElement}>
            <input
              type="checkbox"
              value="women"
              onChange={handleCategoryChange}
            />
            <label> Women's Clothing </label>
          </div>
          <div className={styles.inputElement}>
            <input
              type="checkbox"
              value="kid"
              onChange={handleCategoryChange}
            />
            <label> Kids </label>
          </div>
          <div className={styles.inputElement}>
            <input
              type="checkbox"
              value="electronics"
              onChange={handleCategoryChange}
            />
            <label> Electronics </label>
          </div>
        </div>
      </div>
    </div>
  );
}

// Exporting FilterMenu component
export default FilterMenu;
