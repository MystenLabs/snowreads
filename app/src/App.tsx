import PaperLayout from './layout/paperLayout/PaperLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Custom404 from './pages/Custom404';
import LandingPageLayout from './layout/landingLayout/LandingPageLayout';
import CategoryListLayout from './layout/categoryListLayout/CategoryListLayout';
import { useEffect, useState } from 'react';
import { ISubCategory } from './interfaces/IAllPapers';


function App() {
  const [artificialIntelligence, setArtificialIntelligence] = useState<ISubCategory | null>(null);  // State to store fetched data
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState<null | string>(null);  // Error state

  useEffect(() => {
    // Fetch the public JSON resource
    fetch("/papers.json")  // Replace with the actual public API URL
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
          console.log(data);
        setArtificialIntelligence(data['Computing Research Repository']['Artificial Intelligence']);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setLoading(false);
      });

  }, []);


  return (
    <div className='bg-primary '>
      <Router>
          <Routes>
            <Route path="/" element={<LandingPageLayout artificialIntelligence={artificialIntelligence}/>} />
            <Route path="/abs/:doi" element={<PaperLayout />} />
            <Route path="/category/:title" element={<CategoryListLayout />} />
            <Route path="/collection/:title" element={<CategoryListLayout collections={true}/>} />
            <Route path="*" element={<Custom404 />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
