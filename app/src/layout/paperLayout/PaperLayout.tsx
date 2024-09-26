import Header from '../Header';
import AbstractPage from '../../pages/AbstractPage'
import { useParams } from 'react-router-dom';


function PaperLayout() {
  const { doi } = useParams<{ doi: string }>();  // Directly type the useParams call with { doi: string }
  return (
    <>
      <Header />
      <AbstractPage doi={doi!} />
    </>
  );
}


export default PaperLayout;