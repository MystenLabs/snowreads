import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import InformationPopup from "../components/landingComponents/InformationPopup";

const Custom404: React.FC = () => {
  return (
    <div className="flex flex-col md:h-screen">
      <Header />
      <section className="flex flex-col items-center justify-center flex-grow bg-primary px-6">
        <div className="relative bg-white p-10 rounded-lg shadow-md text-center">
          <img
            src="/walrus_avatar.png"
            alt="Walrus"
            className="absolute w-40 -top-20 left-1/2 transform -translate-x-1/2 z-0"
          />
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-purple-600 mb-4">404</h1>
            <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-6">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <a
              href="/"
              className="px-6 py-4 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition duration-300 mb-4 "
            >
              Go to Homepage
            </a>
          </div>
        </div>
        <InformationPopup />
      </section>
      <Footer />
    </div>
  );
};

export default Custom404;
