import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

/**
 * Layout component that wraps around nested routes.
 */
const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* Nested routes will be rendered here */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;