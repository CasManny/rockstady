"use server"

import db from "@/db/drizzle"
import { getActiveUserProgress, getBookById } from "@/db/queries"
import { userProgress } from "@/db/schema"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const upsertUserProgress = async (bookId: string) => {
    const user = await currentUser()
    if (!user) return null

    const book = await getBookById(bookId)
    if (!book) {
        return new Error("Book not found.")
    }

    if (!book.chapters.length || !book.chapters[0].lessons.length) {
        return new Error("Book is Empty")
    }

    const existingBookProgress = await getActiveUserProgress()

    if (existingBookProgress) {
        await db.update(userProgress).set({
            activeBookId: bookId,
            userId: user.id,
            userImage: user.imageUrl || ""
        })
        revalidatePath("/choose-an-adventure")
        redirect(`/start-journey/${bookId}`)
    }

    await db.insert(userProgress).values({
        activeBookId: bookId,
        userId: user.id,
        userImage: user.imageUrl || ""
    })

    revalidatePath('/choose-an-adventure')
    redirect(`/start-journey/${bookId}`)
    
}