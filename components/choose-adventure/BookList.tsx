"use client";
import { books, userProgress } from "@/db/schema";
import BookCard from "./BookCard";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { upsertUserProgress } from "@/actions/user-progress";

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
      return router.push(`/start-journey/${bookId}`);
    }
    startTransition(() => {
      upsertUserProgress(bookId)
        .then((response) => {
          if (response?.error === "empty") {
            return toast.error("Book is empty ");
          }
        })
        .catch(() => toast.error("something went wrong!"));
    });
  };
  return (
    <div className="gap-4 flex flex-wrap justify-center items-center flex-col sm:flex-row">
      {books.map((book, index) => (
        <BookCard
          key={index}
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
