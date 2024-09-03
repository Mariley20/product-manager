import { IUser } from "@/types/userTypes";
import { create } from "zustand";

interface IAuthStore {
  user: IUser | null,
  setUser: (arg: IUser) => void
  isAuthenticated: () => boolean
}
export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isAuthenticated: (): boolean => !!useAuthStore.getState().user
}))