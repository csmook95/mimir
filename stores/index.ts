import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./slices/authSlice";


interface BoundStore extends AuthSlice { }

export const useBoundStore = create<BoundStore>((...a) => ({
	...createAuthSlice(...a)
}));