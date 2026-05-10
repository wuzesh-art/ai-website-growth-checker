import type { Metadata } from "next";
import ReportClient, { type ReportInput } from "./report-client";

export const metadata: Metadata = {
  title: "Growth Audit Report",
  description:
    "A real website growth audit report across SEO, GEO, Reddit, content gaps, and conversion readiness.",
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

export default async function ReportPage({
  searchParams,
}: Readonly<{
  searchParams: SearchParams;
}>) {
  const params = await searchParams;
  const input: ReportInput = {
    url: getParam(params, "url"),
    websiteType: getParam(params, "websiteType", getParam(params, "type", "AI Tool")),
    targetAudience: getParam(
      params,
      "targetAudience",
      getParam(params, "audience", ""),
    ),
    competitors: getParam(params, "competitors"),
  };

  return <ReportClient input={input} />;
}
