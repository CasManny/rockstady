"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import UserCommunity from "./UserCommunity";

const CommunitySidebar = () => {
  const pathname = usePathname();

  return (
    <section className="sticky left-0 top-0 flex h-screen  flex-col justify-between p-6  pt-28 max-sm:hidden lg:w-[300px]">
      <div className="flex flex-1 flex-col gap-6 border-r p-2 w-[300px]">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route;
          return (
            <Link
              href={link.route}
              className={cn(
                "flex gap-4 items-center text-black p-4 rounded-lg justify-start whitespace-nowrap",
                isActive && "bg-rs-yellow/20"
              )}
              key={link.label}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
        <UserCommunity />
      </div>
    </section>
  );
};

export default CommunitySidebar;
