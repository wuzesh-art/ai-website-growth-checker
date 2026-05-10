import type { Metadata } from "next";
import { Container, PageHeader, PrimaryLink } from "../components";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn why AI Website Growth Checker exists and who it helps.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Helping AI-built websites find low-cost growth paths"
        description="AI Website Growth Checker is for founders who can now build quickly, but still need a practical way to understand traffic, content, distribution, and conversion gaps."
      />

      <section className="py-12 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-950">
              Why this tool exists
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-slate-600">
              <p>
                AI coding tools have made it much easier to launch a website,
                landing page, prototype, or micro SaaS product. The hard part
                often arrives after launch: no traffic, unclear positioning,
                thin pages, and no reliable distribution routine.
              </p>
              <p>
                This tool gives non-technical founders, product managers,
                indie hackers, AI tool builders, and small website owners a
                simple growth audit they can understand without hiring a
                specialist first.
              </p>
              <p>
                The first version is intentionally lightweight. It focuses on
                simulated guidance across SEO, GEO, Reddit, content gaps, and
                conversion basics so the product can validate the workflow
                before adding live crawling or AI analysis.
              </p>
            </div>
            <div className="mt-8">
              <PrimaryLink href="/audit">Start Free Audit</PrimaryLink>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Plain English",
                text: "Reports should explain what to fix next without technical jargon.",
              },
              {
                title: "Low-cost first",
                text: "The plan favors pages, positioning, communities, and conversion basics before paid growth.",
              },
              {
                title: "AI search aware",
                text: "GEO readiness helps small sites prepare content that AI search can understand.",
              },
              {
                title: "Founder friendly",
                text: "No login, payment, database, or complex dashboard is needed for version one.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
