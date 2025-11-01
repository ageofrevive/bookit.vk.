import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle, Mail, MapPin, Phone, User, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router";

export default function Result() {
  const { id } = useParams<{ id: Id<"bookings"> }>();
  const navigate = useNavigate();
  const booking = useQuery(api.bookings.getById, id ? { id: id as Id<"bookings"> } : "skip");
  const experience = useQuery(
    api.experiences.getById,
    booking ? { id: booking.experienceId } : "skip"
  );

  if (!booking || !experience) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full mb-4"
          >
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </motion.div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">
            Your booking reference: <span className="font-mono font-semibold">{booking.bookingReference}</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Experience Details */}
          <Card className="border shadow-lg">
            <CardHeader>
              <CardTitle>Experience details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <img
                  src={experience.imageUrl}
                  alt={experience.title}
                  className="w-32 h-32 object-cover rounded-lg border"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">{experience.title}</h2>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{experience.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(booking.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{booking.participants} {booking.participants === 1 ? "participant" : "participants"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Meeting point</p>
                    <p className="text-muted-foreground">{experience.meetingPoint}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card className="border shadow-lg">
            <CardHeader>
              <CardTitle>Your information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <span>{booking.customerName}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>{booking.customerEmail}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>{booking.customerPhone}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card className="border shadow-lg">
            <CardHeader>
              <CardTitle>Payment summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${(booking.totalPrice + (booking.discount || 0)).toFixed(2)}</span>
              </div>
              {booking.discount && booking.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount {booking.promoCode && `(${booking.promoCode})`}</span>
                  <span>-${booking.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total paid</span>
                <span>${booking.totalPrice.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Confirmation Message */}
          <Card className="border bg-muted/50">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                A confirmation email has been sent to <span className="font-semibold">{booking.customerEmail}</span> with all the details of your booking. Please arrive at the meeting point 15 minutes before the scheduled time.
              </p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => navigate("/")} className="flex-1">
              Browse More Experiences
            </Button>
            <Button variant="outline" onClick={() => window.print()} className="flex-1">
              Print Confirmation
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
