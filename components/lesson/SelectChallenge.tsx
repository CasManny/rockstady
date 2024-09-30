import { challenges, challengesOptions } from "@/db/schema";
import Challenge from "./Challenge";

type Props = {
  question: string | null;
  options: (typeof challengesOptions.$inferSelect)[];
  type: (typeof challenges.$inferSelect)["type"];
  onSelect: (id: number) => void;
  selectedOption?: number;
};
const SelectChallenge = ({
  question,
  options,
  type,
  onSelect,
  selectedOption,
}: Props) => {
  return (
      <div className="flex-1">
        <div className="flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-4">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              Select the correct option
            </h1>
            <p className="my-2 font-semibold">{question}</p>
            <Challenge
              options={options}
              onSelect={onSelect}
              // status={status}
              selectedOption={selectedOption}
              // disabled={pending}
              type={type}
            />
          </div>
        </div>
      </div>
  );
};

export default SelectChallenge;
