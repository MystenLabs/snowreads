import Header from "../Header";
import { useParams } from "react-router-dom";
import Footer from "../Footer";
import CategoryListPage from "../../pages/CategoryListPage";
import { ICategoryListLayout } from "../../interfaces/ICategoryListLayout";

const CategoryListLayout: React.FC<ICategoryListLayout> = ({ collections }) => {
  const { title } = useParams<{ title: string }>();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow overflow-y-auto">
        {!collections ? (
          <CategoryListPage
            selected={title!}
            type={"CATEGORIES"}
            categories={[
              {
                id: "Artificial Intelligence",
                label: "Artificial Intelligence",
              },
              { id: "Hardware Architecture", label: "Hardware Architecture" },
              {
                id: "Computational Complexity",
                label: "Computational Complexity",
              },
              { id: "Quantitative Biology", label: "Quantitative Biology" },
              { id: "Databases", label: "Databases" },
              { id: "Digital Libraries", label: "Digital Libraries" },
              { id: "Emerging Technologies", label: "Emerging Technologies" },
              { id: "Graphics", label: "Graphics" },
              { id: "Information Retrieval", label: "Information Retrieval" },
              { id: "Multiagent Systems", label: "Multiagent Systems" },
              { id: "Operating Systems", label: "Operating Systems" },
              { id: "Programming Languages", label: "Programming Languages" },
              { id: "Symbolic Computation", label: "Symbolic Computation" },
              { id: "Software Engineering", label: "Software Engineering" },
              { id: "Other Computer Science", label: "Other Computer Science" },
            ]}
            papers={[
              {
                id: "1",
                title: "Navigating Process Mining: A Case study using pm4py",
                authors: "Ali Jidi, László Kovács",
                link: `/abs/${2409.01294}`,
                categories: "Artificial Intelligence",
                arxiv_id: "2409.01294",
              },
              {
                id: "2",
                title: "Another Study in AI",
                authors: "John Doe, Jane Smith",
                link: `/abs/${2409.01295}`,
                categories: "Artificial Intelligence",
                arxiv_id: "2409.01295",
              },
            ]}
          />
        ) : (
          <CategoryListPage
            selected={title!}
            type={"COLLECTIONS"}
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
            papers={[
              {
                id: "1",
                title: "Navigating Process Mining: A Case study using pm4py",
                authors: "Ali Jidi, László Kovács",
                link: `/abs/${2409.01294}`,
                categories: "Artificial Intelligence",
                arxiv_id: "2409.01294",
              },
              {
                id: "2",
                title: "Another Study in AI",
                authors: "John Doe, Jane Smith",
                link: `/abs/${2409.01295}`,
                categories: "Artificial Intelligence",
                arxiv_id: "2409.01295",
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
