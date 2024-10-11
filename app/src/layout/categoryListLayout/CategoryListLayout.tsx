import Header from "../Header";
import Footer from "../Footer";
import CategoryListPage from "../../pages/CategoryListPage";
import { ICategoryListLayout } from "../../interfaces/ICategoryListLayout";
import CollectionListPage from "../../pages/CollectionListPage";

const CategoryListLayout: React.FC<ICategoryListLayout> = ({ label }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow overflow-y-auto">
        {label != "COLLECTIONS" ? (
          <CategoryListPage label={"CATEGORIES"} />
        ) : (
          <CollectionListPage
            label={"COLLECTIONS"}
            categories={[
              {
                id: "Exploring the Edge of Artificial Intelligence Knowledge",
                label:
                  "Exploring the Edge of Artificial Intelligence Knowledge",
              },
              {
                id: "Curious Conjectures About Artificial Intelligence and Beyond",
                label:
                  "Curious Conjectures About Artificial Intelligence and Beyond",
              },
              {
                id: "Dynamic Systems and Fractals: A Mathematical Odyssey",
                label: "Dynamic Systems and Fractals: A Mathematical Odyssey",
              },
              {
                id: "The Math Behind the Cells: Unveiling Quantitative Biology Secrets",
                label:
                  "The Math Behind the Cells: Unveiling Quantitative Biology Secrets",
              },
              {
                id: "The Math Behind the Cells: Unveiling Quantitative Biology Secrets",
                label:
                  "The Math Behind the Cells: Unveiling Quantitative Biology Secrets",
              },
              {
                id: `Machine Learning's Dark Side: The Unseen Consequences`,
                label: `Machine Learning's Dark Side: The Unseen Consequences`,
              },
              {
                id: "From Adam Smith to AI: The Evolution of Theoretical Economics",
                label:
                  "From Adam Smith to AI: The Evolution of Theoretical Economics",
              },
              {
                id: "Beyond Black Swans: Exploring Quantitative Finance Frontiers",
                label:
                  "Beyond Black Swans: Exploring Quantitative Finance Frontiers",
              },
              {
                id: `Why Economics is Like Dating: It's All About Supply and Demand`,
                label: `Why Economics is Like Dating: It's All About Supply and Demand`,
              },
              {
                id: "The Spark of Genius: Exploring Electrical Engineering Frontiers",
                label:
                  "The Spark of Genius: Exploring Electrical Engineering Frontiers",
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
