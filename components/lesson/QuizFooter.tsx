import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";
import { useKey, useMedia } from "react-use";
import { Button } from "../ui/button";

type Props = {
    onCheck: () => void;
    status: "correct" | "wrong" | "completed" | "none";
    disabled?: boolean;
    lessonId?: number;
  };

const QuizFooter = ({ status, disabled, lessonId, onCheck }: Props) => {
  const isMobile = useMedia("(max-width: 1024px)");
    
  return (
    <footer
    className={cn(
      "lg:h-[50px] mt-4",
      status === "correct" && "border-transparent bg-green-100",
      status === "wrong" && "border-transparent bg-rose-100"
    )}
  >
    <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
      {status === "correct" && (
        <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
          <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
          Nicely done!
        </div>
      )}
      {status === "wrong" && (
        <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
          <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
          Try again.
        </div>
      )}
      {status === "completed" && (
        <Button
          className=""
          variant={"default"}
          size={isMobile ? "sm" : "lg"}
          onClick={() => (window.location.href = `/lesson/${lessonId}`)} // we use window instead of router is because we want to see the practice modal after a course is finished
        >
          Practice again
        </Button>
      )}

      <Button
        variant={status === "wrong" ? "danger" : "secondary"}
        disabled={disabled}
        className={cn("ml-auto")}
        onClick={onCheck}
        size={isMobile ? "sm" : "lg"}
      >
        {status === "none" && "Check"}
        {status === "correct" && "Next"}
        {status === "wrong" && "Try again!"}
        {status === "completed" && "Continue"}
      </Button>
    </div>
  </footer>
  )
}

export default QuizFooter