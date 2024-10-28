import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "./SidebarItem";
import { Mountain } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
type Props = {
  className?: string;
};

const sidebarLinks = [
  {
    label: "Choose a book",
    href: "/choose-an-adventure",
    iconSrc: "/learn.svg",
  },
  {
    label: "Improve Today",
    href: "/start-journey",
    iconSrc: "/open-book.png",
  },
  {
    label: "Leaderboard",
    href: "/leaderboard",
    iconSrc: "/leaderboard.svg",
  },
  {
    label: "Quests",
    href: "/quests",
    iconSrc: "/quests.svg",
  },
  {
    label: "Upgrade",
    href: "/upgrade",
    iconSrc: "/shop.svg",
  },
  {
    label: "Community",
    href: "/community",
    iconSrc: "/community1.svg"
  }
];
const Sidebar = async ({ className }: Props) => {
  const user = await currentUser()
  return (
    <div
      className={cn(
        `h-full lg:w-[256px] lg:fixed flex left-0 top-0 px-4 border-r-2 flex-col justify-between`,
        className
      )}
    >
      <div className="mt-3">
        <Link href={"/"}>
          <div className="flex items-center gap-1">
            <Mountain className="h-10 w-10 text-[#F3BE00]" />
            <h1 className="font-semibold text-2xl">Rockstaddy</h1>
          </div>
        </Link>
        <div className="flex flex-col gap-y-2 flex-1 mt-5">
          {sidebarLinks.map((link) => (
            <SidebarItem
              key={link.label}
              href={link.href}
              iconSrc={link.iconSrc}
              label={link.label}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2 items-center p-10">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <h1 className="font-semibold">{ user?.username}</h1>
      </div>
    </div>
  );
};

export default Sidebar;
