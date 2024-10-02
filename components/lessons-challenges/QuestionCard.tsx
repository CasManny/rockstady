"use client";
import { challenges, challengesOptions } from "@/db/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { addOptionToChallenge } from "@/actions/admin-actions";
import { cn } from "@/lib/utils";

type Props = {
  challenge: typeof challenges.$inferSelect & {
    challengeOptions: (typeof challengesOptions.$inferSelect)[];
  };
};
const QuestionCard = ({ challenge }: Props) => {
  const [option, setOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [correct, setCorrect] = useState("");

  const submitOption = async () => {
    if (!correct || !option) {
      return toast.error("complete options");
    }
    setLoading(true);
    await addOptionToChallenge(challenge.id, correct, option);
    setOption("");
    setCorrect("");
    setLoading(false);
  };
  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="no-underline hover:no-underline">
            {challenge.type === "SELECT" && challenge.question}
            {challenge.type === "TYPEIT" && challenge.quote}
          </AccordionTrigger>

          {challenge.type === "SELECT" && (
            <div className="flex flex-col">
              <AccordionContent>
                <>
                  {challenge.challengeOptions.map((option, index) => (
                    <div className={cn("flex gap-2 justify-between mb-3 p-1 rounded-lg", option.isCorrect && 'bg-green-300')}>
                      <p>{index + 1}</p>
                      <p>{option.textOption}</p>
                      <p>{option.isCorrect ? "True" : "False"}</p>
                    </div>
                  ))}

                  {challenge.challengeOptions.length < 5 && (
                    <div className="flex flex-col gap-2">
                      <Input
                        placeholder="Enter option"
                        value={option}
                        onChange={(e) => setOption(e.target.value)}
                      />
                      <Select value={correct} onValueChange={setCorrect}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="is option correct" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={"true"}>True</SelectItem>
                          <SelectItem value={"false"}>False</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={submitOption}>
                        {loading ? (
                          <Loader className="animate-spin h-5 w-5" />
                        ) : (
                          "submit option"
                        )}
                      </Button>
                    </div>
                  )}
                </>
              </AccordionContent>
            </div>
          )}
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default QuestionCard;
