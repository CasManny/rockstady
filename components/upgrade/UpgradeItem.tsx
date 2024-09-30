"use client"
import Image from "next/image";
import { Button } from "../ui/button";
import { POINT_TO_REFILL } from "@/constants";
import { useTransition } from "react";
import { refillHeart } from "@/actions/challenge-progress";
import toast from "react-hot-toast";

type Props = {
    hearts: number;
    points: number;
}
const UpgradeItem = ({ hearts, points }: Props) => {
    const [pending, startTransition] = useTransition()
    
    const onRefillHearts = () => {
        if (hearts === 5 || points < POINT_TO_REFILL) return 
        startTransition(() => {
            refillHeart().catch(() => toast.error("something went wrong!"))
        })
    }
  return (
    <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
    <Image src={'/heart.svg'} alt="Hearts" height={60} width={60} />
    <div className="flex-1">
        <p className="text-neutral-700 text-base lg:text-xl font-bold">Refill Hearts</p>
    </div>
    <Button disabled={pending || hearts === 5 || points < POINT_TO_REFILL} onClick={onRefillHearts}>
        {hearts === 5 ? "full" : (
            <div className="flex items-center">
                <Image src={'/points.svg'} alt="point" height={20} width={20} />
                <p className="">{ POINT_TO_REFILL}</p>
            </div>
        )}
    </Button>
</div>
  )
}

export default UpgradeItem