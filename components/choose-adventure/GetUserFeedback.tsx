"use client";
import { MessageCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useFeedbackModalStore } from "@/store/feedback-modal";
import { cn } from "@/lib/utils";

const GetUserFeedback = ({ position }: { position?: boolean }) => {
  const { openFeedbackModal } = useFeedbackModalStore();
  return (
    <Button
      className={cn("rounded-full bg-rs-yellow text-white hover:bg-rs-yellow  hover:text-white", position  && "z-50 fixed bottom-2 right-2")}
      onClick={openFeedbackModal}
    >
      <MessageCircle className="w-h h-5 mr-2 animate-pulse" />
      Feedback
    </Button>
  );
};

export default GetUserFeedback;
