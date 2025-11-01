import { internalMutation } from "./_generated/server";

export const seed = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing data
    const experiences = await ctx.db.query("experiences").collect();
    for (const exp of experiences) {
      await ctx.db.delete(exp._id);
    }
    
    const promoCodes = await ctx.db.query("promoCodes").collect();
    for (const promo of promoCodes) {
      await ctx.db.delete(promo._id);
    }
    
    // Seed experiences
    const experiencesData = [
      {
        title: "Sunset Sailing Adventure",
        description: "Experience the magic of a sunset on the open water. This 3-hour sailing adventure takes you along the stunning coastline as the sun dips below the horizon. Perfect for couples and small groups looking for a memorable evening.",
        price: 89,
        duration: "3 hours",
        location: "San Diego, CA",
        category: "Water Sports",
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
        rating: 4.8,
        reviewCount: 124,
        highlights: ["Professional skipper", "Complimentary drinks", "Stunning sunset views", "Small group experience"],
        included: ["Safety equipment", "Beverages", "Snacks", "Photo opportunities"],
        meetingPoint: "Harbor Bay Marina, Dock 12",
        maxGroupSize: 8,
      },
      {
        title: "Mountain Hiking Expedition",
        description: "Embark on a challenging yet rewarding hike through pristine mountain trails. Led by experienced guides, you'll discover hidden waterfalls, breathtaking vistas, and diverse wildlife.",
        price: 65,
        duration: "5 hours",
        location: "Boulder, CO",
        category: "Adventure",
        imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
        rating: 4.9,
        reviewCount: 89,
        highlights: ["Expert guide", "Scenic viewpoints", "Wildlife spotting", "All skill levels welcome"],
        included: ["Hiking poles", "Trail snacks", "Water bottle", "First aid kit"],
        meetingPoint: "Mountain Base Visitor Center",
        maxGroupSize: 12,
      },
      {
        title: "Gourmet Food Tour",
        description: "Discover the culinary heart of the city with our guided food tour. Sample authentic dishes from 6 different restaurants while learning about local food culture and history.",
        price: 75,
        duration: "3.5 hours",
        location: "Portland, OR",
        category: "Food & Drink",
        imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
        rating: 4.7,
        reviewCount: 156,
        highlights: ["6 food stops", "Local guide", "Hidden gems", "Vegetarian options available"],
        included: ["All food tastings", "Drinks at each stop", "Recipe cards", "Restaurant discount vouchers"],
        meetingPoint: "City Square Fountain",
        maxGroupSize: 15,
      },
      {
        title: "Hot Air Balloon Ride",
        description: "Float peacefully above the landscape in a hot air balloon at sunrise. This unforgettable experience offers panoramic views and a champagne toast upon landing.",
        price: 199,
        duration: "4 hours",
        location: "Napa Valley, CA",
        category: "Adventure",
        imageUrl: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800",
        rating: 5.0,
        reviewCount: 203,
        highlights: ["Sunrise flight", "Champagne toast", "Flight certificate", "Experienced pilot"],
        included: ["Pre-flight breakfast", "Champagne celebration", "Digital photos", "Hotel pickup"],
        meetingPoint: "Balloon Launch Field (pickup available)",
        maxGroupSize: 6,
      },
      {
        title: "Urban Photography Workshop",
        description: "Learn professional photography techniques while exploring the city's most photogenic locations. Perfect for beginners and intermediate photographers.",
        price: 55,
        duration: "2.5 hours",
        location: "Seattle, WA",
        category: "Arts & Culture",
        imageUrl: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800",
        rating: 4.6,
        reviewCount: 78,
        highlights: ["Professional photographer", "Hands-on learning", "Iconic locations", "Photo editing tips"],
        included: ["Photography guide", "Location map", "Editing presets", "Online photo review"],
        meetingPoint: "Pike Place Market Main Entrance",
        maxGroupSize: 10,
      },
      {
        title: "Kayaking & Wildlife Tour",
        description: "Paddle through calm waters while observing seals, sea otters, and diverse bird species. An eco-friendly adventure suitable for all experience levels.",
        price: 79,
        duration: "3 hours",
        location: "Monterey, CA",
        category: "Water Sports",
        imageUrl: "https://images.unsplash.com/photo-1544551763-92bdd4b1b0ab?w=800",
        rating: 4.8,
        reviewCount: 142,
        highlights: ["Wildlife viewing", "Experienced guide", "All equipment provided", "Small groups"],
        included: ["Kayak & paddle", "Life jacket", "Dry bag", "Wildlife guide book"],
        meetingPoint: "Coastal Kayak Center",
        maxGroupSize: 8,
      },
    ];
    
    for (const exp of experiencesData) {
      await ctx.db.insert("experiences", exp);
    }
    
    // Seed promo codes
    const promoCodesData = [
      {
        code: "WELCOME20",
        discount: 20,
        type: "percentage" as const,
        isActive: true,
      },
      {
        code: "SUMMER15",
        discount: 15,
        type: "percentage" as const,
        isActive: true,
      },
      {
        code: "SAVE25",
        discount: 25,
        type: "fixed" as const,
        isActive: true,
      },
      {
        code: "FIRSTTIME",
        discount: 30,
        type: "percentage" as const,
        isActive: true,
      },
    ];
    
    for (const promo of promoCodesData) {
      await ctx.db.insert("promoCodes", promo);
    }
    
    return { success: true, message: "Data seeded successfully" };
  },
});
