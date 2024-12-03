import { create } from 'zustand';
import { DocumentStore, Section } from '../types/type';
import data from '../dummies/woori_first/woori_first.json';

const useDocumentStore = create<DocumentStore>((set) => ({
  document: {
    title: data.title,
    subTitle: data.subTitle,
    author: data.author,
    sections: data.sections,
  },
  
  setDocument: (document) => set({ document }),
  
  updateTitle: (title) =>
    set((state) => ({
      document: {
        ...state.document,
        title,
      },
    })),

  updateSubTitle: (subTitle) =>
    set((state) => ({
      document: {
        ...state.document,
        subTitle,
      },
    })),

  updateAuthor: (author) =>
    set((state) => ({
      document: {
        ...state.document,
        author,
      },
    })),

  addSection: (section: Section) =>
    set((state) => ({
      document: {
        ...state.document,
        sections: [...state.document.sections, section],
      },
    })),

  updateSection: (index, updatedSection) =>
    set((state) => ({
      document: {
        ...state.document,
        sections: state.document.sections.map((section, i) =>
          i === index ? { ...section, ...updatedSection } : section
        ),
      },
    })),

  removeSection: (index) =>
    set((state) => ({
      document: {
        ...state.document,
        sections: state.document.sections.filter((_, i) => i !== index),
      },
    })),

  updateSectionContent: (sectionIndex, content) =>
    set((state) => ({
      document: {
        ...state.document,
        sections: state.document.sections.map((section, i) =>
          i === sectionIndex ? { ...section, content } : section
        ),
      },
    })),

  updateSectionGrid: (sectionIndex, grid) =>
    set((state) => ({
      document: {
        ...state.document,
        sections: state.document.sections.map((section, i) =>
          i === sectionIndex ? { ...section, grid } : section
        ),
      },
    })),

  updateSectionFile: (sectionIndex, file) =>
    set((state) => ({
      document: {
        ...state.document,
        sections: state.document.sections.map((section, i) =>
          i === sectionIndex ? { ...section, file } : section
        ),
      },
    })),

  updateSectionSign: (sectionIndex, sign) =>
    set((state) => ({
      document: {
        ...state.document,
        sections: state.document.sections.map((section, i) =>
          i === sectionIndex ? { ...section, sign } : section
        ),
      },
    })),

  updateSectionCheck: (sectionIndex, check) =>
    set((state) => ({
      document: {
        ...state.document,
        sections: state.document.sections.map((section, i) =>
          i === sectionIndex ? { ...section, check } : section
        ),
      },
    })),
}));

export default useDocumentStore;
