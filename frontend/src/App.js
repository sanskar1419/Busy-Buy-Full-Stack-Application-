import React from "react";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthUser } from "./redux/slice/userSlice";
// import Cart from "./pages/Cart/Cart";

function App() {
  const authUser = useSelector(getAuthUser);
  // console.log(authUser);
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
        // {
        //   path: "cart",
        //   element: authUser ? <Cart /> : <Navigate to={"/signIn"} />,
        // },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
