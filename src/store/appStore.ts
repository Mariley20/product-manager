import { create } from "zustand";

interface IAppStore {
  showDrawer: boolean,
  setShowDrawer: (arg: boolean) => void
}
export const useAppStore = create<IAppStore>((set) => ({
  showDrawer: false,
  setShowDrawer: (showDrawer) => set({ showDrawer }),
}))