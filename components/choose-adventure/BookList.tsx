"use client";
import { books, userProgress } from "@/db/schema";
import BookCard from "./BookCard";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { upsertUserProgress } from "@/actions/user-progress";
import toast from "react-hot-toast";

type Props = {
  books: (typeof books.$inferSelect)[];
  activeBookId?: typeof userProgress.$inferSelect.activeBookId;
};
const BookList = ({ books, activeBookId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = (bookId: string) => {
    if (pending) return;
    if (bookId === activeBookId) {
      router.push(`/start-journey/${bookId}`);
    }

    startTransition(() => {
      upsertUserProgress(bookId).catch(() => toast.error("Book is empty..."));
    });
  };
  return (
    <div className="gap-4 pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
      {books.map((book) => (
        <BookCard
          id={book.id}
          disabled={pending}
          title={book.title}
          imageSrc={book.imageUrl!}
          author={book.author}
          active={book.id === activeBookId}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default BookList;
