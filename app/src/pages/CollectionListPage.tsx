import { useEffect, useState } from "react";
import { PaperCard } from "../components/categoryListComponents/PaperCard";
import PaperCardContainer from "../components/categoryListComponents/PaperCardContainer";
import SidebarNav from "../components/common/SideNavbar";
import { ICategoryListPageProps } from "../interfaces/ICategoryListPageProps";
import MobileNavigationBar from "../components/common/MobileNavigationBar";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "../components/common/Spinner";
import { formatBytes } from "../tools/utils";
import InformationPopup from "../components/landingComponents/InformationPopup";

const CollectionListPage: React.FC<ICategoryListPageProps> = ({
  label,
  categories,
}) => {
  const [activeTab, setActiveTab] = useState("DOCUMENTS");
  const [activeCollectionSize, setActiveCollectionSize] = useState<number>(0);
  const [activeCollection, setActiveCollection] = useState<any>();
  const { category } = useParams();
  const navigate = useNavigate();
  const [activeSubcategorySize, setActiveSubcategorySize] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Fetch the JSON resource for collections
    fetch("/collections.json")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setActiveCollectionSize(data[category!].size);
        setActiveCollection(data[category!]);
        setActiveSubcategorySize(data[category!].size);
        setLoading(false); // Stop loading after fetching
      })
      .catch((error) => {
        console.error("Error fetching collections data:", error);
        setLoading(false);
      });
  }, [category, navigate]);

  return (
    <div className="w-full min-h-screen bg-primary flex flex-col items-center">
      <div className="pt-10 pb-5 text-center">
        <div className="flex justify-center">
          <div className="text-2xl md:text-2xl sm:text-2xl lg:text-3xl font-medium text-gray-900 p-2 max-w-xl w-full text-center">
            {category}
          </div>
        </div>
        <p className="text-gray-600 mb-6 mt-3">
          {formatBytes(activeCollectionSize)} of data saved on{" "}
          <span className="text-quaternary">Walrus</span>
        </p>
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

      {activeTab === "DOCUMENTS" && (
        <div className="flex w-full py-6 lg:max-w-[1100px]">
          <SidebarNav
            mode="fetch"
            sections={categories!}
            label={label}
            initialActive={category!}
          />

          <div className="flex-1 py-4 px-7">
            <div className="flex justify-between items-center mb-6"></div>
            <MobileNavigationBar
              mode="fetch"
              label="COLLECTIONS"
              options={categories!}
            />
            {loading ? (
              <Spinner />
            ) : (
              <div className="md:-mt-6 ">
                <PaperCardContainer
                  cardTitle={`${activeCollection?.papers.length} Documents, ${formatBytes(
                    activeSubcategorySize
                  )}`}
                  maxHeight="1200px"
                >
                  {activeCollection?.papers.length > 0 ? (
                    activeCollection?.papers
                      .sort(
                        (
                          lhs: { timestamp: number },
                          rhs: { timestamp: number }
                        ) => rhs.timestamp - lhs.timestamp
                      ) // Sort by timestamp
                      .map(
                        (
                          paper: {
                            id: any;
                            title: any;
                            authorsParsed: any[][];
                          },
                          index: number
                        ) => {
                          const mappedPaper = {
                            id: paper.id,
                            title: paper.title,
                            authors: paper.authorsParsed
                              .map((author: any[]) => author.join(" "))
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
                        }
                      )
                  ) : (
                    <p>No papers available</p>
                  )}
                </PaperCardContainer>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Displaying this section when "About" tab is active */}
      {activeTab === "ABOUT" && (
        <div className="flex flex-col items-center justify-center w-full h-full py-10">
          <p className="sm:text-sm md:text-base lg:text-base text-left max-w-2xl mb-4 px-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
            scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices
            nec congue eget, auctor vitae massa. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum
            interdum, nisi lorem egestas odio, vitae scelerisque enim ligula
            venenatis dolor.
          </p>
        </div>
      )}
      <InformationPopup />
    </div>
  );
};

export default CollectionListPage;
