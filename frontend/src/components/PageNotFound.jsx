import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-blue-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Oops! Page Not Found</h2>
      <p className="text-gray-600 mb-6">The page you are looking for doesn’t exist or has been moved.</p>
      <Link
        to="/home"
        className="bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;
