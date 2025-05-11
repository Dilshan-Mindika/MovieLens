
import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Determine if we need extra padding (e.g., not on homepage)
  const needsTopPadding = location.pathname !== '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={`flex-grow ${needsTopPadding ? 'pt-16 md:pt-20' : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
