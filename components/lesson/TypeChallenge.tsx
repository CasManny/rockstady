"use client";
import { Dispatch, SetStateAction, useTransition } from "react";
import { Textarea } from "../ui/textarea";
import QuizFooter from "./QuizFooter";
import Quote from "./Quote";
import { cn } from "@/lib/utils";

type Props = {
  quote: string | null;
  status: "correct" | "wrong" | "completed" | "none";
  disabled?: boolean;
  lessonId?: number;
  userInput: string;
  onCheck: () => void;
  setUserInput: Dispatch<SetStateAction<string>>;
};

const TypeChallenge = ({
  quote,
  status,
  disabled,
  lessonId,
  userInput,
  setUserInput,
  onCheck
}: Props) => {
  return (
    <div>
      <div className="flex-1">
        <div className="flex justify-center items-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col">
            <h1 className="font-extrabold text-2xl text-left md:text-2xl">
              Type the quote exactly in the box below
            </h1>
            <Quote quote={quote} />
            <Textarea
              className={cn(
                "border-rs-yellow resize-none h-28 w-full text-xl",
                status === "wrong" && "border-red-600 border-4 text-rose-600"
              )}
              placeholder="Enter quote"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
        </div>
        <QuizFooter
          status={status}
          disabled={disabled}
          lessonId={lessonId}
          onCheck={onCheck}
        />
      </div>
    </div>
  );
};

export default TypeChallenge;
