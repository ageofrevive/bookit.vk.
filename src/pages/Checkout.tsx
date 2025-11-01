import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery } from "convex/react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Check, Loader2, Tag } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export default function Checkout() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [participants, setParticipants] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const experience = useQuery(
    api.experiences.getById, 
    id && id !== ":id" && !id.startsWith(':') ? { id: id as Id<"experiences"> } : "skip"
  );
  const validatePromo = useQuery(api.promoCodes.validate, promoCode ? { code: promoCode } : "skip");
  const createBooking = useMutation(api.bookings.create);

  if (!id || id === ":id" || id.startsWith(':')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Invalid experience ID</p>
          <Button onClick={() => navigate("/")}>Return to Home</Button>
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
      </div>
    );
  }

  const subtotal: number = experience.price * participants;
  let discount: number = 0;
  
  if (promoApplied && validatePromo?.valid && validatePromo.discount !== undefined) {
    if (validatePromo.type === "percentage") {
      discount = (subtotal * validatePromo.discount) / 100;
    } else {
      discount = validatePromo.discount;
    }
  }
  
  const total: number = Math.max(0, subtotal - discount);

  const handleApplyPromo = () => {
    if (validatePromo?.valid) {
      setPromoApplied(true);
      toast.success(validatePromo.message);
    } else if (validatePromo) {
      toast.error(validatePromo.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !customerName || !customerEmail || !customerPhone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const bookingId = await createBooking({
        experienceId: experience._id,
        date,
        participants,
        totalPrice: total,
        promoCode: promoApplied ? promoCode : undefined,
        discount: promoApplied ? discount : undefined,
        customerName,
        customerEmail,
        customerPhone,
      });
      
      toast.success("Booking confirmed!");
      navigate(`/result/${bookingId}`);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to create booking. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <Button variant="ghost" onClick={() => navigate(`/experience/${experience._id}`)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Experience
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold tracking-tight mb-8">Complete your booking</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date and Participants */}
                <Card className="border">
                  <CardHeader>
                    <CardTitle>Booking details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="date">Select date *</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="date"
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          className="pl-9"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="participants">Number of participants *</Label>
                      <Input
                        id="participants"
                        type="number"
                        min={1}
                        max={experience.maxGroupSize}
                        value={participants}
                        onChange={(e) => setParticipants(parseInt(e.target.value) || 1)}
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Maximum {experience.maxGroupSize} participants
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Customer Information */}
                <Card className="border">
                  <CardHeader>
                    <CardTitle>Your information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full name *</Label>
                      <Input
                        id="name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Promo Code */}
                <Card className="border">
                  <CardHeader>
                    <CardTitle>Promo code</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          value={promoCode}
                          onChange={(e) => {
                            setPromoCode(e.target.value.toUpperCase());
                            setPromoApplied(false);
                          }}
                          placeholder="Enter promo code"
                          className="pl-9"
                          disabled={promoApplied}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleApplyPromo}
                        disabled={!promoCode || promoApplied}
                      >
                        {promoApplied ? <Check className="h-4 w-4" /> : "Apply"}
                      </Button>
                    </div>
                    {promoApplied && validatePromo?.valid && (
                      <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                        <Check className="h-4 w-4" />
                        {validatePromo.message}
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4 border shadow-lg">
                <CardHeader>
                  <CardTitle>Order summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <img
                      src={experience.imageUrl}
                      alt={experience.title}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm line-clamp-2">{experience.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{experience.location}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        ${experience.price} × {participants} {participants === 1 ? "person" : "people"}
                      </span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    {promoApplied && discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount ({promoCode})</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-lg">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-3 rounded-lg text-xs text-muted-foreground">
                    <p className="font-medium mb-1">Free cancellation</p>
                    <p>Cancel up to 24 hours before your experience for a full refund</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}