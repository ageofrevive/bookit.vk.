import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("experiences").collect();
  },
});

export const getById = query({
  args: { id: v.id("experiences") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    price: v.number(),
    duration: v.string(),
    location: v.string(),
    category: v.string(),
    imageUrl: v.string(),
    rating: v.number(),
    reviewCount: v.number(),
    highlights: v.array(v.string()),
    included: v.array(v.string()),
    meetingPoint: v.string(),
    maxGroupSize: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("experiences", args);
  },
});
