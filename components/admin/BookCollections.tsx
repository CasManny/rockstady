"use client"
import { books } from "@/db/schema";
import BookCard from "./BookCard";
import { Button } from "../ui/button";
import { useBookModalStore } from "@/store/add-book-modal";
interface Book {
  title: string;
  author: string;
  imageUrl: string | null;
  id: string
}
type Props = {
  books: Book[];
};
const BookCollections = ({ books }: Props) => {
  const { openBookModal } = useBookModalStore()
  return (
    <>
      <div className="flex justify-between items-center bg-white shadow-sm sticky top-0 p-3">
        <h1 className="text-neutral-700 font-semibold text-xl ">
          List of Books published
        </h1>
        <Button onClick={() => openBookModal()}>Add Book</Button>
      </div>
      <div className="gap-4 pt-6 grid grid-cols-1 min-h-screen sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
        {books.map((book, index) => (
          <BookCard
            id={book.id}
            title={book.title}
            imageUrl={book.imageUrl}
            author={book.author}
          />
        ))}
      </div>
    </>
  );
};

export default BookCollections;
