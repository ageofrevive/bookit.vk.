"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { Resend } from "resend";
import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
} from "@react-email/components";

function BookingConfirmationEmail({
  customerName,
  bookingReference,
  experienceTitle,
  experienceLocation,
  date,
  participants,
  totalPrice,
  meetingPoint,
}: {
  customerName: string;
  bookingReference: string;
  experienceTitle: string;
  experienceLocation: string;
  date: string;
  participants: number;
  totalPrice: number;
  meetingPoint: string;
}) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return React.createElement(
    Html,
    null,
    React.createElement(Head, null),
    React.createElement(
      Body,
      { style: { backgroundColor: '#f6f9fc', fontFamily: 'Arial, sans-serif' } },
      React.createElement(
        Container,
        { style: { margin: '0 auto', padding: '20px 0 48px', maxWidth: '600px' } },
        React.createElement(
          Section,
          { style: { backgroundColor: '#ffffff', borderRadius: '8px', padding: '32px' } },
          React.createElement(
            Heading,
            { style: { fontSize: '28px', lineHeight: '1.3', fontWeight: '700', color: '#1a1a1a', marginBottom: '24px' } },
            '🎉 Booking Confirmed!'
          ),
          React.createElement(
            Text,
            { style: { fontSize: '16px', lineHeight: '1.5', color: '#4a4a4a', marginBottom: '24px' } },
            `Hi ${customerName},`
          ),
          React.createElement(
            Text,
            { style: { fontSize: '16px', lineHeight: '1.5', color: '#4a4a4a', marginBottom: '24px' } },
            "Your booking has been confirmed! We're excited to have you join us for this amazing experience."
          ),
          React.createElement(
            Section,
            { style: { backgroundColor: '#f8f9fa', borderRadius: '6px', padding: '20px', marginBottom: '24px' } },
            React.createElement(
              Text,
              { style: { fontSize: '14px', fontWeight: '600', color: '#6b7280', marginBottom: '8px', marginTop: '0' } },
              'BOOKING REFERENCE'
            ),
            React.createElement(
              Text,
              { style: { fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: '0', letterSpacing: '1px' } },
              bookingReference
            )
          ),
          React.createElement(Hr, { style: { borderColor: '#e5e7eb', margin: '24px 0' } }),
          React.createElement(
            Heading,
            { style: { fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '16px' } },
            'Experience Details'
          ),
          React.createElement(
            'div',
            { style: { marginBottom: '12px' } },
            React.createElement(
              'div',
              null,
              React.createElement(
                Text,
                { style: { fontSize: '14px', color: '#6b7280', margin: '0' } },
                'Experience'
              ),
              React.createElement(
                Text,
                { style: { fontSize: '16px', fontWeight: '600', color: '#1a1a1a', margin: '4px 0 0 0' } },
                experienceTitle
              )
            )
          ),
          React.createElement(
            'div',
            { style: { marginBottom: '12px' } },
            React.createElement(
              'div',
              null,
              React.createElement(
                Text,
                { style: { fontSize: '14px', color: '#6b7280', margin: '0' } },
                'Location'
              ),
              React.createElement(
                Text,
                { style: { fontSize: '16px', fontWeight: '600', color: '#1a1a1a', margin: '4px 0 0 0' } },
                experienceLocation
              )
            )
          ),
          React.createElement(
            'div',
            { style: { marginBottom: '12px' } },
            React.createElement(
              'div',
              null,
              React.createElement(
                Text,
                { style: { fontSize: '14px', color: '#6b7280', margin: '0' } },
                'Date'
              ),
              React.createElement(
                Text,
                { style: { fontSize: '16px', fontWeight: '600', color: '#1a1a1a', margin: '4px 0 0 0' } },
                formattedDate
              )
            )
          ),
          React.createElement(
            'div',
            { style: { marginBottom: '12px' } },
            React.createElement(
              'div',
              null,
              React.createElement(
                Text,
                { style: { fontSize: '14px', color: '#6b7280', margin: '0' } },
                'Participants'
              ),
              React.createElement(
                Text,
                { style: { fontSize: '16px', fontWeight: '600', color: '#1a1a1a', margin: '4px 0 0 0' } },
                `${participants} ${participants === 1 ? 'person' : 'people'}`
              )
            )
          ),
          React.createElement(
            'div',
            { style: { marginBottom: '12px' } },
            React.createElement(
              'div',
              null,
              React.createElement(
                Text,
                { style: { fontSize: '14px', color: '#6b7280', margin: '0' } },
                'Total Paid'
              ),
              React.createElement(
                Text,
                { style: { fontSize: '20px', fontWeight: '700', color: '#10b981', margin: '4px 0 0 0' } },
                `${totalPrice.toFixed(2)}`
              )
            )
          ),
          React.createElement(Hr, { style: { borderColor: '#e5e7eb', margin: '24px 0' } }),
          React.createElement(
            Section,
            { style: { backgroundColor: '#fef3c7', borderRadius: '6px', padding: '16px', marginBottom: '24px' } },
            React.createElement(
              Text,
              { style: { fontSize: '14px', fontWeight: '600', color: '#92400e', marginTop: '0', marginBottom: '8px' } },
              '📍 Meeting Point'
            ),
            React.createElement(
              Text,
              { style: { fontSize: '14px', color: '#78350f', margin: '0' } },
              meetingPoint
            ),
            React.createElement(
              Text,
              { style: { fontSize: '13px', color: '#92400e', marginTop: '8px', marginBottom: '0' } },
              'Please arrive 15 minutes before the scheduled time.'
            )
          ),
          React.createElement(
            Section,
            { style: { backgroundColor: '#dbeafe', borderRadius: '6px', padding: '16px', marginBottom: '24px' } },
            React.createElement(
              Text,
              { style: { fontSize: '14px', fontWeight: '600', color: '#1e40af', marginTop: '0', marginBottom: '8px' } },
              '✅ Free Cancellation'
            ),
            React.createElement(
              Text,
              { style: { fontSize: '13px', color: '#1e3a8a', margin: '0' } },
              'Cancel up to 24 hours before your experience for a full refund.'
            )
          ),
          React.createElement(
            Text,
            { style: { fontSize: '16px', lineHeight: '1.5', color: '#4a4a4a', marginBottom: '24px' } },
            "If you have any questions or need to make changes to your booking, please don't hesitate to contact us."
          ),
          React.createElement(
            Text,
            { style: { fontSize: '16px', lineHeight: '1.5', color: '#4a4a4a', marginBottom: '8px' } },
            'See you soon!'
          ),
          React.createElement(
            Text,
            { style: { fontSize: '16px', lineHeight: '1.5', color: '#4a4a4a', fontWeight: '600', margin: '0' } },
            'The BookIt Team'
          )
        ),
        React.createElement(
          Text,
          { style: { fontSize: '12px', color: '#9ca3af', textAlign: 'center', marginTop: '24px' } },
          'This is an automated confirmation email. Please do not reply to this message.'
        )
      )
    )
  );
}

