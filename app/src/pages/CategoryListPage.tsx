import { PaperCard } from "../components/categoryListComponents/PaperCard";
import PaperCardContainer from "../components/categoryListComponents/PaperCardContainer";
import SidebarNav from "../components/common/SideNavbar";
import { ICategoryListPageProps } from "../interfaces/ICategoryListPageProps";

const CategoryListPage: React.FC<ICategoryListPageProps> = ({ categories, papers, selected }) => {
  return (
    <div className="w-full min-h-screen bg-primary">
      <div className="p-10 text-center">
        <div className="text-sm text-gray-600">Home</div>
        <h1 className="text-4xl font-medium text-gray-900 mb-2 p-2">{selected}</h1>
        <p className="text-gray-600 mb-6">120 MB</p>
        <div className="flex justify-center space-x-4">
          <button className="bg-tertiary text-black px-4 py-2 rounded-full">
            Documents
          </button>
          <button className="bg-white text-black px-4 py-2 rounded-full">
            About
          </button>
        </div>
      </div>

      <div className="flex w-full px-[10%] py-6">
        <SidebarNav sections={categories} type={"CATEGORIES"} initialActive={selected} />
        <div className="flex-1 py-4 px-7">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-base">{selected}</h1>
          </div>
          <PaperCardContainer
            documentCount={100}
            sinceYear={2024}
            onFilterChange={(filter) => {
              console.log('Selected filter:', filter);
            }}
            activeFilter="Recent"
          >
            {papers.map((paper, index) => (
              <PaperCard key={paper.id} paper={paper} index={index} />
            ))}
          </PaperCardContainer>
        </div>
      </div>
    </div>
  );
};

export default CategoryListPage;
