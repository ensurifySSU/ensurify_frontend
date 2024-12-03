export interface Section {
    title: string;
    content?: string[];
    grid: string[][][];
    file?: string[];
    sign?: (string | boolean)[][];
    check?: (string | boolean)[][];
  }
  
  export interface Document {
    title: string;
    subTitle: string;
    author: string;
    sections: Section[];
  }
  
  export interface DocumentStore {
    document: Document;
    setDocument: (document: Document) => void;
    updateTitle: (title: string) => void;
    updateSubTitle: (subTitle: string) => void;
    updateAuthor: (author: string) => void;
    addSection: (section: Section) => void;
    updateSection: (index: number, updatedSection: Partial<Section>) => void;
    removeSection: (index: number) => void;
    updateSectionContent: (sectionIndex: number, content: string) => void;
    updateSectionGrid: (sectionIndex: number, grid: any[]) => void;
    updateSectionFile: (sectionIndex: number, file: string[]) => void;
    updateSectionSign: (sectionIndex: number, sign: [string, boolean][]) => void;
    updateSectionCheck: (sectionIndex: number, check: [string, boolean][]) => void;
  }
  