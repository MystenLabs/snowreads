import { useEffect, useState } from "react";
import { PaperCard } from "../components/categoryListComponents/PaperCard";
import PaperCardContainer from "../components/categoryListComponents/PaperCardContainer";
import SidebarNav from "../components/common/SideNavbar";
import { ICategoryListPageProps } from "../interfaces/ICategoryListPageProps";
import MobileNavigationBar from "../components/common/MobileNavigationBar";
import { useParams, useNavigate } from "react-router-dom";
import { AllPapers, IPaperTrimmed } from "../interfaces/IAllPapers";
import { Spinner } from "../components/common/Spinner";
import { formatBytes } from "../tools/utils";
import InformationPopup from "../components/landingComponents/InformationPopup";


async function fetchPapersForSubCategory(path: string): Promise<IPaperTrimmed[]> {
  const resp = await fetch(path);
  return await resp.json();
}

// This fills all papers for every category.
async function updateSubCategoryPapers(allPapers: AllPapers, category: string, subCategory: string) {
  const cat = allPapers.categories.find((cat) => cat.name === category);
  if (!cat) {
    throw `Category ${category} not found`;
  }
  const subCat = cat.subCategories.find((subCat) => subCat.name === subCategory);
  if (!subCat) {
    throw `SubCategory ${category}->${subCategory} not found`;
  }
  const dataPath = subCat.data;
  subCat.papers = await fetchPapersForSubCategory(dataPath);
}

const CategoryListPage: React.FC<ICategoryListPageProps> = ({ label }) => {
  const [activeTab, setActiveTab] = useState("DOCUMENTS");
  const [activeCategorySize, setActiveCategorySize] = useState<number>(0);
  const [activeCategoryCount, setActiveCategoryCount] = useState<number>(0);
  let { category, subcategory } = useParams();
  const navigate = useNavigate(); // To navigate to the default subcategory URL if missing
  const [papers, setPapers] = useState<IPaperTrimmed[]>([]);
  const [allCategories, setAllCategories] = useState<AllPapers | null>(null);
  const [correctSubcategory, setCorrectSubcategory] = useState<string | null>(
    null
  );
  const [activeSubcategorySize, setActiveSubcategorySize] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Start loading
    setLoading(true);

    // Fetch the JSON resource for categories
    fetch("/papers.json")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(async (data: AllPapers) => {

        if (!category) {
          category = "Astrophysics"
        }
        const cat = data.categories.find((cat) => cat.name === category);
        if (!cat) {
          throw `Category ${cat} not found`;
        }
        setActiveCategorySize(cat?.size ?? 0);
        setActiveCategoryCount(cat?.count ?? 0);

        // If no subcategory is provided, use the first available one
        if (!subcategory) {
          const sortedSubCats = cat.subCategories.sort((lhs, rhs) => lhs.name.localeCompare(rhs.name));
          subcategory = sortedSubCats[0].name;
        }
        if (!subcategory) {
          throw `Category ${category} did not have any subcategories`;
        }
        // Find the correct case-sensitive subcategory name
        const found = cat.subCategories.find((subCat) => subCat.name.toLowerCase() === subcategory!.toLowerCase().trim());
        if (!found) {
          throw `SubCategory: ${category}/${subcategory} not found`;
        }

        setCorrectSubcategory(found.name);
        setActiveSubcategorySize(
          found.size
        );
        // This will fill the desired sub-category papers
        await updateSubCategoryPapers(data, category, found.name);
        setAllCategories(data);
        setPapers(found.papers); // Now found has been updated to include papers
        setLoading(false); // Stop loading after fetching
      })
      .catch((error) => {
        console.error("Error fetching papers data:", error);
        setLoading(false); // Stop loading if there's an error
      });
  }, [category, subcategory, navigate]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full min-h-screen bg-primary flex flex-col items-center">
          <div className="pt-10 pb-5 text-center">
            <div className="flex justify-center">
              <div className="text-2xl md:text-2xl sm:text-2xl lg:text-3xl font-medium text-gray-900 p-2 max-w-xl w-full text-center">
                {category}
              </div>
            </div>
            <p className="text-gray-600 mb-6 mt-3">
              {formatBytes(activeCategorySize)} of data saved on{" "}
              <span className="text-quaternary">Walrus</span>
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className={`px-4 py-2 rounded-full ${activeTab === "DOCUMENTS"
                  ? "bg-tertiary text-black"
                  : "bg-white text-black"
                  }`}
                onClick={() => setActiveTab("DOCUMENTS")}
              >
                Documents
              </button>
              <button
                className={`px-4 py-2 rounded-full ${activeTab === "ABOUT"
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
              {category && allCategories?.categories.find((cat) => cat.name === category) && (
                <SidebarNav
                  mode="fetch"
                  sections={
                    allCategories.categories.find((cat) => cat.name == category)!.subCategories
                    .sort((a, b) => a.name.localeCompare(b.name)) // Alphabetically sort categories
                    .map((subCategory) => ({
                      id: subCategory.name,
                      label: subCategory.name,
                    }))}
                  label={label}
                  initialActive={correctSubcategory!}
                />
              )}

              <div className="flex-1 py-4 px-7">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-xl md:text-xl sm:text-xl lg:text-2xl font-base">
                    {subcategory}
                  </h1>
                </div>
                <MobileNavigationBar
                  mode="fetch"
                  label="CATEGORIES"
                  initialActive={correctSubcategory!}
                  options={
                    allCategories!.categories.find((cat) => cat.name == category)!.subCategories
                    .sort((a, b) => a.name.localeCompare(b.name)) // Alphabetically sort categories
                    .map((subCategory) => ({
                      id: subCategory.name,
                      label: subCategory.name,
                    }))}
                />
                <PaperCardContainer
                  cardTitle={`${papers.length} Documents, ${formatBytes(
                    activeSubcategorySize
                  )}`}
                  maxHeight="1200px"
                >
                  {papers.length > 0 ? (
                    papers
                      .sort((lhs, rhs) => rhs.timestamp - lhs.timestamp) // Sort by timestamp
                      .map((paper) => {
                        const mappedPaper = {
                          id: paper.id,
                          title: paper.title,
                          authors: paper.authorsParsed
                            .map((author) => author.join(" "))
                            .join(", "),
                          link: `/abs/${paper.id}`,
                          arxiv_id: paper.id,
                          metadataBlobId: paper.metadataBlobId
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
              </div>
            </div>
          )}

          {/* Displaying this section when "About" tab is active */}
          {activeTab === "ABOUT" && (
            <div className="flex flex-col items-center justify-center w-full h-full py-10">
              <p className="sm:text-sm md:text-base lg:text-base text-left max-w-2xl mb-4 px-5">
                This category includes {activeCategoryCount} papers with a total
                size of {formatBytes(activeCategorySize)} stored on Walrus.
                <br />
                All papers are available under Creative Commons (CC) licenses.
                <br />
                <br />
                Thank you to{" "}
                <span className="text-quaternary">
                  <a
                    href="https://arxiv.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    arXiv
                  </a>
                </span>{" "}
                for use of its open access interoperability.
                <br />
                <br />
                This service was not reviewed or approved by, nor does it
                necessarily express or reflect the policies or opinions of,
                arXiv.
              </p>
            </div>
          )}
          <InformationPopup />
        </div>
      )}
    </>
  );
};

export default CategoryListPage;
