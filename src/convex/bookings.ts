import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";
import { internal } from "./_generated/api";

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
    
    const bookingId = await ctx.db.insert("bookings", {
      ...args,
      userId: user?._id,
      status: "confirmed" as const,
      bookingReference: `BK${Date.now().toString().slice(-8)}`,
    });

    // Get the booking and experience details for the email
    const booking = await ctx.db.get(bookingId);
    const experience = await ctx.db.get(args.experienceId);

    if (booking && experience) {
      // Schedule email to be sent (non-blocking, will fail gracefully if API key not set)
      try {
        await ctx.scheduler.runAfter(
          0,
          internal.emails.sendBookingConfirmation,
          {
            customerEmail: args.customerEmail,
            customerName: args.customerName,
            bookingReference: booking.bookingReference,
            experienceTitle: experience.title,
            experienceLocation: experience.location,
            date: args.date,
            participants: args.participants,
            totalPrice: args.totalPrice,
            meetingPoint: experience.meetingPoint,
          }
        );
      } catch (error) {
        console.error("Failed to schedule email:", error);
        // Continue with booking even if email scheduling fails
      }
    }

    return bookingId;
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