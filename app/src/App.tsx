import PaperLayout from './layout/paperLayout/PaperLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Custom404 from './pages/Custom404';
import LandingPageLayout from './layout/landingLayout/LandingPageLayout';


function App() {
  return (
      <Router>
          <Routes>
            <Route path="/" element={<LandingPageLayout />} />
            <Route path="/abs/:doi" element={<PaperLayout />} />
            <Route path="*" element={<Custom404 />} />
          </Routes>
      </Router>

  );
}

export default App;
