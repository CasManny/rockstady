import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Props = {
  quote: string | null;
};
const Quote = ({ quote }: Props) => {
  return (
    <Alert className="border-none">
      <Terminal className="h-4 w-4" />
      <AlertTitle className="text-rs-yellow font-extralight">Quote 👇</AlertTitle>
      <AlertDescription className="mt-2 font-bold">
        <code>{quote}</code>
      </AlertDescription>
    </Alert>
  );
};

export default Quote;
