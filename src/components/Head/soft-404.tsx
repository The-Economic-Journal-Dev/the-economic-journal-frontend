import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Soft404: React.FC = () => {
  return (
    <HelmetProvider>
    <Helmet>
      <title>404 - Page Not Found</title>
      <meta name='errorpage' content='true' />
      <meta name='errortype' content='404 - Not Found' />
      <meta name='prerender-status-code' content='404' />
      <meta name="robots" content="follow, noarchive, noindex" />
    </Helmet>
    </HelmetProvider>
  );
};

export default Soft404;