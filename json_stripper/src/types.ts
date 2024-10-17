export interface Version {
    version: string;
    created: string;
}

export interface Author {
    lastName: string;
    firstName: string;
    middleName: string;
    affiliation: string;
}

export interface Paper {
    id: string;
    submitter: string;
    authors: string;
    title: string;
    comments: string;
    journalRef: string | null;
    doi: string;
    reportNo: string | null;
    categories: string;
    license: string | null;
    abstract: string;
    versions: Version[];
    updateDate: string;
    authorsParsed: Author[];
}


export interface LeanPaper {
    id: string;
    authors: string;
    title: string;
    doi: string;
    categories: string;
}