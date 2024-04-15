// Importing necessary module, component, hook etc.
import { Link } from "react-router-dom";
import styles from "./SignIn.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { signInUserAsync } from "../../redux/slice/userSlice";

// Defining SignIn Function
function SignIn() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(signInUserAsync(inputs));
  };
  // Returning the jsx
  return (
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
            <button>Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Exporting Values
export default SignIn;
