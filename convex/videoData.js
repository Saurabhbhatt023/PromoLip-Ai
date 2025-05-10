import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createVideoData = mutation({
  args: {
    topic: v.string(),
    script: v.any(),
  },
  handler: async (ctx, args) => {
    // Simple create without auth checks
    const videoId = await ctx.db.insert("videoData", {
      topic: args.topic,
      scriptVariant: "standard",
      script: args.script,
      assets: [],
      avatar: {},
      voice: {},
      uid: null // This would need to be set to the user ID in a real app
    });

    return videoId;
  },
});