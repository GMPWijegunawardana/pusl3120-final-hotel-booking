import React from 'react';
import '../../styles/termsConditionsPage.css';

const TermsConditionsPage = () => {
  return (
    <div 
      className="terms-conditions-page w-full"
      style={{
        backgroundImage: 'url(images/terms/terms-bg.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="terms-hero">
        <h1>Terms & Conditions</h1>
        <p>Last Updated: January 1, 2025</p>
      </div>

      <div className="terms-container">
        <section className="terms-section">
          <h2>1. Introduction and Acceptance</h2>
          <p>
            Welcome to FinoraReach Hotel ("we," "our," or "the Hotel"). These Terms and Conditions 
            ("Terms") govern your use of our hotel services, website, and facilities. By making a 
            reservation, checking in, or using any of our services, you agree to be bound by these 
            Terms.
          </p>
          <p>
            Please read these Terms carefully before making a reservation or using our services. If 
            you do not agree with any part of these Terms, please do not use our services.
          </p>
        </section>

        <section className="terms-section">
          <h2>2. Reservations and Bookings</h2>
          <h3>2.1 Booking Process</h3>
          <ul>
            <li>All reservations are subject to availability and confirmation by the Hotel</li>
            <li>You must be at least 18 years old to make a reservation</li>
            <li>Accurate and complete information must be provided during booking</li>
            <li>A valid credit card or payment method is required to secure your reservation</li>
            <li>Confirmation will be sent via email upon successful booking</li>
          </ul>

          <h3>2.2 Rates and Payment</h3>
          <ul>
            <li>All rates are quoted in Sri Lankan Rupees (LKR) unless otherwise stated</li>
            <li>Rates are subject to change without prior notice until booking is confirmed</li>
            <li>Payment may be required in full or as a deposit at the time of booking</li>
            <li>Additional charges may apply for extra services, facilities, or amenities</li>
            <li>All applicable taxes and service charges are included in the quoted rate unless stated otherwise</li>
          </ul>

          <h3>2.3 Guarantee and Deposit</h3>
          <ul>
            <li>A valid credit card is required to guarantee your reservation</li>
            <li>The Hotel may pre-authorize your credit card for the total amount of your stay</li>
            <li>A security deposit may be required upon check-in for incidental charges</li>
            <li>The deposit will be refunded after checkout, subject to room inspection</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>3. Check-In and Check-Out</h2>
          <h3>3.1 Check-In Policy</h3>
          <ul>
            <li>Standard check-in time: 2:00 PM</li>
            <li>Early check-in is subject to availability and may incur additional charges</li>
            <li>Valid government-issued photo identification is required at check-in</li>
            <li>Credit card used for booking must be presented at check-in</li>
            <li>Guests under 18 must be accompanied by an adult</li>
          </ul>

          <h3>3.2 Check-Out Policy</h3>
          <ul>
            <li>Standard check-out time: 12:00 PM (noon)</li>
            <li>Late check-out is subject to availability and may incur additional charges</li>
            <li>Express check-out services are available</li>
            <li>All outstanding charges must be settled before departure</li>
            <li>Keys and any borrowed items must be returned at check-out</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>4. Cancellation and Modification Policy</h2>
          <h3>4.1 Standard Cancellation Policy</h3>
          <ul>
            <li>Free cancellation up to 48 hours before arrival date</li>
            <li>Cancellations within 48 hours of arrival will incur a charge of one night's rate</li>
            <li>No-shows will be charged the full reservation amount</li>
            <li>Special rates and promotional offers may have different cancellation policies</li>
            <li>Group bookings may be subject to different cancellation terms</li>
          </ul>

          <h3>4.2 Modifications</h3>
          <ul>
            <li>Reservation modifications are subject to availability</li>
            <li>Rate changes may apply when modifying dates or room type</li>
            <li>Modifications must be made at least 24 hours before check-in</li>
            <li>Contact us directly to modify your reservation</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>5. Guest Conduct and Responsibilities</h2>
          <h3>5.1 General Conduct</h3>
          <p>Guests are expected to:</p>
          <ul>
            <li>Respect other guests' right to quiet enjoyment</li>
            <li>Comply with all hotel policies and Sri Lankan laws</li>
            <li>Treat hotel property and staff with respect</li>
            <li>Not engage in illegal, disruptive, or offensive behavior</li>
            <li>Maintain acceptable standards of hygiene and conduct</li>
            <li>Not smoke in non-smoking areas</li>
          </ul>

          <h3>5.2 Liability for Damages</h3>
          <ul>
            <li>Guests are liable for any damage to hotel property</li>
            <li>Charges will be applied to your account for damages or missing items</li>
            <li>Excessive cleaning charges may apply for rooms left in unsanitary condition</li>
            <li>Lost key cards may incur a replacement fee</li>
          </ul>

          <h3>5.3 Prohibited Activities</h3>
          <ul>
            <li>Smoking in non-designated areas (penalty charges apply)</li>
            <li>Bringing pets without prior authorization</li>
            <li>Exceeding maximum room occupancy</li>
            <li>Hosting parties or events without permission</li>
            <li>Using facilities for commercial purposes</li>
            <li>Illegal activities of any kind</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>6. Hotel Services and Facilities</h2>
          <h3>6.1 Room Service</h3>
          <ul>
            <li>Room service hours and menu items are subject to availability</li>
            <li>Additional charges apply for room service orders</li>
            <li>Service charges and delivery fees may be added to your bill</li>
          </ul>

          <h3>6.2 Facilities Access</h3>
          <ul>
            <li>All facilities are available to registered guests only</li>
            <li>Some facilities may have restricted operating hours</li>
            <li>Facilities may be temporarily closed for maintenance</li>
            <li>Swimming pool and gym usage is at guest's own risk</li>
            <li>Children must be supervised by adults at all times</li>
          </ul>

          <h3>6.3 Wi-Fi and Technology</h3>
          <ul>
            <li>Complimentary Wi-Fi is provided for guest use</li>
            <li>The Hotel is not responsible for connectivity issues</li>
            <li>Guests must not use Wi-Fi for illegal activities</li>
            <li>Bandwidth-intensive activities may be restricted</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>7. Liability and Disclaimers</h2>
          <h3>7.1 Hotel Liability</h3>
          <ul>
            <li>The Hotel is not liable for loss or damage to guest belongings</li>
            <li>Valuables should be stored in in-room safes or at the front desk</li>
            <li>The Hotel is not responsible for items left behind after checkout</li>
            <li>Vehicle parking is at the owner's risk</li>
            <li>The Hotel's liability is limited to the value of the accommodation booked</li>
          </ul>

          <h3>7.2 Force Majeure</h3>
          <p>
            The Hotel is not liable for failure to perform obligations due to circumstances beyond 
            our control, including but not limited to natural disasters, civil unrest, government 
            actions, epidemics, utility failures, or acts of terrorism.
          </p>

          <h3>7.3 Personal Injury</h3>
          <ul>
            <li>Guests use hotel facilities at their own risk</li>
            <li>The Hotel is not liable for injuries resulting from misuse of facilities</li>
            <li>Medical emergencies should be reported immediately to hotel staff</li>
            <li>Guests are responsible for their own travel and health insurance</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>8. Privacy and Data Protection</h2>
          <p>
            The collection and use of your personal information is governed by our Privacy Policy. 
            By using our services, you consent to our data practices as described in the Privacy 
            Policy. We implement appropriate security measures to protect your information.
          </p>
        </section>

        <section className="terms-section">
          <h2>9. Special Requests</h2>
          <ul>
            <li>Special requests (room preferences, dietary requirements) are not guaranteed</li>
            <li>We will make reasonable efforts to accommodate requests</li>
            <li>Requests should be communicated at the time of booking</li>
            <li>Additional charges may apply for certain special arrangements</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>10. Right of Admission and Removal</h2>
          <p>
            The Hotel reserves the right to refuse service or remove any guest who:
          </p>
          <ul>
            <li>Violates these Terms and Conditions</li>
            <li>Engages in behavior that threatens safety or comfort of others</li>
            <li>Fails to pay for services or damages</li>
            <li>Provides false information during booking</li>
            <li>Is intoxicated or under the influence of illegal substances</li>
          </ul>
          <p>No refund will be provided in cases of removal for policy violations.</p>
        </section>

        <section className="terms-section">
          <h2>11. Intellectual Property</h2>
          <ul>
            <li>All content on our website is protected by copyright and trademark laws</li>
            <li>Guests may not reproduce, distribute, or use hotel materials without permission</li>
            <li>The FinoraReach name and logo are registered trademarks</li>
            <li>Unauthorized commercial photography or filming is prohibited</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>12. Changes to Terms</h2>
          <p>
            The Hotel reserves the right to modify these Terms and Conditions at any time. Updated 
            Terms will be posted on our website with a new "Last Updated" date. Continued use of 
            our services after changes constitutes acceptance of the modified Terms.
          </p>
        </section>

        <section className="terms-section">
          <h2>13. Governing Law and Disputes</h2>
          <p>
            These Terms are governed by the laws of Sri Lanka. Any disputes arising from these Terms 
            or your stay at the Hotel shall be subject to the exclusive jurisdiction of the courts 
            in Colombo, Sri Lanka.
          </p>
          <p>
            We encourage guests to contact our management team first to resolve any issues or 
            concerns before pursuing legal action.
          </p>
        </section>

        <section className="terms-section">
          <h2>14. Contact Information</h2>
          <p>
            For questions about these Terms and Conditions, please contact us:
          </p>
          <div className="contact-info">
            <p><strong>FinoraReach Hotel</strong></p>
            <p>123 Main Street, Colombo 03, Sri Lanka</p>
            <p>Email: info@finorareach@gmail.com</p>
            <p>Phone: +94 11 234 5678</p>
            <p>Reception: Available 24/7</p>
          </div>
        </section>

        <div className="terms-footer">
          <p>
            By making a reservation or using our services, you acknowledge that you have read, 
            understood, and agree to be bound by these Terms and Conditions.
          </p>
          <p className="footer-note">
            Thank you for choosing FinoraReach Hotel. We look forward to providing you with an 
            exceptional experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsPage;