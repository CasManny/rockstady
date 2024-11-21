import { cn } from "@/lib/utils";
import { Mountain } from "lucide-react";
import Link from "next/link";

const menu = [
  {
    label: "Books",
    path: "/admin",
  },
  {
    label: "user Feedback",
    path: "/feedback",
  },
];

type Props = {
    className?: string
}
const AdminSidebar = ({className}: Props) => {
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
          <h1 className="font-semibold text-2xl">SkillSquare</h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1 mt-5">
        {menu.map((link, index) => (
            <Link href={link.path}>{link.label}</Link>
        ))}
      </div>
    </div>
  </div>
  );
};

export default AdminSidebar;
