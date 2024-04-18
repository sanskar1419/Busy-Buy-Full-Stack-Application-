// Importing necessary module, component etc.
import { useDispatch, useSelector } from "react-redux";
import Product from "../Product/Product";
import styles from "./Products.module.css";
import { useEffect, useState } from "react";
import GridLoader from "react-spinners/GridLoader";
import {
  getAllProductsAsync,
  getProductLoadingState,
  getProducts,
  productActions,
} from "../../redux/slice/productSlice";
import {
  filterActions,
  getFilterMenu,
  getFilterMenuVisibility,
  getFilterProducts,
} from "../../redux/slice/filterSlice";
import FilterMenu from "../FilterMenu/FilterMenu";
import FilterButton from "../FilterButton/FilterButton";

/* Defining Products functional component */
function Products() {
  // Using useState hook to store the values
  const [nameInput, setNameInput] = useState("");
  const [price, setPrice] = useState(75000);
  const [selectedCategory, setSelectedCategory] = useState([]);
  /* Defining Dispatcher */
  const dispatch = useDispatch();
  /* Getting product and loading state from the product redux store using useSelector */
  const products = useSelector(getProducts);
  const loading = useSelector(getProductLoadingState);
  /* Getting visibility, filterItems and filterProducts state from the filter redux store using useSelector */
  const visibility = useSelector(getFilterMenuVisibility);
  const filterItems = useSelector(getFilterMenu);
  const filterProducts = useSelector(getFilterProducts);

  /* Using useEffect hook find the products array from the Mongodb on mounting */
  useEffect(() => {
    /* Dispatching fetchStart reducer to set the loading state to true */
    dispatch(productActions.fetchStart());
    /* Dispatching getAllProductsAsync asyncThunk function to get all the products on mounting*/
    dispatch(getAllProductsAsync());
  }, []);

  /* Using useEffect hook to filter product based on nameInput */
  useEffect(() => {
    /* Filtering Products */
    const items = products.filter((p) =>
      p.name.toLocaleLowerCase().includes(nameInput)
    );
    /* Dispatching filterActions.setFilterMenu function to set the filterMenu with the result */
    dispatch(filterActions.setFilterMenu(items));
  }, [nameInput]);

  /* Function to handle the change in price input */
  const handleChange = (e) => {
    setPrice(e.target.value);
  };

  /* Function to handle the category changes */
  const handleCategoryChange = (e) => {
    if (e.target.checked === true) {
      setSelectedCategory([...selectedCategory, e.target.value]);
    } else {
      setSelectedCategory((prev) => {
        return prev.filter((p) => p !== e.target.value);
      });
    }
  };

  /* Using useEffect hook to find the product based on selected price and category */
  useEffect(() => {
    const result = filterItems.filter((p) => {
      if (selectedCategory.length !== 0) {
        return p.price <= price && selectedCategory.includes(p.type);
      } else {
        return p.price <= price;
      }
    });

    /* Dispatching filterActions.setFilterProducts function to set the filter products */
    dispatch(filterActions.setFilterProducts(result));
  }, [price, selectedCategory.length]);

  return (
    <>
      {/* If visibility is true show filter menu otherwise filterButton component  */}
      {visibility ? (
        <FilterMenu
          handleChange={handleChange}
          price={price}
          handleCategoryChange={handleCategoryChange}
        />
      ) : (
        <FilterButton />
      )}
      <div className={styles.allProductContainer}>
        {loading ? (
          <div className={styles.loaderContainer}>
            <GridLoader color="blue" />
          </div>
        ) : (
          <>
            <div className={styles.searchBarContainer}>
              <input
                type="text"
                placeholder="Search By Name ......"
                value={nameInput}
                onChange={(e) => {
                  setNameInput(e.target.value);
                }}
              />
            </div>
            <div className={styles.productsContainer}>
              {/* If filterProducts is empty then mapping over filterItems otherwise filter products */}
              {filterItems.length === 0
                ? products.map((product, index) => (
                    <Product key={index} product={product} />
                  ))
                : filterProducts.length === 0
                ? filterItems.map((product, index) => (
                    <Product key={index} product={product} />
                  ))
                : filterProducts.map((product, index) => (
                    <Product key={index} product={product} />
                  ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* Exporting Products */
export default Products;
