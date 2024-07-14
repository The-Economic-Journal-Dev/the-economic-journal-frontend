import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.tsx";
import SignIn from "./pages/SignIn/SignIn.tsx";
import Finance from "./pages/Finance/Finance.tsx";

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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
