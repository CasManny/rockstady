import FeedWrapper from '@/components/start-journey/FeedWrapper'
import StickyWrapper from '@/components/start-journey/StickyWrapper'
import UserProgressCard from '@/components/start-journey/UserProgressCard'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { getLeaderboardData, getUserProgress } from '@/db/queries'
import { Gem } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

const LeaderBoard = async () => {
  const userProgressData = getUserProgress()
  const leaderboardData = getLeaderboardData()

  const [userProgress, leaderboard] = await Promise.all([userProgressData, leaderboardData])



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
        <h1 className="tex-center font-bold text-neutral-800 text-2xl my-6">
          Leaderboard
        </h1>
        <p className="text-muted-foreground text-center text-lg mb-6">
          See where you stand among other learners in the community
        </p>
        <Separator className="mb-4 h-0.5 rounded-full" />
        {leaderboard.map((user, index) => (
          <div
            className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
            key={index}
          >
            <p className="font-bold text-lime-700 mr-4">{index + 1}</p>
            <Avatar className="border bg-green-500 h-12 w-12 ml-3 mr-6">
              <AvatarImage
                src={user?.userImage!}
                className="object-cover"
              />
            </Avatar>
            <p className="font-bold text-neutral-800 flex-1">
              {user.userName}
            </p>
            <div className="flex items-center gap-1">
              <Gem className='w-10 h-10 text-rs-yellow' />
              <p className="text-muted-foreground ">
                {user.points} Gem
              </p>
            </div>
          </div>
        ))}
          {leaderboard.length === 0 && <h1 className='text-3xl font-semibold'>Leaderboard is Empty</h1>}
      </div>
    </FeedWrapper>
  </div>
  )
}

export default LeaderBoard