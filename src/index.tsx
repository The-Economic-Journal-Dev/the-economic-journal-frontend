import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.tsx";
import SignIn from "./pages/SignIn/SignIn.tsx";
import CategoryPage from "./pages/Category/Category.tsx";
import ModPage from "./pages/ModPage/ModPage.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import Contact from "./pages/Contact/Contact.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import NotFound from "./pages/Errors/NotFound.tsx";
import ArticlePage from "./pages/Article/Article";
import Article from "./pages/Article/Article";
import Layout from "./components/Layout/Layout.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Layout component wraps all nested routes
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'finance',
        element: <CategoryPage title="finance" />,
      },
      {
        path: 'entrepreneur',
        element: <CategoryPage title="entrepreneur" />,
      },
      {
        path: 'business',
        element: <CategoryPage title="business" />,
      },
      {
        path: 'economic',
        element: <CategoryPage title="economic" />,
      },
      {
        path: 'modpage',
        element: <ModPage />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'articles/:metaTitle',
        element: <Article />,
      },
      {
    path: '*',
    element: <NotFound />,
  },
    ],
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
