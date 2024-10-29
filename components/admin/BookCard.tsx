import { Book } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  imageUrl: string | null;
    id: string;
};
const BookCard = ({ imageUrl, id }: Props) => {
  return (
    <Link href={`/admin/books/${id}`} className="">
      {imageUrl && (
        <Image
          src={imageUrl || "/mastery.jpg"}
          alt={'book image'}
          width={100}
          height={100}
          className="w-full rounded-md"
        />
      )}
      {!imageUrl && <Book className=" h-40 w-full" />}
    </Link>
  );
};

export default BookCard;
