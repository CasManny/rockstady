"use client";
import { X } from "lucide-react";
import { Progress } from "../ui/progress";
import Image from "next/image";
import { useExistModalStore } from "@/store/use-exit-modal";
import { ModeToggle } from "../home/Theme";

type Props = {
  hearts: number;
  percentage: number;
};
const QuizHeader = ({ hearts, percentage }: Props) => {
  const { open } = useExistModalStore();
  return (
    <header className="lg:pt-10 pt-10 px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full sticky top-0 bg-white dark:bg-rs-bg-dark z-50 ">
      <X
        className="text-slate-500 size-10 hover:opacity-75 transition cursor-pointer dark:text-white"
        onClick={open}
      />
      <Progress value={percentage} />
      <div className="text-rose-500 flex items-center font-bold">
        <Image
          src={"/heart.svg"}
          alt="heart"
          width={28}
          height={28}
          className="mr-2"
        />
        {hearts}
      </div>
      <ModeToggle />
    </header>
  );
};

export default QuizHeader;
