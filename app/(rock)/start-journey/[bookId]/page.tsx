import { Button } from "@/components/ui/button";
import { getBookById } from "@/db/queries";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: {
    bookId: string;
  };
};
const BookDetailsPage = async ({ params }: Props) => {
  const bookData = getBookById(params.bookId);
  const [book] = await Promise.all([bookData]);
  if (!book) {
    alert("hello wold");
  }
  return (
    <div className="p-10 h-full">
      <Image
        src={book?.imageUrl || "/mastery.jpg"}
        alt={book?.title!}
        width={200}
        height={200}
        className="object-cover"
      />
      <h1 className="text-3xl font-bold tracking-wide text-neutral-700 my-1 dark:text-white">
        {book?.title}
      </h1>
      <p className="text-sm font-semibold text-neutral-500 dark:text-rs-text-dark">
        {book?.subTitle}
      </p>
      <p className="my-2 dark:text-white/80">
        By <span>{book?.author}</span>
      </p>
      <div className="mt-5">
        <h3 className="font-semibold mb-1 dark:text-rs-text-dark">
          Description
        </h3>
        <p className="dark:text-white/70">{book?.description}</p>
        <Button asChild className="my-5">
          <Link href="/start-journey">Dive into your Journey</Link>
        </Button>
      </div>
    </div>
  );
};

export default BookDetailsPage;
