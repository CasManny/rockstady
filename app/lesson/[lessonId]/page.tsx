import BookQuiz from "@/components/lesson/BookQuiz";
import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

type Props = {
  params: { lessonId: number };
};
const LessonIdPage = async ({ params }: Props) => {
  const lessonData = getLesson(params.lessonId);
  const userProgressData = getUserProgress();

  const [lesson, userProgress] = await Promise.all([
    lessonData,
    userProgressData,
  ]);

  if (!lesson || !userProgress) {
    redirect("/choose-an-adventure");
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <BookQuiz
      initialLessonId={lesson.id}
      initialPercentage={initialPercentage}
      initialHearts={userProgress.hearts}
      initialLessonChallenges={lesson.challenges}
      lessonSummary={lesson.summary}
    />
  );
};

export default LessonIdPage;
