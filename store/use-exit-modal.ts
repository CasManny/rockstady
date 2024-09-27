import { create } from 'zustand'

type ExistModalState = {
    isOpen: boolean;
    close: () => void;
    open: () => void;
}

export const useExistModalStore = create<ExistModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({isOpen: false})
}))