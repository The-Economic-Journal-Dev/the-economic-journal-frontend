import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { HelmetProvider, Helmet } from 'react-helmet-async';

/**
 * Layout component that wraps around nested routes.
 */
const Layout: React.FC = () => {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </Helmet>
      </HelmetProvider>
      <Header />
      <main>
        <Outlet /> {/* Nested routes will be rendered here */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;