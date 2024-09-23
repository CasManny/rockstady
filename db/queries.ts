import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { cache } from "react";
import db from "./drizzle";
import { eq } from "drizzle-orm";
import { books, chapters, userProgress } from "./schema";

export const getBooks = cache(async () => {
    const { userId } = auth()
    if (!userId) { 
        redirect("/sign-in")
    }
    const books = await db.query.books.findMany({})
    return books
})

export const getActiveUserProgress = cache(async () => {
    const { userId } = auth()
    if (!userId) {
        redirect('/sign-in')
    }

    const activeBook = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeBook: true
        }
    })
    return activeBook
})

export const getBookById = cache(async (bookId: string) => {
    const { userId } = auth()
    if (!userId) {
        return null
    }
    const book = await db.query.books.findFirst({
        where: eq(books.id, bookId),
        with: {
            chapters: {
                orderBy: (chapters, { asc }) => [asc(chapters.order)],
                with: {
                    lessons: {
                        orderBy: (lessons, { asc}) => [asc(lessons.order)]
                    }
                }
                
            }
        }
    })

    return book
})