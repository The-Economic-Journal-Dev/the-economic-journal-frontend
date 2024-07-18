import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.tsx";
import SignIn from "./pages/SignIn/SignIn.tsx";
import Finance from "./pages/Finance/Finance.tsx";
import Entrepreneur from "./pages/Entrepreneur/Entrepreneur.tsx";
import Business from "./pages/Business/Business.tsx";
import Economic from "./pages/Economic/Economic.tsx";

const router = createBrowserRouter([
  {
    path: "/HomePage",
    element: <HomePage />,
  },

  {
    path: "/",
    element: <HomePage />,
  },

  {
    path: "/SignIn",
    element: <SignIn />,
  },

  {
    path: "/Finance",
    element: <Finance />,
  },

  {
    path: "/Entrepreneur",
    element: <Entrepreneur />,
  },

  {
    path: "Business",
    element: <Business />,
  },

  {
    path: "Economic",
    element: <Economic />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
