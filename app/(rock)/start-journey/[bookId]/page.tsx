import { Button } from "@/components/ui/button";
import { getBookById } from "@/db/queries";
import Image from "next/image";

type Props = {
  params: {
    bookId: string;
  };
};
const BookDetailsPage = async ({ params }: Props) => {
  const bookData = getBookById(params.bookId);
  const [book] = await Promise.all([bookData]);
  return (
    <div className="p-10 min-h-screen">
      <Image
        src={book?.imageUrl || "/mastery.jpg"}
        alt={book?.title!}
        width={200}
        height={200}
        className="object-cover"
      />
          <h1 className="text-3xl font-bold tracking-wide text-neutral-700 my-1">{book?.title}</h1>
          <p className="text-sm font-semibold text-neutral-500">{ book?.subTitle}</p>
      <p className="my-2">
        By <span>{book?.author}</span>
      </p>
      <div className="mt-5">
        <h3 className="font-semibold mb-1">Description</h3>
        <p>{book?.description}</p>
        <Button className="mt-3">Dive into your Journey</Button>
      </div>
    </div>
  );
};

export default BookDetailsPage;
