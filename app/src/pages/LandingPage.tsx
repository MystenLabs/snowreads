import { useEffect, useState } from "react";
import CategoryCard from "../components/landingComponents/CategoryCard";
import InformationPopup from "../components/landingComponents/InformationPopup";
import PaperCardContainer from "../components/categoryListComponents/PaperCardContainer";
import { PaperCard } from "../components/categoryListComponents/PaperCard";
import { Link } from "react-router-dom";
import {
  AllPapers,
  CategoryWithPapers,
  IPaperTrimmed,
} from "../interfaces/IAllPapers";
import { formatBytes } from "../tools/utils";
import { Spinner } from "../components/common/Spinner";

export type CategoryArg = {
  categoryName: string;
  subCategories: string[];
};

const LANDING_PAGE_CATEGORIES: CategoryArg[] = [
  {
    categoryName: "Computer Science",
    subCategories: [
      "Artificial Intelligence",
      "Computation and Language",
      "Robotics",
      "Computational Complexity",
    ],
  },
  {
    categoryName: "Physics",
    subCategories: [
      "General Relativity and Quantum Cosmology",
      "High Energy Physics - Experiment",
      "High Energy Physics - Lattice",
      "High Energy Physics - Phenomenology",
    ],
  },
  {
    categoryName: "Mathematics",
    subCategories: [
      "Algebraic Geometry",
      "Algebraic Topology",
      "Analysis of PDEs",
      "Category Theory",
    ],
  },
  {
    categoryName: "Quantitative Biology",
    subCategories: [
      "Biomolecules",
      "Cell Behavior",
      "Genomics",
      "Molecular Networks",
    ],
  },
  {
    categoryName: "Quantitative Finance",
    subCategories: [
      "Computational Finance",
      "Portfolio Management",
      "General Finance",
      "Mathematical Finance",
    ],
  },
  {
    categoryName: "Statistics",
    subCategories: [
      "Applications",
      "Computation",
      "Machine Learning",
      "Methodology",
    ],
  },
  {
    categoryName: "Electrical Engineering and Systems Science",
    subCategories: [
      "Audio and Speech Processing",
      "Image and Video Processing",
      "Signal Processing",
      "Systems and Control",
    ],
  },
  {
    categoryName: "Economics",
    subCategories: [
      "Econometrics",
      "General Economics",
      "Theoretical Economics",
    ],
  },
  {
    categoryName: "Astrophysics",
    subCategories: [
      "Astrophysics of Galaxies",
      "Cosmology and Nongalactic Astrophysics",
      "Earth and Planetary Astrophysics",
      "High Energy Astrophysical Phenomena",
    ],
  },
  {
    categoryName: "Condensed Matter",
    subCategories: [
      "Disordered Systems and Neural Networks",
      "Materials Science",
      "Mesoscale and Nanoscale Physics",
      "Superconductivity",
    ],
  },
  {
    categoryName: "Nonlinear Sciences",
    subCategories: [
      "Adaptation and Self-Organizing Systems",
      "Cellular Automata and Lattice Gases",
      "Chaotic Dynamics",
      "Pattern Formation and Solitons",
    ],
  },
];

async function fetchPapersForSubCategory(
  path: string
): Promise<IPaperTrimmed[]> {
  const resp = await fetch(path);
  return await resp.json();
}

// This fills all papers for every category in LANDING_PAGE_CATEGORIES.
async function updateAllPapers(allPapers: AllPapers) {
  let promises = [];
  for (const catArg of LANDING_PAGE_CATEGORIES) {
    const cat = allPapers.categories.find(
      (cat) => cat.name === catArg.categoryName
    );
    if (!cat) {
      throw `Did not find ${catArg.categoryName}`;
    }
    for (const subCatArg of catArg.subCategories) {
      const subCat = cat.subCategories.find(
        (subCat) => subCat.name === subCatArg
      );
      if (!subCat) {
        throw `Did not find ${catArg.categoryName}->${subCatArg}`;
      }
      const data = subCat.data;
      promises.push(
        fetchPapersForSubCategory(data).then((papers) => {
          subCat.papers = papers;
        })
      );
    }
  }
  console.log("Awaiting for all promises together");
  await Promise.all(promises);
}

