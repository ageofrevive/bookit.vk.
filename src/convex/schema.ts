import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove
    }).index("email", ["email"]), // index for the email. do not remove or modify

    experiences: defineTable({
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
    })
      .index("by_category", ["category"])
      .index("by_location", ["location"]),

    bookings: defineTable({
      experienceId: v.id("experiences"),
      userId: v.optional(v.id("users")),
      date: v.string(),
      participants: v.number(),
      totalPrice: v.number(),
      promoCode: v.optional(v.string()),
      discount: v.optional(v.number()),
      customerName: v.string(),
      customerEmail: v.string(),
      customerPhone: v.string(),
      status: v.union(v.literal("confirmed"), v.literal("cancelled"), v.literal("completed")),
      bookingReference: v.string(),
    })
      .index("by_userId", ["userId"])
      .index("by_experienceId", ["experienceId"])
      .index("by_reference", ["bookingReference"]),

    promoCodes: defineTable({
      code: v.string(),
      discount: v.number(),
      type: v.union(v.literal("percentage"), v.literal("fixed")),
      expiresAt: v.optional(v.number()),
      isActive: v.boolean(),
    }).index("by_code", ["code"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;