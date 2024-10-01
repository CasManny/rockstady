import { create } from 'zustand'

type BookModalState = {
    isOpen: boolean,
    openBookModal: () => void;
    closeBookModal: () => void;
}

export const useBookModalStore = create<BookModalState>((set) => ({
    isOpen: false,
    openBookModal: () => set({isOpen: true}),
    closeBookModal: () => set({ isOpen: false})
}))