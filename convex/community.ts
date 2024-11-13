import { v } from "convex/values";
import { query } from "./_generated/server";

export const getCommunityByName = query({
  args: { communityName: v.string() },
  handler: async (ctx, args) => {
    const community = await ctx.db
      .query("community")
      .withIndex("by_community_name", (q) => q.eq("name", args.communityName))
      .collect();
    if (!community) return null;
    return community;
  },
});

export const getAllUserCommunity = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const member = await ctx.db
      .query("members")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .collect();

    const communityIds = member.map((value) => value.communityId);

    if (!communityIds) {
      return null;
    }

    const communities = [];

    for (const communityId of communityIds) {
      const community = await ctx.db.get(communityId);
      communities.push(community);
    }

    return communities;
  },
});

export const get = query({
  args: { id: v.id("community") },
  handler: async (ctx, args) => {
    const community = await ctx.db.get(args.id);
    return community;
  },
});
