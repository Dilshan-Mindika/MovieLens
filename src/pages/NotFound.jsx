import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return React.createElement(
    'div',
    { className: 'min-h-screen flex items-center justify-center bg-gray-100' },
    React.createElement(
      'div',
      { className: 'text-center' },
      React.createElement('h1', { className: 'text-4xl font-bold mb-4' }, '404'),
      React.createElement(
        'p',
        { className: 'text-xl text-gray-600 mb-4' },
        'Oops! Page not found'
      ),
      React.createElement(
        'a',
        {
          href: '/',
          className: 'text-blue-500 hover:text-blue-700 underline',
        },
        'Return to Home'
      )
    )
  );
};

export default NotFound;
