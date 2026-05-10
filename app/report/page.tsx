import type { Metadata } from "next";
import Link from "next/link";
import { Container, EmptyStateLink, ScoreBar } from "../components";

export const metadata: Metadata = {
  title: "Growth Audit Report",
  description:
    "A simulated growth audit report across SEO, GEO, Reddit, content gaps, and conversion readiness.",
};

type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

function getParam(
  params: Awaited<SearchParams>,
  key: string,
  fallback = "",
) {
  const value = params[key];
  if (Array.isArray(value)) {
    return value[0] ?? fallback;
  }
  return value ?? fallback;
}

function makeScore(seed: string, offset: number, min = 48, spread = 38) {
  const total = seed
    .split("")
    .reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 3), 0);

  return min + ((total + offset * 17) % spread);
}

const fixes = [
  "Rewrite the homepage headline around the customer pain, not the feature list.",
  "Add comparison, alternative, and use-case pages for buyers who are already searching.",
  "Create answer-ready sections with concise definitions, bullets, sources, and product context for AI search.",
  "Add proof near the first CTA: screenshots, examples, outcomes, or a clear sample report.",
  "Turn competitor names and Reddit pain points into content briefs before publishing random blog posts.",
];

const growthPlan = [
  {
    day: "Day 1",
    task: "Clarify the ICP, main job-to-be-done, and one measurable promise above the fold.",
  },
  {
    day: "Day 2",
    task: "Create or improve title tags, meta descriptions, H1s, and internal links for core pages.",
  },
  {
    day: "Day 3",
    task: "Draft two bottom-of-funnel pages: an alternative page and a use-case page.",
  },
  {
    day: "Day 4",
    task: "Write three short answer blocks that AI search engines can cite clearly.",
  },
  {
    day: "Day 5",
    task: "Research five Reddit threads and save the language customers use to describe the problem.",
  },
  {
    day: "Day 6",
    task: "Add conversion proof: sample output, FAQs, objections, and a stronger CTA section.",
  },
  {
    day: "Day 7",
    task: "Publish one page, answer two relevant conversations, and review analytics for early signals.",
  },
];

const suggestedPages = [
  "Best AI tools for [target audience]",
  "[Competitor] alternative for small teams",
  "How to solve [pain point] without hiring an agency",
  "[Website type] growth checklist",
  "Free template or calculator related to your core use case",
  "FAQ page that answers buying, pricing, setup, and comparison questions",
];

const redditSuggestions = [
  "Search for problem-first threads before mentioning the product.",
  "Reply with a useful diagnostic checklist, then link only when it clearly helps.",
  "Turn repeated objections into homepage FAQ and blog sections.",
  "Prioritize niche communities where founders ask for tools, feedback, and workflows.",
];

