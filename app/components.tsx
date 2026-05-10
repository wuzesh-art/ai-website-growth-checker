import Link from "next/link";

export const auditModules = [
  {
    name: "SEO Readiness",
    summary:
      "Checks whether search engines can understand your positioning, pages, titles, and intent coverage.",
  },
  {
    name: "GEO / AI Search Readiness",
    summary:
      "Looks for clear entities, comparison pages, answer-ready content, and citations that AI search can reuse.",
  },
  {
    name: "Reddit Opportunity",
    summary:
      "Finds communities, pain points, and low-cost conversation angles before you post.",
  },
  {
    name: "Content Gap Analysis",
    summary:
      "Highlights missing use cases, alternatives, templates, and problem pages your buyers expect.",
  },
  {
    name: "Conversion Readiness",
    summary:
      "Reviews the basics: offer clarity, calls to action, proof, friction, and next-step confidence.",
  },
];

export function Container({
  children,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: Readonly<{
  eyebrow: string;
  title: string;
  description: string;
}>) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-12 sm:py-16">
        <p className="text-sm font-semibold uppercase text-emerald-700">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold text-slate-950 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          {description}
        </p>
      </Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: Readonly<{
  eyebrow?: string;
  title: string;
  description?: string;
}>) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase text-emerald-700">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-slate-600">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function PrimaryLink({
  href,
  children,
}: Readonly<{
  href: string;
  children: React.ReactNode;
}>) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-12 items-center justify-center rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-900/10 transition hover:bg-emerald-700"
    >
      {children}
    </Link>
  );
}

export function SecondaryLink({
  href,
  children,
}: Readonly<{
  href: string;
  children: React.ReactNode;
}>) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
    >
      {children}
    </Link>
  );
}

export function ScoreBar({
  label,
  score,
  color = "bg-emerald-500",
}: Readonly<{
  label: string;
  score: number;
  color?: string;
}>) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="font-semibold text-slate-950">{score}/100</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-slate-200">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${Math.min(Math.max(score, 0), 100)}%` }}
        />
      </div>
    </div>
  );
}

export function EmptyStateLink() {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
      <p className="font-semibold">No URL was passed into this report.</p>
      <p className="mt-1">
        Run the free audit form to generate a cleaner mock report with your
        website details filled in.
      </p>
      <Link
        href="/audit"
        className="mt-4 inline-flex rounded-md bg-amber-600 px-4 py-2 font-semibold text-white transition hover:bg-amber-700"
      >
        Start Free Audit
      </Link>
    </div>
  );
}
