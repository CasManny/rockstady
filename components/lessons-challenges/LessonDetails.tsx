"use client";
import { books, challenges, challengesOptions, chapters, lessons } from "@/db/schema";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowBigLeft } from "lucide-react";
import ReadSummary from "./ReadSummary";
import LessonChallengeForm from "./LessonChallengeForm";
import { useState } from "react";
import { useChallengeModalStore } from "@/store/add-challenge-modal";
import QuestionCard from "./QuestionCard";

type Props = {
  lesson: typeof lessons.$inferSelect & {
    chapter: typeof chapters.$inferSelect & { book: typeof books.$inferSelect };
    challenges: (typeof challenges.$inferSelect & {challengeOptions: typeof challengesOptions.$inferSelect[] })[];
  };
};

const LessonDetails = ({ lesson }: Props) => {
  const router = useRouter()
  const { isOpen, toggleOpen } = useChallengeModalStore();
  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <Button onClick={() => router.back()}>
          <ArrowBigLeft /> Back
        </Button>
        <Button onClick={() => toggleOpen()}>
          {isOpen ? "close 👇" : "Set Question"}
        </Button>
      </div>
      <div className="mt-5">
        <h1 className="text-xl font-extrabold">
          Book: {lesson.chapter.book.title}
        </h1>
        <h3 className="text-sm text-neutral-500">
          {lesson.chapter.book.subTitle}
        </h3>
        <h3>Author: {lesson.chapter.book.author}</h3>
      </div>
      <div className="mt-5">
        <h1 className="text-xl font-extrabold my-2">{lesson.lessonTitle}</h1>
        <ReadSummary value={lesson.summary} />
      </div>
      <div className="border-t-2">
        <h1 className="text-xl font-extrabold">Questions</h1>
        {lesson.challenges.map((challenge, index) => (
          <QuestionCard challenge={challenge} key={index} />
        ))}
      </div>
      {isOpen && <LessonChallengeForm lessonId={lesson.id} />}
    </div>
  );
};

export default LessonDetails;
