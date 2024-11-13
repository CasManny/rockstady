import { MessageSquareTextIcon, Pencil, Smile, Trash } from "lucide-react";
import { Button } from "./ui/button";
import EmojiPopover from "./emoji-popover";

interface ToolbarProps {
  isAuthor: boolean;
  isPending: boolean;
  handleEdit: () => void;
  handleThread: () => void;
  handleDelete: () => void;
  handleReaction: (value: string) => void;
  hideThreadButton?: boolean;
}
const Toolbar = ({
  isAuthor,
  isPending,
  hideThreadButton,
  handleDelete,
  handleEdit,
  handleReaction,
  handleThread,
}: ToolbarProps) => {
  return (
    <div className="absolute top-0 right-5">
      <div className="group-hover:opacity-100 opacity-0 transition-opacity border bg-white rounded-md shadow-sm">
        <EmojiPopover
        //   hint="Add reaction"
          onEmojiSelect={(emoji) => handleReaction(emoji.native)}
        >
          <Button variant={"ghost"} size={"sm"} disabled={isPending}>
            <Smile className="size-4" />
          </Button>
        </EmojiPopover>
        {!hideThreadButton && (
            <Button variant={"ghost"} size={"sm"} disabled={isPending} onClick={handleThread}>
              <MessageSquareTextIcon className="size-4" />
            </Button>
        )}
        {isAuthor && (
            <Button variant={"ghost"} size={"sm"} disabled={isPending}  onClick={handleEdit}>
              <Pencil className="size-4" />
            </Button>
        )}

        {isAuthor && (
            <Button variant={"ghost"} size={"sm"} disabled={isPending} onClick={handleDelete}>
              <Trash className="size-4" />
            </Button>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
