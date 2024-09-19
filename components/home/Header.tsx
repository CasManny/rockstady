import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, Mountain } from "lucide-react";
import Link from "next/link";

const headerLinks = [
  {
    name: "Pricing",
    href: "/pricing",
  },
  {
    name: "About",
    href: "/about",
  },
];
const Header = () => {
  return (
    <header className="p-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-1">
            <Mountain className="h-10 w-10 text-[#F3BE00]" />
            <h1 className="font-semibold text-2xl">Rockstaddy</h1>
          </div>
          <div className="flex items-center gap-5">
            {headerLinks.map((link, index) => (
                <Link href={link.href} key={index} className="hover:text-rs-yellow font-medium">{ link.name}</Link>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant={"outline"}
            className="rounded-2xl text-lg hover:bg-rs-yellow hover:text-black"
          >
            Login <ArrowRight />
          </Button>
          <Button className="rounded-2xl bg-rs-yellow font-extrabold text-black hover:bg-rs-yellow/90 tracking-widest">
            Sign up for free
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
