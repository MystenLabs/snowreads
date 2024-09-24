import { Routes, Route } from 'react-router-dom';
import Paper from './pages/Paper';
import PaperAbstract from './pages/PaperAbstract';
import Home from './pages/Home';
import NotFound from './pages/NotFound';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/abs/:doi" element={<PaperAbstract />} />
      <Route path="/html/:doi" element={<Paper />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
