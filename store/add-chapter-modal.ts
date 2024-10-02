import { create } from 'zustand'

type ChapterModalState = {
    isOpen: boolean,
    openChapterModal: () => void;
    closeChapterModal: () => void;
}

export const useChapterModalStore = create<ChapterModalState>((set) => ({
    isOpen: false,
    openChapterModal: () => set({isOpen: true}),
    closeChapterModal: () => set({ isOpen: false})
}))