import Chapters from "@/components/start-journey/Chapters";
import FeedHeader from "@/components/start-journey/FeedHeader";
import FeedWrapper from "@/components/start-journey/FeedWrapper";
import StickyWrapper from "@/components/start-journey/StickyWrapper";
import UserProgressCard from "@/components/start-journey/UserProgressCard";
import { getActiveBookLessons, getBookProgress, getLessonPercentage, getUserProgress } from "@/db/queries";
import { lessons, chapters as chapterSchema, challenges } from "@/db/schema";
import { redirect } from "next/navigation";

const StartJourney = async () => {
  const userProgressData = getUserProgress();
  const bookChaptersData = getActiveBookLessons();
  const bookProgressLevelData = getBookProgress()
  const lessonPercentageData = getLessonPercentage()
  const [userProgress, bookChapters, bookProgress, lessonPercentage] = await Promise.all([
    userProgressData,
    bookChaptersData,
    bookProgressLevelData,
    lessonPercentageData,

  ]);

  if (!bookProgress || !userProgress) {
    redirect("/choose-an-adventure")
  }

  return (
    <div className="flex flex-row-reverse">
      <StickyWrapper>
        <UserProgressCard
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
      </StickyWrapper>
      <FeedWrapper>
        <FeedHeader
          title={userProgress.activeBook.title}
          subTitle={userProgress.activeBook.subTitle || ""}
          author={userProgress.activeBook.author}
        />
        {bookChapters.map((chapter) => (
          <div className="mb-10 p-3" key={chapter.id}>
            <Chapters
              id={chapter.id}
              title={chapter.chapterTitle}
              lessons={chapter.lessons}
              activeLesson={bookProgress.activeLesson as (typeof lessons.$inferSelect & { challenges: typeof challenges.$inferSelect}) | undefined}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default StartJourney;
