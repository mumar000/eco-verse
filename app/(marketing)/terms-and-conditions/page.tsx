import type { Metadata } from "next";
import LegalPageTemplate from "@/components/legal/LegalPageTemplate";

export const metadata: Metadata = {
  title: "Terms & Conditions | Eco Verse",
  description:
    "Read the terms and conditions that govern the use of the Eco Verse website and services.",
};

const sections = [
  {
    id: "user-agreement",
    title: "User Agreement",
    summary: "Your use of this website means you accept these terms.",
    paragraphs: [
      "These Terms and Conditions apply whenever you browse this website, submit an inquiry, request a service, or interact with content published by Echo Verse. By using the site, you agree to follow these terms and any applicable laws.",
      "If you do not agree with these terms, do not use the website or rely on its content for business decisions. Continued use after updates means you accept the revised version that is published here.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    summary: "Our brand assets, copy, visuals, and original work remain protected.",
    paragraphs: [
      "Unless otherwise stated, all text, branding, graphics, layouts, case studies, media, and other original materials on this site belong to Echo Verse or are used with permission. They are protected by applicable intellectual property laws.",
      "You may view, download, or print content for personal or internal reference only. You may not copy, republish, distribute, modify, sell, or reuse site content for commercial purposes without prior written permission.",
    ],
    bullets: [
      "Do not remove copyright, trademark, or ownership notices.",
      "Do not present our work, concepts, or proposals as your own.",
      "Do not use our name, logo, or visual assets in a way that implies endorsement without approval.",
    ],
  },
  {
    id: "user-responsibilities",
    title: "User Responsibilities",
    summary: "Use the website lawfully, accurately, and without disrupting others.",
    paragraphs: [
      "You agree to provide accurate information when completing forms or contacting us. You are responsible for any materials, instructions, or submissions you share through the website.",
    ],
    subsections: [
      {
        title: "Acceptable Use",
        paragraphs: [
          "You may not misuse the website, attempt unauthorized access, introduce malicious code, scrape protected areas, or interfere with the normal operation of the site.",
        ],
        bullets: [
          "Do not submit unlawful, misleading, or infringing content.",
          "Do not impersonate another person or organization.",
          "Do not use automated means to overload, probe, or exploit the website.",
        ],
      },
      {
        title: "Client Materials",
        paragraphs: [
          "If you send briefs, brand files, campaign assets, or other materials to us, you confirm that you have the right to share them and that their use will not violate third-party rights.",
        ],
      },
    ],
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    summary: "The website is provided as-is and informational content may change.",
    paragraphs: [
      "We aim to keep the website accurate, current, and useful, but we do not guarantee that every page, statement, case study, metric, or resource will always be complete, error-free, or available.",
      "Content on this site is provided for general information and brand overview purposes. It should not be treated as legal, financial, compliance, or other regulated professional advice.",
    ],
  },
  {
    id: "limitation-of-liability",
    title: "Limitations of Liability",
    summary: "Our liability for website-related use is limited to the fullest extent allowed by law.",
    paragraphs: [
      "Echo Verse will not be liable for indirect, incidental, special, consequential, or punitive damages arising from your access to or inability to use the website, including loss of data, revenue, business opportunity, or reputation.",
      "Where the law permits, our total liability relating to website use will be limited to the amount, if any, that you paid directly for access to the website itself.",
    ],
  },
  {
    id: "termination",
    title: "Termination",
    summary: "We may restrict access if the website is misused or these terms are breached.",
    paragraphs: [
      "We reserve the right to suspend, limit, or terminate access to the website or related communications if we reasonably believe a user has violated these terms, created risk for the site, or acted unlawfully.",
      "Termination or suspension does not waive any rights or remedies that may already have accrued.",
    ],
  },
  {
    id: "changes-and-contact",
    title: "Changes and Contact",
    summary: "We may update these terms and publish the latest version on this page.",
    paragraphs: [
      "We may revise these Terms and Conditions from time to time to reflect operational, legal, or service changes. The updated version becomes effective once it is posted on this page with a revised effective date.",
      "If you have questions about these terms or need clarification before working with us, please contact us through the website contact page.",
    ],
  },
] as const;

export default function TermsAndConditionsPage() {
  return (
    <LegalPageTemplate
      eyebrow="Legal"
      title="Terms & Conditions"
      intro="These terms explain the rules for using the Echo Verse website, content, and inquiry channels. They are written to be readable first and formal enough to protect both sides."
      effectiveDate="March 31, 2026"
      breadcrumbs={{ current: "Terms & Conditions" }}
      sections={sections}
    />
  );
}
