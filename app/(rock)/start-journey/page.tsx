import FeedHeader from '@/components/start-journey/FeedHeader'
import FeedWrapper from '@/components/start-journey/FeedWrapper'
import StickyWrapper from '@/components/start-journey/StickyWrapper'
import UserProgressCard from '@/components/start-journey/UserProgressCard'
import { getUserProgress } from '@/db/queries'

const StartJourney = async () => {
    const userProgressData = getUserProgress()
    const [userProgress] = await Promise.all([userProgressData])
  return (
      <div className='flex flex-row-reverse'>
          <StickyWrapper>
              <UserProgressCard hearts={userProgress?.hearts!} points={userProgress?.points!} />
          </StickyWrapper>
          <FeedWrapper>
              <FeedHeader title={userProgress?.activeBook.title!} />
          </FeedWrapper>
    </div>
  )
}

export default StartJourney