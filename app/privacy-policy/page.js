import { LegalLayout } from "@/components/legal-layout";

export const metadata = {
  title: "Privacy Policy — Senator Campaign",
  description: "How the Senator Campaign Committee collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout eyebrow="Legal" title="Privacy Policy" lastUpdated="April 22, 2026">
      <p>
        The Senator Campaign Committee (the &ldquo;Committee,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates this website (the &ldquo;Website&rdquo;) and is committed to protecting the privacy of our supporters, volunteers, and visitors. This Privacy Policy describes how we collect, use, share, and safeguard information when you interact with the Website or campaign communications.
      </p>
      <p>
        By accessing or using the Website, you consent to the practices described in this Privacy Policy. If you do not agree, please refrain from using the Website.
      </p>

      <h2>1. Information We Collect</h2>
      <h3>1.1. Information You Provide</h3>
      <p>
        When you sign up to volunteer, donate, RSVP to an event, or contact the Committee, we may collect your name, email address, phone number, mailing address or ZIP code, county and region, occupation and employer (as required by the Federal Election Commission for contributions), and any messages you send us.
      </p>
      <h3>1.2. Information Collected Automatically</h3>
      <p>
        We automatically collect certain information through cookies and similar technologies, including your IP address, device identifiers, browser type, pages visited, referring site, and approximate location. This helps us improve the Website and measure the reach of our communications.
      </p>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>Process donations and comply with FEC reporting requirements.</li>
        <li>Coordinate volunteer shifts, event attendance, and on-the-ground logistics.</li>
        <li>Send campaign updates, event invitations, and fundraising appeals.</li>
        <li>Respond to your questions, media inquiries, and speaking requests.</li>
        <li>Analyze Website performance and improve user experience.</li>
        <li>Detect and prevent fraud, abuse, and violations of applicable law.</li>
      </ul>

      <h2>3. How We Share Your Information</h2>
      <p>
        We do not sell your personal information. We may share information with:
      </p>
      <ul>
        <li><strong>Service providers</strong> who operate the Website, process donations, deliver email and SMS, or assist with compliance — bound by contractual confidentiality.</li>
        <li><strong>The Federal Election Commission</strong>, as required by federal campaign-finance law. Contributor name, address, occupation, and employer for donations at or above $200 are public records.</li>
        <li><strong>Legal authorities</strong> when required by subpoena, court order, or applicable law.</li>
      </ul>

      <h2>4. SMS / Text Messaging Privacy</h2>
      <h3>What We Collect</h3>
      <p>When you opt in to receive text messages, we collect your phone number, your opt-in consent record, and your message preferences.</p>
      <h3>How Your Phone Number Is Used</h3>
      <p>Your phone number is used solely to send you the messages you have opted in to receive — shift reminders, event updates, and fundraising appeals.</p>
      <h3>No Third-Party Sharing</h3>
      <p>We do not share, sell, or rent your phone number or SMS consent data with third parties for their marketing purposes.</p>
      <h3>Data Retention</h3>
      <p>We retain SMS records for the duration of the campaign and as required by applicable law. You may request deletion at any time.</p>
      <h3>Opt-Out</h3>
      <p>Reply STOP to any campaign text message to unsubscribe. Reply HELP for help. Message frequency varies. Message and data rates may apply.</p>

      <h2>5. Your Rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct, delete, or receive a portable copy of your personal information, and to opt out of certain processing. To exercise these rights, contact us at <a href="mailto:privacy@senatorycampaign.com">privacy@senatorycampaign.com</a>.
      </p>

      <h2>6. Data Security</h2>
      <p>
        We use reasonable administrative, technical, and physical safeguards designed to protect information in our custody, including TLS-encrypted transmission and access controls. No system is perfectly secure; please use strong passwords and protect your devices.
      </p>

      <h2>7. Data Retention</h2>
      <p>
        We retain information for as long as necessary to fulfill the purposes described in this Privacy Policy, comply with legal obligations (including FEC recordkeeping), and resolve disputes.
      </p>

      <h2>8. Third-Party Links</h2>
      <p>
        The Website may link to third-party sites. We are not responsible for their privacy practices. Please review their policies before sharing information.
      </p>

      <h2>9. Children&apos;s Privacy</h2>
      <p>
        The Website is not directed to children under 16, and we do not knowingly collect personal information from children. If you believe we have collected such information, contact us and we will delete it.
      </p>

      <h2>10. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date at the top reflects the most recent revision. Continued use of the Website after changes constitutes acceptance.
      </p>

      <h2>11. Contact Information</h2>
      <p>
        Senator Campaign Committee<br />
        1200 SW Main St, Portland, OR 97205<br />
        Email: <a href="mailto:privacy@senatorycampaign.com">privacy@senatorycampaign.com</a><br />
        Phone: +1 (503) 555-0100
      </p>
    </LegalLayout>
  );
}
