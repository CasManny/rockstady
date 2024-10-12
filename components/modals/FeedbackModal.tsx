"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useFeedbackModalStore } from "@/store/feedback-modal";
import UserFeedbackForm from "../choose-adventure/UserFeedbackForm";
import { useEffect, useState } from "react";

const FeedbackModal = () => {
  const { isOpen, closeFeedbackModal } = useFeedbackModalStore();
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  })

  if (!isClient) {
    return null
  }
  return (
    <AlertDialog open={isOpen} onOpenChange={closeFeedbackModal}>
      <AlertDialogContent className="bg-white text-black overflow-y-auto h-full">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Send us Your feedback on using the platform
          </AlertDialogTitle>
        </AlertDialogHeader>
        <UserFeedbackForm />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FeedbackModal;
