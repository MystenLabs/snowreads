import React, { useState, useEffect } from 'react';
import SidebarNav from '../components/common/SideNavbar';
import PaperAbstract from '../components/paperComponents/PaperAbstract';
import AccessPaperCard from '../components/paperComponents/AccessPaperCard';
import { Spinner } from '../components/common/Spinner';
import { IAbstractPageProps } from '../interfaces/IAbstractPageProps';



const AbstractPage: React.FC<IAbstractPageProps> = ({ arxiv_id }) => {
  const [paperData, setPaperData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a fetch call with a timeout
    const fetchPaperData = () => {
      setTimeout(() => {
        const paperDummyData = {
          title: 'Navigating Process Mining: A Case Study using pm4py',
          submissionDate: '17 Sep 2024',
          fileSize: '0.79 MB',
          authors: [
            { name: 'Ali Jildi', link: '#' },
            { name: 'László Kovács', link: '#' }
          ],
          abstract:
            'Process-mining techniques have emerged as powerful tools for analyzing event data to gain insights into business processes. In this paper, we present a comprehensive analysis of road traffic fine management processes using the pm4py library in Python. We start by importing an event log dataset and explore its characteristics, including the distribution of activities and process variants. Through filtering and statistical analysis, we uncover key patterns and variations in the process executions. Subsequently, we apply various process-mining algorithms, including the Alpha Miner, Inductive Miner, and Heuristic Miner, to discover process models from the event log data. We visualize the discovered models to understand the workflow structures and dependencies within the process. Additionally, we discuss the strengths and limitations of each mining approach in capturing the underlying process dynamics. Our findings shed light on the efficiency and effectiveness of road traffic fine management processes, providing valuable insights for process optimization and decision-making. This study demonstrates the utility of pm4py in facilitating process mining tasks and its potential for analyzing real-world business processes.',
          subjects: 'Computer Science, Artificial Intelligence',
          citation: 'arXiv:2409.11294 [cs.AI]',
          submissionHistory: 'From: Ali Jildi [view email]\n[v1] Tue, 17 Sep 2024 15:48:46 UTC (494 KB)',
        };
        const referencesData = [
          { name: 'NASA ADS', link: 'https://ui.adsabs.harvard.edu/' },
          { name: 'Google Scholar', link: 'https://scholar.google.com/' },
          { name: 'Semantic Scholar', link: 'https://www.semanticscholar.org/' },
          { name: 'Export BibTeX Citation', link: '#' },
        ];
        setPaperData({ paperDummyData, referencesData });
        setIsLoading(false);
      }, 1000);
    };

    fetchPaperData();
  }, []);

  return (
    isLoading ? (
      <Spinner />
    ) : (
      <main className="flex w-full min-h-screen bg-primary px-[10%] py-6">
        <SidebarNav
          sections={[
            { id: 'article', label: 'Article' },
            { id: 'subjects', label: 'Subjects' },
            { id: 'cite-as', label: 'Cite As' },
            { id: 'submission-history', label: 'Submission History' },
            { id: 'more', label: 'More' }
          ]}
          type={'CONTENTS'}
        />
        <PaperAbstract
          arxiv_id={arxiv_id}
          title={paperData.paperDummyData.title}
          submissionDate={paperData.paperDummyData.submissionDate}
          fileSize={paperData.paperDummyData.fileSize}
          authors={paperData.paperDummyData.authors}
          abstract={paperData.paperDummyData.abstract}
          subjects={paperData.paperDummyData.subjects}
          citation={paperData.paperDummyData.citation}
          submissionHistory={paperData.paperDummyData.submissionHistory}
        />
        <AccessPaperCard
          fullPaperLink="https://example.com/pdf"
          formatsLink="https://example.com/formats"
          licenseLink="https://example.com/license"
          references={paperData.referencesData}
          bookmarkLink="https://example.com/bookmark"
          redditAddress="https://reddit.com"
          kdeAddress=""
        />
      </main>
    )
  );
};

export default AbstractPage;
