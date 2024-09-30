import Header from '../Header';
import AbstractPage from '../../pages/AbstractPage';
import { useParams } from 'react-router-dom';
import Footer from '../Footer';

function PaperLayout() {
  const { doi } = useParams<{ doi: string }>();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow overflow-y-auto">
        <AbstractPage doi={doi!} />
      </div>
      <Footer />
    </div>
  );
}

export default PaperLayout;
