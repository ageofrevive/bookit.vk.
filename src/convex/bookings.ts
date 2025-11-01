import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";

export const create = mutation({
  args: {
    experienceId: v.id("experiences"),
    date: v.string(),
    participants: v.number(),
    totalPrice: v.number(),
    promoCode: v.optional(v.string()),
    discount: v.optional(v.number()),
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    
    return await ctx.db.insert("bookings", {
      ...args,
      userId: user?._id,
      status: "confirmed" as const,
      bookingReference: `BK${Date.now().toString().slice(-8)}`,
    });
  },
});

export const getById = query({
  args: { id: v.id("bookings") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const listUserBookings = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];
    
    return await ctx.db
      .query("bookings")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();
  },
});
