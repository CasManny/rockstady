"use server";

import db from "@/db/drizzle";
import { getBookById, getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertUserProgress = async (bookId: string) => {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId || !user) {
    return { error: "unauthorised" };
  }

  const book = await getBookById(bookId);
  if (book?.chapters.length === 0) {
    return { error: "empty" };
  }

  const activeBook = await getUserProgress();
  if (!activeBook) {
    await db.insert(userProgress).values({
      userId: userId,
      userImage: user.imageUrl,
      userName: user.username || user.firstName,
      activeBookId: bookId,
    });

    revalidatePath("/choose-an-adventure");
    redirect(`/start-journey/${bookId}`);
  } else {
    await db.update(userProgress).set({
      userId: userId,
      activeBookId: bookId,
      userImage: user.imageUrl,
    });

    revalidatePath("/choose-an-adventure");
    redirect(`/start-journey/${bookId}`);
  }
};
