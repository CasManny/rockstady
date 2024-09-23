import { cn } from "@/lib/utils";
import { Book, BookLock, BookOpen, PackageOpen } from "lucide-react";
import Image from "next/image";

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
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] min-w-[200px]",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      <div className="min-[24px] w-full flex items-center justify-end">
        {active ? (
          <div className="rounded-md bg-green-600 flex items-center justify-center p-1.5">
            <PackageOpen className="text-white stroke-[1.5] w-4 h-4" />
          </div>
        ) : (
          <div className="rounded-md bg-green-600 flex items-center justify-center p-1.5">
            <BookLock className="text-white stroke-[2] w-4 h-4" />
          </div>
        )}
      </div>
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={title}
          height={70}
          width={93.33}
          className="rounded-md drop-shadow-md border object-cover"
        />
      )}
      {active ? (
        <BookOpen className="h-full w-full" />
      ) : (
        <Book className="h-full w-full" />
      )}
      <p className="text-neutral-700 text-center font-bold mt-3">{title}</p>
      <p>
        Author: <span>{author}</span>
      </p>
    </div>
  );
};

export default BookCard;
