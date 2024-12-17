import { create } from 'zustand';
import { DocumentStore, Section } from '../types/type';
import data from '../../../public/dummies/woori_first/woori_first_doc.json';

const useDocumentStore = create<DocumentStore>((set) => ({
  documentItem: {
    title: data.title,
    subTitle: data.subTitle,
    author: data.author,
    header: data.header,
    footer: data.footer,
    sections: data.sections,
  },
  
  setDocument: (documentItem) => set({ documentItem }),

  updateSectionSign: (sectionIndex, sign) =>
    set((state) => ({
      documentItem: {
        ...state.documentItem,
        sections: state.documentItem.sections.map((section, i) =>
          i === sectionIndex ? { ...section, sign } : section
        ),
      },
    })),

  updateSectionCheck: (sectionIndex, check) =>
    set((state) => ({
      documentItem: {
        ...state.documentItem,
        sections: state.documentItem.sections.map((section, i) =>
          i === sectionIndex ? { ...section, check } : section
        ),
      },
    })),
}));

export default useDocumentStore;
