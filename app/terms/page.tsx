import type { Metadata } from "next";
import { Container, PageHeader } from "../components";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for AI Website Growth Checker.",
};

const sections = [
  {
    title: "Use of the service",
    text: "AI Website Growth Checker provides a free growth audit for public websites and basic business context. You may use it to explore SEO, GEO, Reddit, content, and conversion ideas for your own website or a website you are authorized to review.",
  },
  {
    title: "No sensitive submissions",
    text: "Do not submit passwords, private keys, customer records, unpublished financial information, confidential documents, or any other sensitive data. The tool is intended for public website information only.",
  },
  {
    title: "Automated public checks",
    text: "The current report uses automated public website checks and simple scoring rules. It does not use a database, AI API, or manual expert review. Scores and recommendations are for planning and educational purposes, not guaranteed business results.",
  },
  {
    title: "No professional advice",
    text: "The website may discuss growth, marketing, SEO, and content ideas. This information is general guidance and should not be treated as legal, financial, tax, or professional consulting advice.",
  },
  {
    title: "Availability",
    text: "The service may change, pause, or stop at any time. Future paid plans, account features, or agency features are not guaranteed until they are released.",
  },
  {
    title: "Contact",
    text: "If you operate this website, add your legal contact information here before publishing these terms publicly.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Terms"
        title="Terms of Use"
        description="Last updated: May 10, 2026. These starter terms cover the lightweight first version of the product."
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
