"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  iconSrc: string;
  href: string;
};
const SidebarItem = ({ label, iconSrc, href }: Props) => {
  const pathname = usePathname();
  const active = pathname.startsWith(href);
  return (
    <Button
      variant={active ? "sidebarOutline" : "sidebar"}
      className={cn(`justify-start h-[52px] hover:bg-rs-yellow/70`, active && 'bg-rs-yellow/70 text-white')}
      asChild
    >
      <Link href={href}>
        <Image
          src={iconSrc}
          alt={label}
          className="mr-5"
          height={32}
          width={32}
        />

        {label}
      </Link>
    </Button>
  );
};

export default SidebarItem;
