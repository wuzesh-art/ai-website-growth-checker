import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "../components";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple pricing for AI Website Growth Checker. Start with the free growth audit.",
};

const plans = [
  {
    name: "Free plan",
    price: "$0",
    status: "Available now",
    description:
      "A simple growth audit for AI-built websites, micro SaaS products, and indie tools.",
    features: [
      "Mock growth report",
      "SEO, GEO, Reddit, content, and conversion scores",
      "Recommended fixes",
      "7-day low-cost growth plan",
      "No login or payment required",
    ],
    href: "/audit",
  },
  {
    name: "Pro plan",
    price: "Coming soon",
    status: "For founders",
    description:
      "Planned for deeper audits, saved reports, richer content briefs, and repeat tracking.",
    features: [
      "Deeper website checks",
      "More page recommendations",
      "Exportable action plans",
      "Ongoing growth checklist",
      "No release date yet",
    ],
  },
  {
    name: "Agency plan",
    price: "Coming soon",
    status: "For teams",
    description:
      "Planned for consultants and small agencies that audit multiple client websites.",
    features: [
      "Multiple client reports",
      "Reusable audit templates",
      "White-label friendly summaries",
      "Team workflow ideas",
      "No release date yet",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Start free. Upgrade paths will come later."
        description="The first version focuses on a free audit experience with no login, payment, database, or AI API dependency."
      />

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className="flex rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex w-full flex-col">
                  <div>
                    <p className="text-sm font-semibold uppercase text-emerald-700">
                      {plan.status}
                    </p>
                    <h2 className="mt-4 text-2xl font-semibold text-slate-950">
                      {plan.name}
                    </h2>
                    <p className="mt-2 text-3xl font-semibold text-slate-950">
                      {plan.price}
                    </p>
                    <p className="mt-4 min-h-20 text-sm leading-6 text-slate-600">
                      {plan.description}
                    </p>
                  </div>

                  <ul className="mt-6 grid gap-3 text-sm text-slate-700">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="rounded-md border border-slate-200 bg-slate-50 p-3"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {plan.href ? (
                    <Link
                      href={plan.href}
                      className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      Start Free Audit
                    </Link>
                  ) : (
                    <div className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md border border-slate-300 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-500">
                      Coming soon
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
