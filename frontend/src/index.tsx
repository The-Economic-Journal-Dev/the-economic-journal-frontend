import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.tsx";
import SignIn from "./pages/User/SignIn.tsx";
import Finance from "./pages/Finance/Finance.tsx";
import Entrepreneur from "./pages/Entrepreneur/Entrepreneur.tsx";
import Business from "./pages/Business/Business.tsx";
import Economic from "./pages/Economic/Economic.tsx";
import ModPage from "./pages/ModPage/ModPage.tsx";
import Profile from "./pages/User/Profile.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },

  {
    path: "/HomePage",
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
    path: "/Business",
    element: <Business />,
  },

  {
    path: "/Economic",
    element: <Economic />,
  },

  {
    path: "/ModPage",
    element: <ModPage />,
  },

  {
    path: "/Profile",
    element: <Profile />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
