export interface IPaperCardProps {
  paper: {
    id: string;
    title: string;
    authors: string;
    link: string;
    arxiv_id: string;
    metadataBlobId?: string | null;
  };
  hasVisibleIcon?: boolean;
}
