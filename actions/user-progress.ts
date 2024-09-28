"use server";

import db from "@/db/drizzle";
import { getBookById, getUserProgress } from "@/db/queries";
import { books, userProgress } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertUserProgress = async (bookId: string) => {
  const user = await currentUser();
  if (!user) return;

  const book = await getBookById(bookId)
  if (!book) return 

  if (book?.chapters.length === 0) {
    return { error: "empty"}
  }
  
  const activeBookUserIsReading = await getUserProgress()
  if (activeBookUserIsReading) {
    await db.update(userProgress).set({
      activeBookId: activeBookUserIsReading.activeBookId,
      userId: user.id,
      userImage:  user.imageUrl
    })
    revalidatePath("/choose-an-adventure")
    redirect(`/start-journey/${bookId}`)
  }

  await db.insert(userProgress).values({
    userId: user.id,
    userImage: user.imageUrl,
    activeBookId: bookId
  })
  revalidatePath("/choose-an-adventure")
  redirect(`/start-journey/${bookId}`)

};
