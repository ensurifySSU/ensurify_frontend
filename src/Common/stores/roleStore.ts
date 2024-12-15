import { create } from 'zustand';

export type UserRole = 'guest' | 'user' | 'client';

interface RoleState {
  role: UserRole | null;
  setRole: (_role: UserRole) => void;
}

export const useRoleStore = create<RoleState>((set) => ({
  role: null,
  setRole: (_role) => set(() => ({ role: _role })),
}));
