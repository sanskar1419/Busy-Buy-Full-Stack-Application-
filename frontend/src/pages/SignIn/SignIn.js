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
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { error, loading } = useSelector(getAuthData);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(authActions.resetError());
      }, 2000);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authActions.fetchStart());
    dispatch(signInUserAsync(inputs));
    dispatch(authActions.setMessage("Signed In Successfully"));
  };
  // Returning the jsx
  return (
    <>
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
