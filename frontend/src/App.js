/* Importing Hooks, method, function etc. */
import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthUser } from "./redux/slice/authSlice";

/* Importing Components */
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Orders from "./pages/Orders/Orders";

/* Functional Component function */
function App() {
  /* Extracting value from Redux Store using useSelector function */
  const authUser = useSelector(getAuthUser);
  /* React Router Configuration */
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "signIn",
          element: authUser ? <Navigate to="/" /> : <SignIn />,
        },
        {
          path: "signUp",
          element: authUser ? <Navigate to="/" /> : <SignUp />,
        },
        {
          path: "cart",
          element: authUser ? <Cart /> : <Navigate to={"/signIn"} />,
        },
        {
          path: "order",
          element: authUser ? <Orders /> : <Navigate to={"/signIn"} />,
        },
      ],
    },
  ]);

  /* Returning the JSX */
  return (
    <>
      {/* Passing all data router objects to this component to render the app and enable the rest of the data APIs */}
      <RouterProvider router={router} />
    </>
  );
}

/* Exporting */
export default App;
