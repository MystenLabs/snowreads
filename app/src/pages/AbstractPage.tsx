import React, { useState, useEffect } from "react";
import SidebarNav from "../components/common/SideNavbar";
import PaperAbstract from "../components/paperComponents/PaperAbstract";
import AccessPaperCard from "../components/paperComponents/AccessPaperCard";
import { Spinner } from "../components/common/Spinner";
import { IAbstractPageProps } from "../interfaces/IAbstractPageProps";

const AbstractPage: React.FC<IAbstractPageProps> = ({ arxiv_id }) => {
  const [paperData, setPaperData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [submissionAndUpdateText, setSubmissionAndUpdateText] = useState<
    string | null
  >(null);

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
          fileSize: "N/A", // TODO: Modify as needed
          authors: data.authorsParsed.map((author: string[]) => ({
            name: `${author[1]} ${author[0]}`,
            link: `https://www.google.com/search?q=${encodeURIComponent(
              `${author[1]} ${author[0]}`
            )}`, // Creating Google search link for the author's full name
          })),
          abstract: data.abstract,
          subjects: data.subjects.join(", "),
          citation: `arXiv:${data.id} [${data.subjects[0]}]`,
          submissionHistory: data.versions
            .map((version: any) => `[${version.version}] ${version.created}`)
            .join(", "),
        };

        const referencesData = [
          { name: "NASA ADS", link: "https://ui.adsabs.harvard.edu/" },
          { name: "Google Scholar", link: "https://scholar.google.com/" },
          {
            name: "Semantic Scholar",
            link: "https://www.semanticscholar.org/",
          },
          { name: "Export BibTeX Citation", link: "#" },
        ];

        setPaperData({ paperDetails, referencesData });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching paper data:", error);
        setIsLoading(false);
      }
    };

    fetchPaperData();
  }, [arxiv_id]);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="flex flex-col items-center">
      <main className="flex flex-col md:flex-row w-full min-h-screen bg-primary px-4 md:px-6 py-6 lg:max-w-[1100px]">
        <SidebarNav
          sections={[
            { id: "article", label: "Article" },
            { id: "subjects", label: "Subjects" },
            { id: "cite-as", label: "Cite As" },
            { id: "submission-history", label: "Submission History" },
          ]}
          type={"CONTENTS"}
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
        />
        <AccessPaperCard
          fullPaperLink="/pdf/hep-th0001021.pdf"
          formatsLink="https://example.com/formats"
          licenseLink="https://example.com/license"
          references={paperData.referencesData}
          bookmarkLink="https://example.com/bookmark"
          redditAddress="https://reddit.com"
          kdeAddress=""
        />
      </main>
    </div>
  );
};

export default AbstractPage;
