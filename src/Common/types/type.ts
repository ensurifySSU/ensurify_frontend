export interface Section {
    title: string;
    file?: string[];
    sign?: (string | boolean)[][];
    check?: (string | boolean)[][];
  }
  
  export interface DocumentTypes {
    title: string;
    subTitle: string;
    author: string;
    header: string;
    footer: string;
    sections: Section[];
  }
  
  export interface DocumentStore {
    documentItem: DocumentTypes;
    setDocument: (document: DocumentTypes) => void;
    updateSectionSign: (sectionIndex: number, sign: [string, boolean][]) => void;
    updateSectionCheck: (sectionIndex: number, check: [string, boolean][]) => void;
  }
  