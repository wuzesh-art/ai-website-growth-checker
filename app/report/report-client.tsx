"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Container, EmptyStateLink, ScoreBar } from "../components";

export type ReportInput = {
  url: string;
  websiteType: string;
  targetAudience: string;
  competitors: string;
};

type Checks = {
  isReachable: boolean;
  hasTitle: boolean;
  hasDescription: boolean;
  hasH1: boolean;
  hasCanonical: boolean;
  hasRobotsTxt: boolean;
  hasSitemapXml: boolean;
  hasLlmsTxt: boolean;
  hasStructuredData: boolean;
  hasPricingPage: boolean;
  hasFaqPage: boolean;
  hasBlogPage: boolean;
  hasDocsPage: boolean;
  hasComparisonPage: boolean;
  hasUseCasePage: boolean;
  hasClearCta: boolean;
};

type ScoreKey = "seo" | "geo" | "reddit" | "content" | "conversion";
type Priority = "High" | "Medium" | "Low";
type Effort = "Low" | "Medium" | "High";
type Impact = "SEO" | "GEO" | "Conversion" | "Reddit" | "Content";
type CheckStatus = "Pass" | "Missing" | "Warning";

type RecommendedFix = {
  title: string;
  priority: Priority;
  effort: Effort;
  impact: Impact;
  whyItMatters: string;
};

type SevenDayTask = {
  day: string;
  title: string;
  task: string;
};

type SuggestedPage = {
  title: string;
  searchIntent: string;
  whyItHelps: string;
  slug: string;
};

type RedditSuggestion = {
  step: string;
  title: string;
  detail: string;
};

type AuditReport = {
  input: ReportInput;
  site: {
    finalUrl: string;
    status: number;
    title: string;
    description: string;
    h1: string;
  };
  checks: Checks;
  scores: Record<ScoreKey, number> & {
    overall: number;
  };
  summary: {
    diagnosis: string;
    topBlockers: string[];
    fastestNextStep: string;
  };
  issues: string[];
  recommendedFixes: RecommendedFix[];
  sevenDayPlan: SevenDayTask[];
  suggestedPages: SuggestedPage[];
  redditSuggestions: RedditSuggestion[];
};

type ApiError = {
  error?: string;
};

type CheckItem = {
  label: string;
  status: CheckStatus;
  detail: string;
};

type CheckGroup = {
  title: string;
  items: CheckItem[];
};

const scoreRows: {
  key: ScoreKey;
  label: string;
  shortLabel: string;
  color: string;
  description: string;
}[] = [
  {
    key: "seo",
    label: "SEO Readiness",
    shortLabel: "SEO",
    color: "bg-emerald-500",
    description: "Metadata, indexation files, canonical tags, and structure.",
  },
  {
    key: "geo",
    label: "GEO / AI Search",
    shortLabel: "GEO",
    color: "bg-sky-500",
    description: "llms.txt, structured data, FAQ, docs, pricing, comparisons.",
  },
  {
    key: "content",
    label: "Content Gap",
    shortLabel: "Content",
    color: "bg-violet-500",
    description: "Blog, FAQ, use cases, docs, pricing, and comparison pages.",
  },
  {
    key: "conversion",
    label: "Conversion",
    shortLabel: "Conversion",
    color: "bg-amber-500",
    description: "Clear H1, value prop, pricing, FAQ, and primary CTA.",
  },
  {
    key: "reddit",
    label: "Reddit Opportunity",
    shortLabel: "Reddit",
    color: "bg-orange-500",
    description: "Input-based estimate for manual, transparent community work.",
  },
];

function titleLengthIsReasonable(title: string) {
  return title.length >= 30 && title.length <= 65;
}

function descriptionLengthIsReasonable(description: string) {
  return description.length >= 70 && description.length <= 160;
}

function h1IsClear(h1: string) {
  return h1.length >= 12 && h1.length <= 90;
}

function statusFromBoolean(passed: boolean): CheckStatus {
  return passed ? "Pass" : "Missing";
}

function scoreLabel(score: number) {
  if (score >= 80) return "Strong";
  if (score >= 60) return "Needs focus";
  if (score >= 40) return "At risk";
  return "Critical";
}

function statusClasses(status: CheckStatus) {
  if (status === "Pass") {
    return "border-emerald-200 bg-emerald-50 text-emerald-900";
  }
  if (status === "Warning") {
    return "border-amber-200 bg-amber-50 text-amber-950";
  }
  return "border-rose-200 bg-rose-50 text-rose-950";
}

