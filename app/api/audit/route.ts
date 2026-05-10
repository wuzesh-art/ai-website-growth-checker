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
  };
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

function calculateScores(
  checks: Checks,
  title: string,
  description: string,
  h1: string,
  input: AuditInput,
) {
  const seo =
    addIf(checks.hasTitle, 15) +
    addIf(titleLengthIsReasonable(title), 10) +
    addIf(checks.hasDescription, 15) +
    addIf(descriptionLengthIsReasonable(description), 10) +
    addIf(checks.hasH1, 15) +
    addIf(checks.hasCanonical, 10) +
    addIf(checks.hasRobotsTxt, 10) +
    addIf(checks.hasSitemapXml, 10) +
    addIf(checks.hasStructuredData, 5);

  const geo =
    addIf(checks.hasLlmsTxt, 25) +
    addIf(checks.hasFaqPage, 15) +
    addIf(checks.hasPricingPage, 10) +
    addIf(checks.hasDocsPage, 15) +
    addIf(checks.hasComparisonPage, 15) +
    addIf(checks.hasStructuredData, 20);

  const content =
    addIf(checks.hasFaqPage, 20) +
    addIf(checks.hasBlogPage, 20) +
    addIf(checks.hasPricingPage, 15) +
    addIf(checks.hasComparisonPage, 25) +
    addIf(checks.hasDocsPage, 20);

  const conversion =
    addIf(checks.hasTitle, 20) +
    addIf(checks.hasDescription, 20) +
    addIf(checks.hasPricingPage, 20) +
    addIf(checks.hasFaqPage, 20) +
    addIf(h1IsClear(h1), 20);

  const reddit = seededScore(
    `${input.websiteType}-${input.targetAudience}`,
    input.targetAudience ? 55 : 45,
    input.targetAudience ? 31 : 21,
  );

  return {
    overall: Math.round((seo + geo + reddit + content + conversion) / 5),
    seo,
    geo,
    reddit,
    content,
    conversion,
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

  return issues;
}

function buildRecommendedFixes(checks: Checks, title: string, description: string) {
  const fixes: string[] = [];

  if (!checks.hasTitle) {
    fixes.push("Add a clear homepage title tag that names the product category and target buyer.");
  } else if (!titleLengthIsReasonable(title)) {
    fixes.push("Rewrite the title tag to fit roughly 30-65 characters while keeping the main search intent.");
  }
  if (!checks.hasDescription) {
    fixes.push("Add a concise meta description that explains who the site helps and what outcome it delivers.");
  } else if (!descriptionLengthIsReasonable(description)) {
    fixes.push("Rewrite the meta description to fit roughly 70-160 characters and include a clear value proposition.");
  }
  if (!checks.hasH1) {
    fixes.push("Add one clear H1 on the homepage that states the core customer problem and product category.");
  }
  if (!checks.hasCanonical) {
    fixes.push("Add a canonical tag to the homepage to reduce duplicate URL confusion.");
  }
  if (!checks.hasRobotsTxt) {
    fixes.push("Create a robots.txt file so crawlers can discover your preferred crawl rules.");
  }
  if (!checks.hasSitemapXml) {
    fixes.push("Create sitemap.xml and submit it to Google Search Console.");
  }
  if (!checks.hasLlmsTxt) {
    fixes.push("Add llms.txt to summarize your product, important pages, and citation-friendly information for AI search.");
  }
  if (!checks.hasStructuredData) {
    fixes.push("Add JSON-LD structured data for the organization, software app, product, or FAQ content where relevant.");
  }
  if (!checks.hasPricingPage) {
    fixes.push("Create a pricing page or pricing section so buyers can quickly understand cost and plan fit.");
  }
  if (!checks.hasFaqPage) {
    fixes.push("Create an FAQ page that answers setup, pricing, comparison, security, and buying questions.");
  }
  if (!checks.hasBlogPage) {
    fixes.push("Create a blog or resources page for problem-aware search content and product education.");
  }
  if (!checks.hasDocsPage) {
    fixes.push("Create a docs or getting-started page if users need setup steps, integrations, API details, or workflows.");
  }
  if (!checks.hasComparisonPage) {
    fixes.push("Create alternatives and comparison pages for buyers researching competing tools.");
  }

  if (fixes.length === 0) {
    fixes.push("The homepage covers the core technical checks. Next, improve depth, proof, and distribution consistency.");
  }

  return fixes;
}

function buildSevenDayPlan(checks: Checks) {
  const tasks = [
    !checks.hasTitle || !checks.hasDescription
      ? "Rewrite the homepage title and meta description around the main buyer, use case, and outcome."
      : "Review the homepage title and meta description against the highest-intent keyword you want to win.",
    !checks.hasH1
      ? "Add one clear H1 and align the first screen around a single product promise."
      : "Tighten the H1 and first-screen CTA so visitors understand the product in five seconds.",
    !checks.hasSitemapXml || !checks.hasRobotsTxt
      ? "Publish robots.txt and sitemap.xml, then submit the sitemap in Google Search Console."
      : "Review indexation in Google Search Console and make sure priority pages are linked from the homepage.",
    !checks.hasLlmsTxt || !checks.hasStructuredData
      ? "Add llms.txt and JSON-LD structured data to make the site easier for AI search systems to understand."
      : "Improve answer-ready sections with concise definitions, examples, and source-friendly summaries.",
    !checks.hasPricingPage || !checks.hasFaqPage
      ? "Create or improve pricing and FAQ pages to answer common buying objections."
      : "Add stronger proof, objections, and plan-fit details to the pricing and FAQ experience.",
    !checks.hasComparisonPage || !checks.hasBlogPage
      ? "Draft one comparison or alternatives page and one problem-focused blog article."
      : "Expand existing content with one use-case page and one competitor comparison page.",
    "Manually research Reddit conversations, answer two relevant threads helpfully, and avoid spam, automation, or fake accounts.",
  ];

  return tasks.map((task, index) => ({
    day: `Day ${index + 1}`,
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

  const pages = [
    `Best ${productCategory} for ${audience}`,
    `${productName} alternatives`,
  ];

  for (const competitor of competitors) {
    pages.push(`${productName} vs ${competitor}`);
  }

  return [
    ...pages,
    "FAQ page",
    "Pricing page",
    `Use cases page for ${audience}`,
  ];
}

function buildRedditSuggestions(input: AuditInput) {
  const audience = input.targetAudience || "your target audience";
  const websiteType = input.websiteType || "your product category";

  return [
    `Manually search Reddit for ${audience} discussing the problem your ${websiteType} solves before you mention your product.`,
    "Do not spam, automate posting, use fake accounts, or mass-post the same message across communities.",
    "Be transparent when you are connected to the product, answer the question first, and share the link only when it is genuinely useful.",
    "Turn repeated Reddit objections into FAQ, comparison, pricing, and use-case content on your website.",
    "Track useful phrases from real discussions and use them to improve homepage copy and article briefs.",
  ];
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
    issues,
    recommendedFixes: buildRecommendedFixes(checks, title, description),
    sevenDayPlan: buildSevenDayPlan(checks),
    suggestedPages: buildSuggestedPages(input),
    redditSuggestions: buildRedditSuggestions(input),
  });
}
