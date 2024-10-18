import React, { useState, useEffect } from "react";
import SidebarNav from "../components/common/SideNavbar";
import PaperAbstract from "../components/paperComponents/PaperAbstract";
import { Spinner } from "../components/common/Spinner";
import { IAbstractPageProps } from "../interfaces/IAbstractPageProps";
import InformationPopup from "../components/landingComponents/InformationPopup";
import DownloadPDFButton from "../components/paperComponents/DownloadPDFButton";
import WalrusMetadataContainer from "../components/paperComponents/WalrusMetadataContainer";

const AbstractPage: React.FC<IAbstractPageProps> = ({ arxiv_id }) => {
  const [paperData, setPaperData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [submissionAndUpdateText, setSubmissionAndUpdateText] = useState<
    string | null
  >(null);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  const [abstractHeight, setAbstractHeight] = useState<number>(0);

  const handleAbstractHeightChange = (height: number) => {
    setAbstractHeight(height);
  };

  useEffect(() => {
    // Fetch data from the {arxiv_id}.json file
    const fetchPaperData = async () => {
      try {
        const response = await fetch(`/abs/${arxiv_id}.json`);
        if (!response.ok) {
          throw new Error("Failed to fetch paper data");
        }
        const data = await response.json();

        // Extract the initial submission date and the latest update date
        const initialSubmissionDate = new Date(
          data.versions[0].created
        ).toLocaleDateString();
        const latestUpdateDate = new Date(
          data.versions[data.versions.length - 1].created
        ).toLocaleDateString();

        // Construct the text conditionally
        const submissionAndUpdateText =
          data.versions.length > 1
            ? `Updated on ${latestUpdateDate}, Submitted on ${initialSubmissionDate}`
            : `Submitted on ${initialSubmissionDate}`;

        setSubmissionAndUpdateText(submissionAndUpdateText);

        const paperDetails = {
          title: data.title,
          submissionDate: new Date(
            data.versions[0].created
          ).toLocaleDateString(),
          fileSize: data.pdfSize,
          authors: data.authorsParsed.map((author: string[]) => ({
            name: `${author[1]} ${author[0]}`,
            link: `https://www.google.com/search?q=${encodeURIComponent(
              `${author[1]} ${author[0]}`
            )}`, // Creating Google search link for the author's full name
          })),
          abstract: data.abstract,
          subjects: data.subjects.join(", "),
          license: data.license,
          citation: `arXiv:${data.id} [${data.subjects[0]}]`,
          submissionHistory: data.versions
            .map((version: any) => `[${version.version}] ${version.created}`)
            .join(", "),
          blobId: data.blobId,
          objectId: data.objectId,
          registeredEpoch: data.registeredEpoch,
          certifiedEpoch: data.certifiedEpoch,
          startEpoch: data.startEpoch,
          endEpoch: data.endEpoch,
        };

        setPaperData({ paperDetails });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching paper data:", error);
        setIsLoading(false);
      }
    };

    fetchPaperData();
  }, [arxiv_id]);

  useEffect(() => {
    // Function to check screen size and set the flag
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Set breakpoint for small screens
    };

    // Check screen size on initial render
    checkScreenSize();

    // Add event listener to handle window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="flex flex-col items-center">
      <main className="flex flex-col md:flex-row w-full min-h-screen bg-primary px-4 md:px-6 py-6 lg:max-w-[1100px]">
        <SidebarNav
          mode="redirect"
          sections={[
            { id: "article", label: "Article" },
            { id: "subjects", label: "Subjects" },
            { id: "cite-as", label: "Cite As" },
            { id: "submission-history", label: "Submission History" },
            { id: "license", label: "License" },
          ]}
          label={"CONTENTS"}
        />
        <PaperAbstract
          arxiv_id={arxiv_id}
          title={paperData.paperDetails.title}
          fileSize={paperData.paperDetails.fileSize}
          authors={paperData.paperDetails.authors}
          abstract={paperData.paperDetails.abstract}
          subjects={paperData.paperDetails.subjects}
          citation={paperData.paperDetails.citation}
          submissionHistory={paperData.paperDetails.submissionHistory}
          submissionAndUpdateText={submissionAndUpdateText!}
          license={paperData.paperDetails.license}
          blobId={paperData.paperDetails.blobId}
          objectId={paperData.paperDetails.objectId}
          onAbstractHeightChange={handleAbstractHeightChange}
        />
        <div style={isSmallScreen ? { visibility: "hidden" } : {}}>
          <DownloadPDFButton
            fullPaperLink={`https://aggregator.walrus-testnet.walrus.space/v1/${paperData.paperDetails.blobId}`}
            dynamicMarginTop={abstractHeight}
          />
          <WalrusMetadataContainer
            blobId={paperData.paperDetails.blobId}
            objectId={paperData.paperDetails.objectId}
          />
        </div>
      </main>
      <InformationPopup />
    </div>
  );
};

export default AbstractPage;
