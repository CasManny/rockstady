import FeedWrapper from '@/components/start-journey/FeedWrapper'
import StickyWrapper from '@/components/start-journey/StickyWrapper'
import UserProgressCard from '@/components/start-journey/UserProgressCard'
import { Progress } from '@/components/ui/progress'
import { quests } from '@/constants'
import { getUserProgress } from '@/db/queries'
import { Gem } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

const Questspage = async () => {
  const userProgressData = getUserProgress()

  const [userProgress] = await Promise.all([userProgressData])
  if (!userProgress) {
    redirect('/choose-an-adventure')
  }
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgressCard
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image
            src={"/quests.svg"}
            alt="quest"
            height={90}
            width={90}
          />
          <h1 className="tex-center font-bold text-neutral-800 text-2xl my-6 dark:text-white">
            Quests
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6 dark:text-rs-text-dark">
            Complete Quests by earning Gems
          </p>
          <ul className="w-full ">
            {quests.map((quest, index) => {
              const progress = (userProgress.points / quest.value) * 100
              return (
                <div className="flex items-center w-full p-4 gap-x-4" key={quest.title}>
                  <Gem className='h-10 w-10 text-rs-yellow' />
                  <div className="flex flex-col gap-y-2 w-full">
                    <p className="text-neutral-700 font-bold text-xl  dark:text-white/90">{quest.title}</p>
                    <Progress value={progress} className="h-3" />
                  </div>
                </div>
              )
              })}
          </ul>
        </div>
      </FeedWrapper>
    </div>
  )
}

export default Questspage