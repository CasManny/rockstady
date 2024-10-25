import FeedWrapper from "@/components/start-journey/FeedWrapper";
import StickyWrapper from "@/components/start-journey/StickyWrapper";
import UserProgressCard from "@/components/start-journey/UserProgressCard";
import { Separator } from "@/components/ui/separator";
import { getLeaderboardData, getUserProgress } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import LeaderboardCard from "./leaderboard-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const LeaderBoard = async () => {
  const userProgressData = getUserProgress();
  const leaderboardData = getLeaderboardData();

  const [userProgress, leaderboard] = await Promise.all([
    userProgressData,
    leaderboardData,
  ]);

  if (!leaderboard || !userProgress) {
    return (
      <div className="flex flex-row-reverse gap-[48px] px-6">
        <StickyWrapper>
          <UserProgressCard
            hearts={userProgress?.hearts}
            points={userProgress?.points}
          />
        </StickyWrapper>
        <FeedWrapper>
          <div className="w-full flex flex-col items-center">
            <Image
              src={"/leaderboard.svg"}
              alt="leaderboard"
              height={90}
              width={90}
            />
            <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
              Leaderboard
            </h1>
            <p className="text-muted-foreground text-center text-sm sm:text-lg mb-6">
              See where you stand among other learners in the community
            </p>
            <Separator className="mb-4 h-0.5 rounded-full" />
            <div className="flex items-center justify-center flex-col">
              <h1 className="text-2xl font-bold mb-4 text-center">Be the first to reach the top of the leaderboard!</h1>
              <Button asChild>
                <Link href={'/choose-an-adventure'}>Start Now</Link>
              </Button>
            </div>
          </div>
        </FeedWrapper>
      </div>
    );
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-2 sm:px-6">
      <StickyWrapper>
        <UserProgressCard
          hearts={userProgress?.hearts}
          points={userProgress?.points}
        />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image
            src={"/leaderboard.svg"}
            alt="leaderboard"
            height={90}
            width={90}
          />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Leaderboard
          </h1>
          <p className="text-center text-sm sm:text-lg mb-6">
            See where you stand among other learners in the community
          </p>
          <Separator className="mb-4 h-0.5 rounded-full" />
          {leaderboard.map((user, index: number) => (
            <LeaderboardCard
              key={index}
              positon={index}
              gemNumber={user.points}
              image={user?.userImage}
              name={user.userName}
            />
          ))}
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LeaderBoard;
