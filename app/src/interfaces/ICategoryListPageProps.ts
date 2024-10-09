interface IPaper {
  id: string;
  title: string;
  authors: string;
  link: string;
  categories: string;
  arxiv_id: string;
}
export interface ICategoryListPageProps {
  categories?: Array<{ id: string; label: string }>;
  papers: IPaper[];
  label: string;
}
