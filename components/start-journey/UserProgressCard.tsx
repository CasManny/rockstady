import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Gem } from "lucide-react";

type Props = {
  hearts: number | undefined;
  points: number | undefined;
};

const UserProgressCard = ({ hearts, points }: Props) => {
  return (
    <div className="flex items-center justify-center gap-x-2 w-full mt-5">
      <div>
        <Button variant={"ghost"} className="text-rs-yellow ">
          <Gem className="h-5 w-5 text-rs-yellow mr-2" />
          {!!points ? points : 0}
        </Button>
      </div>
      <div>
        <Button variant={"ghost"} className="text-rose-500 ">
          <Image
            src={"/heart.svg"}
            height={22}
            width={22}
            alt="points"
            className="mr-2"
          />
          {!!hearts ? hearts : 0}
        </Button>
      </div>
    </div>
  );
};

export default UserProgressCard;
