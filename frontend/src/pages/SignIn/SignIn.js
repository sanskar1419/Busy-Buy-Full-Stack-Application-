// Importing necessary module, component, hook etc.
import { Link } from "react-router-dom";
import styles from "./SignIn.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authActions,
  getAuthData,
  signInUserAsync,
} from "../../redux/slice/authSlice";
import SyncLoader from "react-spinners/SyncLoader";

// Defining SignIn Function
function SignIn() {
  // Using useState hook to store the value of username, password.
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  /* Defining Dispatcher */
  const dispatch = useDispatch();
  /* Destructuring error and loading state from the redux store using useSelector */
  const { error, loading } = useSelector(getAuthData);

  /* Using useEffect hook to reset error message whenever error state is changed */
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(authActions.resetError());
      }, 2000);
    }
  }, [error]);

  /* Function to handle form submit */
  const handleSubmit = (e) => {
    /* Preventing the default behavior of form */
    e.preventDefault();
    /* Dispatching fetchStart reducer to set the loading state to true */
    dispatch(authActions.fetchStart());
    /* Dispatching signInUserAsync asyncThunk function to signup the user withe inputs*/
    dispatch(signInUserAsync(inputs));
    /* On completion of signIn process dispatching the function to setMessage*/
    dispatch(authActions.setMessage("Signed In Successfully"));
  };

  // Returning the jsx
  return (
    <>
      {/* If there are error showing the errors */}
      {error && <div className="errorAlert">{error}</div>}
      <div className={styles.container}>
        <div className={styles.signInContainer}>
          <div className={styles.headingContainer}>
            <h2>Sign In Here</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.formInput}>
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter Your username"
                value={inputs.username}
                // Whenever the something type setting the input with there value
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
                required
              />
            </div>
            <div className={styles.formInput}>
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Your Password"
                value={inputs.password}
                // Whenever the something type setting the input with there value
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                required
              />
            </div>
            <Link to="/signUp">
              <h4>Don't Have an account ?</h4>
            </Link>
            <div className={styles.buttonContainer}>
              {/* If loading state is true showing the SyncLoader component */}
              {loading ? (
                <SyncLoader color="rgb(102, 102, 240)" />
              ) : (
                <button>Sign Up</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

// Exporting Values
export default SignIn;
