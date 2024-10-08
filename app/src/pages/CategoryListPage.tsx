import { useEffect, useState } from "react";
import { PaperCard } from "../components/categoryListComponents/PaperCard";
import PaperCardContainer from "../components/categoryListComponents/PaperCardContainer";
import SidebarNav from "../components/common/SideNavbar";
import { ICategoryListPageProps } from "../interfaces/ICategoryListPageProps";
import MobileNavigationBar from "../components/common/MobileNavigationBar";
import { useParams, useNavigate } from "react-router-dom";
import { IAllPapers, IPaperTrimmed } from "../interfaces/IAllPapers";
import { Spinner } from "../components/common/Spinner";

// Helper function to find the correct case-sensitive subcategory name
const findCorrectSubCategoryName = (
  subcategoryFromParams: string,
  categoryData: Record<string, any>
): string | null => {
  const subcategories = Object.keys(categoryData).filter(
    (sub) => sub !== "count"
  );

  // Normalize case and find the correct subcategory name
  const correctSubCategory = subcategories.find(
    (sub) => sub.toLowerCase() === subcategoryFromParams.toLowerCase()
  );

  return correctSubCategory || null; // Return the correct case or null if not found
};

const CategoryListPage: React.FC<ICategoryListPageProps> = ({ type }) => {
  const [activeTab, setActiveTab] = useState("DOCUMENTS");
  const { category, subcategory } = useParams();
  const navigate = useNavigate(); // To navigate to the default subcategory URL if missing
  const [papers, setPapers] = useState<IPaperTrimmed[]>([]);
  const [allCategories, setAllCategories] = useState<IAllPapers>(
    {} as IAllPapers
  );
  const [correctSubcategoryLabel, setCorrectSubcategory] = useState<
    string | null
  >();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the JSON resource
    setLoading(true); // Start loading
    fetch("/papers.json")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setAllCategories(data);

        if (category) {
          let chosenSubcategory = subcategory;

          // If no subcategory is provided, use the first available one
          if (!subcategory) {
            const subcategories = Object.keys(data[category]).filter(
              (sub) => sub !== "count"
            );
            if (subcategories.length > 0) {
              chosenSubcategory = subcategories[0];
              // Navigate to the URL with the first subcategory
              navigate(`/category/${category}/${chosenSubcategory}`, {
                replace: true,
              });
            }
          }

          if (chosenSubcategory) {
            // Find the correct case-sensitive subcategory name
            const correctSubcategory = findCorrectSubCategoryName(
              chosenSubcategory,
              data[category]
            );
            setCorrectSubcategory(correctSubcategory);

            if (correctSubcategory) {
              const fetchedPapers =
                data[category][correctSubcategory]?.papers || [];
              setPapers(fetchedPapers);
            } else {
              console.error(`Subcategory "${chosenSubcategory}" not found.`);
              setPapers([]); // Set papers to empty array if no match is found
            }
          }
        }
        setLoading(false); // Stop loading after fetching
      })
      .catch((error) => {
        console.error("Error fetching papers data:", error);
        setLoading(false); // Stop loading if there's an error
      });
  }, [category, subcategory, navigate]);

  return (
    <div className="w-full min-h-screen bg-primary flex flex-col items-center">
      <div className="pt-10 pb-5 text-center">
        <div className="text-sm text-gray-600">Home </div>
        <div className="flex justify-center">
          <div className="text-2xl md:text-2xl sm:text-2xl lg:text-3xl font-medium text-gray-900 p-2 max-w-xl w-full text-center">
            {category}
          </div>
        </div>
        <p className="text-gray-600 mb-6">120 MB</p>
        <div className="flex justify-center space-x-4">
          <button
            className={`px-4 py-2 rounded-full ${
              activeTab === "DOCUMENTS"
                ? "bg-tertiary text-black"
                : "bg-white text-black"
            }`}
            onClick={() => setActiveTab("DOCUMENTS")}
          >
            Documents
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              activeTab === "ABOUT"
                ? "bg-tertiary text-black"
                : "bg-white text-black"
            }`}
            onClick={() => setActiveTab("ABOUT")}
          >
            About
          </button>
        </div>
      </div>

      {/* Displaying this section when "Documents" tab is active */}
      {activeTab === "DOCUMENTS" && (
        <div className="flex w-full py-6 lg:max-w-[1100px]">
          {category && allCategories[category as keyof IAllPapers] && (
            <SidebarNav
              mode="fetch"
              sections={Object.keys(
                allCategories[category as keyof IAllPapers] || {}
              )
                .filter((sub) => sub !== "count")
                .map((subCategory) => ({
                  id: subCategory,
                  label: subCategory,
                }))}
              type={type}
              initialActive={correctSubcategoryLabel!}
            />
          )}

          <div className="flex-1 py-4 px-7">
            <div className="flex justify-between items-center mb-6">
              {type === "CATEGORIES" ? (
                <h1 className="text-xl md:text-xl sm:text-xl lg:text-2xl font-base">
                  {subcategory}
                </h1>
              ) : (
                ""
              )}
            </div>
            <MobileNavigationBar
              mode="fetch"
              options={Object.keys(
                allCategories[category as keyof IAllPapers] || {}
              )
                .filter((sub) => sub !== "count")
                .map((subCategory) => ({
                  id: subCategory,
                  label: subCategory,
                }))}
            />
            {loading ? (
              <Spinner />
            ) : (
              <PaperCardContainer
                cardTitle={`${papers.length} Documents`}
                maxHeight="1200px"
              >
                {papers.length > 0 ? (
                  papers
                    .sort((lhs, rhs) => rhs.timestamp - lhs.timestamp) // Sort by timestamp
                    .map((paper, index) => {
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
            )}
          </div>
        </div>
      )}

      {/* Displaying this section when "About" tab is active */}
      {activeTab === "ABOUT" && (
        <div className="flex flex-col items-center justify-center w-full h-full py-10">
          <p className="sm:text-sm md:text-base lg:text-base text-left max-w-2xl mb-4 px-5">
            Welcome to the Computing Research Repository in WalrusArxiv. The
            Computer Science section was established in 2024 through a
            partnership of the Association for Computing Machinery, the
            Networked Computer Science Technical Reference Library, and arXiv.
          </p>

          <h2 className="sm:text-xl md:text-2xl lg:text-2xl mb-6 text-left w-full max-w-2xl p-5">
            Editorial Committee
          </h2>

          <p className="sm:text-sm md:text-base lg:text-base text-left max-w-2xl mb-4 px-5">
            The editorial committee members serve as consultants to Cornell
            University and to the arXiv Editorial Advisory Council. All arXiv
            policy decisions are ultimately made by Cornell University.
          </p>

          <ul className="list-disc text-left space-y-2 max-w-2xl w-full pl-10 sm:pl-15 md:pl-15 lg:pl-20 pr-5">
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Thomas Dietterich, Oregon State University (chair)
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Krzysztof Apt, Centrum Wiskunde & Informatica, and University of
              Amsterdam
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Ron Boisvert, National Institute of Standards and Technology
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Carol Hutchins, New York University
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Scott Delman, Association for Computing Machinery
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Jon Doyle, North Carolina State
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Ed Fox, Virginia Tech
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Lee Giles, The Pennsylvania State University
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Joseph Halpern, Cornell University
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Michael Lesk, Rutgers University
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Andrew McCallum, University of Massachusetts, Amherst
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Steve Minton, InferLink
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Andrew Odlyzko, University of Minnesota
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Michael O'Donnell, University of Chicago
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Erik Sandewall, Linköping University, Sweden
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Stuart Shieber, Harvard University
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Jeff Ullman, Stanford University
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryListPage;
