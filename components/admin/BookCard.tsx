import { Book } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  imageUrl: string | null;
    author: string;
    id: string;
};
const BookCard = ({ title, imageUrl, author, id }: Props) => {
  return (
    <Link href={`/admin/books/${id}`} className="">
      {imageUrl && (
        <Image
          src={imageUrl || "/mastery.jpg"}
          alt={title}
          width={100}
          height={100}
          className="w-full rounded-md"
        />
      )}
      {!imageUrl && <Book className=" h-40 w-full" />}
      <h3 className="text-center text-lg font-semibold">Author: {author}</h3>
    </Link>
  );
};

export default BookCard;
