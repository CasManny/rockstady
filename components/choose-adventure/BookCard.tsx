import { cn } from "@/lib/utils";
import { Check, Lock } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarImage } from "../ui/avatar";

type Props = {
  title: string;
  id: string;
  imageSrc?: string;
  onClick: (id: string) => void;
  disabled?: boolean;
  active?: boolean;
  author: string;
};
const BookCard = ({
  title,
  id,
  imageSrc,
  author,
  active,
  disabled,
  onClick,
}: Props) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "h-60 w-60  relative rounded-xl cursor-pointer flex flex-col items-center justify-between",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      <div className="min-[24px] w-full flex items-center justify-end absolute top-2 right-2 z-50">
        {active ? (
          <div className="rounded-md bg-green-600  flex items-center justify-center p-1.5">
            <Check className="text-white stroke-[2.5] w-4 h-4" />
          </div>
        ) : (
          <div className="rounded-md bg-rs-yellow flex items-center justify-center p-1.5">
            <Lock className="text-white stroke-[2] w-4 h-4" />
          </div>
        )}
      </div>
      {imageSrc && (
        <Avatar className="rounded-sm w-[80%] h-[80%] sm:w-full sm:h-full">
          <AvatarImage src={imageSrc} className="w-full h-full" />
       </Avatar>
      )}
      <p className="text-neutral-700 text-center font-bold mt-3">{title}</p>
      <p className="text-center">
        Author: <span>{author}</span>
      </p>
    </div>
  );
};

export default BookCard;
