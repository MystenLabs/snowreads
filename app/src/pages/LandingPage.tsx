import { useEffect, useState } from "react";
import CategoryCard from "../components/landingComponents/CategoryCard";
import InformationPopup from "../components/landingComponents/InformationPopup";
import PaperCardContainer from "../components/categoryListComponents/PaperCardContainer";
import { PaperCard } from "../components/categoryListComponents/PaperCard";
import { Link } from "react-router-dom";
import { ILandingPageLayoutProps } from "../interfaces/ILandingPageLayoutProps";
import { AllPapers, CategoryWithPapers } from "../interfaces/IAllPapers";
import { formatBytes } from "../tools/utils";
import { CategoryArg } from "../layout/landingLayout/LandingPageLayout";

const LandingPage: React.FC<ILandingPageLayoutProps> = ({
  allPapersData,
  filledSubCategories,
  allCollectionsData,
}: {
  allPapersData: AllPapers;
  filledSubCategories: CategoryArg[];
  allCollectionsData: any;
}) => {
  const [activeCategory, setActiveCategory] =
    useState<CategoryWithPapers | undefined>(allPapersData.categories.find((cat) => cat.name === "Computer Science"));
  const [activeCategorySize, setActiveCategorySize] = useState<number>(0);

  const collectionsSize = allCollectionsData.size;
  const collectionTSEDSize =
    allCollectionsData["The Science of Everyday Decisions"].size;
  const collectionTSEDCount =
    allCollectionsData["The Science of Everyday Decisions"].count;

  const collectionSWPCSize =
    allCollectionsData["Scientific Wonder of Pop Culture"].size;
  const collectionSWPCCount =
    allCollectionsData["Scientific Wonder of Pop Culture"].count;
  const collectionIAIFSize = allCollectionsData["Is AI Fun"].size;
  const collectionIAIFCount = allCollectionsData["Is AI Fun"].count;

  const collections = [
    {
      icon: "/maths_icon.png",
      title: "The Science of Everyday Decisions",
      documents: collectionTSEDCount,
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
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const toggleInformationPopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!allPapersData) return;
    setActiveCategorySize(allPapersData.categories.find((cat) => cat.name === activeCategory?.name)!.size);
  }, [activeCategory, activeCategorySize]);

  return (
    <div className="relative z-[1] flex flex-col items-center justify-start min-h-screen bg-primary pb-20">
      <img
        src="/logo_with_globe.png"
        alt="Logo"
        className="w-full min-w-[352px] min-h-[324px] max-w-[352px] h-auto p-10"
      />
      <p className="text-xs -mt-8  px-5 text-center">
        Curated collections of scientific papers stored on Walrus.
      </p>
      <p className="text-base b-16 pt-10 text-center">
        <span className="font-semibold">
          {formatBytes(allPapersData.size + collectionsSize)} {/* TODO Check: papers in collections should also exist inside allPapersData */}
        </span>{" "}
        of data saved on{" "}
        <span className="text-quaternary font-semibold">Walrus</span>
      </p>
      <p className="text-base pb-10 text-center">
        SnowReads is published on Walrus Sites.{" "}
        <span
          className="text-gray-500 hover:cursor-pointer whitespace-nowrap"
          onClick={toggleInformationPopup}
        >
          Learn more.
        </span>
      </p>

      <div className="pb-10 flex flex-col items-center">
        <h1 className="text-3xl text-center">
          <span>Spark Your Curiosity: Collections</span>
          <br />
          <span>That Challenge Your Thinking</span>
        </h1>
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
        {filledSubCategories.map((catArg) => (
          <button
            key={catArg.categoryName}
            onClick={() => setActiveCategory(allPapersData.categories.find((cat) => cat.name === catArg.categoryName))}
            className={`${activeCategory?.name === catArg.categoryName ? "bg-tertiary" : "bg-white"
              } text-black rounded-full px-4 py-2 tx-sm`}
          >
            {catArg.categoryName}
          </button>
        ))}
        <div className="absolute lg:top-[35%] lg:right-[20%] md:top-[40%] md:right-[2%] transform -translate-y-1/2 z-[-10] hidden md:block max-w-[1100px]">
          <img
            src="/walrus_avatar.png"
            alt="Background"
            className="w-[300px] lg:w-[380px] h-auto object-cover"
          />
        </div>
      </div>

      <div className="container mx-auto p-4 max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filledSubCategories.find((cat) => cat.categoryName === activeCategory?.name)?.subCategories.map(
            (subCategoryName) =>
              allPapersData.categories.find((cat) => cat.name == activeCategory?.name)?.subCategories.find((subCat) => subCat.name === subCategoryName) ? (
                <PaperCardContainer
                  key={subCategoryName}
                  category={activeCategory?.name}
                  cardTitle={subCategoryName}
                  hasActionButton={true}
                  count={allPapersData.categories.find((cat) => cat.name == activeCategory?.name)?.subCategories.find((subCat) => subCat.name === subCategoryName)?.count}
                  size={allPapersData.categories.find((cat) => cat.name == activeCategory?.name)?.subCategories.find((subCat) => subCat.name === subCategoryName)?.size}
                  maxHeight="600px"
                >
                  {allPapersData.categories.find((cat) => cat.name == activeCategory?.name)!.subCategories.find((subCat) => subCat.name === subCategoryName)!.papers.length > 0 ? (
                    allPapersData.categories.find((cat) => cat.name == activeCategory?.name)!.subCategories.find((subCat) => subCat.name === subCategoryName)!.papers
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
              to={`/category/${activeCategory?.name}`}
            >
              View all in {activeCategory?.name}
            </Link>
            <div className="text-sm font-medium text-gray-600 sm:text-right">
              {allPapersData.categories.find((cat) => cat.name == activeCategory?.name)?.count} Documents,{" "}
              {formatBytes(activeCategorySize)}
            </div>
          </div>
        </div>
      </div>
      {/* <BackToTopButton /> */}
      <InformationPopup
        isOpen={isPopupOpen}
        togglePopup={toggleInformationPopup}
      />
    </div>
  );
};

export default LandingPage;
