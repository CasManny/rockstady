import FeedWrapper from "@/components/start-journey/FeedWrapper"
import StickyWrapper from "@/components/start-journey/StickyWrapper"
import UserProgressCard from "@/components/start-journey/UserProgressCard"
import UpgradeItem from "@/components/upgrade/UpgradeItem"
import { getUserProgress } from "@/db/queries"
import Image from "next/image"
import { redirect } from "next/navigation"

const ShopPage = async () => {
  const userProgressData = getUserProgress()
  const [userProgress] = await Promise.all([userProgressData])
  if (!userProgress || !userProgress.activeBookId) {
    redirect('/choose-an-adventure')
  }

  return (
    <div className="flex flex-row-reverse">
       <StickyWrapper>
        <UserProgressCard
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
      </StickyWrapper>
      <FeedWrapper>
              <div className="w-full flex flex-col items-center">
                  <Image src={'/shop.svg'} alt="shop" height={90} width={90} />
                  <h1 className="tex-center font-bold text-neutral-800 text-2xl my-6">Upgrade</h1>
                  <p className="text-muted-foreground text-center text-lg mb-6">spend your Gems on cool stuff</p>
                  <UpgradeItem hearts={userProgress.hearts} points={userProgress.points} />
              </div>
          </FeedWrapper>
    </div>
  )
}

export default ShopPage