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

  const [collectionsSize, setCollectionsSize] = useState<number>(0);
  const [computerScienceSize, setComputerScienceSize] = useState<number>(0);
  const [computerScienceCount, setComputerScienceCount] = useState<number>(0);

  const [physicsSize, setPhysicsSize] = useState<number>(0);
  const [physicsCount, setPhysicsCount] = useState<number>(0);

  const [mathematicsSize, setMathematicsSize] = useState<number>(0);
  const [mathematicsCount, setMathematicsCount] = useState<number>(0);

  const [quantBiologySize, setQuantBiologySize] = useState<number>(0);
  const [quantBiologyCount, setQuantBiologyCount] = useState<number>(0);

  const [statisticsSize, setStatisticsSize] = useState<number>(0);
  const [statisticsCount, setStatisticsCount] = useState<number>(0);

  const [economicsSize, setEconomicsSize] = useState<number>(0);
  const [economicsCount, setEconomicsCount] = useState<number>(0);
  const [economics2Size, setEconomics2Size] = useState<number>(0);
  const [economics2Count, setEconomics2Count] = useState<number>(0);

  const [quantFinanceSize, setQuantFinanceSize] = useState<number>(0);
  const [quantFinanceCount, setQuantFinanceCount] = useState<number>(0);

  const [electricalEngineeringSize, setElectricalEngineeringSize] =
    useState<number>(0);
  const [electricalEngineeringCount, setElectricalEngineeringCount] =
    useState<number>(0);
  const collections = [
    {
      icon: "/comp_sci_icon.png",
      category: "Computer Science",
      title: "Exploring the Edge of Artificial Intelligence Knowledge",
      documents: computerScienceCount,
      size: computerScienceSize,
    },
    {
      icon: "/physics_icon.png",
      category: "Physics",
      title: "Curious Conjectures About Artificial Intelligence and Beyond",
      documents: physicsCount,
      size: physicsSize,
    },
    {
      icon: "/maths_icon.png",
      category: "Mathematics",
      title: "Dynamic Systems and Fractals: A Mathematical Odyssey",
      documents: mathematicsCount,
      size: mathematicsSize,
    },
    {
      icon: "/quant_bio_icon.png",
      category: "Quantitative Biology",
      title:
        "The Math Behind the Cells: Unveiling Quantitative Biology Secrets",
      documents: quantBiologyCount,
      size: quantBiologySize,
    },
    {
      icon: "/stats_icon.png",
      category: "Statistics",
      title: `Machine Learning's Dark Side: The Unseen Consequences`,
      documents: statisticsCount,
      size: statisticsSize,
    },
    {
      icon: "/econ_icon.png",
      category: "Economics",
      title: "From Adam Smith to AI: The Evolution of Theoretical Economics",
      documents: economicsCount,
      size: economicsSize,
    },
    {
      icon: "/quant_fin_icon.png",
      category: "Quantitative Finance",
      title: "Beyond Black Swans: Exploring Quantitative Finance Frontiers",
      documents: quantFinanceCount,
      size: quantFinanceSize,
    },
    {
      icon: "/econ_icon.png",
      category: "Economics",
      title: `Why Economics is Like Dating: It's All About Supply and Demand`,
      documents: economics2Count,
      size: economics2Size,
    },
    {
      icon: "/elect_eng_icon.png",
      category: "Electrical Engineering",
      title: "The Spark of Genius: Exploring Electrical Engineering Frontiers",
      documents: electricalEngineeringCount,
      size: electricalEngineeringSize,
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

  useEffect(() => {
    // Fetch the JSON resource for collections
    fetch("/collections.json")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setCollectionsSize(data.size);
        setComputerScienceSize(
          data["Exploring the Edge of Artificial Intelligence Knowledge"].size
        );
        setComputerScienceCount(
          data["Exploring the Edge of Artificial Intelligence Knowledge"].count
        );
        setPhysicsCount(
          data["Curious Conjectures About Artificial Intelligence and Beyond"]
            .count
        );
        setPhysicsSize(
          data["Curious Conjectures About Artificial Intelligence and Beyond"]
            .size
        );
        setMathematicsCount(
          data["Dynamic Systems and Fractals: A Mathematical Odyssey"].count
        );
        setMathematicsSize(
          data["Dynamic Systems and Fractals: A Mathematical Odyssey"].size
        );
        setQuantBiologyCount(
          data[
            "The Math Behind the Cells: Unveiling Quantitative Biology Secrets"
          ].count
        );
        setQuantBiologySize(
          data[
            "The Math Behind the Cells: Unveiling Quantitative Biology Secrets"
          ].size
        );
        setStatisticsCount(
          data[`Machine Learning's Dark Side: The Unseen Consequences`].count
        );
        setStatisticsSize(
          data[`Machine Learning's Dark Side: The Unseen Consequences`].size
        );
        setEconomicsCount(
          data["From Adam Smith to AI: The Evolution of Theoretical Economics"]
            .count
        );
        setEconomicsSize(
          data["From Adam Smith to AI: The Evolution of Theoretical Economics"]
            .size
        );
        setQuantFinanceCount(
          data["Beyond Black Swans: Exploring Quantitative Finance Frontiers"]
            .count
        );
        setQuantFinanceSize(
          data["Beyond Black Swans: Exploring Quantitative Finance Frontiers"]
            .size
        );
        setEconomics2Count(
          data[`Why Economics is Like Dating: It's All About Supply and Demand`]
            .count
        );
        setEconomics2Size(
          data[`Why Economics is Like Dating: It's All About Supply and Demand`]
            .size
        );
        setElectricalEngineeringCount(
          data[
            "The Spark of Genius: Exploring Electrical Engineering Frontiers"
          ].count
        );
        setElectricalEngineeringSize(
          data[
            "The Spark of Genius: Exploring Electrical Engineering Frontiers"
          ].size
        );
      })
      .catch((error) => {
        console.error("Error fetching collections data:", error);
      });
  }, []);

  return (
    <div className="relative z-[1] flex flex-col items-center justify-start min-h-screen bg-primary pb-20">
      <img
        src="/logo_with_globe.png"
        alt="Logo"
        className="w-full max-w-[350px] h-auto p-10"
      />
      <p className="text-xs -mt-8 pb-16 px-5 text-center">
        Curated collections of scientific papers stored on Walrus.
      </p>
      <div className="pb-10 flex flex-col items-center">
        <h1 className="text-3xl text-center">
          <span>Spark Your Curiosity: Collections</span>
          <br />
          <span>That Challenge Your Thinking</span>
        </h1>
        <p className="text-sm pt-5">
          {formatBytes(collectionsSize)} of data saved on{" "}
          <span className="text-quaternary">Walrus</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full px-4 sm:px-8 md:px-12 lg:px-0 lg:max-w-[1100px] pb-10">
        {collections.map((item, index) => (
          <CategoryCard
            key={index}
            icon={item.icon}
            category={item.category}
            title={item.title}
            documents={item.documents}
            size={Number(item.size)}
            className="w-full"
          />
        ))}
      </div>

      <div className="pt-20 pb-10 flex flex-col items-center  max-w-[1100px]">
        <h1 className="text-3xl text-center bg-primary rounded-lg px-3">
          Browse All Categories
        </h1>
        <p className="text-sm pt-5">
          {formatBytes(papersSize)} of data saved on{" "}
          <span className="text-quaternary">Walrus</span>
        </p>
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
        <div className="absolute lg:top-[44%] lg:right-[20%] md:top-[50%] md:right-[2%] transform -translate-y-1/2 z-[-10] hidden md:block">
          <img
            src="/walrus_avatar.png"
            alt="Background"
            className="w-[300px] lg:w-[380px] h-auto object-cover"
          />
        </div>
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <Link
              className="text-base font-medium"
              to={`/category/${activeCategory}`}
            >
              View all in {activeCategory}
            </Link>
            <div className="text-sm font-medium text-gray-600 sm:text-right">
              {documentsCount[activeCategory].count} Documents,{" "}
              {formatBytes(activeCategorySize)}
            </div>
          </div>
        </div>
      </div>
      {/* <BackToTopButton /> */}
      <InformationPopup />
    </div>
  );
};

export default LandingPage;
