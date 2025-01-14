import PaperLayout from "./layout/paperLayout/PaperLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Custom404 from "./pages/Custom404";
import LandingPageLayout from "./layout/landingLayout/LandingPageLayout";
import CategoryListLayout from "./layout/categoryListLayout/CategoryListLayout";
import ToSPage from "./pages/ToSPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import PDFViewerPage from "./pages/PDFViewerPage";
import { useEffect } from "react";
import * as amplitude from "@amplitude/analytics-browser";

function App() {
  useEffect(() => {
    try {
      amplitude.init("b9c388dd082e3727ee05f3d4b79e0edc", {
        autocapture: true,
        identityStorage: "none",
      });
    } catch (e) {
      console.error("Amplitude initialization failed:", e);
    }
  }, []);
  return (
    <div className="bg-primary ">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPageLayout />} />
          <Route path="/abs/:arxiv_id" element={<PaperLayout />} />
          <Route
            path="/category/:category"
            element={<CategoryListLayout label={"CATEGORIES"} />}
          />
          <Route
            path="/category/:category/:subcategory"
            element={<CategoryListLayout label={"CATEGORIES"} />}
          />
          <Route
            path="/collection/:category"
            element={<CategoryListLayout label={"COLLECTIONS"} />}
          />
          <Route path="/pdf-viewer/:blobId" element={<PDFViewerPage />} />
          <Route path="/terms-of-service" element={<ToSPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<Custom404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
