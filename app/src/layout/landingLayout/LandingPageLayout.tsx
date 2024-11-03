import Footer from "../Footer";
import LandingPage from "../../pages/LandingPage";
import React from "react";

const LandingPageLayout: React.FC = () => {
  return (
    <div className="flex flex-col md:h-screen">
      <div className="flex-grow overflow-y-auto">
        <LandingPage />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPageLayout;
