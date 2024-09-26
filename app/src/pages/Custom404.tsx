import React from 'react';
import { useNavigate } from 'react-router-dom';

const Custom404: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-[#E4F0EF] px-6">
      <div className="relative bg-white p-10 rounded-lg shadow-md text-center">
        <img 
          src="/walrus.png" 
          alt="Walrus" 
          className="absolute w-40 -top-20 left-1/2 transform -translate-x-1/2 z-0"

        />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-purple-600 mb-4">404</h1>
          <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-6">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <button 
            onClick={handleGoBack}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition duration-300 mb-4"
          >
            Go Back
          </button>
          <a href="/" className="block text-purple-600 hover:underline text-sm">
            Go to Homepage
          </a>
        </div>
      </div>
    </section>
  );
};

export default Custom404;
