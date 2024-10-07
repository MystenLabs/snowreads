import Footer from "../Footer";
import LandingPage from "../../pages/LandingPage";
import { ILandingPageLayoutProps } from "../../interfaces/ILandingPageLayoutProps";

const LandingPageLayout: React.FC<ILandingPageLayoutProps> = ({
  allCategories,
}) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto">
        <LandingPage allCategories={allCategories} />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPageLayout;
