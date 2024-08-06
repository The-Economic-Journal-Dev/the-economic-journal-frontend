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
import ModPage from "./pages/ModPage/ModPage.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import Contact from "./pages/Contact/Contact.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import NotFound from "./pages/Errors/NotFound.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/finance",
    element: <Finance />,
  },
  {
    path: "/entrepreneur",
    element: <Entrepreneur />,
  },
  {
    path: "/business",
    element: <Business />,
  },
  {
    path: "/economic",
    element: <Economic />,
  },
  {
    path: "/modpage",
    element: <ModPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
