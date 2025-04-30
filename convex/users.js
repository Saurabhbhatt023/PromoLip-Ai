import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateNewUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db.query("users")
      .filter(q => q.eq(q.field("email"), args.email))
      .collect();

    if (existingUser.length === 0) {
      const newUser = {
        name: args.name,
        email: args.email,
        picture: args.picture,
        credits: 30,
      };

      const insertedId = await ctx.db.insert("users", newUser);
      console.log("New user inserted with ID:", insertedId);

      return {
        ...newUser,
        _id: insertedId,
      };
    }

    return existingUser[0]; // Return the existing user
  }
});