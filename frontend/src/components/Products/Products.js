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

function Products() {
  const [nameInput, setNameInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productActions.fetchStart());
    dispatch(getAllProductsAsync());
  }, []);

  const products = useSelector(getProducts);
  const loading = useSelector(getProductLoadingState);

  return (
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
            {products.map((product, index) => (
              <Product key={index} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Products;
