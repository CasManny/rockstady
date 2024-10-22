"use client";
import { books, chapters } from "@/db/schema";
import { Button } from "../ui/button";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useChapterModalStore } from "@/store/add-chapter-modal";
import AddChapterForm from "./AddChapterForm";
import BookChapters from "./BookChapters";
import AddCoverImage from "./AddCoverImage";

type Props = {
  book:
    | (typeof books.$inferSelect & {
        chapters: (typeof chapters.$inferSelect)[] | null;
      })
    | undefined;
};
const BookDetails = ({ book }: Props) => {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.back()}>
        <ArrowBigLeft />
        Back
      </Button>

      <div className="flex flex-col md:flex-row gap-2 mt-5">
        <div className="">
          <Image
            src={book?.imageUrl! || '/mastery.jpg'}
            alt={book?.title!}
            width={500}
            height={500}
            className="h-[300px] w-[300px] rounded-md"
          />
        </div>
        <div className="p-5">
          <h1 className=" text-neutral-700 font-bold text-lg md:text-xl">
            BooK: <span>{book?.title}</span>
          </h1>
          <h3 className="my-2 text-neutral-500">{book?.subTitle}</h3>
          <p className="">{book?.description}</p>
          <AddChapterForm bookId={book?.id!} />
        </div>
      </div>

      <BookChapters chapters={book?.chapters} />
      {!book?.imageUrl && <AddCoverImage coverImage={book?.imageUrl!} bookId={book?.id!} />}
    </div>
  );
};

export default BookDetails;
