import { create } from 'zustand';

interface UserInfoState {
  username: string | null;
  setUsername: (name: string) => void;
}

export const useUserInfo = create<UserInfoState>((set) => ({
  username: null,
  setUsername: (name) => set(() => ({ username: name })),
}));
