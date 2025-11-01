import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Check, Clock, MapPin, Star, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router";

export default function ExperienceDetails() {
  const { id } = useParams<{ id: Id<"experiences"> }>();
  const navigate = useNavigate();
  const experience = useQuery(api.experiences.getById, id ? { id: id as Id<"experiences"> } : "skip");

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="mb-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Experiences
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Image */}
            <div className="relative h-96 rounded-lg overflow-hidden border">
              <img
                src={experience.imageUrl}
                alt={experience.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title and Rating */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {experience.category}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{experience.rating}</span>
                  <span className="text-sm text-muted-foreground">({experience.reviewCount} reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-4">{experience.title}</h1>
              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{experience.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{experience.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>Max {experience.maxGroupSize} people</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <Card className="border">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-3">About this experience</h2>
                <p className="text-muted-foreground leading-relaxed">{experience.description}</p>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card className="border">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-3">Highlights</h2>
                <ul className="space-y-2">
                  {experience.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* What's Included */}
            <Card className="border">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-3">What's included</h2>
                <ul className="space-y-2">
                  {experience.included.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Meeting Point */}
            <Card className="border">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-3">Meeting point</h2>
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{experience.meetingPoint}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Booking Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-4 border shadow-lg">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold">${experience.price}</span>
                    <span className="text-muted-foreground">per person</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{experience.rating}</span>
                    <span className="text-muted-foreground">({experience.reviewCount} reviews)</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">Flexible dates</div>
                      <div className="text-xs text-muted-foreground">Choose your date at checkout</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">Group size</div>
                      <div className="text-xs text-muted-foreground">Up to {experience.maxGroupSize} participants</div>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => navigate(`/checkout/${experience._id}`)}
                >
                  Book Now
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  You won't be charged yet
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
