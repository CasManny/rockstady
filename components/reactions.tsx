import { cn } from "@/lib/utils";
import EmojiPopover from "./emoji-popover";
import { MdOutlineAddReaction } from "react-icons/md";
import { useCommunityId } from "@/hooks/use-community-id";
import { useUser } from "@clerk/nextjs";
import { Doc, Id } from "@/convex/_generated/dataModel";

interface ReactionsProps {
  data: Array<
    Omit<Doc<"reactions">, "memberId"> & {
      count: number;
      memberIds: Id<"members">[];
    }
  >;
  onChange: (value: string) => void;
}
const Reactions = ({ data, onChange }: ReactionsProps) => {
  const communityId = useCommunityId();
  const { user } = useUser();
  const currentMemberId = user?.id;
  if (data.length === 0) {
    return null;
  }
  return (
    <div className="flex items-center gap-1 mt-1 mb-1">
      {data.map((reaction) => (
        <button
          onClick={() => onChange(reaction.value)}
          className={cn(
            "h-6 px-2 rounded-full bg-slate-200/70 border border-transparent text-slate-800 flex items-center gap-x-1",
            reaction.memberIds.includes(currentMemberId!) &&
              "bg-blue-100/70 border-blue-500 text-white"
          )}
        >
          {reaction.value}
          <span
            className={cn(
              "text-xs font-semibold text-muted-foreground",
              reaction.memberIds.includes(currentMemberId!) && "text-blue-500"
            )}
          >
            {reaction.count}
          </span>
        </button>
      ))}
      <EmojiPopover onEmojiSelect={(emoji) => onChange(emoji.native)}>
        <button className="h-6 px-3 rounded-full bg-slate-200/70 border border-transparent hover:border-slate-500 text-slate-800 flex items-center gap-x-1">
          <MdOutlineAddReaction className="size-4" />
        </button>
      </EmojiPopover>
    </div>
  );
};

export default Reactions;
