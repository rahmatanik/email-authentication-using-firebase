import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";

import Login from "./components/Login/Login.jsx";
import Home from "./components/Home/Home.jsx";
import Register from "./components/Register/Register.jsx";
import Root from "./components/Root/Root";
import HeroRegister from "./components/HeroRegister/HeroRegister";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/heroRegister",
        element: <HeroRegister></HeroRegister>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