const LandingPage: React.FC = () => {
  const [allPapersData, setAllPapersData] = useState<AllPapers | null>(null);
  const [allCollectionsData, setAllCollectionsData] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState<
    CategoryWithPapers | undefined
  >(undefined);
  const [activeCategorySize, setActiveCategorySize] = useState<number>(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
        setAllCollectionsData(data);
      })
      .catch((error) => {
        console.error("Error fetching collections data:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch the JSON resource
    fetch("/papers.json")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(async (data: AllPapers) => {
        if (!data) {
          throw "No data from /papers, or data not parsed correctly";
        }
        await updateAllPapers(data);
        console.log("Promises finished");
        setAllPapersData(data);
        setActiveCategory(
          data.categories.find((cat) => cat.name === "Computer Science")
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!allPapersData) return;
    setActiveCategorySize(
      allPapersData.categories.find((cat) => cat.name === activeCategory?.name)!
        .size
    );
  }, [activeCategory, allPapersData]);

  const toggleInformationPopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  if (!allPapersData || !allCollectionsData) {
    return <Spinner />;
  }

  const collections = [
    {
      icon: "/maths_icon.png",
      title: "The Science of Everyday Decisions",
      documents: allCollectionsData["The Science of Everyday Decisions"].count,
      size: allCollectionsData["The Science of Everyday Decisions"].size,
    },
    {
      icon: "/elect_eng_icon.png",
      title: "Scientific Wonder of Pop Culture",
      documents: allCollectionsData["Scientific Wonder of Pop Culture"].count,
      size: allCollectionsData["Scientific Wonder of Pop Culture"].size,
    },
    {
      icon: "/comp_sci_icon.png",
      title: "Is AI Fun?",
      documents: allCollectionsData["Is AI Fun"].count,
      size: allCollectionsData["Is AI Fun"].size,
    },
    {
      icon: "/comp_sci_icon.png",
      title: "Mysten Labs Papers",
      documents: allCollectionsData["Mysten Labs Papers"].count,
      size: allCollectionsData["Mysten Labs Papers"].size,
    },
  ];

  return (
    <div className="relative z-[1] flex flex-col items-center justify-start min-h-screen bg-primary pb-20">
      <img
        src="/logo_with_globe.png"
        alt="Logo"
        className="w-full min-w-[352px] min-h-[324px] max-w-[352px] h-auto p-10"
      />
      <p className="text-xs -mt-8 px-5 text-center">
        Curated collections of scientific papers stored on Walrus.
      </p>
      <p className="text-base b-16 pt-10 text-center">
        <span className="font-semibold">{formatBytes(allPapersData.size)}</span>{" "}
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

      <div className="pt-16 pb-10 flex flex-col items-center max-w-[1100px]">
        <h1 className="text-3xl text-center bg-primary rounded-lg px-3">
          Browse All Categories
        </h1>
      </div>

      <div className="flex flex-wrap justify-center gap-4 my-4 max-w-[1200px]">
        {LANDING_PAGE_CATEGORIES.map((catArg) => (
          <button
            key={catArg.categoryName}
            onClick={() =>
              setActiveCategory(
                allPapersData.categories.find(
                  (cat) => cat.name === catArg.categoryName
                )
              )
            }
            className={`${activeCategory?.name === catArg.categoryName ? "bg-tertiary" : "bg-white"} text-black rounded-full px-4 py-2 tx-sm`}
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
          {LANDING_PAGE_CATEGORIES.find(
            (cat) => cat.categoryName === activeCategory?.name
          )?.subCategories.map((subCategoryName) =>
            allPapersData.categories
              .find((cat) => cat.name === activeCategory?.name)
              ?.subCategories.find(
                (subCat) => subCat.name === subCategoryName
              ) ? (
              <PaperCardContainer
                key={subCategoryName}
                category={activeCategory?.name}
                cardTitle={subCategoryName}
                hasActionButton={true}
                count={
                  allPapersData.categories
                    .find((cat) => cat.name === activeCategory?.name)
                    ?.subCategories.find(
                      (subCat) => subCat.name === subCategoryName
                    )?.count
                }
                size={
                  allPapersData.categories
                    .find((cat) => cat.name === activeCategory?.name)
                    ?.subCategories.find(
                      (subCat) => subCat.name === subCategoryName
                    )?.size
                }
                maxHeight="600px"
              >
                {allPapersData.categories
                  .find((cat) => cat.name === activeCategory?.name)!
                  .subCategories.find(
                    (subCat) => subCat.name === subCategoryName
                  )!.papers.length > 0 ? (
                  allPapersData.categories
                    .find((cat) => cat.name === activeCategory?.name)!
                    .subCategories.find(
                      (subCat) => subCat.name === subCategoryName
                    )!
                    .papers.sort((lhs, rhs) => rhs.timestamp - lhs.timestamp)
                    .map((paper) => {
                      const mappedPaper = {
                        id: paper.id,
                        title: paper.title,
                        authors: paper.authorsParsed
                          .map((author) => author.join(" "))
                          .join(", "),
                        link: `/abs/${paper.id}`,
                        arxiv_id: paper.id,
                        metadataBlobId: paper.metadataBlobId,
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
              {
                allPapersData.categories.find(
                  (cat) => cat.name === activeCategory?.name
                )?.count
              }{" "}
              Documents, {formatBytes(activeCategorySize)}
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
