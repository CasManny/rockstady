import {
  Atom,
  BadgeDollarSignIcon,
  BriefcaseBusiness,
  DraftingCompass,
  HeartPulse,
  Layers,
  MessageSquare,
  MessagesSquareIcon,
  RocketIcon,
  Shuffle,
} from "lucide-react";

const categories = [
  {
    genre: "Management & Leadership",
    icon: Shuffle,
  },
  {
    genre: "Business",
    icon: BriefcaseBusiness,
  },
  {
    genre: "Entrepeneurship",
    icon: Atom,
  },
  {
    genre: "Money & Finance",
    icon: BadgeDollarSignIcon,
  },
  {
    genre: "Career & success",
    icon: Layers,
  },
  {
    genre: "Productivity",
    icon: RocketIcon,
  },
  {
    genre: "Health & Wellbeing",
    icon: HeartPulse,
  },
  {
    genre: "Communication",
    icon: MessagesSquareIcon,
  },
];
const BooksCategory = () => {
  return (
    <div className="container min-h-[80vh] p-5 md:p-10">
      <h1 className="text-center text-3xl font-extrabold mb-20">
        Learn from books <br />{" "}
        <span className="border-b border-dotted border-rs-yellow">
          Worth Your Time.
        </span>
      </h1>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <div key={index} className="border flex justify-center p-[20px] items-center hover:border-rs-yellow rounded-md">
            <category.icon className="mr-2" />
            <h3 className="font-bold">{category.genre}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksCategory;
