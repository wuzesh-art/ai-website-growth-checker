import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

export const runtime = "nodejs";

type AuditRequest = {
  url?: unknown;
  websiteType?: unknown;
  targetAudience?: unknown;
  competitors?: unknown;
};

type AuditInput = {
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

type Priority = "High" | "Medium" | "Low";
type Effort = "Low" | "Medium" | "High";
type Impact = "SEO" | "GEO" | "Conversion" | "Reddit" | "Content";

type Scores = {
  overall: number;
  seo: number;
  geo: number;
  reddit: number;
  content: number;
  conversion: number;
};

type RecommendedFix = {
  title: string;
  priority: Priority;
  effort: Effort;
  impact: Impact;
  whyItMatters: string;
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

const REQUEST_TIMEOUT_MS = 10_000;
const MAX_REDIRECTS = 5;

function jsonError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

function getString(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function normalizeSubmittedUrl(rawUrl: string) {
  const trimmed = rawUrl.trim();

  if (!trimmed) {
    throw new Error("Please enter a website URL.");
  }

  const withProtocol = /^[a-z][a-z\d+\-.]*:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  let url: URL;
  try {
    url = new URL(withProtocol);
  } catch {
    throw new Error("Please enter a valid website URL.");
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Only http and https URLs can be audited.");
  }

  if (url.username || url.password) {
    throw new Error("URLs with usernames or passwords are not allowed.");
  }

  return url;
}

function stripHostnameBrackets(hostname: string) {
  return hostname.replace(/^\[/, "").replace(/\]$/, "").toLowerCase();
}

function ipToNumber(ip: string) {
  return ip
    .split(".")
    .reduce((total, octet) => total * 256 + Number.parseInt(octet, 10), 0);
}

function isInCidr(ip: string, base: string, bits: number) {
  const mask = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0;
  return (ipToNumber(ip) & mask) === (ipToNumber(base) & mask);
}

function isBlockedIPv4(ip: string) {
  return [
    ["0.0.0.0", 8],
    ["10.0.0.0", 8],
    ["100.64.0.0", 10],
    ["127.0.0.0", 8],
    ["169.254.0.0", 16],
    ["172.16.0.0", 12],
    ["192.0.0.0", 24],
    ["192.0.2.0", 24],
    ["192.168.0.0", 16],
    ["198.18.0.0", 15],
    ["198.51.100.0", 24],
    ["203.0.113.0", 24],
    ["224.0.0.0", 4],
    ["240.0.0.0", 4],
  ].some(([base, bits]) => isInCidr(ip, String(base), Number(bits)));
}

function isBlockedIPv6(ip: string) {
  const normalized = ip.toLowerCase();
  const mappedV4 = normalized.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);

  if (mappedV4) {
    return isBlockedIPv4(mappedV4[1]);
  }

  return (
    normalized === "::" ||
    normalized === "::1" ||
    normalized === "0:0:0:0:0:0:0:0" ||
    normalized === "0:0:0:0:0:0:0:1" ||
    normalized.startsWith("fc") ||
    normalized.startsWith("fd") ||
    normalized.startsWith("fe80:") ||
    normalized.startsWith("2001:db8:")
  );
}

function isBlockedIpAddress(address: string) {
  const ipVersion = isIP(stripHostnameBrackets(address));

  if (ipVersion === 4) {
    return isBlockedIPv4(stripHostnameBrackets(address));
  }

  if (ipVersion === 6) {
    return isBlockedIPv6(stripHostnameBrackets(address));
  }

  return false;
}

async function assertSafeUrl(url: URL) {
  const hostname = stripHostnameBrackets(url.hostname).replace(/\.$/, "");

  if (!hostname) {
    throw new Error("The URL must include a valid hostname.");
  }

  if (hostname === "localhost" || hostname.endsWith(".localhost")) {
    throw new Error("Localhost URLs are not allowed.");
  }

  const ipVersion = isIP(hostname);

  if (ipVersion && isBlockedIpAddress(hostname)) {
    throw new Error("Local, private, or reserved IP addresses are not allowed.");
  }

  if (!ipVersion) {
    let addresses: { address: string }[];

    try {
      addresses = await lookup(hostname, { all: true });
    } catch {
      throw new Error("The website hostname could not be resolved.");
    }

    if (addresses.length === 0) {
      throw new Error("The website hostname did not resolve to an address.");
    }

    if (addresses.some((item) => isBlockedIpAddress(item.address))) {
      throw new Error(
        "This hostname resolves to a local, private, or reserved IP address.",
      );
    }
  }
}

function timeoutSignal() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  return { signal: controller.signal, clear: () => clearTimeout(timeout) };
}

async function safeFetch(
  url: URL,
  init: RequestInit = {},
  redirects = MAX_REDIRECTS,
): Promise<{ response: Response; finalUrl: string }> {
  await assertSafeUrl(url);

  const { signal, clear } = timeoutSignal();
  let response: Response;

  try {
    response = await fetch(url, {
      ...init,
      redirect: "manual",
      signal,
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.8,*/*;q=0.7",
        "User-Agent": "AIWebsiteGrowthChecker/1.0",
        ...init.headers,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("The website request timed out after 10 seconds.");
    }

    throw new Error("The website could not be reached.");
  } finally {
    clear();
  }

  const location = response.headers.get("location");
  const isRedirect =
    response.status >= 300 && response.status < 400 && Boolean(location);

  if (isRedirect) {
    if (redirects <= 0) {
      throw new Error("The website redirected too many times.");
    }

    const nextUrl = new URL(String(location), url);
    return safeFetch(nextUrl, init, redirects - 1);
  }

  return { response, finalUrl: url.toString() };
}

async function resourceExists(origin: string, pathname: string) {
  try {
    const { response } = await safeFetch(new URL(pathname, origin), {
      method: "GET",
    });

    return response.status >= 200 && response.status < 400;
  } catch {
    return false;
  }
}

function cleanText(value: string) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function getAttribute(tag: string, name: string) {
  const pattern = new RegExp(
    `${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s"'=<>` + "`" + `]+))`,
    "i",
  );
  const match = tag.match(pattern);

  return match ? (match[2] ?? match[3] ?? match[4] ?? "").trim() : "";
}

function extractTitle(html: string) {
  const match = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  return match ? cleanText(match[1]) : "";
}

function extractDescription(html: string) {
  const metaTags = html.match(/<meta\b[^>]*>/gi) ?? [];

  for (const tag of metaTags) {
    const name = getAttribute(tag, "name").toLowerCase();
    if (name === "description") {
      return cleanText(getAttribute(tag, "content"));
    }
  }

  return "";
}

function extractH1(html: string) {
  const match = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  return match ? cleanText(match[1]) : "";
}

function hasCanonical(html: string) {
  const linkTags = html.match(/<link\b[^>]*>/gi) ?? [];

  return linkTags.some((tag) =>
    getAttribute(tag, "rel")
      .toLowerCase()
      .split(/\s+/)
      .includes("canonical"),
  );
}

function hasStructuredData(html: string) {
  return /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>/i.test(
    html,
  );
}

function extractLinks(html: string) {
  const links: string[] = [];
  const linkPattern = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(html))) {
    const href = getAttribute(match[1], "href");
    const text = cleanText(match[2]);
    links.push(`${href} ${text}`.toLowerCase());
  }

  return links;
}

function detectLinkedPages(links: string[]) {
  const joined = links.join(" ");

  return {
    hasPricingPage: /\b(pricing|price|plans?)\b/.test(joined),
    hasFaqPage: /\b(faq|faqs|frequently asked|questions)\b/.test(joined),
    hasBlogPage: /\b(blog|articles|resources|insights)\b/.test(joined),
    hasDocsPage: /\b(docs|documentation|developers?|api reference)\b/.test(
      joined,
    ),
    hasComparisonPage:
      /\b(alternative|alternatives|compare|comparison)\b/.test(joined) ||
      /\bvs\.?\b/.test(joined),
    hasUseCasePage:
      /\b(use cases?|solutions?|customers?|workflows?|templates?)\b/.test(
        joined,
      ),
  };
}

function hasClearCta(html: string, links: string[]) {
  const visibleText = cleanText(html).toLowerCase();
  const joinedLinks = links.join(" ");
  const ctaPattern =
    /\b(start free|start audit|get started|try free|try it free|book demo|request demo|contact sales|sign up|create account|subscribe|buy now|download|get access|run audit|launch|install)\b/;

  return ctaPattern.test(visibleText) || ctaPattern.test(joinedLinks);
}

function addIf(condition: boolean, score: number) {
  return condition ? score : 0;
}

function titleLengthIsReasonable(title: string) {
  return title.length >= 30 && title.length <= 65;
}

function descriptionLengthIsReasonable(description: string) {
  return description.length >= 70 && description.length <= 160;
}

function h1IsClear(h1: string) {
  return h1.length >= 12 && h1.length <= 90;
}

function seededScore(seed: string, min: number, spread: number) {
  const total = seed
    .split("")
    .reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 5), 0);
  return min + (total % spread);
}

function clampScore(score: number) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function calculateScores(
  checks: Checks,
  title: string,
  description: string,
  h1: string,
  input: AuditInput,
): Scores {
  let seo =
    addIf(checks.isReachable, 5) +
    addIf(checks.hasTitle, 12) +
    addIf(titleLengthIsReasonable(title), 8) +
    addIf(checks.hasDescription, 12) +
    addIf(descriptionLengthIsReasonable(description), 8) +
    addIf(checks.hasH1, 10) +
    addIf(h1IsClear(h1), 7) +
    addIf(checks.hasCanonical, 10) +
    addIf(checks.hasRobotsTxt, 8) +
    addIf(checks.hasSitemapXml, 10) +
    addIf(checks.hasStructuredData, 10);

  if (!checks.hasStructuredData) {
    seo = Math.min(seo, 82);
  }
  if (!checks.hasCanonical) {
    seo = Math.min(seo, 86);
  }
  if (!checks.hasSitemapXml) {
    seo = Math.min(seo, 88);
  }

  const geo =
    addIf(checks.hasLlmsTxt, 24) +
    addIf(checks.hasFaqPage, 16) +
    addIf(checks.hasPricingPage, 12) +
    addIf(checks.hasDocsPage, 14) +
    addIf(checks.hasComparisonPage, 16) +
    addIf(checks.hasStructuredData, 18);

  const content =
    addIf(checks.hasBlogPage, 18) +
    addIf(checks.hasFaqPage, 18) +
    addIf(checks.hasPricingPage, 14) +
    addIf(checks.hasDocsPage, 12) +
    addIf(checks.hasComparisonPage, 20) +
    addIf(checks.hasUseCasePage, 18);

  const conversion =
    addIf(h1IsClear(h1), 22) +
    addIf(checks.hasDescription && descriptionLengthIsReasonable(description), 18) +
    addIf(checks.hasPricingPage, 18) +
    addIf(checks.hasFaqPage, 14) +
    addIf(checks.hasClearCta, 18) +
    addIf(checks.hasTitle && titleLengthIsReasonable(title), 10);

  const reddit = seededScore(
    `${input.websiteType}-${input.targetAudience}`,
    input.targetAudience ? 44 : 36,
    input.targetAudience ? 32 : 24,
  );
  const overall =
    seo * 0.28 +
    geo * 0.22 +
    content * 0.2 +
    conversion * 0.2 +
    reddit * 0.1;

  return {
    overall: clampScore(overall),
    seo: clampScore(seo),
    geo: clampScore(geo),
    reddit: clampScore(reddit),
    content: clampScore(content),
    conversion: clampScore(conversion),
  };
}

function buildIssues(
  checks: Checks,
  status: number,
  title: string,
  description: string,
  h1: string,
) {
  const issues: string[] = [];

  if (status >= 400) {
    issues.push(`The homepage returned HTTP ${status}.`);
  }
  if (!checks.hasTitle) {
    issues.push("The homepage is missing a title tag.");
  } else if (!titleLengthIsReasonable(title)) {
    issues.push("The title length is outside the recommended 30-65 range.");
  }
  if (!checks.hasDescription) {
    issues.push("The homepage is missing a meta description.");
  } else if (!descriptionLengthIsReasonable(description)) {
    issues.push(
      "The meta description length is outside the recommended 70-160 range.",
    );
  }
  if (!checks.hasH1) {
    issues.push("The homepage is missing an H1.");
  } else if (!h1IsClear(h1)) {
    issues.push("The H1 is present but may be too short, too long, or unclear.");
  }
  if (!checks.hasCanonical) {
    issues.push("The homepage is missing a canonical URL.");
  }
  if (!checks.hasRobotsTxt) {
    issues.push("robots.txt was not found.");
  }
  if (!checks.hasSitemapXml) {
    issues.push("sitemap.xml was not found.");
  }
  if (!checks.hasLlmsTxt) {
    issues.push("llms.txt was not found.");
  }
  if (!checks.hasStructuredData) {
    issues.push("Structured data was not found on the homepage.");
  }
  if (!checks.hasPricingPage) {
    issues.push("A pricing page was not discoverable from homepage links.");
  }
  if (!checks.hasFaqPage) {
    issues.push("An FAQ page was not discoverable from homepage links.");
  }
  if (!checks.hasBlogPage) {
    issues.push("A blog or resources page was not discoverable from homepage links.");
  }
  if (!checks.hasDocsPage) {
    issues.push("A docs or documentation page was not discoverable from homepage links.");
  }
  if (!checks.hasComparisonPage) {
    issues.push(
      "An alternatives or comparison page was not discoverable from homepage links.",
    );
  }
  if (!checks.hasUseCasePage) {
    issues.push("A use cases, solutions, or templates page was not discoverable from homepage links.");
  }
  if (!checks.hasClearCta) {
    issues.push("A clear homepage CTA was not detected.");
  }

  return issues;
}

function buildRecommendedFixes(
  checks: Checks,
  title: string,
  description: string,
) {
  const fixes: RecommendedFix[] = [];
  const addFix = (fix: RecommendedFix) => fixes.push(fix);

  if (!checks.hasTitle) {
    addFix({
      title: "Add a clear homepage title tag",
      priority: "High",
      effort: "Low",
      impact: "SEO",
      whyItMatters:
        "Search engines and browser previews rely on the title to understand the page topic and buyer intent.",
    });
  } else if (!titleLengthIsReasonable(title)) {
    addFix({
      title: "Rewrite the title to 30-65 characters",
      priority: "Medium",
      effort: "Low",
      impact: "SEO",
      whyItMatters:
        "A concise title is easier to scan in search results and helps keep the main keyword visible.",
    });
  }
  if (!checks.hasDescription) {
    addFix({
      title: "Add a buyer-focused meta description",
      priority: "High",
      effort: "Low",
      impact: "SEO",
      whyItMatters:
        "A description gives searchers and AI summaries a clearer reason to understand and click your result.",
    });
  } else if (!descriptionLengthIsReasonable(description)) {
    addFix({
      title: "Rewrite the meta description to 70-160 characters",
      priority: "Medium",
      effort: "Low",
      impact: "SEO",
      whyItMatters:
        "A focused description improves search snippets and forces clearer positioning for the homepage.",
    });
  }
  if (!checks.hasH1) {
    addFix({
      title: "Add one clear homepage H1",
      priority: "High",
      effort: "Low",
      impact: "Conversion",
      whyItMatters:
        "Visitors need to understand the product category, audience, and outcome within the first few seconds.",
    });
  }
  if (!checks.hasCanonical) {
    addFix({
      title: "Add a canonical tag to the homepage",
      priority: "Medium",
      effort: "Low",
      impact: "SEO",
      whyItMatters:
        "Canonical URLs reduce duplicate page confusion and consolidate ranking signals.",
    });
  }
  if (!checks.hasRobotsTxt) {
    addFix({
      title: "Publish robots.txt",
      priority: "Medium",
      effort: "Low",
      impact: "SEO",
      whyItMatters:
        "robots.txt gives crawlers basic crawl guidance and can point them toward your sitemap.",
    });
  }
  if (!checks.hasSitemapXml) {
    addFix({
      title: "Create sitemap.xml and submit it to Google Search Console",
      priority: "High",
      effort: "Low",
      impact: "SEO",
      whyItMatters:
        "A sitemap helps search engines discover priority pages, especially on small sites with few backlinks.",
    });
  }
  if (!checks.hasLlmsTxt) {
    addFix({
      title: "Add llms.txt",
      priority: "High",
      effort: "Low",
      impact: "GEO",
      whyItMatters:
        "llms.txt gives AI search systems a concise map of your product, audience, and best source pages.",
    });
  }
  if (!checks.hasStructuredData) {
    addFix({
      title: "Add JSON-LD structured data",
      priority: "High",
      effort: "Medium",
      impact: "GEO",
      whyItMatters:
        "Structured data helps search and AI systems interpret your product, organization, FAQ, and offer details.",
    });
  }
  if (!checks.hasPricingPage) {
    addFix({
      title: "Create a pricing page",
      priority: "High",
      effort: "Medium",
      impact: "Conversion",
      whyItMatters:
        "Pricing pages reduce buyer uncertainty and capture high-intent visitors comparing tools.",
    });
  }
  if (!checks.hasFaqPage) {
    addFix({
      title: "Create an FAQ page or homepage FAQ section",
      priority: "High",
      effort: "Medium",
      impact: "Conversion",
      whyItMatters:
        "FAQ content answers objections, supports AI-search snippets, and gives buyers confidence before they click.",
    });
  }
  if (!checks.hasBlogPage) {
    addFix({
      title: "Create a blog or resources hub",
      priority: "Medium",
      effort: "Medium",
      impact: "Content",
      whyItMatters:
        "A resources hub gives you a place to publish problem-aware content instead of relying only on the homepage.",
    });
  }
  if (!checks.hasDocsPage) {
    addFix({
      title: "Create docs or a getting-started page",
      priority: "Medium",
      effort: "Medium",
      impact: "GEO",
      whyItMatters:
        "Documentation gives evaluators and AI search engines concrete setup, integration, and workflow details.",
    });
  }
  if (!checks.hasComparisonPage) {
    addFix({
      title: "Create alternatives and comparison pages",
      priority: "High",
      effort: "Medium",
      impact: "Content",
      whyItMatters:
        "Comparison pages capture high-intent searches from buyers already evaluating options.",
    });
  }
  if (!checks.hasUseCasePage) {
    addFix({
      title: "Create use-case pages for your top audience segments",
      priority: "Medium",
      effort: "Medium",
      impact: "Content",
      whyItMatters:
        "Use-case pages connect your product to specific jobs, workflows, and buyer language.",
    });
  }
  if (!checks.hasClearCta) {
    addFix({
      title: "Add one primary CTA above the fold",
      priority: "High",
      effort: "Low",
      impact: "Conversion",
      whyItMatters:
        "A clear CTA tells interested visitors what to do next and makes low-traffic pages convert better.",
    });
  }

  if (fixes.length === 0) {
    addFix({
      title: "Expand proof, distribution, and bottom-of-funnel depth",
      priority: "Medium",
      effort: "Medium",
      impact: "Content",
      whyItMatters:
        "The core checks look healthy, so the next gains should come from better proof, deeper pages, and consistent distribution.",
    });
  }

  return fixes;
}

function buildTopBlockers(checks: Checks, scores: Scores) {
  const blockers: { text: string; weight: number }[] = [];

  if (!checks.isReachable) {
    blockers.push({
      text: "The homepage is not returning a successful public HTTP response.",
      weight: 100,
    });
  }
  if (scores.geo < 55) {
    blockers.push({
      text: "AI-search readiness is weak because important GEO signals are missing.",
      weight: 92,
    });
  }
  if (!checks.hasLlmsTxt || !checks.hasStructuredData) {
    blockers.push({
      text: "The site is missing llms.txt or structured data, so AI systems get less context.",
      weight: 90,
    });
  }
  if (!checks.hasPricingPage || !checks.hasFaqPage) {
    blockers.push({
      text: "Buyers cannot easily find pricing or FAQ answers from the homepage.",
      weight: 86,
    });
  }
  if (!checks.hasComparisonPage) {
    blockers.push({
      text: "There is no visible comparison or alternatives page for high-intent buyers.",
      weight: 82,
    });
  }
  if (!checks.hasBlogPage || !checks.hasUseCasePage || !checks.hasDocsPage) {
    blockers.push({
      text: "The content architecture is thin for search, use cases, and buyer education.",
      weight: 76,
    });
  }
  if (!checks.hasClearCta) {
    blockers.push({
      text: "The homepage does not show a clear action for interested visitors.",
      weight: 74,
    });
  }
  if (!checks.hasSitemapXml || !checks.hasRobotsTxt || !checks.hasCanonical) {
    blockers.push({
      text: "Search discovery basics need cleanup across sitemap, robots, or canonical tags.",
      weight: 70,
    });
  }

  const unique = new Map<string, number>();
  for (const blocker of blockers) {
    unique.set(blocker.text, Math.max(unique.get(blocker.text) ?? 0, blocker.weight));
  }

  if (unique.size === 0) {
    return [
      "No critical public-signal blocker was detected by this lightweight scan.",
      "The next likely blocker is page depth: proof, examples, use cases, and comparison detail.",
      "Growth will still depend on consistent manual distribution and learning from real buyer conversations.",
    ];
  }

  return [...unique.entries()]
    .map(([text, weight]) => ({ text, weight }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3)
    .map((item) => item.text);
}

function buildFastestNextStep(checks: Checks) {
  if (!checks.hasSitemapXml || !checks.hasRobotsTxt) {
    return "Create sitemap.xml and robots.txt, then submit the sitemap in Google Search Console.";
  }
  if (!checks.hasH1 || !checks.hasTitle || !checks.hasDescription) {
    return "Rewrite the homepage H1, title, and meta description around one clear audience and outcome.";
  }
  if (!checks.hasFaqPage) {
    return "Add a FAQ section with 5 buyer questions about pricing, setup, alternatives, and fit.";
  }
  if (!checks.hasPricingPage) {
    return "Add a pricing page or pricing section linked from the homepage.";
  }
  if (!checks.hasLlmsTxt || !checks.hasStructuredData) {
    return "Add llms.txt and JSON-LD structured data for the product, organization, and key pages.";
  }
  if (!checks.hasComparisonPage) {
    return "Publish one honest alternatives or comparison page for your closest substitute.";
  }

  return "Choose one high-intent page idea, publish it this week, and manually share useful answers in relevant communities.";
}

function buildOneLineDiagnosis(checks: Checks, scores: Scores) {
  const missing: string[] = [];

  if (!checks.hasLlmsTxt) missing.push("llms.txt");
  if (!checks.hasStructuredData) missing.push("structured data");
  if (!checks.hasPricingPage) missing.push("pricing");
  if (!checks.hasFaqPage) missing.push("FAQ");
  if (!checks.hasDocsPage) missing.push("documentation");
  if (!checks.hasComparisonPage) missing.push("comparison content");

  if (scores.seo >= 70 && missing.length > 0) {
    return `Your site has solid technical SEO basics, but it is missing AI-search and conversion assets such as ${missing.slice(0, 4).join(", ")}.`;
  }

  if (scores.overall < 45) {
    return "Your site is reachable, but the growth foundation is thin across search discovery, AI-search readiness, content depth, and conversion clarity.";
  }

  if (scores.conversion < 55) {
    return "Your site has some discoverability signals, but buyers need clearer proof, pricing, FAQ answers, and a stronger next step.";
  }

  if (scores.geo < 55) {
    return "Your traditional SEO foundation is ahead of your AI-search readiness, so GEO pages and structured context should be the next focus.";
  }

  return "Your site has a workable foundation; the next growth gains should come from deeper buyer pages, clearer proof, and consistent manual distribution.";
}

function buildSummary(checks: Checks, scores: Scores) {
  return {
    diagnosis: buildOneLineDiagnosis(checks, scores),
    topBlockers: buildTopBlockers(checks, scores),
    fastestNextStep: buildFastestNextStep(checks),
  };
}

function buildSevenDayPlan(checks: Checks, input: AuditInput) {
  const audience = input.targetAudience || "your target audience";
  const tasks = [
    !checks.hasSitemapXml || !checks.hasRobotsTxt
      ? "Create sitemap.xml, reference it from robots.txt, submit it in Google Search Console, and request indexing for your homepage plus top 5 pages."
      : "Submit or re-submit your sitemap in Google Search Console and request indexing for your homepage plus top 5 pages.",
    !checks.hasTitle || !checks.hasDescription || !checks.hasH1
      ? `Rewrite your homepage H1, title, and meta description around one clear audience: ${audience}.`
      : `Audit your homepage first screen and make the H1, title, and meta description speak to ${audience} with one measurable outcome.`,
    !checks.hasFaqPage
      ? "Create a FAQ section with 5 buyer questions about pricing, setup, results, alternatives, and who the product is for."
      : "Improve the FAQ with 5 sharper buyer questions pulled from sales calls, support messages, or Reddit discussions.",
    !checks.hasLlmsTxt || !checks.hasStructuredData
      ? "Add llms.txt with product, audience, core pages, and use cases, then add JSON-LD for SoftwareApplication, Organization, or FAQ content."
      : "Expand llms.txt and structured data with your newest pricing, docs, FAQ, and comparison pages.",
    !checks.hasComparisonPage
      ? "Create one comparison or alternatives page targeting the most obvious competitor or substitute."
      : "Refresh one comparison page with clearer feature tradeoffs, screenshots, pricing notes, and a direct CTA.",
    `Find 10 Reddit threads where ${audience} ask related questions, then save the exact words they use to describe the problem.`,
    "Answer 3 Reddit threads manually with helpful advice. Do not spam, use fake accounts, manipulate votes, or automate posting; be transparent if you mention your product.",
  ];

  return tasks.map((task, index) => ({
    day: `Day ${index + 1}`,
    title: [
      "Index the site",
      "Sharpen the homepage",
      "Answer buyer objections",
      "Prepare for AI search",
      "Capture comparison intent",
      "Research Reddit demand",
      "Participate manually",
    ][index],
    task,
  }));
}

function productNameFromUrl(url: string) {
  const hostname = new URL(url).hostname.replace(/^www\./, "");
  const firstLabel = hostname.split(".")[0] || "Your product";

  return firstLabel
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function slugify(value: string) {
  return `/${value
    .toLowerCase()
    .replace(/https?:\/\//g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)}`;
}

function buildSuggestedPages(input: AuditInput) {
  const productName = productNameFromUrl(input.url);
  const audience = input.targetAudience || "your target audience";
  const productCategory =
    {
      "AI Tool": "AI tools",
      "Micro SaaS": "micro SaaS products",
      "Content Site": "content sites",
      Ecommerce: "ecommerce tools",
      Other: "online business tools",
    }[input.websiteType] || `${input.websiteType.toLowerCase()} tools`;
  const competitors = input.competitors
    .split(",")
    .map((competitor) => competitor.trim())
    .filter(Boolean)
    .slice(0, 2);

  const pages: SuggestedPage[] = [
    {
      title: `Best ${productCategory} for ${audience}`,
      searchIntent:
        "Problem-aware buyers looking for a shortlist before choosing a tool.",
      whyItHelps:
        "This captures early comparison traffic and lets you define the buying criteria in your category.",
      slug: slugify(`best ${productCategory} for ${audience}`),
    },
    {
      title: `${productName} alternatives`,
      searchIntent:
        "Buyers comparing your product with substitutes and adjacent options.",
      whyItHelps:
        "Alternatives pages catch high-intent searches and explain when your product is the right fit.",
      slug: slugify(`${productName} alternatives`),
    },
  ];

  for (const competitor of competitors) {
    pages.push({
      title: `${productName} vs ${competitor}`,
      searchIntent:
        "Evaluation-stage buyers comparing two specific products.",
      whyItHelps:
        "A transparent comparison page can win trust from visitors who are already close to choosing.",
      slug: slugify(`${productName} vs ${competitor}`),
    });
  }

  return [
    ...pages,
    {
      title: "FAQ page",
      searchIntent:
        "Buyers looking for setup, pricing, security, integration, and fit answers.",
      whyItHelps:
        "FAQ content reduces conversion friction and gives AI search systems concise answer blocks.",
      slug: "/faq",
    },
    {
      title: "Pricing page",
      searchIntent:
        "High-intent visitors checking cost, plan fit, limits, and upgrade paths.",
      whyItHelps:
        "Pricing clarity builds trust and prevents qualified visitors from leaving to compare elsewhere.",
      slug: "/pricing",
    },
    {
      title: `Use cases page for ${audience}`,
      searchIntent:
        "Visitors trying to understand whether the product works for their exact workflow.",
      whyItHelps:
        "Use-case pages turn generic positioning into concrete jobs, examples, and outcomes.",
      slug: slugify(`use cases for ${audience}`),
    },
  ];
}

function buildRedditSuggestions(input: AuditInput) {
  const audience = input.targetAudience || "your target audience";
  const websiteType = input.websiteType || "your product category";

  const suggestions: RedditSuggestion[] = [
    {
      step: "1",
      title: "Find real demand manually",
      detail: `Search Reddit for ${audience} discussing the problem your ${websiteType} solves. Save 10 threads before you mention your product anywhere.`,
    },
    {
      step: "2",
      title: "Follow the safety rules",
      detail:
        "No spam, no fake accounts, no vote manipulation, no automated posting, and no repeated copy-paste promotion across communities.",
    },
    {
      step: "3",
      title: "Answer questions before linking",
      detail:
        "Write a helpful manual answer first. Only share your product when it directly helps the thread, and be transparent that you are connected to it.",
    },
    {
      step: "4",
      title: "Use Reddit language on the website",
      detail:
        "Turn repeated objections and phrases into FAQ, comparison, pricing, and use-case copy.",
    },
    {
      step: "5",
      title: "Track learning, not vanity",
      detail:
        "Measure useful replies, objections, and page ideas. Treat Reddit as customer research and trust-building, not a traffic shortcut.",
    },
  ];

  return suggestions;
}

export async function POST(request: Request) {
  let body: AuditRequest;

  try {
    body = (await request.json()) as AuditRequest;
  } catch {
    return jsonError("The request body must be valid JSON.");
  }

  let normalizedUrl: URL;

  try {
    normalizedUrl = normalizeSubmittedUrl(getString(body.url));
    await assertSafeUrl(normalizedUrl);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Invalid URL.");
  }

  const input: AuditInput = {
    url: normalizedUrl.toString(),
    websiteType: getString(body.websiteType, "Other") || "Other",
    targetAudience: getString(body.targetAudience),
    competitors: getString(body.competitors),
  };

  let response: Response;
  let finalUrl: string;

  try {
    const result = await safeFetch(normalizedUrl, { method: "GET" });
    response = result.response;
    finalUrl = result.finalUrl;
  } catch (error) {
    return jsonError(
      error instanceof Error
        ? error.message
        : "The website could not be reached.",
      422,
    );
  }

  const html = await response.text();
  const title = extractTitle(html);
  const description = extractDescription(html);
  const h1 = extractH1(html);
  const finalOrigin = new URL(finalUrl).origin;
  const links = extractLinks(html);
  const linkedPages = detectLinkedPages(links);
  const [hasRobotsTxt, hasSitemapXml, hasLlmsTxt] = await Promise.all([
    resourceExists(finalOrigin, "/robots.txt"),
    resourceExists(finalOrigin, "/sitemap.xml"),
    resourceExists(finalOrigin, "/llms.txt"),
  ]);

  const checks: Checks = {
    isReachable: response.status >= 200 && response.status < 400,
    hasTitle: Boolean(title),
    hasDescription: Boolean(description),
    hasH1: Boolean(h1),
    hasCanonical: hasCanonical(html),
    hasRobotsTxt,
    hasSitemapXml,
    hasLlmsTxt,
    hasStructuredData: hasStructuredData(html),
    hasClearCta: hasClearCta(html, links),
    ...linkedPages,
  };
  const scores = calculateScores(checks, title, description, h1, input);
  const issues = buildIssues(checks, response.status, title, description, h1);

  return Response.json({
    input,
    site: {
      finalUrl,
      status: response.status,
      title,
      description,
      h1,
    },
    checks,
    scores,
    summary: buildSummary(checks, scores),
    issues,
    recommendedFixes: buildRecommendedFixes(checks, title, description),
    sevenDayPlan: buildSevenDayPlan(checks, input),
    suggestedPages: buildSuggestedPages(input),
    redditSuggestions: buildRedditSuggestions(input),
  });
}