function badgeClasses(value: Priority | Effort | Impact) {
  const colors: Record<string, string> = {
    High: "border-rose-200 bg-rose-50 text-rose-800",
    Medium: "border-amber-200 bg-amber-50 text-amber-800",
    Low: "border-slate-200 bg-slate-50 text-slate-700",
    SEO: "border-emerald-200 bg-emerald-50 text-emerald-800",
    GEO: "border-sky-200 bg-sky-50 text-sky-800",
    Conversion: "border-amber-200 bg-amber-50 text-amber-800",
    Reddit: "border-orange-200 bg-orange-50 text-orange-800",
    Content: "border-violet-200 bg-violet-50 text-violet-800",
  };

  return colors[value] ?? "border-slate-200 bg-slate-50 text-slate-700";
}

function submittedDetails(input: ReportInput) {
  return [
    ["Website URL", input.url || "Not provided"],
    ["Website type", input.websiteType || "Other"],
    ["Target audience", input.targetAudience || "Not provided"],
    ["Competitors", input.competitors || "Not provided"],
  ];
}

function buildCheckGroups(report: AuditReport): CheckGroup[] {
  const { checks, site } = report;

  return [
    {
      title: "Technical SEO",
      items: [
        {
          label: "Homepage reachable",
          status: checks.isReachable ? "Pass" : "Missing",
          detail: `HTTP status ${site.status}`,
        },
        {
          label: "Title tag",
          status: !checks.hasTitle
            ? "Missing"
            : titleLengthIsReasonable(site.title)
              ? "Pass"
              : "Warning",
          detail: site.title
            ? `${site.title.length} characters`
            : "No title tag found",
        },
        {
          label: "Meta description",
          status: !checks.hasDescription
            ? "Missing"
            : descriptionLengthIsReasonable(site.description)
              ? "Pass"
              : "Warning",
          detail: site.description
            ? `${site.description.length} characters`
            : "No description found",
        },
        {
          label: "H1",
          status: !checks.hasH1
            ? "Missing"
            : h1IsClear(site.h1)
              ? "Pass"
              : "Warning",
          detail: site.h1 ? `${site.h1.length} characters` : "No H1 found",
        },
        {
          label: "Canonical URL",
          status: statusFromBoolean(checks.hasCanonical),
          detail: checks.hasCanonical
            ? "Canonical link detected"
            : "Add a homepage canonical tag",
        },
        {
          label: "robots.txt",
          status: statusFromBoolean(checks.hasRobotsTxt),
          detail: checks.hasRobotsTxt
            ? "Public robots.txt found"
            : "No public robots.txt found",
        },
        {
          label: "sitemap.xml",
          status: statusFromBoolean(checks.hasSitemapXml),
          detail: checks.hasSitemapXml
            ? "Public sitemap.xml found"
            : "No public sitemap.xml found",
        },
      ],
    },
    {
      title: "GEO / AI Search",
      items: [
        {
          label: "llms.txt",
          status: statusFromBoolean(checks.hasLlmsTxt),
          detail: checks.hasLlmsTxt
            ? "AI-search context file found"
            : "Add llms.txt for AI-search context",
        },
        {
          label: "Structured data",
          status: statusFromBoolean(checks.hasStructuredData),
          detail: checks.hasStructuredData
            ? "JSON-LD detected"
            : "No application/ld+json found",
        },
        {
          label: "FAQ page",
          status: statusFromBoolean(checks.hasFaqPage),
          detail: checks.hasFaqPage
            ? "FAQ link detected"
            : "No FAQ link detected from homepage",
        },
        {
          label: "Pricing page",
          status: statusFromBoolean(checks.hasPricingPage),
          detail: checks.hasPricingPage
            ? "Pricing link detected"
            : "No pricing link detected from homepage",
        },
        {
          label: "Docs page",
          status: statusFromBoolean(checks.hasDocsPage),
          detail: checks.hasDocsPage
            ? "Docs link detected"
            : "No docs link detected from homepage",
        },
        {
          label: "Comparison page",
          status: statusFromBoolean(checks.hasComparisonPage),
          detail: checks.hasComparisonPage
            ? "Comparison or alternatives link detected"
            : "No comparison link detected from homepage",
        },
      ],
    },
    {
      title: "Content & Conversion",
      items: [
        {
          label: "Blog or resources",
          status: statusFromBoolean(checks.hasBlogPage),
          detail: checks.hasBlogPage
            ? "Blog/resources link detected"
            : "No blog/resources link detected",
        },
        {
          label: "Use-case pages",
          status: statusFromBoolean(checks.hasUseCasePage),
          detail: checks.hasUseCasePage
            ? "Use-case or solutions link detected"
            : "No use-case, solutions, or templates link detected",
        },
        {
          label: "Pricing clarity",
          status: statusFromBoolean(checks.hasPricingPage),
          detail: checks.hasPricingPage
            ? "Pricing is discoverable"
            : "Pricing is not discoverable from homepage",
        },
        {
          label: "FAQ objections",
          status: statusFromBoolean(checks.hasFaqPage),
          detail: checks.hasFaqPage
            ? "FAQ is discoverable"
            : "FAQ answers are not discoverable",
        },
        {
          label: "Primary CTA",
          status: statusFromBoolean(checks.hasClearCta),
          detail: checks.hasClearCta
            ? "CTA-like action text detected"
            : "No clear CTA text detected",
        },
      ],
    },
  ];
}

