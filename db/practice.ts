import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { books, challengeProgress, challenges, chapters, lessons, userProgress } from "./schema";

export const getBooks = cache(async () => {
  const books = await db.query.books.findMany();
  return books;
});

export const getUserProgress = cache(async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const activeBookUserIsReading = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeBook: true,
    },
  });

  if (!activeBookUserIsReading) {
    return null;
  }

  return activeBookUserIsReading;
});

export const getBookById = cache(async (id: string) => {
  const book = await db.query.books.findFirst({
    where: eq(books.id, id),
  });
  return book;
});

export const getBookLessons = cache(async () => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const activeBook = await getUserProgress();
  if (!activeBook?.activeBookId) {
    return null;
  }

  const chaptersInBook = await db.query.chapters.findMany({
    where: eq(chapters.bookId, activeBook?.activeBookId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          challenges: {
            orderBy: (challenges, { asc }) => [asc(challenges.order)],
            with: {
              challengeProgress: true,
            },
          },
        },
      },
    },
  });

  const normalizedData = chaptersInBook.map((chapter) => {
    const lessonStatus = chapter.lessons.map((lesson) => {
      if (lesson.challenges.length === 0) {
        return { ...lesson, completed: false };
      }
      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        return (
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.every((progress) => progress.completed)
        );
      });
      return { ...lesson, completed: allCompletedChallenges };
    });
    return { ...chapter, lessons: lessonStatus };
  });

  return normalizedData;
});

export const getFirstUncompletedLessonFromABook = cache(async () => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  const activeBook = await getUserProgress();
  if (!activeBook?.activeBookId) {
    return null;
  }

  const chaptersInBook = await db.query.chapters.findMany({
    where: eq(chapters.bookId, activeBook.activeBookId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          challenges: {
            orderBy: (challenges, { asc }) => [asc(challenges.order)],
            with: {
              challengeProgress: true,
            },
          },
        },
      },
    },
  });
  const normalizedData = chaptersInBook
    .flatMap((chapter) => chapter.lessons)
    .find((lesson) => {
      return lesson.challenges.some((challenge) => {
        return (
          !challenge.challengeProgress ||
          challenge.challengeProgress.length === 0 ||
          challenge.challengeProgress.some(
            (progress) => progress.completed === false
          )
        );
      });
    });

    return {
        activeLesson: normalizedData,
        activeLessonId: normalizedData?.id
    }
});

export const getLesson = cache(async (id?: string) => {
    const { userId } = auth()
    if (!userId) {
        return null
    }
    const activeLesson = await getFirstUncompletedLessonFromABook()
    if (!activeLesson?.activeLessonId) {
        return null
    }
    const lessonId = id || activeLesson.activeLessonId

    if (!lessonId) {
        return null
    }

    const currentLesson = await db.query.lessons.findFirst({
        where: eq(lessons.id, activeLesson.activeLessonId),
        with: {
            challenges: {
                orderBy: (challenges, { asc }) => [asc(challenges.order)],
                with: {
                    challengeOptions: true,
                    challengeProgress: {
                        where: eq(challengeProgress.userId, userId)
                    }
                }
            }
        }
    })

    if (!currentLesson || !currentLesson.challenges) {
        return null
    }
   
    const normalizedChallenges = currentLesson.challenges.map((challenge) => {
        const completedChallenges = challenge.challengeProgress && challenge.challengeProgress.length > 0 && challenge.challengeProgress.every(progress => progress.completed)
        return { ...challenge, completed: completedChallenges }
    })

    return { ...currentLesson, challenges: normalizedChallenges}


})

export const getLessonPercentage = cache(async () => {
    const { userId } = auth()
    if (!userId) {
        return null
    }
    const bookProgress = await getUserProgress()
    if (!bookProgress?.activeBookId) {
        return null
    }
    const lesson = await getLesson(bookProgress.activeBookId)

    if (!lesson) {
        return 0
    }
    const completdChallenges = lesson.challenges.filter(challenge => challenge.completed)
    const percentage = Math.round((completdChallenges.length / lesson.challenges.length) * 100)
    return percentage
})
