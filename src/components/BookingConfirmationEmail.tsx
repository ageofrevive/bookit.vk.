import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Button,
  Hr,
  Row,
  Column,
} from '@react-email/components';

interface BookingConfirmationEmailProps {
  customerName: string;
  bookingReference: string;
  experienceTitle: string;
  experienceLocation: string;
  date: string;
  participants: number;
  totalPrice: number;
  meetingPoint: string;
}

export function BookingConfirmationEmail({
  customerName,
  bookingReference,
  experienceTitle,
  experienceLocation,
  date,
  participants,
  totalPrice,
  meetingPoint,
}: BookingConfirmationEmailProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f6f9fc', fontFamily: 'Arial, sans-serif' }}>
        <Container style={{ margin: '0 auto', padding: '20px 0 48px', maxWidth: '600px' }}>
          <Section style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '32px' }}>
            <Heading style={{ fontSize: '28px', lineHeight: '1.3', fontWeight: '700', color: '#1a1a1a', marginBottom: '24px' }}>
              🎉 Booking Confirmed!
            </Heading>
            
            <Text style={{ fontSize: '16px', lineHeight: '1.5', color: '#4a4a4a', marginBottom: '24px' }}>
              Hi {customerName},
            </Text>
            
            <Text style={{ fontSize: '16px', lineHeight: '1.5', color: '#4a4a4a', marginBottom: '24px' }}>
              Your booking has been confirmed! We're excited to have you join us for this amazing experience.
            </Text>

            <Section style={{ backgroundColor: '#f8f9fa', borderRadius: '6px', padding: '20px', marginBottom: '24px' }}>
              <Text style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', marginBottom: '8px', marginTop: '0' }}>
                BOOKING REFERENCE
              </Text>
              <Text style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: '0', letterSpacing: '1px' }}>
                {bookingReference}
              </Text>
            </Section>

            <Hr style={{ borderColor: '#e5e7eb', margin: '24px 0' }} />

            <Heading style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '16px' }}>
              Experience Details
            </Heading>

            <Row style={{ marginBottom: '12px' }}>
              <Column>
                <Text style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>Experience</Text>
                <Text style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', margin: '4px 0 0 0' }}>
                  {experienceTitle}
                </Text>
              </Column>
            </Row>

            <Row style={{ marginBottom: '12px' }}>
              <Column>
                <Text style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>Location</Text>
                <Text style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', margin: '4px 0 0 0' }}>
                  {experienceLocation}
                </Text>
              </Column>
            </Row>

            <Row style={{ marginBottom: '12px' }}>
              <Column>
                <Text style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>Date</Text>
                <Text style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', margin: '4px 0 0 0' }}>
                  {formattedDate}
                </Text>
              </Column>
            </Row>

            <Row style={{ marginBottom: '12px' }}>
              <Column>
                <Text style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>Participants</Text>
                <Text style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', margin: '4px 0 0 0' }}>
                  {participants} {participants === 1 ? 'person' : 'people'}
                </Text>
              </Column>
            </Row>

            <Row style={{ marginBottom: '12px' }}>
              <Column>
                <Text style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>Total Paid</Text>
                <Text style={{ fontSize: '20px', fontWeight: '700', color: '#10b981', margin: '4px 0 0 0' }}>
                  ${totalPrice.toFixed(2)}
                </Text>
              </Column>
            </Row>

            <Hr style={{ borderColor: '#e5e7eb', margin: '24px 0' }} />

            <Section style={{ backgroundColor: '#fef3c7', borderRadius: '6px', padding: '16px', marginBottom: '24px' }}>
              <Text style={{ fontSize: '14px', fontWeight: '600', color: '#92400e', marginTop: '0', marginBottom: '8px' }}>
                📍 Meeting Point
              </Text>
              <Text style={{ fontSize: '14px', color: '#78350f', margin: '0' }}>
                {meetingPoint}
              </Text>
              <Text style={{ fontSize: '13px', color: '#92400e', marginTop: '8px', marginBottom: '0' }}>
                Please arrive 15 minutes before the scheduled time.
              </Text>
            </Section>

            <Section style={{ backgroundColor: '#dbeafe', borderRadius: '6px', padding: '16px', marginBottom: '24px' }}>
              <Text style={{ fontSize: '14px', fontWeight: '600', color: '#1e40af', marginTop: '0', marginBottom: '8px' }}>
                ✅ Free Cancellation
              </Text>
              <Text style={{ fontSize: '13px', color: '#1e3a8a', margin: '0' }}>
                Cancel up to 24 hours before your experience for a full refund.
              </Text>
            </Section>

            <Text style={{ fontSize: '16px', lineHeight: '1.5', color: '#4a4a4a', marginBottom: '24px' }}>
              If you have any questions or need to make changes to your booking, please don't hesitate to contact us.
            </Text>

            <Text style={{ fontSize: '16px', lineHeight: '1.5', color: '#4a4a4a', marginBottom: '8px' }}>
              See you soon!
            </Text>
            <Text style={{ fontSize: '16px', lineHeight: '1.5', color: '#4a4a4a', fontWeight: '600', margin: '0' }}>
              The BookIt Team
            </Text>
          </Section>

          <Text style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center', marginTop: '24px' }}>
            This is an automated confirmation email. Please do not reply to this message.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default BookingConfirmationEmail;
