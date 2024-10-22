import Header from "../Header";
import AbstractPage from "../../pages/AbstractPage";
import { useParams } from "react-router-dom";
import Footer from "../Footer";

function PaperLayout() {
  const { arxiv_id } = useParams<{ arxiv_id: string }>();

  return (
    <div className="flex flex-col md:h-screen scroll-smooth">
      <Header />
      <div className="flex-grow overflow-y-auto">
        <AbstractPage arxiv_id={arxiv_id!} />
      </div>
      <Footer />
    </div>
  );
}

export default PaperLayout;
