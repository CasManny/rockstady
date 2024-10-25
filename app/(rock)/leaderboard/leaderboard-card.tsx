"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Gem } from "lucide-react";

interface LeaderboardCardProps {
  positon: number;
  gemNumber: number;
  image: string | null;
  name: string | null;
}
const LeaderboardCard = ({
  positon,
  gemNumber,
  name,
  image,
}: LeaderboardCardProps) => {
  const avatarFallback = name?.charAt(0).toUpperCase();

  return (
    <div className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50">
      <p className="font-bold text-lime-700 mr-4">{positon + 1}</p>
      <Avatar className="border bg-green-500 h-12 w-12 mr-2">
        {/* <AvatarImage src={image!} className="object-cover" /> */}
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <p className="font-bold text-neutral-800 flex-1 truncate">{name}</p>
      <div className="flex items-center gap-1">
        <Gem className="w-5 h-5 sm:w-10 sm:h-10 text-rs-yellow" />
        <p className="text-muted-foreground text-xs sm:text-lg">{gemNumber} Gem</p>
      </div>
    </div>
  );
};

export default LeaderboardCard;
