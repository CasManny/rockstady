import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowRight, Menu, Mountain } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { auth } from "@clerk/nextjs/server";

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

const Sidebar = () => {
  const { userId } = auth();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="h-8 w-8 lg:hidden" />
      </SheetTrigger>
      <SheetContent side={"top"} className="bg-white h-full text-black">
        <div>
          <div className="">
            <div className="flex flex-col gap-10">
              <div className="flex items-center gap-1">
                <Mountain className="h-10 w-10 text-[#F3BE00]" />
                <h1 className="font-semibold text-2xl">Rockstaddy</h1>
              </div>
              <div className="flex flex-col gap-5">
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
              <Link href={"/choose-an-adventure"}>
                <Button className="rounded-2xl bg-rs-yellow font-extrabold text-black hover:bg-rs-yellow/90 tracking-widest">
                  Improve Today
                </Button>
              </Link>
            ) : (
              <div className="gap-2 grid md:grid-cols-2 mt-10 grid-cols-1">
                <Link href={"/sign-in"}>
                  <Button
                    variant={"default"}
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
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
