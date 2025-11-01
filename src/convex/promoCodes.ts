import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const validate = query({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    const promo = await ctx.db
      .query("promoCodes")
      .withIndex("by_code", (q) => q.eq("code", args.code.toUpperCase()))
      .first();
    
    if (!promo) {
      return { valid: false, message: "Invalid promo code" };
    }
    
    if (!promo.isActive) {
      return { valid: false, message: "This promo code is no longer active" };
    }
    
    const now = Date.now();
    if (promo.expiresAt && now > promo.expiresAt) {
      return { valid: false, message: "This promo code has expired" };
    }
    
    return {
      valid: true,
      discount: promo.discount,
      type: promo.type,
      message: `${promo.discount}${promo.type === "percentage" ? "%" : " USD"} discount applied!`,
    };
  },
});

export const create = mutation({
  args: {
    code: v.string(),
    discount: v.number(),
    type: v.union(v.literal("percentage"), v.literal("fixed")),
    expiresAt: v.optional(v.number()),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("promoCodes", {
      ...args,
      code: args.code.toUpperCase(),
    });
  },
});
