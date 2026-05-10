import type { Metadata } from "next";
import { Container, PageHeader } from "../components";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for AI Website Growth Checker.",
};

const sections = [
  {
    title: "Information you provide",
    text: "The audit form asks for a website URL, website type, target audience, and optional competitor names. Do not submit passwords, private keys, customer data, confidential documents, or other sensitive information.",
  },
  {
    title: "How the information is used",
    text: "The current version uses the submitted details to run public website checks and generate a browser-visible report. It is designed to analyze public website information and basic business context, not private accounts or protected systems.",
  },
  {
    title: "No account or payment data",
    text: "AI Website Growth Checker does not ask users to create an account, enter a password, or provide payment details in this first version.",
  },
  {
    title: "Storage and query parameters",
    text: "This first version does not include a database. Submitted form values are passed to the report page through URL query parameters, which may appear in your browser history or basic hosting logs.",
  },
  {
    title: "Third-party services",
    text: "The first version does not connect to an AI API, payment provider, email service, or analytics database. It uses server-side requests to access the public website URL and common public files such as robots.txt, sitemap.xml, and llms.txt.",
  },
  {
    title: "Contact",
    text: "If you operate this website, add your contact email here before publishing the policy publicly.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="Privacy Policy"
        description="Last updated: May 10, 2026. This starter policy explains how the first version handles submitted audit information."
      />

      <section className="py-12 sm:py-16">
        <Container className="max-w-4xl">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="space-y-8">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-xl font-semibold text-slate-950">
                    {section.title}
                  </h2>
                  <p className="mt-3 text-base leading-8 text-slate-600">
                    {section.text}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
