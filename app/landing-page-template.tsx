import Link from "next/link";
import {
  Container,
  PrimaryLink,
  SectionHeading,
  SecondaryLink,
} from "./components";
import type { LandingPage } from "./landing-page-data";

export function LandingPageTemplate({
  page,
}: Readonly<{
  page: LandingPage;
}>) {
  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <Container className="grid gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-700">
              {page.eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold text-slate-950 sm:text-5xl">
              {page.h1}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              {page.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/audit">Start Free Audit</PrimaryLink>
              <SecondaryLink href="/">View Product Overview</SecondaryLink>
            </div>
          </div>

          <aside className="rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase text-emerald-300">
              Search intent
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-100">
              {page.searchIntent}
            </p>
            <div className="mt-6 rounded-md border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">
                Best first action
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Run the audit, review the top blockers, then fix one public
                signal before publishing more content.
              </p>
            </div>
          </aside>
        </Container>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="What this page helps you check"
            title="A focused growth check before you spend on acquisition"
            description={page.checkIntro}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {page.checks.map((check, index) => (
              <article
                key={check}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <span className="flex size-8 items-center justify-center rounded-md bg-slate-950 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <p className="mt-4 text-sm leading-6 text-slate-700">
                  {check}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-white py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Who it is for"
            title="Built for small teams that need practical growth direction"
            description="The audit is intentionally lightweight, so founders and operators can understand what to do next without setting up a complex marketing stack."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {page.audiences.map((audience) => (
              <div
                key={audience}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-800"
              >
                {audience}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Why it matters"
            title={page.whyTitle}
          />
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-5 text-base leading-8 text-slate-600">
              {page.whyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="What the audit checks"
            title="The report connects technical basics with buyer readiness"
            description="Each module is designed to point toward a low-cost fix rather than a vague vanity score."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {page.auditChecks.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-slate-200 bg-slate-50 p-5"
              >
                <h2 className="text-lg font-semibold text-slate-950">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-slate-950 py-12 text-white sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-300">
              How to use it
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              From URL to growth plan in a few minutes
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Use the audit as a prioritization layer before you rewrite your
              site, create more content, or start posting in communities.
            </p>
          </div>
          <div className="grid gap-3">
            {page.steps.map((step, index) => (
              <div
                key={step}
                className="rounded-md border border-white/10 bg-white/5 p-4"
              >
                <p className="text-xs font-semibold uppercase text-emerald-300">
                  Step {index + 1}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-100">{step}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions founders ask before running the audit"
          />
          <div className="grid gap-4">
            {page.faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-lg border border-slate-200 bg-slate-50 p-5"
              >
                <h2 className="text-lg font-semibold text-slate-950">
                  {faq.question}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-12 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="Related pages"
            title="Keep exploring growth paths"
            description="These links help search engines and visitors understand the broader product context."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {page.related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
              >
                <h2 className="text-lg font-semibold text-slate-950">
                  {item.label}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <div className="grid gap-6 rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-sm sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase text-emerald-300">
                Final CTA
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                {page.finalCtaTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                {page.finalCtaText}
              </p>
            </div>
            <Link
              href="/audit"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-100"
            >
              Start Free Audit
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
