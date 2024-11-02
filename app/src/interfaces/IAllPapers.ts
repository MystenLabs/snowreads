export interface IPaperTrimmed {
  id: string;
  title: string;
  authorsParsed: string[][];
  timestamp: number;
  metadataBlobId?: string | null;
}

export interface ISubCategory {
  name: string;
  count: number;
  size: number;
  data: string;
}

export interface ICategory {
  name: string;
  count: number;
  size: number;
  subCategories: ISubCategory[];
}

export interface IAllPapers {
  count: number;
  size: number;
  categories: ICategory[];
};

export type SubCategoryWithPapers = ISubCategory & {
  papers: IPaperTrimmed[]
};

export type CategoryWithPapers = Omit<ICategory, 'subCategories'> & {
  subCategories: SubCategoryWithPapers[]
};

export type AllPapers = Omit<IAllPapers, 'categories'> & {
  categories: CategoryWithPapers[]
};

