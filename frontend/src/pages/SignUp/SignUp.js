// Importing necessary module, component etc.
import styles from "./SignUp.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  authActions,
  getAuthData,
  signUpUserAsync,
} from "../../redux/slice/authSlice";
import SyncLoader from "react-spinners/SyncLoader";

// Defining SignUp functional Component
function SignUp() {
  // Using useState hook to store the value of username, password and confirmPassword
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    confirmPassword: "",
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
    /* Dispatching signUpUserAsync asyncThunk function to signup the user withe inputs*/
    dispatch(signUpUserAsync(inputs));
    /* On completion of signUp process dispatching the function to setMessage*/
    dispatch(authActions.setMessage("Signed Up Successfully"));
  };

  // Returning the JSX content
  return (
    <>
      {/* If there are error showing the errors */}
      {error && <div className="errorAlert">{error}</div>}
      <div className={styles.container}>
        <div className={styles.signUpContainer}>
          <div className={styles.headingContainer}>
            <h2>Sign Up Here</h2>
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
            <div className={styles.formInput}>
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Enter Your Confirm Password"
                value={inputs.confirmPassword}
                // Whenever the something type setting the input with there value
                onChange={(e) =>
                  setInputs({ ...inputs, confirmPassword: e.target.value })
                }
                required
              />
            </div>
            <Link to="/signUp">
              <h4>Already Have a account ?</h4>
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

// Exporting SignUp Component
export default SignUp;
