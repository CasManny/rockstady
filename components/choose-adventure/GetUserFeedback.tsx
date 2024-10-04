'use client'
import { MessageCircle } from "lucide-react"
import { Button } from "../ui/button"
import { useFeedbackModalStore } from "@/store/feedback-modal"

const GetUserFeedback = () => {
    const { openFeedbackModal } = useFeedbackModalStore()
  return (
      <Button className="rounded-full z-50 fixed bottom-2 right-2 animate-pulse" onClick={openFeedbackModal}>
          <MessageCircle className="w-h h-5 mr-2 animate-pulse" />
          Feedback
    </Button>
  )
}

export default GetUserFeedback