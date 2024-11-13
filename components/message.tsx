import { format, isToday, isYesterday } from "date-fns";
// import { Doc, Id } from "../../convex/_generated/dataModel";
import dynamic from "next/dynamic";
// import Hint from "./hint";
import { AvatarFallback, Avatar, AvatarImage } from "./ui/avatar";
import Thumbnail from "./thumbnail";
import Toolbar from "./toolbar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Doc, Id } from "@/convex/_generated/dataModel";
import Reactions from "./reactions";
import ThreadBar from "./threadbar";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });
const Renderer = dynamic(() => import("@/components/renderer"), { ssr: false });

interface MessageProps {
  id: Id<"messages">;
  memberId: Id<"members">;
  authorImage?: string;
  authorName?: string;
  isAuthor: boolean;
  reactions: Array<
    Omit<Doc<"reactions">, "memberId"> & {
      count: number;
      memberIds: Id<"members">[];
    }
  >;
  body: Doc<"messages">["body"];
  image: string | null | undefined;
  createdAt: Doc<"messages">["_creationTime"];
  updatedAt: Doc<"messages">["updatedAt"];
  isEditing: boolean;
  isCompact?: boolean;
  setEditingId: (id: Id<"messages"> | null) => void;
  hideThreadButton?: boolean;
  threadCount?: number;
  threadImage?: string;
  threadName: string;
  threadTimeStamp?: number;
}

const formatFullTime = (date: Date) => {
  return `${isToday(date) ? "Today" : isYesterday(date) ? "Yesterday" : format(date, "MMM d, yyyy")} at ${format(date, "h:mm:ss a")}`;
};
const Message = ({
  id,
  memberId,
  authorImage,
  authorName = "Member",
  isAuthor,
  reactions,
  body,
  image,
  createdAt,
  updatedAt,
  isEditing,
  isCompact,
  setEditingId,
  hideThreadButton,
  threadCount,
  threadName,
  threadImage,
  threadTimeStamp,
}: MessageProps) => {
  const avatarFallback = authorName.charAt(0).toUpperCase();
  const isRemovingMessage = false;

  if (isCompact) {
    return (
      <>
        <div
          className={cn(
            "flex flex-col gap-5 p-1.5 px-5 hover:bg-gray-100/60 group relative",
            isEditing && "bg-[#f2c74433] hover:bg-[#f2c74433]",
            isRemovingMessage &&
              "bg-rose-500/50 transform transition-all scale-y-0 origin-bottom duration-200"
          )}
        >
          <div className="flex items-start gap-2">
            <button className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 w-[40px] leading-[22px] text-center hover:underline">
              {format(new Date(createdAt), "hh:mm")}
            </button>
            {isEditing ? (
              <div className="h-full w-full">
                <Editor
                  onSubmit={() => {}}
                  disabled={false}
                  defaultValue={JSON.parse(body)}
                  onCancel={() => setEditingId(null)}
                  variant="Update"
                />
              </div>
            ) : (
              <div className="flex flex-col w-full">
                <Renderer value={body} />
                <Thumbnail url={image} />

                {updatedAt ? (
                  <span className="text-xs text-muted-foreground">
                    (edited)
                  </span>
                ) : null}
                <Reactions data={reactions} onChange={() => {}} />
                <ThreadBar
                  count={threadCount}
                  image={threadImage}
                  threadName={threadName}
                  timestamp={threadTimeStamp}
                  onClick={() => {}}
                />
              </div>
            )}
          </div>
          {/* {!isEditing && (
            <Toolbar
              isAuthor={isAuthor}
              isPending={isPending}
              handleEdit={() => setEditingId(id)}
              handleThread={() => onOpenMessage(id)}
              handleReaction={handleReaction}
              handleDelete={handleRemove}
              hideThreadButton={hideThreadButton}
            />
          )} */}
        </div>
      </>
    );
  }
  return (
    <>
      {/* <ConfirmDialog /> */}
      <div
        className={cn(
          "flex flex-col gap-5 p-1.5 px-5 hover:bg-gray-100/60 group relative",
          isEditing && "bg-[#f2c74433] hover:bg-[#f2c74433]",
          isRemovingMessage &&
            "bg-rose-500/50 transform transition-all scale-y-0 origin-bottom duration-200"
        )}
      >
        <div className="flex items-start gap-2">
          <button onClick={() => {}}>
            <Avatar>
              <AvatarImage src={authorImage} />
              <AvatarFallback className=" bg-sky-500 text-white text-xs">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
          </button>
          {isEditing ? (
            <div className="h-full w-full">
              <Editor
                onSubmit={() => {}}
                disabled={false}
                defaultValue={JSON.parse(body)}
                onCancel={() => setEditingId(null)}
                variant="Update"
              />
            </div>
          ) : (
            <div className="flex flex-col overflow-hidden w-full">
              <div className="text-sm">
                <button
                  className="font-bold text-primary hover:underline"
                  onClick={() => {}}
                >
                  {authorName}
                </button>
                <span>&nbsp; &nbsp;</span>
                <button className="text-xs text-muted-foreground hover:underline">
                  {format(new Date(createdAt), "h:mm a")}
                </button>
              </div>
              <Renderer value={body} />
              <Thumbnail url={image} />
              {updatedAt ? (
                <span className="text-xs text-muted-foreground">(edited)</span>
              ) : null}
              <Reactions data={reactions} onChange={() => {}} />
              {/* // TODO: REPLY REAL IMAGE OF USER */}
              <ThreadBar
                count={threadCount}
                image={threadImage}
                timestamp={threadTimeStamp}
                threadName={threadName}
                onClick={() => {}}
              />
            </div>
          )}
        </div>
        {/* {!isEditing && (
          <Toolbar
            isAuthor={isAuthor}
            isPending={isPending}
            handleEdit={() => setEditingId(id)}
            handleThread={() => onOpenMessage(id)}
            handleReaction={handleReaction}
            handleDelete={handleRemove}
            hideThreadButton={hideThreadButton}
          />
        )} */}
      </div>
    </>
  );
};

export default Message;
