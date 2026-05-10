import type { Metadata } from "next";
import { Container, PageHeader } from "../components";

export const metadata: Metadata = {
  title: "Free Growth Audit",
  description:
    "Run a free growth audit for your AI-built website, micro SaaS, indie tool, or small online business.",
};

const websiteTypes = [
  "AI Tool",
  "Micro SaaS",
  "Content Site",
  "Ecommerce",
  "Other",
];

export default function AuditPage() {
  return (
    <>
      <PageHeader
        eyebrow="Run the audit"
        title="Tell us what you are trying to grow"
        description="Share the public basics. The first version does not require login, payment, a database, or an AI API."
      />

      <section className="py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <form
            action="/report"
            method="get"
            className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="grid gap-6">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-800">
                  Website URL
                </span>
                <input
                  required
                  type="url"
                  name="url"
                  placeholder="https://yourwebsite.com"
                  className="min-h-12 rounded-md border border-slate-300 bg-white px-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-800">
                  Website type
                </span>
                <select
                  name="type"
                  defaultValue="AI Tool"
                  className="min-h-12 rounded-md border border-slate-300 bg-white px-4 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                >
                  {websiteTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-800">
                  Target audience
                </span>
                <textarea
                  required
                  name="audience"
                  rows={4}
                  placeholder="Example: indie founders who need a lightweight AI support widget"
                  className="rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-800">
                  Competitors
                  <span className="font-normal text-slate-500"> optional</span>
                </span>
                <input
                  type="text"
                  name="competitors"
                  placeholder="Example: productone.com, tooltwo.ai"
                  className="min-h-12 rounded-md border border-slate-300 bg-white px-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 sm:w-auto"
            >
              Generate Growth Audit
            </button>
          </form>

          <aside className="rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase text-emerald-300">
              What you will get
            </p>
            <h2 className="mt-4 text-3xl font-semibold">
              A practical report for early traffic problems
            </h2>
            <div className="mt-8 grid gap-4">
              {[
                "Overall growth score and five channel scores",
                "Recommended fixes for pages, positioning, and conversion",
                "7-day low-cost growth plan",
                "Suggested SEO and GEO page ideas",
                "Reddit promotion suggestions you can adapt manually",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-md border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm leading-6 text-slate-300">
              This demo report uses simulated analysis only. It does not crawl
              your site, store submitted data, or connect to external APIs.
            </p>
          </aside>
        </Container>
      </section>
    </>
  );
}
