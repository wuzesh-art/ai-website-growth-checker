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
  scores: {
    overall: number;
    seo: number;
    geo: number;
    reddit: number;
    content: number;
    conversion: number;
  };
  issues: string[];
  recommendedFixes: string[];
  sevenDayPlan: { day: string; task: string }[];
  suggestedPages: string[];
  redditSuggestions: string[];
};

type ApiError = {
  error?: string;
};

const scoreRows = [
  {
    key: "seo",
    label: "SEO Readiness Score",
    shortLabel: "SEO",
    color: "bg-emerald-500",
  },
  {
    key: "geo",
    label: "GEO Readiness Score",
    shortLabel: "GEO",
    color: "bg-sky-500",
  },
  {
    key: "reddit",
    label: "Reddit Opportunity Score",
    shortLabel: "Reddit",
    color: "bg-orange-500",
  },
  {
    key: "content",
    label: "Content Gap Score",
    shortLabel: "Content",
    color: "bg-violet-500",
  },
  {
    key: "conversion",
    label: "Conversion Readiness Score",
    shortLabel: "Conversion",
    color: "bg-amber-500",
  },
] as const;

const checkLabels: Record<keyof Checks, string> = {
  isReachable: "Homepage reachable",
  hasTitle: "Title tag exists",
  hasDescription: "Meta description exists",
  hasH1: "H1 exists",
  hasCanonical: "Canonical URL exists",
  hasRobotsTxt: "robots.txt exists",
  hasSitemapXml: "sitemap.xml exists",
  hasLlmsTxt: "llms.txt exists",
  hasStructuredData: "Structured data exists",
  hasPricingPage: "Pricing page linked",
  hasFaqPage: "FAQ page linked",
  hasBlogPage: "Blog page linked",
  hasDocsPage: "Docs page linked",
  hasComparisonPage: "Alternatives or comparison page linked",
};

function submittedDetails(input: ReportInput) {
  return [
    ["Website URL", input.url || "Not provided"],
    ["Website type", input.websiteType || "Other"],
    ["Target audience", input.targetAudience || "Not provided"],
    ["Competitors", input.competitors || "Not provided"],
  ];
}

function LoadingReport({ input }: Readonly<{ input: ReportInput }>) {
  return (
    <section className="py-10 sm:py-14">
      <Container className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <aside className="space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
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
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="h-6 w-56 animate-pulse rounded bg-slate-100" />
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

function SubmittedDetails({ input }: Readonly<{ input: ReportInput }>) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
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

function ErrorReport({
  input,
  message,
}: Readonly<{
  input: ReportInput;
  message: string;
}>) {
  return (
    <section className="py-10 sm:py-14">
      <Container className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <aside className="space-y-6">
          <SubmittedDetails input={input} />
        </aside>
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 shadow-sm sm:p-8">
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

function ChecksList({ checks }: Readonly<{ checks: Checks }>) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-semibold text-slate-950">Checks</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {(Object.keys(checkLabels) as (keyof Checks)[]).map((key) => {
          const passed = checks[key];

          return (
            <div
              key={key}
              className={`rounded-md border p-4 ${
                passed
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <p
                className={`text-sm font-semibold ${
                  passed ? "text-emerald-900" : "text-slate-700"
                }`}
              >
                {passed ? "Pass" : "Missing"}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-700">
                {checkLabels[key]}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function NumberedList({
  title,
  items,
  tone = "slate",
}: Readonly<{
  title: string;
  items: string[];
  tone?: "slate" | "orange";
}>) {
  const itemClass =
    tone === "orange"
      ? "border-orange-200 bg-orange-50 text-orange-950"
      : "border-slate-200 bg-slate-50 text-slate-700";

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
      <div className="mt-6 grid gap-3">
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className={`grid gap-4 rounded-md border p-4 sm:grid-cols-[2rem_1fr] ${itemClass}`}
          >
            <span className="flex size-8 items-center justify-center rounded-md bg-slate-950 text-sm font-semibold text-white">
              {index + 1}
            </span>
            <p className="text-sm leading-6">{item}</p>
          </div>
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
        <Container className="py-10 sm:py-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-emerald-700">
                Live growth audit
              </p>
              <h1 className="mt-4 break-words text-4xl font-semibold text-slate-950 sm:text-5xl">
                Growth report for {headerUrl}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                This report checks public homepage metadata, indexation files,
                structured data, and visible growth pages. Reddit scoring is a
                lightweight estimate based on your inputs.
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
        <section className="py-10 sm:py-14">
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
        <section className="py-10 sm:py-14">
          <Container className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <aside className="space-y-6">
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
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
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  A blended view of technical search basics, AI search
                  readiness, content coverage, conversion clarity, and Reddit
                  opportunity.
                </p>
              </div>

              <SubmittedDetails input={report.input} />

              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
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
                    <dt className="font-semibold text-slate-950">
                      HTTP status
                    </dt>
                    <dd className="mt-1 text-slate-600">
                      {report.site.status}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-950">Title</dt>
                    <dd className="mt-1 break-words leading-6 text-slate-600">
                      {report.site.title || "Not found"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-950">
                      Meta description
                    </dt>
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
            </aside>

            <div className="space-y-8">
              <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-semibold text-slate-950">
                  Channel readiness scores
                </h2>
                <div className="mt-6 grid gap-5">
                  {scoreRows.map((item) => (
                    <ScoreBar
                      key={item.key}
                      label={item.label}
                      score={report.scores[item.key]}
                      color={item.color}
                    />
                  ))}
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-5">
                  {scoreRows.map((item) => (
                    <div
                      key={item.key}
                      className="rounded-md border border-slate-200 bg-slate-50 p-3"
                    >
                      <p className="text-xs font-medium text-slate-500">
                        {item.shortLabel}
                      </p>
                      <p className="mt-2 text-xl font-semibold text-slate-950">
                        {report.scores[item.key]}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <ChecksList checks={report.checks} />

              {report.issues.length ? (
                <NumberedList title="Detected Issues" items={report.issues} />
              ) : null}

              <NumberedList
                title="Recommended Fixes"
                items={report.recommendedFixes}
              />

              <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-semibold text-slate-950">
                  7-Day Low-Cost Growth Plan
                </h2>
                <div className="mt-6 grid gap-3">
                  {report.sevenDayPlan.map((item) => (
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
                <NumberedList
                  title="Suggested SEO/GEO Pages"
                  items={report.suggestedPages}
                />
                <NumberedList
                  title="Reddit Promotion Suggestions"
                  items={report.redditSuggestions}
                  tone="orange"
                />
              </section>
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
