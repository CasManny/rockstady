import { create } from 'zustand'

type MobileState = {
    isOpen: boolean,
    open: () => void;
    close: () => void;
}

export const useMobileNavStore = create<MobileState>((set) => ({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({ isOpen: false})
}))