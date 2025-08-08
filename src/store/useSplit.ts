import { create } from "zustand";
interface SplitStore {
  open: boolean;
  setOpen: (open: boolean) => void;
  size: [number, number];
}

export const useSplitStore = create<SplitStore>((set) => ({
  open: false,
  setOpen: (open: boolean) => {
    set({ open });
    set({ size: !open ? [100, 0] : [66, 34] });
  },
  size: [100, 0],
}));
