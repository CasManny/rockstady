"use server"

import db from "@/db/drizzle";
import { books, chapters, lessons } from "@/db/schema";
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

}