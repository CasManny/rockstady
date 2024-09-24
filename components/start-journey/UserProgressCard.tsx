import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Gem } from "lucide-react";

type Props = {
  hearts: number;
  points: number;
};

const UserProgressCard = ({ hearts, points }: Props) => {
  return (
    <div className="flex items-center gap-x-2 w-full">
      <Link href={"/shop"}>
        <Button variant={"ghost"} className="text-rs-yellow ">
          <Gem className="h-5 w-5 text-rs-yellow mr-2" />
          {points}
        </Button>
      </Link>
      <Link href={"/shop"}>
        <Button variant={"ghost"} className="text-rose-500 ">
          <Image
            src={"/heart.svg"}
            height={22}
            width={22}
            alt="points"
            className="mr-2"
          />
          {hearts}
        </Button>
      </Link>
    </div>
  );
};

export default UserProgressCard;
