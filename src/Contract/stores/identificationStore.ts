import { create } from 'zustand';

type IdentStore = {
  isDoneIdent: boolean;
  setIsDoneIdent: (value: boolean) => void;
};

export const useIdentStore = create<IdentStore>((set) => ({
  isDoneIdent: false,
  setIsDoneIdent: (value: boolean) => set({ isDoneIdent: value }),
}));
