"use server";

import db from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const upsertChallengeProgress = async (challengeId: number) => {
  const { userId } = auth();
  if (!userId) return;
  const currentUserProgress = await getUserProgress();
  if (!currentUserProgress) return;

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });
  if (!challenge) return;

  const lessonId = challenge.lessonId;

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
  });

  const isPractice = !!existingChallengeProgress;

  if (currentUserProgress.hearts === 0 && !isPractice) {
    return { error: "hearts" };
  }

  if (isPractice) {
    await db
      .update(challengeProgress)
      .set({
        completed: true,
      })
      .where(eq(challengeProgress.userId, userId));

    await db
      .update(userProgress)
      .set({
        hearts: Math.min(currentUserProgress.hearts + 1, 5),
        points: currentUserProgress.points + 10,
      })
      .where(eq(userProgress.userId, userId));

    revalidatePath("/leaderboard");
    revalidatePath("/quests");
    revalidatePath("/start-journey");
    revalidatePath(`/lesson/${lessonId}`);
    return;
  }

  await db.insert(challengeProgress).values({
    userId,
    challengeId,
    completed: true,
  });

  await db
    .update(userProgress)
    .set({
      points: currentUserProgress.points + 10,
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/leaderboard");
  revalidatePath("/quests");
  revalidatePath("/start-journey");
  revalidatePath(`/lesson/${lessonId}`);
};


export const reduceHearts = async (challengeId: number) => {
    const { userId } = auth()
    if (!userId) return
    const currentUserProgress = await getUserProgress()
    if (!currentUserProgress) return
    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId)
    })
    if (!challenge) return
    
    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(eq(challengeProgress.userId, userId), eq(challengeProgress.challengeId, challengeId))
    })

    const lessonId = challenge.lessonId

    const isPractice = !!existingChallengeProgress

    if (!isPractice && currentUserProgress.hearts === 0) {
        return { error: 'hearts'}
    }

    await db.update(userProgress).set({
        hearts: Math.max(currentUserProgress.hearts - 1, 0)
    }).where(eq(userProgress.userId, userId))

    revalidatePath("/leaderboard");
    revalidatePath("/quests");
    revalidatePath("/start-journey");
    revalidatePath(`/lesson/${lessonId}`);
}
