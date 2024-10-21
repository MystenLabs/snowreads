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
  allPapersData,
  allCollectionsData,
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
  const [collectionTSEDSize, setCollectionTSEDSize] = useState<number>(0);
  const [ollectionTSEDCount, setCollectionTSEDCount] = useState<number>(0);

  const [collectionSWPCSize, setCollectionSWPCSize] = useState<number>(0);
  const [collectionSWPCCount, setCollectionSWPCCount] = useState<number>(0);

  const [collectionIAIFSize, setCollectionIAIFSize] = useState<number>(0);
  const [collectionIAIFCount, setCollectionIAIFCount] = useState<number>(0);

  const collections = [
    {
      icon: "/maths_icon.png",
      title: "The Science of Everyday Decisions",
      documents: ollectionTSEDCount,
      size: collectionTSEDSize,
    },
    {
      icon: "/elect_eng_icon.png",
      title: "Scientific Wonder of Pop Culture",
      documents: collectionSWPCCount,
      size: collectionSWPCSize,
    },
    {
      icon: "/comp_sci_icon.png",
      title: "Is AI Fun?",
      documents: collectionIAIFCount,
      size: collectionIAIFSize,
    },
  ];

  function camelCaseToWords(s: string) {
    const result = s.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  useEffect(() => {
    if (!allPapersData) return;
    setActiveCategorySize(allPapersData[activeCategory].size);
  }, [activeCategory, activeCategorySize]);

  useEffect(() => {
    if (!allCollectionsData) return;
    setCollectionsSize(allCollectionsData.size);
    setCollectionTSEDSize(
      allCollectionsData["The Science of Everyday Decisions"].size
    );
    setCollectionTSEDCount(
      allCollectionsData["The Science of Everyday Decisions"].count
    );
    setCollectionSWPCSize(
      allCollectionsData["Scientific Wonder of Pop Culture"].size
    );
    setCollectionSWPCCount(
      allCollectionsData["Scientific Wonder of Pop Culture"].count
    );
    setCollectionIAIFSize(allCollectionsData["Is AI Fun"].size);
    setCollectionIAIFCount(allCollectionsData["Is AI Fun"].count);
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
          {formatBytes(papersSize + collectionsSize)} of data saved on{" "}
          <span className="text-quaternary">Walrus</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full px-4 sm:px-8 md:px-12 lg:px-0 lg:max-w-[1100px] pb-10">
        {collections.map((item, index) => (
          <CategoryCard
            key={index}
            icon={item.icon}
            title={item.title}
            documents={item.documents}
            size={Number(item.size)}
            className="w-full"
          />
        ))}
      </div>

      <div className="pt-16 pb-10 flex flex-col items-center  max-w-[1100px]">
        <h1 className="text-3xl text-center bg-primary rounded-lg px-3">
          Browse All Categories
        </h1>
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
        <div className="absolute lg:top-[35%] lg:right-[20%] md:top-[40%] md:right-[2%] transform -translate-y-1/2 z-[-10] hidden md:block">
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
                      .map((paper) => {
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
