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
      upsertUserProgress(bookId).then((response) => {
        if (response?.error === 'empty') {
          return toast.error("Book is empty ")
        }
      }).catch(() => toast.error("something went wrong!"))
    })
  };
  return (
    <div className="gap-4 pt-6 grid grid-cols-1 grid-auto-rows-[300px] sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
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
