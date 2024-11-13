import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
import { Doc, Id } from "./_generated/dataModel";

const populateMember = async (ctx: QueryCtx, memberId: Id<"members">) => {
  return ctx.db.get(memberId);
};

const populateReactions = async (ctx: QueryCtx, messageId: Id<"messages">) => {
  return ctx.db
    .query("reactions")
    .withIndex("by_message_id", (q) => q.eq("messageId", messageId))
    .collect();
};

const populateThread = async (ctx: QueryCtx, messageId: Id<"messages">) => {
  const messages = await ctx.db
    .query("messages")
    .withIndex("by_parent_message_id", (q) =>
      q.eq("parentMessageId", messageId)
    )
    .collect();
  if (messages.length === 0) {
    return {
      count: 0,
      image: undefined,
      timeStamp: 0,
      name: "",
    };
  }

  const lastMessage = messages[messages.length - 1];
  if (!lastMessage) {
    return {
      count: 0,
      image: undefined,
      timeStamp: 0,
      name: "",
    };
  }

  return {
    count: messages.length,
    image: lastMessage.userName,
    timeStamp: lastMessage._creationTime,
    name: lastMessage?.userName,
  };
};

// export const get = query({
//   args: {
//     communityId: v.id("community"),
//     conversationId: v.optional(v.id("conversations")),
//     parentMessageId: v.optional(v.id("messages")),
//     paginationOpts: paginationOptsValidator,
//   },
//   handler: async (ctx, args) => {
//     let _conversation_Id = args.conversationId;
//     if (!args.conversationId && args.parentMessageId) {
//       const parentMessage = await ctx.db.get(args.parentMessageId);
//       if (!parentMessage) {
//         throw new Error("Parent message not found");
//       }
//       _conversation_Id = parentMessage.conversationId;
//     }

//     const results = await ctx.db
//       .query("messages")
//       .withIndex("by_community_id_parent_message_id_conversation_id", (q) =>
//         q
//           .eq("communityId", args.communityId)
//           .eq("parentMessageId", args.parentMessageId)
//           .eq("conversationId", _conversation_Id)
//       )
//       .order("desc")
//       .paginate(args.paginationOpts);

//     return {
//       ...results,
//       page: (
//         await Promise.all(
//           results.page.map(async (message) => {
//             const member = await populateMember(ctx, message.memberId);
//             //   const user = member ? await populateUser(ctx, member.userId) : null;
//             if (!member) {
//               return null;
//             }
//             const reactions = await populateReactions(ctx, message._id);
//             const thread = await populateThread(ctx, message._id);
//             const image = message.image
//               ? await ctx.storage.getUrl(message.image)
//               : undefined;
//             const reactionsWithCounts = reactions.map((reaction) => {
//               return {
//                 ...reaction,
//                 count: reactions.filter((r) => r.value === reaction.value)
//                   .length,
//               };
//             });
//             const deduceReactions = reactionsWithCounts.reduce(
//               (acc, reaction) => {
//                 const existingReaction = acc.find(
//                   (r) => r.value === reaction.value
//                 );
//                 if (existingReaction) {
//                   existingReaction.memberIds = Array.from(
//                     new Set([...existingReaction.memberIds, reaction.memberId])
//                   );
//                 } else {
//                   acc.push({ ...reaction, memberIds: [reaction.memberId] });
//                 }
//                 return acc;
//               },
//               [] as (Doc<"reactions"> & {
//                 count: number;
//                 memberIds: Id<"members">[];
//               })[]
//             );

//             const reactionsWithoutMemberIdProperty = deduceReactions.map(
//               ({ memberId, ...rest }) => rest
//             );

//             return {
//               ...message,
//               image,
//               member,
//               // user,
//               reactions: reactionsWithoutMemberIdProperty,
//               threadCount: thread.count,
//               threadImage: thread.image,
//               threadName: thread.name,
//               threadTimestamp: thread.timeStamp,
//             };
//           })
//         )
//       ).filter((message) => message !== null),
//     };
//   },
// });

export const create = mutation({
  args: {
    body: v.string(),
    image: v.optional(v.id("_storage")),
    userImage: v.string(),
    userId: v.string(),
    userName: v.string(),
    communityId: v.id("community"),
    conversationId: v.optional(v.id("conversations")),
    parentMessageId: v.optional(v.id("messages")),
  },
  handler: async (ctx, args) => {
    let _conversation_Id = args.conversationId;
    // only possible if we are replying in a thread in 1:1 conversation
    if (!args.conversationId && args.parentMessageId) {
      const parentMessage = await ctx.db.get(args.parentMessageId);
      if (!parentMessage) {
        throw new Error("Parent message not found");
      }
      _conversation_Id = parentMessage.conversationId;
    }
    const messageId = await ctx.db.insert("messages", {
      userName: args.userName,
      userId: args.userId,
      userImage: args.userImage,
      body: args.body,
      image: args.image,
      conversationId: _conversation_Id,
      communityId: args.communityId,
      parentMessageId: args.parentMessageId,
    });

    return messageId;
  },
});

export const get = query({
  args: {
    paginationOpts: paginationOptsValidator,
    communityId: v.id("community"),
  },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query("messages")
      .withIndex("by_community_id", (q) =>
        q.eq("communityId", args.communityId)
      )
      .order("desc")
      .paginate(args.paginationOpts);

    return {
      ...results,
      page: (
        await Promise.all(
          results.page.map(async (message) => {
            const reactions = await populateReactions(ctx, message._id);
            const thread = await populateThread(ctx, message._id);
            const image = message.image
              ? await ctx.storage.getUrl(message.image)
              : undefined;
            const reactionsWithCounts = reactions.map((reaction) => {
              return {
                ...reaction,
                count: reactions.filter((r) => r.value === reaction.value)
                  .length,
              };
            });
            const deduceReactions = reactionsWithCounts.reduce(
              (acc, reaction) => {
                const existingReaction = acc.find(
                  (r) => r.value === reaction.value
                );
                if (existingReaction) {
                  existingReaction.userIds = Array.from(
                    new Set([...existingReaction.userIds, reaction.userId])
                  );
                } else {
                  acc.push({ ...reaction, userIds: [reaction.userId] });
                }
                return acc;
              },
              [] as (Doc<"reactions"> & {
                count: number;
                userIds: string[];
              })[]
            );

            const reactionsWithoutMemberIdProperty = deduceReactions.map(
              ({ userId, ...rest }) => rest
            );

            return {
              ...message,
              image,
              reactions: reactionsWithoutMemberIdProperty,
              threadCount: thread.count,
              threadImage: thread.image,
              threadName: thread.name,
              threadTimestamp: thread.timeStamp,
            };
          })
        )
      ).filter((message) => message !== null),
    };
  },
});
