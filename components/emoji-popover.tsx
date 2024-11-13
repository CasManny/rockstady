import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Picker from "@emoji-mart/react";
import Data from "@emoji-mart/data";

interface EmojiPopoverProps {
  children: React.ReactNode;
  onEmojiSelect: (emoji: any) => void;
}
const EmojiPopover = ({ children, onEmojiSelect }: EmojiPopoverProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const onSelect = (emoji: any) => {
    onEmojiSelect(emoji);
    setPopoverOpen(false);

    // setTimeout(() => {
    //     setTooltipOpen(false)
    // }, 500)
  };

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <Picker
          data={Data}
          onEmojiSelect={(x: any) => {
            onSelect(x);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPopover;
