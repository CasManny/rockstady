import { chapters } from "@/db/schema";
import { Grid } from "lucide-react";
import Link from "next/link";

type Props = {
  chapters: (typeof chapters.$inferSelect)[] | undefined | null;
};
const BookChapters = ({ chapters }: Props) => {
  if (chapters?.length === 0) {
    return (
      <div className="mt-2">
        <h1 className="font-extrabold">No chapters in this book</h1>
      </div>
    );
  }
  return (
    <div className="mt-2">
      <h1 className="font-extrabold text-2xl">Book Levels</h1>
      {chapters?.map((chapter, index) => (
          <Link href={ `/admin/chapters/${chapter.id}`} className="flex gap-2 p-2 items-center bg-rs-yellow/15 rounded-md mb-2" key={index}>
          <Grid className="w-5 h-5" />
          <h1 className="text-lg ">{chapter.chapterTitle}</h1>
        </Link>
      ))}
    </div>
  );
};

export default BookChapters;
