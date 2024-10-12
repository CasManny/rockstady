import { challenges, challengesOptions } from "@/db/schema";
import Card from "./Card";
import { cn } from "@/lib/utils";

type Props = {
  options: (typeof challengesOptions.$inferSelect)[];
  type: (typeof challenges.$inferSelect)["type"];
  onSelect: (id: number) => void;
  selectedOption?: number;
};
const Challenge = ({ options, type, onSelect, selectedOption }: Props) => {
  return (
    <div className={cn("grid gap-2 grid-cols-1")}>
      {options.map((option, index) => (
        <Card
          key={index}
          id={option.id}
          shortcut={`${index + 1}`}
          text={option?.textOption}
          selected={selectedOption === option.id}
          type={type}
          onClick={() => onSelect(option.id)}
          audioSrc={"/"}
        />
      ))}
    </div>
  );
};

export default Challenge;
