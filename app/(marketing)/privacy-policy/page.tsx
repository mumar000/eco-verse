import type { Metadata } from "next";
import LegalPageTemplate from "@/components/legal/LegalPageTemplate";

export const metadata: Metadata = {
  title: "Privacy Policy | Eco Verse",
  description:
    "Learn how Eco Verse collects, uses, and protects personal information.",
};

const sections = [
  {
    id: "information-collection",
    title: "Information Collection",
    summary: "We collect only the information needed to run the website and respond to inquiries.",
    paragraphs: [
      "When you use this website, we may collect information that you provide directly, such as your name, email address, business details, project information, and any message or files you submit through our forms or outreach channels.",
      "We may also collect limited technical information automatically, including browser type, device information, pages visited, referral sources, and general usage patterns. This helps us improve performance, diagnose issues, and understand how the site is being used.",
    ],
  },
  {
    id: "data-usage",
    title: "Data Usage",
    summary: "We use your information to communicate, improve the website, and deliver requested services.",
    bullets: [
      "Respond to inquiries, proposals, and project-related requests.",
      "Provide, improve, and maintain our website, content, and services.",
      "Understand audience behavior and optimize site performance.",
      "Protect the website, our business, and users from misuse or security risks.",
      "Meet legal, regulatory, or contractual obligations when required.",
    ],
    paragraphs: [
      "We do not sell your personal information. If we use data for analytics, operations, or service delivery, we do so in connection with legitimate business purposes.",
    ],
  },
  {
    id: "cookies-policy",
    title: "Cookies Policy",
    summary: "Cookies and similar tools help us keep the site functional and understand performance.",
    paragraphs: [
      "This website may use cookies or similar technologies to remember preferences, measure traffic, and improve the browsing experience. Some cookies are necessary for basic functionality, while others support analytics or performance insights.",
      "You can manage cookies through your browser settings. Disabling some cookies may affect how parts of the website perform.",
    ],
  },
  {
    id: "third-party-services",
    title: "Third-Party Services",
    summary: "Some services we rely on may process data on our behalf.",
    paragraphs: [
      "We may use third-party tools for hosting, analytics, media delivery, form handling, scheduling, or other operational support. These providers may process information only as needed to perform their services for us.",
      "When you follow links to third-party websites or social platforms, their own privacy policies and terms apply. We are not responsible for external sites that we do not control.",
    ],
  },
  {
    id: "user-rights",
    title: "User Rights",
    summary: "You can ask to access, correct, or delete the information you have shared with us.",
    paragraphs: [
      "Depending on where you are located, you may have rights to request access to your personal data, request corrections, ask for deletion, object to certain processing, or withdraw consent where processing depends on consent.",
      "We will review reasonable privacy requests and respond in line with applicable law. To protect your information, we may need to verify your identity before acting on a request.",
    ],
  },
  {
    id: "data-retention-security",
    title: "Data Retention and Security",
    summary: "We keep information only as long as needed and apply reasonable safeguards.",
    paragraphs: [
      "We retain personal information for as long as it is necessary for the purpose it was collected, including communication, service delivery, recordkeeping, and legal compliance.",
      "We use reasonable technical and organizational measures to protect information against unauthorized access, loss, misuse, or disclosure. No website or transmission method is completely risk-free, so absolute security cannot be guaranteed.",
    ],
  },
  {
    id: "contact-information",
    title: "Contact Information",
    summary: "Questions or privacy requests can be sent through our contact channel.",
    paragraphs: [
      "If you have questions about this Privacy Policy or want to make a privacy-related request, please contact Echo Verse through the contact page on this website. We will review your message and respond as appropriate.",
      "We may update this policy from time to time. The most current version will always appear on this page with the latest effective date.",
    ],
  },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <LegalPageTemplate
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="This policy explains what information Echo Verse may collect, why we use it, and what choices you have. The goal is transparency without burying the important details."
      effectiveDate="March 31, 2026"
      breadcrumbs={{ current: "Privacy Policy" }}
      sections={sections}
    />
  );
}
