import { SignedIn, UserButton } from "@clerk/nextjs";
import { Mountain } from "lucide-react";
import Link from "next/link";

const CommunityNavbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full px-8 py-4 lg:px-10 border-b bg-white shadow-sm">
      <Link href={"/"} className="flex items-center gap-1">
        <Mountain className="h-8 w-8 text-rs-yellow" />
        <p className="text-[26px] text-black max-sm:hidden">SkillSquare</p>
      </Link>
      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        {/* <MobileNav /> */}
      </div>
    </nav>
  );
};

export default CommunityNavbar;
