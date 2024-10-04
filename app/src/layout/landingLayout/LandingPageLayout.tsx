import Footer from '../Footer';
import LandingPage from '../../pages/LandingPage';
import { ISubCategory } from '../../interfaces/IAllPapers';

function LandingPageLayout({artificialIntelligence}: {
    artificialIntelligence: ISubCategory | null;
}) {

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto">
        <LandingPage artificialIntelligence={artificialIntelligence}/>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPageLayout;
