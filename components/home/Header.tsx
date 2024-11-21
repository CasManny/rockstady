import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, Mountain } from "lucide-react";
import Link from "next/link";
import Sidebar from "./Sidebar";
import { auth } from "@clerk/nextjs/server";
import { ModeToggle } from "./Theme";

const headerLinks = [
  {
    name: "Pricing",
    href: "/",
  },
  {
    name: "About",
    href: "/",
  },
];
const Header = () => {
  const { userId } = auth();
  return (
    <header className="p-5 md:p-8 z-50 sticky top-0 shadow-sm bg-white dark:bg-rs-bg-dark">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-1">
            <Mountain className="h-10 w-10 text-[#F3BE00]" />
            <h1 className="font-semibold text-lg sm:text-2xl dark:text-white">
              SkillSquare
            </h1>
          </div>
          <div className="items-center gap-5 hidden lg:flex dark:text-rs-text-dark">
            {headerLinks.map((link, index) => (
              <Link
                href={link.href}
                key={index}
                className="hover:text-rs-yellow font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        {userId ? (
          <div className="gap-2 ml-auto flex">
            <Link
              href={"/choose-an-adventure"}
              className="ml-auto hidden lg:flex"
            >
              <Button className="rounded-2xl bg-rs-yellow font-extrabold text-black hover:bg-rs-yellow/90 tracking-widest">
                Improve Today
              </Button>
            </Link>
            <div className="hidden lg:flex">
              <ModeToggle />
            </div>
          </div>
        ) : (
          <div className="gap-2 ml-auto hidden lg:flex">
            <Link href={"/sign-in"}>
              <Button
                variant={"primaryOutline"}
                className="rounded-2xl text-lg hover:bg-rs-yellow hover:text-black"
              >
                Login <ArrowRight />
              </Button>
            </Link>
            <Link href={"/sign-up"}>
              <Button className="rounded-2xl bg-rs-yellow font-extrabold text-black hover:bg-rs-yellow/90 tracking-widest">
                Sign up for free
              </Button>
            </Link>
            <ModeToggle />
          </div>
        )}
        <div className="flex items-center gap-2">
          <Sidebar />
          <ModeToggle display />
        </div>
      </div>
    </header>
  );
};

export default Header;
