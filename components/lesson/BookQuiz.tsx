"use client";
import { challenges, challengesOptions } from "@/db/schema";
import QuizHeader from "./QuizHeader";
import Confetti from "react-confetti";
import { useState, useTransition } from "react";
import LessonSummary from "./LessonSummary";
import SelectChallenge from "./SelectChallenge";
import TypeChallenge from "./TypeChallenge";
import QuizFooter from "./QuizFooter";
import { useHeartModalStore } from "@/store/heart-modal";
import { useAudio, useMount, useWindowSize } from "react-use";
import toast from "react-hot-toast";
import Image from "next/image";
import ResultCard from "./ResultCard";
import {
  reduceHearts,
  upsertChallengeProgress,
} from "@/actions/challenge-progress";
import { usePracticeModal } from "@/store/use-practice-modal";
import { Button } from "../ui/button";
import Link from "next/link";
import GetUserFeedback from "../choose-adventure/GetUserFeedback";

type Props = {
  lessonTitle: string;
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
  lessonTitle
}: Props) => {
  const [hearts, setHearts] = useState(initialHearts);
  const [finishAudio] = useAudio({ src: "/finish.mp3", autoPlay: true });
  const [userInput, setUserInput] = useState("");
  const [percentage, setPercentage] = useState(initialPercentage);
  const [pending, startTransition] = useTransition();
  const { width, height } = useWindowSize();
  const { openHeartModal } = useHeartModalStore();
  const { open: openPracticeModal } = usePracticeModal();
  const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.wav" });
  const [incorrectAudion, _i, inCorrectControls] = useAudio({
    src: "/incorrect.wav",
  });

  const [challenges] = useState(initialLessonChallenges);
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });
  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];
  const [selectedOption, setSelectedOption] = useState<number>();
  const onSelect = (id: number) => {
    if (status !== "none") {
      return null;
    }
    setSelectedOption(id);
  };
  const onNext = () => {
    setActiveIndex((prev) => prev + 1);
  };

  useMount(() => {
    if (initialPercentage === 100) {
      openPracticeModal();
    }
  });

  const onContinue = () => {
    if (hearts === 0) {
      openHeartModal();
      return;
    }
    if (!selectedOption) {
      return null;
    }

    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    const correctOption = options.find((option) => option.isCorrect);
    if (!correctOption) return;
    if (correctOption && correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartModal();
              return;
            }

            correctControls.play();
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);
            // this is a practice
            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            } else {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch(() => toast.error("something went wrong"));
      });
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartModal();
            }
            inCorrectControls.play();
            setStatus("wrong");
            if (!response?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() => toast.error("something went wrong"));
      });
    }
  };
  const checkUserInput = () => {
    if (!userInput) {
      return null;
    }

    if (status === "wrong") {
      setStatus("none");
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      return;
    }
    const quote = challenge.quote?.toLowerCase().trim();
    if (quote === userInput.toLowerCase().trim()) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartModal();
              return;
            }

            correctControls.play();
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);
            // this is a practice
            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            } else {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch(() => toast.error("something went wrong"));
      });
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartModal();
            }
            inCorrectControls.play();
            setStatus("wrong");
            if (!response?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() => toast.error("something went wrong"));
      });
    }
  };

  if (!challenge) {
    return (
      <>
        {finishAudio}
        <Confetti
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
          width={width}
          height={height}
        />
        <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
          <Image
            src={"/finish.svg"}
            alt="finish"
            className="hidden lg:block"
            height={100}
            width={100}
          />
          <Image
            src={"/finish.svg"}
            alt="finish"
            className="lg:hidden block"
            height={50}
            width={50}
          />
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
            Great Job! <br /> You've completed the lesson
          </h1>
          <div className="flex items-center gap-x-4 w-full">
            <ResultCard varaint="points" value={challenges.length * 10} />
            <ResultCard varaint="hearts" value={hearts} />
          </div>
          <div className="flex gap-4 flex-col sm:flex-row items-center">
            <Link href={"/start-journey"} className="mx-auto">
              <Button>Continue Improving</Button>
            </Link>
            <GetUserFeedback />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {correctAudio}
      {incorrectAudion}
      <div className="pb-10 h-full">
        <QuizHeader hearts={hearts} percentage={percentage} />
        <LessonSummary summary={lessonSummary} lessonTitle={lessonTitle} />
        {challenge.type === "SELECT" && (
          <>
            <SelectChallenge
              question={challenge.question}
              options={options}
              onSelect={onSelect}
              selectedOption={selectedOption}
              type={challenge.type}
            />
            <QuizFooter
              onCheck={onContinue}
              status={status}
              disabled={pending || !selectedOption}
            />
          </>
        )}

        {challenge.type === "TYPEIT" && (
          <TypeChallenge
            quote={challenge.quote}
            status={status}
            disabled={pending || !userInput}
            userInput={userInput}
            setUserInput={setUserInput}
            onCheck={checkUserInput}
          />
        )}
      </div>
    </>
  );
};

export default BookQuiz;
