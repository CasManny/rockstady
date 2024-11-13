import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  community: defineTable({
    name: v.string(),
    userId: v.string(),
    joinCode: v.string(),
  }).index("by_community_name", ["name"]),
  members: defineTable({
    userId: v.string(),
    userImage: v.string(),
    userName: v.string(),
    communityId: v.id("community"),
    role: v.union(v.literal("admin"), v.literal("member")),
  })
    .index("by_user_id", ["userId"])
    .index("by_community_id", ["communityId"])
    .index("by_community_id_user_id", ["communityId", "userId"]),
  channels: defineTable({
    name: v.string(),
    communityId: v.id("community"),
  }).index("by_community_id", ["communityId"]),
  conversations: defineTable({
    communityId: v.id("community"),
    memberOneId: v.id("members"),
    memberTwoId: v.id("members"),
  }).index("by_community_id", ["communityId"]),
  messages: defineTable({
    body: v.string(),
    image: v.optional(v.id("_storage")),
    communityId: v.id("community"),
    parentMessageId: v.optional(v.id("messages")),
    conversationId: v.optional(v.id("conversations")),
    updatedAt: v.optional(v.number()),
    userImage: v.string(),
    userId: v.string(),
    userName: v.string(),
  })
    .index("by_community_id", ["communityId"])
    .index("by_conversation_Id", ["conversationId"])
    .index("by_community_id_parent_message_id_conversation_id", [
      "communityId",
      "parentMessageId",
      "conversationId",
    ])
    .index("by_parent_message_id", ["parentMessageId"]),
  reactions: defineTable({
    communityId: v.id("community"),
    userId: v.string(),
    messageId: v.id("messages"),
    value: v.string(),
  })
    .index("by_community_id", ["communityId"])
    .index("by_message_id", ["messageId"])
    .index("by_user_id", ["userId"]),
});

export default schema;
