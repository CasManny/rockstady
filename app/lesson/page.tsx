import BookQuiz from "@/components/lesson/BookQuiz";
import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import React from "react";

const LessonPage = async () => {
  const userProgressData = getUserProgress();
  const lessonData = getLesson();

  const [userProgress, lesson] = await Promise.all([
    userProgressData,
    lessonData,
  ]);
  if (!lesson || !userProgress) {
    redirect("/choose-an-adventure");
  }
  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;
  return (
    <div className="pb-10 h-full">
      <BookQuiz
        initialLessonId={lesson.id}
        initialPercentage={initialPercentage}
        initialHearts={userProgress.hearts}
        initialLessonChallenges={lesson.challenges}
        lessonSummary={lesson.summary}
        lessonTitle={lesson.lessonTitle}
      />
    </div>
  );
};

export default LessonPage;
