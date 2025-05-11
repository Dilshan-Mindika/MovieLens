
import React from 'react';
import { Navigate } from 'react-router-dom';

// This is just a redirect component to the HomePage
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
