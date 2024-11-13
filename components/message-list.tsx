import { Id } from "@/convex/_generated/dataModel";
import { useCommunityId } from "@/hooks/use-community-id";
import { differenceInMinutes, format, isToday, isYesterday } from "date-fns";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { Loader } from "lucide-react";
import Message from "./message";

interface MessageListProps {
  communityName?: string;
  communityCreationTime?: number;
  data: any;
  loadMore: () => void;
  isLoadingMore: boolean;
  canLoadMore: boolean;
}

const formatDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
  
    return format(date, "EEEE, MMMM, d");
  };
  
  const TIME_THRESHOLD = 5;

const MessageList = ({
  communityName,
  communityCreationTime,
  loadMore,
  isLoadingMore,
  canLoadMore,
  data,
}: MessageListProps) => {
    const [editingId, setEditingId] = useState<Id<"messages"> | null>(null);
    const communityId = useCommunityId()
    const { user} = useUser()
    const currentMemberId = user?.id


  const groupedMessages = data?.reduce(
    (groups, message) => {
      const date = new Date(message?._creationTime);
      const dateKey = format(date, "yyyy-MM-dd");
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].unshift(message);
      return groups;
    },
    {} as Record<string, typeof data>
  );
    
    console.log(groupedMessages)
  return (
    <div className="flex-1 flex flex-col-reverse pb-4 overflow-y-auto messages-scrollbar">
    {Object.entries(groupedMessages || {}).map(([dateKey, messages]) => (
      <div className="" key={dateKey}>
        <div className="text-center my-2 relative">
          <hr className="absolute top-1/2 left-0 right-0  border-t border-gray-300 " />
          <span className="relative inline-block bg-white border px-4 py-1 rounded-full text-xs border-gray-300 shadow-sm">
            {formatDateLabel(dateKey)}
          </span>
        </div>
        {messages.map((message: any, index) => {
          const prevMessage = messages[index - 1];
          const isCompact =
            prevMessage &&
            prevMessage.user?._id! === message.user?._id &&
            differenceInMinutes(
              new Date(message._creationTime),
              new Date(prevMessage._creationTime)
            ) < TIME_THRESHOLD;
          return (
            <Message
              key={message._id}
              id={message._id}
              memberId={message.memberId}
              authorImage={message.userImage}
              authorName={message.userName}
              isAuthor={message.userId === currentMemberId}
              reactions={message.reactions}
              body={message.body}
              image={message.image}
              isEditing={editingId === message._id}
              setEditingId={setEditingId}
              isCompact={isCompact!}
            //   hideThreadButton={variant === "thread"}
              updatedAt={message.updatedAt}
              createdAt={message._creationTime}
              threadCount={message.threadCount}
              threadName={message.threadName}
              threadTimeStamp={message.threadTimestamp}
            />
          );
        })}
      </div>
    ))}
    <div
      className="h-1"
      ref={(el) => {
        if (el) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting && canLoadMore) {
                loadMore();
              }
            },
            { threshold: 1.0 }
          );
          observer.observe(el);
          return () => observer.disconnect();
        }
      }}
    />

    {isLoadingMore && (
      <div className="text-center my-2 relative">
        <hr className="absolute top-1/2 left-0 right-0  border-t border-gray-300 " />
        <span className="relative inline-block bg-white border px-4 py-1 rounded-full text-xs border-gray-300 shadow-sm">
          <Loader className="animate-spin size-4" />
        </span>
      </div>
    )}
  </div>
  );
};

export default MessageList;
