"use client";
import MessageList from "@/components/message-list";
import ChatInput from "./chat-input";
import { useGetMessages } from "@/features/messages/api/use-get-messages";
import { useCommunityId } from "@/hooks/use-community-id";
import { useGetCommunityById } from "@/features/community/api/use-get-community-by-id";
import { TriangleAlert } from "lucide-react";
import AnimateLogo from "@/components/home/AnimateLogo";
const CommunityId = () => {
  const communityId = useCommunityId();
  const { results, status, loadMore } = useGetMessages({ communityId });
  const { data: community, isLoading } = useGetCommunityById({
    id: communityId,
  });

  if (isLoading || status === "LoadingFirstPage") {
    return (
      <div className="flex h-full justify-center items-center flex-1">
        <AnimateLogo />
      </div>
    );
  }

  if (!community) {
    return (
      <div className="flex h-full flex-col gap-y-2 justify-center items-center flex-1">
        <TriangleAlert className="text-muted-foreground  size-6" />
        <span className="text-sm text-muted-foreground">
          Commnunity not found
        </span>
      </div>
    );
  }
  return (
    <div className="h-full flex-col flex">
      <MessageList
        communityName={community.name}
        communityCreationTime={community._creationTime}
        data={results}
        loadMore={loadMore}
        isLoadingMore={status === "LoadingMore"}
        canLoadMore={status === "CanLoadMore"}
      />
      <ChatInput placeholder="Start chatting..." />
    </div>
  );
};

export default CommunityId;
