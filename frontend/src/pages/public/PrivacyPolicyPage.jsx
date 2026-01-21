import React from 'react';
import '../../styles/privacyPolicyPage.css';

const PrivacyPolicyPage = () => {
  return (
    <div 
      className="privacy-policy-page w-full"
      style={{
        backgroundImage: 'url(/images/privacy/privacy-bg.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="policy-hero">
        <h1>Privacy Policy</h1>
        <p>Last Updated: January 1, 2025</p>
      </div>

      <div className="policy-container">
        <section className="policy-section">
          <h2>1. Introduction</h2>
          <p>
            Welcome to FinoraReach Hotel. We are committed to protecting your privacy and ensuring 
            the security of your personal information. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you visit our hotel, use our website, 
            or engage with our services.
          </p>
          <p>
            By using our services, you agree to the collection and use of information in accordance 
            with this policy. If you do not agree with our policies and practices, please do not use 
            our services.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. Information We Collect</h2>
          <h3>2.1 Personal Information</h3>
          <p>We may collect the following types of personal information:</p>
          <ul>
            <li>Full name and contact details (email address, phone number, mailing address)</li>
            <li>Payment information (credit card details, billing address)</li>
            <li>Government-issued identification (passport, driver's license for check-in purposes)</li>
            <li>Date of birth and nationality</li>
            <li>Special requests and preferences (dietary requirements, room preferences)</li>
            <li>Reservation and booking history</li>
          </ul>

          <h3>2.2 Automatically Collected Information</h3>
          <p>When you visit our website, we automatically collect:</p>
          <ul>
            <li>IP address and browser type</li>
            <li>Device information and operating system</li>
            <li>Pages visited and time spent on our website</li>
            <li>Referring website addresses</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>3. How We Use Your Information</h2>
          <p>We use the collected information for the following purposes:</p>
          <ul>
            <li>Processing and managing your reservations and bookings</li>
            <li>Providing hotel services and fulfilling your requests</li>
            <li>Processing payments and preventing fraudulent transactions</li>
            <li>Communicating with you about your reservation and our services</li>
            <li>Sending promotional offers and marketing communications (with your consent)</li>
            <li>Improving our services and customer experience</li>
            <li>Complying with legal obligations and regulations</li>
            <li>Maintaining security and safety of our guests and property</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>4. Information Sharing and Disclosure</h2>
          <p>We do not sell your personal information. We may share your information with:</p>
          <ul>
            <li><strong>Service Providers:</strong> Third-party companies that help us operate our business 
            (payment processors, booking platforms, IT service providers)</li>
            <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulations</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your 
            personal information against unauthorized access, alteration, disclosure, or destruction. 
            These measures include:
          </p>
          <ul>
            <li>Encryption of sensitive data during transmission</li>
            <li>Secure servers and firewalls</li>
            <li>Regular security assessments and updates</li>
            <li>Limited access to personal information by authorized personnel only</li>
            <li>Staff training on data protection and privacy</li>
          </ul>
          <p>
            However, no method of transmission over the internet or electronic storage is 100% secure. 
            While we strive to protect your information, we cannot guarantee its absolute security.
          </p>
        </section>

        <section className="policy-section">
          <h2>6. Your Rights and Choices</h2>
          <p>You have the following rights regarding your personal information:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
            <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
            <li><strong>Data Portability:</strong> Request transfer of your data to another service provider</li>
            <li><strong>Object:</strong> Object to processing of your personal information for certain purposes</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at privacy@finorareach.com or 
            call +94 11 234 5678.
          </p>
        </section>

        <section className="policy-section">
          <h2>7. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your experience on our website. 
            Cookies are small data files stored on your device that help us remember your preferences 
            and understand how you use our website.
          </p>
          <p>Types of cookies we use:</p>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for website functionality</li>
            <li><strong>Performance Cookies:</strong> Help us understand how visitors use our website</li>
            <li><strong>Functional Cookies:</strong> Remember your preferences and choices</li>
            <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
          </ul>
          <p>
            You can control cookies through your browser settings. However, disabling cookies may 
            affect your ability to use certain features of our website.
          </p>
        </section>

        <section className="policy-section">
          <h2>8. Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 18. We do not knowingly 
            collect personal information from children. If you are a parent or guardian and believe 
            your child has provided us with personal information, please contact us immediately, and 
            we will take steps to remove such information.
          </p>
        </section>

        <section className="policy-section">
          <h2>9. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your country 
            of residence. These countries may have different data protection laws. When we transfer 
            your information internationally, we ensure appropriate safeguards are in place to protect 
            your data.
          </p>
        </section>

        <section className="policy-section">
          <h2>10. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to fulfill the purposes 
            outlined in this Privacy Policy, unless a longer retention period is required by law. 
            Factors we consider when determining retention periods include:
          </p>
          <ul>
            <li>The nature of our relationship with you</li>
            <li>Legal and regulatory requirements</li>
            <li>Potential legal claims or disputes</li>
            <li>Business and operational needs</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>11. Updates to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices 
            or legal requirements. We will notify you of any material changes by posting the updated 
            policy on our website with a new "Last Updated" date. We encourage you to review this 
            policy periodically.
          </p>
        </section>

        <section className="policy-section">
          <h2>12. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our 
            data practices, please contact us:
          </p>
          <div className="contact-info">
            <p><strong>FinoraReach Hotel</strong></p>
            <p>123 Main Street, Colombo 03, Sri Lanka</p>
            <p>Email: info@finorareach@gmail.com</p>
            <p>Phone: +94 11 234 5678</p>
            <p>Data Protection Officer: dpo@finorareach.com</p>
          </div>
        </section>

        <div className="policy-footer">
          <p>
            By continuing to use our services, you acknowledge that you have read and understood 
            this Privacy Policy and agree to its terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;