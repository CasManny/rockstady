"use client";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, Mountain } from "lucide-react";
import Link from "next/link";
import Sidebar from "./Sidebar";

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
  return (
    <header className="p-5 md:p-8 z-50 sticky top-0 shadow-sm bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-1">
            <Mountain className="h-10 w-10 text-[#F3BE00]" />
            <h1 className="font-semibold text-2xl">Rockstaddy</h1>
          </div>
          <div className="items-center gap-5 hidden lg:flex">
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
        <div className="gap-2 ml-auto hidden lg:flex">
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
        <Sidebar />
      </div>
    </header>
  );
};

export default Header;