import PaperLayout from './layout/paperLayout/PaperLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Custom404 from './pages/Custom404';
import LandingPageLayout from './layout/landingLayout/LandingPageLayout';
import CategoryListLayout from './layout/categoryListLayout/CategoryListLayout';


function App() {
  return (
    <div className='bg-primary'>
      <Router>
          <Routes>
            <Route path="/" element={<LandingPageLayout />} />
            <Route path="/abs/:doi" element={<PaperLayout />} />
            <Route path="/category/:title" element={<CategoryListLayout />} />
            <Route path="*" element={<Custom404 />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
