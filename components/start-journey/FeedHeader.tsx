import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  title: string;
  subTitle?: string;
  author: string,
};
import React from "react";

const FeedHeader = ({ title, subTitle, author }: Props) => {
  return (
    <div className="sticky top-0  bg-white dark:bg-rs-bg-dark pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 mb-5 text-neutral-100 lg:z-50">
      <Link href={"/choose-an-adventure"}>
        <Button variant={"ghost"} size={"sm"}>
          <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400" />{" "}
        </Button>
      </Link>
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-lg text-neutral-900 dark:text-white">{title}</h1>
        <p className="text-sm font-semibold text-neutral-500 dark:text-white/80">{subTitle}</p>
        <p className="text-neutral-600 dark:text-white/70">By: { author}</p>
      </div>
      <div className="" />
    </div>
  );
};

export default FeedHeader;
