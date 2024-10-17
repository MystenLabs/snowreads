export interface IPaperAbstractProps {
  arxiv_id: string;
  title: string;
  fileSize: string;
  authors: Array<{ name: string; link: string }>;
  abstract: string;
  subjects: string;
  citation: string;
  submissionHistory: string;
  submissionAndUpdateText: string;
  license: string;
  blobId: string;
  onAbstractHeightChange: (height: number) => void;
}
