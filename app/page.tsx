import Link from "next/link";
import {
  auditModules,
  Container,
  PrimaryLink,
  ScoreBar,
  SectionHeading,
  SecondaryLink,
} from "./components";

const proofPoints = [
  "No login required",
  "No payment required",
  "Built for small sites",
];

const channelRows = [
  { label: "Search pages", value: "12 gaps", color: "bg-emerald-500" },
  { label: "AI answers", value: "7 fixes", color: "bg-sky-500" },
  { label: "Reddit angles", value: "9 ideas", color: "bg-orange-500" },
];

function ProductPreview() {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-950 p-3 shadow-xl shadow-slate-900/10">
      <div className="rounded-md bg-white p-5">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500">
              Example report
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-950">
              Growth snapshot
            </p>
          </div>
          <div className="rounded-md bg-emerald-50 px-3 py-2 text-right">
            <p className="text-xs font-medium text-emerald-700">Score</p>
            <p className="text-2xl font-semibold text-emerald-800">68</p>
          </div>
        </div>

        <div className="mt-5 grid gap-4">
          <ScoreBar label="SEO Readiness" score={72} />
          <ScoreBar label="GEO Readiness" score={58} color="bg-sky-500" />
          <ScoreBar label="Conversion" score={64} color="bg-violet-500" />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {channelRows.map((row) => (
            <div
              key={row.label}
              className="rounded-md border border-slate-200 bg-slate-50 p-3"
            >
              <span className={`block h-1.5 w-10 rounded-full ${row.color}`} />
              <p className="mt-3 text-xs text-slate-500">{row.label}</p>
              <p className="mt-1 text-sm font-semibold text-slate-950">
                {row.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-md border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-semibold text-emerald-950">
            Next best move
          </p>
          <p className="mt-2 text-sm leading-6 text-emerald-900">
            Publish one alternative page, answer two Reddit threads, and add a
            sharper primary CTA before spending on ads.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <Container className="grid gap-12 py-14 lg:grid-cols-[1.03fr_0.97fr] lg:items-center lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-700">
              Free growth audit for small websites
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold text-slate-950 sm:text-5xl lg:text-6xl">
              Find out why your AI-built website has no traffic
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Get a free growth audit across SEO, GEO, Reddit, content gaps,
              and conversion basics.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/audit">Start Free Audit</PrimaryLink>
              <SecondaryLink href="/report">View Sample Report</SecondaryLink>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {proofPoints.map((point) => (
                <span
                  key={point}
                  className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700"
                >
                  {point}
                </span>
              ))}
            </div>
          </div>

          <ProductPreview />
        </Container>
      </section>

      <section className="bg-slate-50 py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Audit modules"
            title="Five checks built for the way small websites actually grow"
            description="The first version is intentionally practical. It gives founders a plain-English snapshot of the lowest-cost channels to fix before buying tools or hiring an agency."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {auditModules.map((module, index) => (
              <article
                key={module.name}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <span className="flex size-9 items-center justify-center rounded-md bg-slate-950 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-slate-950">
                  {module.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {module.summary}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Who it is for"
            title="Made for founders who ship faster than they market"
            description="AI builders can now launch a website in a weekend. Growth still needs positioning, pages, search intent, distribution, and conversion clarity."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Non-technical founders",
              "Product managers using AI coding tools",
              "Indie hackers",
              "Micro SaaS founders",
              "AI tool builders",
              "Small website owners",
            ].map((audience) => (
              <div
                key={audience}
                className="rounded-lg border border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-800"
              >
                {audience}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-slate-950 py-14 text-white sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-300">
              Ready in under a minute
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold sm:text-4xl">
              Get a low-cost growth plan before you rewrite your product.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">
              Enter your website, describe the audience, and receive a mock
              report with practical SEO, GEO, Reddit, content, and conversion
              ideas.
            </p>
          </div>
          <Link
            href="/audit"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-100"
          >
            Start Free Audit
          </Link>
        </Container>
      </section>
    </>
  );
}
