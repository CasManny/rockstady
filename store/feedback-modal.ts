import { create } from 'zustand'

type FeedbackModalState = {
    isOpen: boolean,
    openFeedbackModal: () => void;
    closeFeedbackModal: () => void;
}

export const useFeedbackModalStore = create<FeedbackModalState>((set) => ({
    isOpen: false,
    openFeedbackModal: () => set({isOpen: true}),
    closeFeedbackModal: () => set({ isOpen: false})
}))