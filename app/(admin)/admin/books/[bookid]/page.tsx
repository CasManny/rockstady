import BookDetails from "@/components/admin/BookDetails";
import { getASingleBook } from "@/db/admin-queries";
import { redirect } from "next/navigation";

type Props = {
  params: {
    bookId: string;
  };
};
const BookDetailsPage = async ({ params }: Props) => {
  const bookData = getASingleBook(params.bookId);
    const [book] = await Promise.all([bookData]);
  return (
    <div className="p-5">
      <BookDetails book={book} />
    </div>
  );
};

export default BookDetailsPage;