function SubmittedDetails({ input }: Readonly<{ input: ReportInput }>) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase text-slate-500">
        Submitted details
      </p>
      <dl className="mt-4 grid gap-4 text-sm">
        {submittedDetails(input).map(([label, value]) => (
          <div key={label}>
            <dt className="font-semibold text-slate-950">{label}</dt>
            <dd className="mt-1 break-words leading-6 text-slate-600">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function LoadingReport({ input }: Readonly<{ input: ReportInput }>) {
  return (
    <section className="py-8 sm:py-12">
      <Container className="grid gap-6 lg:grid-cols-[0.74fr_1.26fr]">
        <aside className="space-y-5">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm font-semibold uppercase text-slate-500">
              Running live checks
            </p>
            <div className="mt-5 h-16 animate-pulse rounded-md bg-slate-100" />
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Fetching the homepage, reading public metadata, and checking
              robots.txt, sitemap.xml, and llms.txt.
            </p>
          </div>
          <SubmittedDetails input={input} />
        </aside>

        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
            >
              <div className="h-6 w-48 animate-pulse rounded bg-slate-100 sm:w-56" />
              <div className="mt-6 grid gap-4">
                <div className="h-4 animate-pulse rounded bg-slate-100" />
                <div className="h-4 w-11/12 animate-pulse rounded bg-slate-100" />
                <div className="h-4 w-10/12 animate-pulse rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ErrorReport({
  input,
  message,
}: Readonly<{
  input: ReportInput;
  message: string;
}>) {
  return (
    <section className="py-8 sm:py-12">
      <Container className="grid gap-6 lg:grid-cols-[0.74fr_1.26fr]">
        <aside className="space-y-5">
          <SubmittedDetails input={input} />
        </aside>
        <div className="rounded-lg border border-red-200 bg-red-50 p-5 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase text-red-700">
            Audit failed
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-red-950">
            The website could not be audited
          </h2>
          <p className="mt-4 text-sm leading-6 text-red-900">{message}</p>
          <Link
            href="/audit"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-md bg-red-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-800"
          >
            Run Another Audit
          </Link>
        </div>
      </Container>
    </section>
  );
}

function SummarySection({ report }: Readonly<{ report: AuditReport }>) {
  return (
    <section className="border-b border-slate-200 bg-slate-50 py-8 sm:py-10">
      <Container>
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm font-semibold uppercase text-emerald-700">
              Summary
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">
              One-line diagnosis
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-700">
              {report.summary.diagnosis}
            </p>
            <div className="mt-6 rounded-md border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-950">
                Fastest next step
              </p>
              <p className="mt-2 text-sm leading-6 text-emerald-900">
                {report.summary.fastestNextStep}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-sm sm:p-6">
            <p className="text-sm font-semibold uppercase text-orange-200">
              Top 3 growth blockers
            </p>
            <div className="mt-5 grid gap-3">
              {report.summary.topBlockers.map((blocker, index) => (
                <div
                  key={blocker}
                  className="rounded-md border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-xs font-semibold uppercase text-orange-200">
                    Blocker {index + 1}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-100">
                    {blocker}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function OverallScoreCard({ report }: Readonly<{ report: AuditReport }>) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase text-slate-500">
            Overall Growth Score
          </p>
          <div className="mt-4 flex items-end gap-3">
            <span className="text-6xl font-semibold text-slate-950">
              {report.scores.overall}
            </span>
            <span className="pb-2 text-lg font-semibold text-slate-500">
              /100
            </span>
          </div>
        </div>
        <span className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
          {scoreLabel(report.scores.overall)}
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">
        Weighted from SEO, GEO, content, conversion, and Reddit opportunity.
        Missing pricing, FAQ, llms.txt, structured data, and comparison pages
        can pull the score down even when basic SEO exists.
      </p>
    </div>
  );
}

function HomepageSnapshot({ report }: Readonly<{ report: AuditReport }>) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase text-slate-500">
        Homepage snapshot
      </p>
      <dl className="mt-4 grid gap-4 text-sm">
        <div>
          <dt className="font-semibold text-slate-950">Final URL</dt>
          <dd className="mt-1 break-words leading-6 text-slate-600">
            {report.site.finalUrl}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-950">HTTP status</dt>
          <dd className="mt-1 text-slate-600">{report.site.status}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-950">Title</dt>
          <dd className="mt-1 break-words leading-6 text-slate-600">
            {report.site.title || "Not found"}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-950">Meta description</dt>
          <dd className="mt-1 break-words leading-6 text-slate-600">
            {report.site.description || "Not found"}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-950">H1</dt>
          <dd className="mt-1 break-words leading-6 text-slate-600">
            {report.site.h1 || "Not found"}
          </dd>
        </div>
      </dl>
    </div>
  );
}

function ScoreSection({ report }: Readonly<{ report: AuditReport }>) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">
            Channel readiness scores
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Each score is intentionally strict so the report points to the next
            practical growth work.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {scoreRows.map((item) => (
          <div
            key={item.key}
            className="rounded-lg border border-slate-200 bg-slate-50 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-950">
                {item.shortLabel}
              </p>
              <span className="text-xl font-semibold text-slate-950">
                {report.scores[item.key]}
              </span>
            </div>
            <p className="mt-3 min-h-12 text-xs leading-5 text-slate-600">
              {item.description}
            </p>
            <div className="mt-4">
              <ScoreBar
                label={item.label}
                score={report.scores[item.key]}
                color={item.color}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ChecksSection({ report }: Readonly<{ report: AuditReport }>) {
  const groups = buildCheckGroups(report);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <h2 className="text-2xl font-semibold text-slate-950">Checks</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Grouped by the growth surface each signal supports.
      </p>
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {groups.map((group) => (
          <div key={group.title} className="rounded-lg border border-slate-200">
            <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
              <h3 className="font-semibold text-slate-950">{group.title}</h3>
            </div>
            <div className="divide-y divide-slate-200">
              {group.items.map((item) => (
                <div key={item.label} className="p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-950">
                      {item.label}
                    </p>
                    <span
                      className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${statusClasses(
                        item.status,
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RecommendedFixes({
  fixes,
}: Readonly<{
  fixes: RecommendedFix[];
}>) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <h2 className="text-2xl font-semibold text-slate-950">
        Recommended Fixes
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Prioritized by practical growth impact for an early-stage SaaS or AI
        tool site.
      </p>
      <div className="mt-6 grid gap-4">
        {fixes.map((fix, index) => (
          <article
            key={`${fix.title}-${index}`}
            className="rounded-lg border border-slate-200 bg-slate-50 p-4 sm:p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Fix {index + 1}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-950">
                  {fix.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${badgeClasses(
                    fix.priority,
                  )}`}
                >
                  Priority: {fix.priority}
                </span>
                <span
                  className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${badgeClasses(
                    fix.effort,
                  )}`}
                >
                  Effort: {fix.effort}
                </span>
                <span
                  className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${badgeClasses(
                    fix.impact,
                  )}`}
                >
                  Impact: {fix.impact}
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-700">
              {fix.whyItMatters}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SevenDayPlan({ plan }: Readonly<{ plan: SevenDayTask[] }>) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <h2 className="text-2xl font-semibold text-slate-950">
        7-Day Low-Cost Growth Plan
      </h2>
      <div className="mt-6 grid gap-3">
        {plan.map((item) => (
          <article
            key={item.day}
            className="rounded-lg border border-slate-200 bg-slate-50 p-4 sm:grid sm:grid-cols-[6.5rem_1fr] sm:gap-5 sm:p-5"
          >
            <p className="text-sm font-semibold text-emerald-700">
              {item.day}
            </p>
            <div>
              <h3 className="mt-2 text-base font-semibold text-slate-950 sm:mt-0">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {item.task}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SuggestedPages({
  pages,
}: Readonly<{
  pages: SuggestedPage[];
}>) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <h2 className="text-2xl font-semibold text-slate-950">
        Suggested SEO/GEO Pages
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {pages.map((page) => (
          <article
            key={`${page.title}-${page.slug}`}
            className="rounded-lg border border-slate-200 bg-slate-50 p-4"
          >
            <h3 className="text-base font-semibold text-slate-950">
              {page.title}
            </h3>
            <p className="mt-3 text-xs font-semibold uppercase text-slate-500">
              Suggested slug
            </p>
            <p className="mt-1 break-words rounded-md bg-white px-3 py-2 font-mono text-xs text-slate-700">
              {page.slug}
            </p>
            <p className="mt-4 text-sm font-semibold text-slate-950">
              Search intent
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {page.searchIntent}
            </p>
            <p className="mt-4 text-sm font-semibold text-slate-950">
              Why it helps
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {page.whyItHelps}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function RedditSuggestions({
  suggestions,
}: Readonly<{
  suggestions: RedditSuggestion[];
}>) {
  return (
    <section className="rounded-lg border border-orange-200 bg-orange-50 p-5 shadow-sm sm:p-8">
      <h2 className="text-2xl font-semibold text-orange-950">
        Reddit Promotion Suggestions
      </h2>
      <p className="mt-2 text-sm leading-6 text-orange-900">
        Manual, transparent community participation only.
      </p>
      <div className="mt-6 grid gap-3">
        {suggestions.map((suggestion) => (
          <article
            key={suggestion.step}
            className="rounded-lg border border-orange-200 bg-white p-4"
          >
            <p className="text-xs font-semibold uppercase text-orange-700">
              Step {suggestion.step}
            </p>
            <h3 className="mt-2 text-base font-semibold text-slate-950">
              {suggestion.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {suggestion.detail}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function ReportClient({
  input,
}: Readonly<{
  input: ReportInput;
}>) {
  const [report, setReport] = useState<AuditReport | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(Boolean(input.url));

  const requestBody = useMemo(
    () => ({
      url: input.url,
      websiteType: input.websiteType || "Other",
      targetAudience: input.targetAudience,
      competitors: input.competitors,
    }),
    [input],
  );

  useEffect(() => {
    let ignore = false;

    async function runAudit() {
      if (!input.url) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      setReport(null);

      try {
        const response = await fetch("/api/audit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
        const data = (await response.json()) as AuditReport & ApiError;

        if (!response.ok) {
          throw new Error(data.error || "The audit request failed.");
        }

        if (!ignore) {
          setReport(data);
        }
      } catch (caught) {
        if (!ignore) {
          setError(
            caught instanceof Error
              ? caught.message
              : "The audit request failed.",
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    runAudit();

    return () => {
      ignore = true;
    };
  }, [input.url, requestBody]);

  const headerUrl = report?.site.finalUrl || input.url || "your website";

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <Container className="py-8 sm:py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-emerald-700">
                Live growth audit
              </p>
              <h1 className="mt-4 break-words text-3xl font-semibold text-slate-950 sm:text-5xl">
                Growth report for {headerUrl}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                This report checks public homepage metadata, indexation files,
                structured data, visible growth pages, and conversion signals.
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

      {!input.url ? (
        <section className="py-8 sm:py-12">
          <Container>
            <EmptyStateLink />
          </Container>
        </section>
      ) : null}

      {loading ? <LoadingReport input={input} /> : null}

      {!loading && error ? (
        <ErrorReport input={input} message={error} />
      ) : null}

      {!loading && report ? (
        <>
          <SummarySection report={report} />
          <section className="py-8 sm:py-12">
            <Container className="grid gap-6 lg:grid-cols-[0.74fr_1.26fr]">
              <aside className="space-y-5">
                <OverallScoreCard report={report} />
                <SubmittedDetails input={report.input} />
                <HomepageSnapshot report={report} />
              </aside>

              <div className="space-y-6">
                <ScoreSection report={report} />
                <ChecksSection report={report} />
                <RecommendedFixes fixes={report.recommendedFixes} />
                <SevenDayPlan plan={report.sevenDayPlan} />
                <SuggestedPages pages={report.suggestedPages} />
                <RedditSuggestions suggestions={report.redditSuggestions} />
              </div>
            </Container>
          </section>
        </>
      ) : null}
    </>
  );
}
