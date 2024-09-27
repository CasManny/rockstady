import { chapters, lessons, challenges } from "@/db/schema";
import ChapterBanner from "./ChapterBanner";
import LessonButton from "./LessonButton";

type Props = {
  id: number;
  title: string;
  description?: string;
  order?: number;
  lessons: (typeof lessons.$inferSelect & { completed: boolean })[],
  activeLesson: (typeof lessons.$inferSelect & { challenges: typeof challenges.$inferSelect}) | undefined,
  activeLessonPercentage: number
}
const Chapters = ({id, title, description, order, lessons, activeLesson, activeLessonPercentage}: Props) => {
  return (
    <div>
      <ChapterBanner title={title} />
      <div className="flex items-center flex-col relative">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;
          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={index}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonPercentage}
            />
          );
        })}
      </div>
    </div>
  )
}

export default Chapters