import Footer from '../Footer';
import LandingPage from '../../pages/LandingPage';

function LandingPageLayout() {

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto">
        <LandingPage />
      </div>
      <Footer />
    </div>
  );
}

export default LandingPageLayout;
