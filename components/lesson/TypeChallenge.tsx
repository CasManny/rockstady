import { Textarea } from "../ui/textarea";
import Quote from "./Quote";

type Props = {
  text: string;
};

const TypeChallenge = ({ text }: Props) => {
  return (
    <div>
      <div className="flex-1">
        <div className="flex justify-center items-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col">
            <h1 className="font-extrabold text-2xl text-left md:text-2xl">Type the quote exactly in the box below</h1>
            <Quote quote={text} />
            <Textarea className="border-rs-yellow resize-none h-28 w-full text-xl" placeholder="Enter quote" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeChallenge;
