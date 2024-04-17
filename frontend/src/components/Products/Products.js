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

function Products() {
  const [nameInput, setNameInput] = useState("");
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const loading = useSelector(getProductLoadingState);
  const visibility = useSelector(getFilterMenuVisibility);
  const filterItems = useSelector(getFilterMenu);
  const filterProducts = useSelector(getFilterProducts);
  const [price, setPrice] = useState(75000);
  const [selectedCategory, setSelectedCategory] = useState([]);

  useEffect(() => {
    dispatch(productActions.fetchStart());
    dispatch(getAllProductsAsync());
  }, []);

  useEffect(() => {
    const items = products.filter((p) =>
      p.name.toLocaleLowerCase().includes(nameInput)
    );
    dispatch(filterActions.setFilterMenu(items));
  }, [nameInput]);

  const handleChange = (e) => {
    setPrice(e.target.value);
  };

  const handleCategoryChange = (e) => {
    if (e.target.checked === true) {
      setSelectedCategory([...selectedCategory, e.target.value]);
    } else {
      setSelectedCategory((prev) => {
        return prev.filter((p) => p !== e.target.value);
      });
    }
  };

  useEffect(() => {
    const result = filterItems.filter((p) => {
      if (selectedCategory.length !== 0) {
        return p.price <= price && selectedCategory.includes(p.type);
      } else {
        return p.price <= price;
      }
    });

    dispatch(filterActions.setFilterProducts(result));
  }, [price, selectedCategory.length]);

  return (
    <>
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
              {filterProducts.length === 0
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

export default Products;
