"use server"

import db from "@/db/drizzle";
import { books, challenges, challengesEnum, challengesOptions, chapters, feedbacks, lessons } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

interface IAddBook {
    id: string,
    title: string;
    subtitle: string | undefined,
    author: string;
    description: string;
}

export const addBook = async ({id, title, subtitle, author, description}: IAddBook) => {
    const newBook = await db.insert(books).values({
        id,
        title,
        description,
        subTitle: subtitle,
        author
    }).returning({bookId: books.id})

    revalidatePath("/choose-an-adventure")
    revalidatePath('/admin')

    return newBook
}


export const addChapterToBook = async (bookId: string, title: string) => {
    const book = await db.query.books.findFirst({
        where: eq(books.id, bookId),
        with: {
            chapters: {
                orderBy: (chapters, { desc }) => [desc(chapters.order)]
            }
        } 
    })
    if (!book) return 
    const lastChapterInBook = book.chapters[0]?.order
    const newOrder = lastChapterInBook === undefined ? 0 : lastChapterInBook + 1

    await db.insert(chapters).values({
        bookId: bookId,
        chapterTitle: title,
        order: newOrder
    })

    revalidatePath(`/admin/books/${bookId}`)
    revalidatePath(`/start-journey`)

}

export const addLessonToChapter = async (chapterId: number, lessonTitle: string, summary: string) => {
    const chapter = await db.query.chapters.findFirst({
        where: eq(chapters.id, chapterId),
        with: {
            lessons: true
        }
    })
    const lastLessonInChapter = chapter?.lessons[0]?.order
    const newOrder = lastLessonInChapter === undefined ? 0 : lastLessonInChapter + 1

    await db.insert(lessons).values({
        chapterId: chapterId,
        lessonTitle: lessonTitle,
        summary: summary,
        order: newOrder
    })

    revalidatePath(`/admin/chapter/${chapterId}`)
    revalidatePath(`/start-journey/${chapter?.bookId}`)




}

export const addChallenge = async (lessonId: number, question: string, type: string, quote: string) => {
    const lesson = await db.query.lessons.findFirst({
        where: eq(lessons.id, lessonId),
        with: {
            
            challenges: {
                orderBy: (challenges, { desc }) => [desc(challenges.order)]
            }
        }
    })
    if (!lesson) return 
    
    const lastChallengeOrder= lesson?.challenges[0]?.order
    const newOrder = lastChallengeOrder === undefined ? 0 : lastChallengeOrder + 1

    await db.insert(challenges).values({
        question: question ? question : null,
        type: type,
        order: newOrder,
        quote: quote ? quote : null,
        lessonId: lessonId,
    })

    revalidatePath(`/admin/lesson/${lessonId}`)
    revalidatePath(`/start-journey`)


}

export const addOptionToChallenge = async (challengeId: number, correct: string, option: string) => {
    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId),
        with: {
            challengeOptions: {
                orderBy: (challengesOptions, {desc }) => [desc(challengesOptions.order)]
            }
        }
    })
    if (!challenge) return
    const lastChallengeOptionOrder = challenge.challengeOptions[0]?.order
    const newOrder = lastChallengeOptionOrder === undefined ? 0 : lastChallengeOptionOrder + 1

    await db.insert(challengesOptions).values({
        challengeId,
        order: newOrder,
        isCorrect: correct === 'true' ? true : false,
        textOption: option
    })

    revalidatePath(`/admin/lesson/${challengeId}`)
    revalidatePath(`/start-journey`)
}

interface IFeedback {
    name: string,
    newFeature: string;
    change: string,
    need: string,
    feel: string,
    confused: string,
    easy: string,
    enjoy: string,
}


export const createFeedback = async (values: IFeedback) => {
    await db.insert(feedbacks).values({
        ...values
    })
    
}