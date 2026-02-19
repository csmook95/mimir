import { StateCreator } from 'zustand';

export interface AuthSlice {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
    isLoggedIn: true,
    login: () => set({ isLoggedIn: true }),
    logout: () => set({ isLoggedIn: false }),
});