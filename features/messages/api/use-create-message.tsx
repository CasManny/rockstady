import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useCallback, useMemo, useState } from "react";

type RequestType = {
  body: string;
  image?: Id<"_storage">;
    communityId: Id<"community">;
    parentMessageId?: Id<'messages'>,
    conversationalId?: Id<'conversations'>,
    userName: string;
    userId: string;
    userImage: string
};
type ResponseType = Id<"messages"> | null;

type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useCreateMessage = () => {
  const [status, setStatus] = useState<
    "success" | "error" | "settled" | "pending" | null
  >(null);
  const [data, setData] = useState<ResponseType>(null);
  const [error, setError] = useState<Error | null>(null);

  const isPending = useMemo(() => status === "pending", [status]);
  const isSuccess = useMemo(() => status === "success", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);

  const mutation = useMutation(api.messages.create);
  const mutate = useCallback(
    async (values: RequestType, Options?: Options) => {
      try {
        setData(null);
        setError(null);
        setStatus("pending");
        const response = await mutation(values);
        Options?.onSuccess?.(response);
        return response;
      } catch (error) {
        setStatus("error");
        Options?.onError?.(error as Error);
        if (Options?.throwError) {
          throw Error;
        }
      } finally {
        setStatus("settled");
        Options?.onSettled?.();
      }
    },
    [mutation]
  );

  return { mutate, error, isPending, isSettled, data, isSuccess, isError };
};