export default async function ReportPage({
  searchParams,
}: Readonly<{
  searchParams: SearchParams;
}>) {
  const params = await searchParams;
  const submittedUrl = getParam(params, "url");
  const websiteUrl = submittedUrl || "https://sample-ai-tool.com";
  const websiteType = getParam(params, "type", "AI Tool");
  const audience = getParam(
    params,
    "audience",
    "founders who need a clearer path to low-cost website growth",
  );
  const competitors = getParam(params, "competitors", "Not provided");
  const seed = `${websiteUrl}-${websiteType}-${audience}-${competitors}`;

  const scores = [
    {
      label: "SEO Readiness Score",
      shortLabel: "SEO",
      score: makeScore(seed, 1),
      color: "bg-emerald-500",
    },
    {
      label: "GEO Readiness Score",
      shortLabel: "GEO",
      score: makeScore(seed, 2, 42, 40),
      color: "bg-sky-500",
    },
    {
      label: "Reddit Opportunity Score",
      shortLabel: "Reddit",
      score: makeScore(seed, 3, 54, 34),
      color: "bg-orange-500",
    },
    {
      label: "Content Gap Score",
      shortLabel: "Content",
      score: makeScore(seed, 4, 45, 42),
      color: "bg-violet-500",
    },
    {
      label: "Conversion Readiness Score",
      shortLabel: "Conversion",
      score: makeScore(seed, 5, 50, 36),
      color: "bg-amber-500",
    },
  ];

  const overallGrowthScore = Math.round(
    scores.reduce((sum, item) => sum + item.score, 0) / scores.length,
  );

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <Container className="py-10 sm:py-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-emerald-700">
                Simulated growth audit
              </p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950 sm:text-5xl">
                Growth report for {websiteUrl}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                This first-version report uses mock scoring to show the planned
                audit experience. It does not call an AI API or crawl the
                website.
              </p>
            </div>
            <Link
              href="/audit"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Run Another Audit
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-14">
        <Container className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <aside className="space-y-6">
            {!submittedUrl ? <EmptyStateLink /> : null}

            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase text-slate-500">
                Overall Growth Score
              </p>
              <div className="mt-4 flex items-end gap-3">
                <span className="text-6xl font-semibold text-slate-950">
                  {overallGrowthScore}
                </span>
                <span className="pb-2 text-lg font-semibold text-slate-500">
                  /100
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                A useful early benchmark. Scores below 70 usually mean the site
                needs clearer pages, sharper search intent, and better proof
                before scaling promotion.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase text-slate-500">
                Submitted details
              </p>
              <dl className="mt-4 grid gap-4 text-sm">
                <div>
                  <dt className="font-semibold text-slate-950">Website type</dt>
                  <dd className="mt-1 text-slate-600">{websiteType}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-950">
                    Target audience
                  </dt>
                  <dd className="mt-1 leading-6 text-slate-600">{audience}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-950">Competitors</dt>
                  <dd className="mt-1 leading-6 text-slate-600">
                    {competitors}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>

          <div className="space-y-8">
            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-950">
                Channel readiness scores
              </h2>
              <div className="mt-6 grid gap-5">
                {scores.map((item) => (
                  <ScoreBar
                    key={item.label}
                    label={item.label}
                    score={item.score}
                    color={item.color}
                  />
                ))}
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-5">
                {scores.map((item) => (
                  <div
                    key={item.shortLabel}
                    className="rounded-md border border-slate-200 bg-slate-50 p-3"
                  >
                    <p className="text-xs font-medium text-slate-500">
                      {item.shortLabel}
                    </p>
                    <p className="mt-2 text-xl font-semibold text-slate-950">
                      {item.score}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-950">
                Recommended Fixes
              </h2>
              <div className="mt-6 grid gap-3">
                {fixes.map((fix, index) => (
                  <div
                    key={fix}
                    className="grid gap-4 rounded-md border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[2rem_1fr]"
                  >
                    <span className="flex size-8 items-center justify-center rounded-md bg-slate-950 text-sm font-semibold text-white">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-6 text-slate-700">{fix}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-950">
                7-Day Low-Cost Growth Plan
              </h2>
              <div className="mt-6 grid gap-3">
                {growthPlan.map((item) => (
                  <div
                    key={item.day}
                    className="rounded-md border border-slate-200 p-4 sm:grid sm:grid-cols-[6rem_1fr] sm:gap-4"
                  >
                    <p className="text-sm font-semibold text-emerald-700">
                      {item.day}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700 sm:mt-0">
                      {item.task}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-semibold text-slate-950">
                  Suggested SEO/GEO Pages
                </h2>
                <ul className="mt-6 grid gap-3">
                  {suggestedPages.map((page) => (
                    <li
                      key={page}
                      className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700"
                    >
                      {page}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-semibold text-slate-950">
                  Reddit Promotion Suggestions
                </h2>
                <ul className="mt-6 grid gap-3">
                  {redditSuggestions.map((suggestion) => (
                    <li
                      key={suggestion}
                      className="rounded-md border border-orange-200 bg-orange-50 p-4 text-sm leading-6 text-orange-950"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </Container>
      </section>
    </>
  );
}
