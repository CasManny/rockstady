import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { usePaginatedQuery } from "convex/react";
import { PaginationResult } from "convex/server";

const BATCH_SIZE = 20;

interface UseGetMessagesProps {
  communityId: Id<"community">;
}

export type GetMessagesReturnType = typeof api.messages.get._returnType;

export const useGetMessages = ({ communityId }: UseGetMessagesProps) => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.messages.get as any,
    { communityId },
    { initialNumItems: BATCH_SIZE }
  );

  return {
    results,
    status,
    loadMore: () => loadMore(BATCH_SIZE),
  };
};
