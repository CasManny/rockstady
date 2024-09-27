import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { cache } from "react";
import db from "./drizzle";
import { eq } from "drizzle-orm";
import {
  books,
  challengeProgress,
  challenges,
  chapters,
  lessons,
  userProgress,
} from "./schema";

export const getBooks = cache(async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const books = await db.query.books.findMany({});
  return books;
});

export const getActiveUserProgress = cache(async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const activeBook = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeBook: true,
    },
  });
  return activeBook;
});

export const getBookById = cache(async (bookId: string) => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const book = await db.query.books.findFirst({
    where: eq(books.id, bookId),
    with: {
      chapters: {
        orderBy: (chapters, { asc }) => [asc(chapters.order)],
        with: {
          lessons: {
            orderBy: (lessons, { asc }) => [asc(lessons.order)],
          },
        },
      },
    },
  });

  return book;
});

export const getUserProgress = cache(async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/start-journey");
  }

  const userProgess = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeBook: true,
    },
  });

  if (!userProgess) {
    redirect("choose-an-adventure");
  }

  return userProgess;
});

export const getActiveBookLessons = cache(async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  // get the active book the user is currently reading
  const bookUserIsReading = await getUserProgress();
  // if no active book the user is reading return []
  if (!userId || !bookUserIsReading?.activeBookId) {
    return [];
  }

  // Get the details of the book=> chapters, lessons, challenges and challenge Progress
  const bookData = await db.query.chapters.findMany({
    where: eq(chapters.bookId, bookUserIsReading.activeBookId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          challenges: {
            orderBy: (challenges, { asc }) => [asc(challenges.order)],
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  if (!bookData) {
    redirect("/choose-an-adventure");
  }

  const normalizedData = bookData.map((chapter) => {
    const lessonWithCompletedStatus = chapter.lessons.map((lesson) => {
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

    return { ...chapter, lessons: lessonWithCompletedStatus };
  });

  return normalizedData;
});

export const getBookProgress = cache(async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const activeBookUserIsReading = await getActiveUserProgress();

  if (!userId || !activeBookUserIsReading?.activeBookId) {
    redirect("/choose-an-adventure");
  }

  const chaptersInBook = await db.query.chapters.findMany({
    where: eq(chapters.bookId, activeBookUserIsReading.activeBookId),
    orderBy: (chapters, { asc }) => [asc(chapters.order)],
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          challenges: {
            orderBy: (challenges, { asc }) => [asc(challenges.order)],
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  const firstUnCompletedLesson = chaptersInBook
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
    activeLesson: firstUnCompletedLesson,
    activeLessonId: firstUnCompletedLesson?.id,
  };
});

export const getLesson = cache(async (id?: number) => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const bookProgress = await getBookProgress();
  const lessonId = id || bookProgress?.activeLessonId;

  if (!lessonId) {
    return null;
  }
  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: {
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
          challengeProgress: {
            where: eq(challengeProgress.userId, userId),
          },
        },
      },
    },
  });

  if (!data || !data.challenges) {
    return null;
  }

  const normalizedChallenges = data.challenges.map((challenge) => {
    const completed =
      challenge.challengeProgress &&
      challenge.challengeProgress.length > 0 &&
      challenge.challengeProgress.every((progress) => progress.completed);
    return { ...challenge, completed: completed };
  });

  return { ...data, challenges: normalizedChallenges };
});
export const getLessonPercentage = cache(async () => {
  const bookProgress = await getBookProgress();
  if (!bookProgress?.activeLessonId) {
    return 0;
  }
  const lesson = await getLesson(bookProgress.activeLessonId);
  if (!lesson) {
    return 0;
  }
  const completedChallenges = lesson.challenges.filter(
    (challenge) => challenge.completed
  );
  const percentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100
  );

  return percentage;
});


