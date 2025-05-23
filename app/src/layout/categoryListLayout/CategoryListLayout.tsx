import Header from "../Header";
import Footer from "../Footer";
import CategoryListPage from "../../pages/CategoryListPage";
import { ICategoryListLayout } from "../../interfaces/ICategoryListLayout";
import CollectionListPage from "../../pages/CollectionListPage";

const CategoryListLayout: React.FC<ICategoryListLayout> = ({ label }) => {
  return (
    <div className="flex flex-col md:h-screen">
      <Header />
      <div className="flex-grow overflow-y-auto">
        {label != "COLLECTIONS" ? (
          <CategoryListPage label={"CATEGORIES"} />
        ) : (
          <CollectionListPage
            label={"COLLECTIONS"}
            categories={[
              {
                id: "The Science of Everyday Decisions",
                label: "The Science of Everyday Decisions",
              },
              {
                id: "Scientific Wonder of Pop Culture",
                label: "Scientific Wonder of Pop Culture",
              },
              {
                id: "Is AI Fun",
                label: "Is AI Fun",
              },
              {
                id: "Mysten Labs Research",
                label: "Mysten Labs Research"
              },
              {
                id: "Scaling Culture with NFTs",
                label: "Scaling Culture with NFTs",
              },
              {
                id: "Metaverse: An Immersive Cyberspace",
                label: "Metaverse: An Immersive Cyberspace",
              },
            ]}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CategoryListLayout;
