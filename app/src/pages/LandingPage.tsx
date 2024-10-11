import { useEffect, useState } from "react";
import CategoryCard from "../components/landingComponents/CategoryCard";
import InformationPopup from "../components/landingComponents/InformationPopup";
import PaperCardContainer from "../components/categoryListComponents/PaperCardContainer";
import { PaperCard } from "../components/categoryListComponents/PaperCard";
import { Link } from "react-router-dom";
import { ILandingPageLayoutProps } from "../interfaces/ILandingPageLayoutProps";
import { ISubCategory } from "../interfaces/IAllPapers";
import { formatBytes } from "../tools/utils";

const LandingPage: React.FC<ILandingPageLayoutProps> = ({
  allCategories,
  documentsCount,
  papersSize,
}) => {
  type CategoryType =
    | "Computer Science"
    | "Physics"
    | "Mathematics"
    | "Quantitative Biology"
    | "Quantitative Finance"
    | "Statistics"
    | "Electrical Engineering and Systems Science"
    | "Economics";
  const [activeCategory, setActiveCategory] =
    useState<CategoryType>("Computer Science");
  const [activeCategorySize, setActiveCategorySize] = useState<number>(0);
  const categories: CategoryType[] = [
    "Computer Science",
    "Physics",
    "Mathematics",
    "Quantitative Biology",
    "Quantitative Finance",
    "Statistics",
    "Electrical Engineering and Systems Science",
    "Economics",
  ];
  const subcategoriesMap: Record<
    CategoryType,
    Record<string, ISubCategory | null>
  > = {
    "Computer Science": allCategories.computerScience,
    Physics: allCategories.physics,
    Mathematics: allCategories.mathematics,
    "Quantitative Biology": allCategories.quantitativeBiology,
    "Quantitative Finance": allCategories.quantitativeFinance,
    Statistics: allCategories.statistics,
    "Electrical Engineering and Systems Science":
      allCategories.electricalEngineeringAndSystemsScience,
    Economics: allCategories.economics,
  };
  const activeSubcategories = subcategoriesMap[activeCategory];

  const collections = [
    {
      icon: "/comp_sci_icon.png",
      category: "Computer Science",
      title: "Exploring the Edge of Artificial Intelligence Knowledge",
      documents: 34,
      size: "10.69MB",
    },
    {
      icon: "/physics_icon.png",
      category: "Physics",
      title: "Curious Conjectures About Artificial Intelligence and Beyond",
      documents: 12,
      size: "4.28MB",
    },
    {
      icon: "/maths_icon.png",
      category: "Mathematics",
      title: "Dynamic Systems and Fractals: A Mathematical Odyssey",
      documents: 34,
      size: "10.69MB",
    },
    {
      icon: "/quant_bio_icon.png",
      category: "Quantitative Biology",
      title:
        "The Math Behind the Cells: Unveiling Quantitative Biology Secrets",
      documents: 12,
      size: "4.28MB",
    },
    {
      icon: "/stats_icon.png",
      category: "Statistics",
      title: `Machine Learning's Dark Side: The Unseen Consequences`,
      documents: 34,
      size: "10.69MB",
    },
    {
      icon: "/econ_icon.png",
      category: "Economics",
      title: "From Adam Smith to AI: The Evolution of Theoretical Economics",
      documents: 12,
      size: "4.28MB",
    },
    {
      icon: "/quant_fin_icon.png",
      category: "Quantitative Finance",
      title: "Beyond Black Swans: Exploring Quantitative Finance Frontiers",
      documents: 12,
      size: "4.28MB",
    },
    {
      icon: "/econ_icon.png",
      category: "Economics",
      title: `Why Economics is Like Dating: It's All About Supply and Demand`,
      documents: 34,
      size: "10.69MB",
    },
    {
      icon: "/elect_eng_icon.png",
      category: "Electrical Engineering",
      title: "The Spark of Genius: Exploring Electrical Engineering Frontiers",
      documents: 34,
      size: "10.69MB",
    },
  ];

  function camelCaseToWords(s: string) {
    const result = s.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  useEffect(() => {
    // Fetch the JSON resource
    fetch("/papers.json")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setActiveCategorySize(data[activeCategory].size);
      })
      .catch((error) => {
        console.log(error);
        //setError(error);
      });
  }, [activeCategory, activeCategorySize]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-primary pb-20">
      <img
        src="/walrus_globe.png"
        alt="Logo"
        className="w-full max-w-[350px] h-auto mb-8 p-10"
      />
      <div className="pb-10 flex flex-col items-center">
        <h1 className="text-3xl text-center">
          <span>Spark Your Curiosity: Collections</span>
          <br />
          <span>That Challenge Your Thinking</span>
        </h1>
        <p className="text-sm pt-5">SIZE OF COLLECTIONS in GB</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full px-4 sm:px-8 md:px-12 lg:px-0 lg:max-w-[1100px] pb-10">
        {collections.map((item, index) => (
          <CategoryCard
            key={index}
            icon={item.icon}
            category={item.category}
            title={item.title}
            documents={item.documents}
            size={item.size}
            className="w-full"
          />
        ))}
      </div>

      <div className="pt-20 pb-10 flex flex-col items-center  max-w-[1200px]">
        <h1 className="text-3xl text-center">Browse All Categories</h1>
        <p className="text-sm pt-5">{formatBytes(papersSize)}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 my-4    max-w-[1200px]">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`${
              activeCategory === category ? "bg-tertiary" : "bg-white"
            } text-black rounded-full px-4 py-2 tx-sm`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="container mx-auto p-4 max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(activeSubcategories).map(
            ([subCategoryName, subCategoryData]) =>
              subCategoryData ? (
                <PaperCardContainer
                  key={subCategoryName}
                  category={activeCategory}
                  cardTitle={camelCaseToWords(subCategoryName)}
                  hasActionButton={true}
                  count={subCategoryData.count}
                  size={subCategoryData.size}
                  maxHeight="600px"
                >
                  {subCategoryData.papers.length > 0 ? (
                    subCategoryData.papers
                      .sort((lhs, rhs) => rhs.timestamp - lhs.timestamp) // Sort by timestamp
                      .map((paper, index) => {
                        // Map the IPaperTrimmed to the expected format
                        const mappedPaper = {
                          id: paper.id,
                          title: paper.title,
                          authors: paper.authorsParsed
                            .map((author) => author.join(" "))
                            .join(", "),
                          link: `/abs/${paper.id}`,
                          arxiv_id: paper.id,
                        };

                        return (
                          <PaperCard
                            key={mappedPaper.id}
                            paper={mappedPaper}
                            index={index}
                            hasVisibleIcon={true}
                          />
                        );
                      })
                  ) : (
                    <p>No papers available</p>
                  )}
                </PaperCardContainer>
              ) : (
                <p>No papers available for {subCategoryName}</p>
              )
          )}
        </div>

        <div className="bg-white border border-black rounded-lg p-4 space-y-4 mt-8">
          <div className="flex justify-between items-center">
            <Link
              className="text-base font-medium"
              to={`/category/${activeCategory}`}
            >
              View all in {activeCategory}
            </Link>
            <div className="text-sm font-medium text-gray-600 ">
              {documentsCount[activeCategory].count} Documents,{" "}
              {formatBytes(activeCategorySize)}
            </div>
          </div>
        </div>
      </div>

      <InformationPopup />
    </div>
  );
};

export default LandingPage;
