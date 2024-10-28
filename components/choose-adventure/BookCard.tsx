import { cn } from "@/lib/utils";
import { Check, Lock } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarImage } from "../ui/avatar";

type Props = {
  id: string;
  imageSrc?: string;
  onClick: (id: string) => void;
  disabled?: boolean;
  active?: boolean;
};
const BookCard = ({
  id,
  imageSrc,
  active,
  disabled,
  onClick,
}: Props) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "w-full h-full  relative rounded-xl cursor-pointer flex flex-col items-center justify-between",
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
        <Avatar className="rounded-sm w-full h-full">
          <AvatarImage src={imageSrc} />
       </Avatar>
      )}
    </div>
  );
};

export default BookCard;
