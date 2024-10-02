import { cache } from "react";
import db from "./drizzle";
import { eq } from "drizzle-orm";
import { books, chapters } from "./schema";

export const getBookcollections = cache(async () => {
    const books = await db.query.books.findMany({
        columns: {
            title: true,
            author: true,
            imageUrl: true,
            id: true
        }
    })
    return books
})

export const getASingleBook = cache(async (bookId: string) => {
    const book = await db.query.books.findFirst({
        where: eq(books.id, bookId),
        with: {
            chapters: true
        }
    })

    return book
})

export const getChapterDetails = cache(async (chapterId: number) => {
    const chapter = await db.query.chapters.findFirst({
        where: eq(chapters.id, chapterId),
        with: {
            book: true,
            lessons: true,
        }
    })

    if (!chapter) return
    return chapter
})