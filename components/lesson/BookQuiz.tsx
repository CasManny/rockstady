"use client";
import { challenges, challengesOptions } from "@/db/schema";
import QuizHeader from "./QuizHeader";
import { useState } from "react";
import LessonSummary from "./LessonSummary";
import SelectChallenge from "./SelectChallenge";
import TypeChallenge from "./TypeChallenge";
import QuizFooter from "./QuizFooter";

type Props = {
  initialPercentage: number;
  initialLessonId: number;
  initialHearts: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengesOptions.$inferSelect)[];
  })[];
  lessonSummary: string;
};

const BookQuiz = ({
  initialPercentage,
  initialHearts,
  initialLessonId,
  initialLessonChallenges,
  lessonSummary,
}: Props) => {
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [challenges] = useState(initialLessonChallenges);
  const [status, setStatus] = useState<"correct" | "typed" | "none">("none");
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });
  const challenge = challenges[activeIndex];
  const options = challenge.challengeOptions;
  const [selectedOption, setSelectedOption] = useState<number>();
  const onSelect = (id: number) => {
    if (status !== "none") {
      return null;
    }
    setSelectedOption(id);
  };

  return (
    <div className="pb-10">
      <QuizHeader hearts={hearts} percentage={percentage} />
      <LessonSummary summary={lessonSummary} />
      {challenge.type === "SELECT" && (
        <SelectChallenge
          question={challenge.question}
          options={options}
          onSelect={onSelect}
          selectedOption={selectedOption}
          type={challenge.type}
        />
      )}

      {challenge.type === "TYPEIT" && (
      <TypeChallenge text={challenge.question} />
      )}
      <QuizFooter />
    </div>
  );
};

export default BookQuiz;