export const sendBookingConfirmation = internalAction({
  args: {
    customerEmail: v.string(),
    customerName: v.string(),
    bookingReference: v.string(),
    experienceTitle: v.string(),
    experienceLocation: v.string(),
    date: v.string(),
    participants: v.number(),
    totalPrice: v.number(),
    meetingPoint: v.string(),
  },
  handler: async (ctx, args) => {
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not set in environment variables");
      return { success: false, error: "Email service not configured" };
    }

    const resend = new Resend(resendApiKey);

    try {
      const { data, error } = await resend.emails.send({
        from: "BookIt <onboarding@resend.dev>",
        to: [args.customerEmail],
        subject: `Booking Confirmed - ${args.bookingReference}`,
        react: BookingConfirmationEmail({
          customerName: args.customerName,
          bookingReference: args.bookingReference,
          experienceTitle: args.experienceTitle,
          experienceLocation: args.experienceLocation,
          date: args.date,
          participants: args.participants,
          totalPrice: args.totalPrice,
          meetingPoint: args.meetingPoint,
        }),
      });

      if (error) {
        console.error("Failed to send email:", error);
        return { success: false, error: error.message };
      }

      console.log("Email sent successfully:", data);
      return { success: true, data };
    } catch (error) {
      console.error("Email sending error:", error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      };
    }
  },
});
