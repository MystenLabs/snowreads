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
import AudioSummaryContainer from "../components/categoryListComponents/AudioSummaryContainer";

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
  const [wavBlobId, setWavBlobId] = useState<string>("");
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

  useEffect(() => {
    // Logic to fetch or generate the new wavBlobId based on the category
    const newWavBlobId = getWavBlobIdForCategory(category!);
    setWavBlobId(newWavBlobId);
  }, [category]);

  // Function to get wavBlobId based on category
  const getWavBlobIdForCategory = (category: string): string => {
    const categoryToWavBlobMap: { [key: string]: string } = {
      "The Science of Everyday Decisions":
        "4OHVF4tu1Nq1itT78G5NqCYP3Ffra2QHV19cfDu9rfc",
      "Scientific Wonder of Pop Culture":
        "nLkXsss6zqfehkBlwe4v5vZCe092hWxLPk9SK-IiWWA",
      "Is AI Fun": "9QwHCR56V-mjax-uhOKILs1I9yg6C4rjtgeFckVohIM",
      "Mysten Labs Papers": "g56vpiiC2iJ2ZSeGDjW7lLGRO2w-m5ll7GMHmBmZL0A"
    };
    return categoryToWavBlobMap[category] || "defaultBlobId";
  };

  return (
    <>
      {activeCollectionSize ? (
        <div className="w-full min-h-screen bg-primary flex flex-col items-center">
          <div className="pt-10 pb-5 text-center">
            <div className="flex justify-center">
              <div className="text-2xl md:text-2xl sm:text-2xl lg:text-3xl font-medium text-gray-900 p-2 max-w-xl w-full text-center">
                {category!.endsWith("?")
                  ? category
                  : category +
                    (category!.toLowerCase().startsWith("is") ? "?" : "")}
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
                  {wavBlobId !== "defaultBlobId" && 
                    <AudioSummaryContainer
                      src={`https://aggregator.walrus-testnet.walrus.space/v1/${wavBlobId}`}
                    />
                  }
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
                            (paper: {
                              id: any;
                              title: any;
                              authorsParsed: any[][];
                            }) => {
                              const mappedPaper = {
                                id: paper.id,
                                title: paper.title,
                                authors: paper.authorsParsed
                                  .map((author: any[]) => author.join(" "))
                                  .join(", "),
                                link: `/abs/${paper.id}`,
                                metadataBlobId: paper.metadataBlobId,
                                arxiv_id: paper.id,
                              };

                              return (
                                <PaperCard
                                  key={mappedPaper.id}
                                  paper={mappedPaper}
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
                <br />
                <span className="italic">
                  {category === "The Science of Everyday Decisions"
                    ? "Explore the science behind your everyday choices."
                    : category === "Scientific Wonder of Pop Culture"
                      ? "A collection of cleverly crafted papers that blend research with the playful spirit of April Fools’ Day."
                      : category === "Is AI Fun"
                      ? "Discover how artificial intelligence understands humor and how good a comedian it can be."
                        : category === "Mysten Labs Papers"
                        ? "A collection of papers published by Mysten Labs researchers."
                        : ""}
                </span>
                <br />
                <br />
                ​All papers are available under Creative Commons (CC) licenses.
                <br />
                <br />
                ​Thank you to{" "}
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
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CollectionListPage;
