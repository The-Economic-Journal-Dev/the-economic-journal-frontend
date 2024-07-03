import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css"
import 'bootstrap/dist/css/bootstrap.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from "./pages/HomePage.tsx";
import SignIn from "./pages/SignIn.tsx"
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
]);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);