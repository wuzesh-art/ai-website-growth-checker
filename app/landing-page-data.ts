export type LandingPage = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  searchIntent: string;
  checkIntro: string;
  checks: string[];
  audiences: string[];
  whyTitle: string;
  whyParagraphs: string[];
  auditChecks: {
    title: string;
    text: string;
  }[];
  steps: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  related: {
    href: string;
    label: string;
    text: string;
  }[];
  finalCtaTitle: string;
  finalCtaText: string;
};

export const landingPages = {
  aiWebsiteGrowthChecker: {
    slug: "/ai-website-growth-checker",
    metaTitle: "AI Website Growth Checker for AI-Built Websites",
    metaDescription:
      "Use AI Website Growth Checker to find why your AI-built website has no traffic. Check SEO, GEO, Reddit opportunities, content gaps, and conversion basics.",
    eyebrow: "AI website growth checker",
    h1: "AI Website Growth Checker for AI-built sites with no traffic",
    intro:
      "AI Website Growth Checker helps founders understand why a site built with AI coding tools is not getting visitors, leads, or useful search visibility.",
    searchIntent:
      "You are looking for a practical tool that checks why an AI-built website has no traffic and what to fix first.",
    checkIntro:
      "This page is for teams that shipped fast, but now need a growth audit that connects technical search basics with content, AI search, Reddit, and conversion signals.",
    checks: [
      "Whether the homepage can be reached and returns a usable HTTP status.",
      "Whether the title, meta description, H1, canonical tag, robots.txt, and sitemap.xml are present.",
      "Whether the site has AI-search signals such as llms.txt, structured data, FAQ content, pricing, docs, and comparison pages.",
      "Whether the homepage gives visitors a clear next step instead of making them guess what to do.",
    ],
    audiences: [
      "solo founders who launched with AI coding tools",
      "non-technical founders trying to diagnose traffic problems",
      "product managers validating an AI-built side project",
      "indie hackers and AI tool builders who need low-cost growth ideas",
    ],
    whyTitle: "Why AI-built websites often need a different growth check",
    whyParagraphs: [
      "AI can help you create a polished page quickly, but it does not guarantee search intent, buyer language, internal links, comparison pages, or a distribution plan.",
      "Many new AI-built sites look finished while still missing the public signals that search engines, AI answer engines, and cautious buyers use to understand trust and relevance.",
      "A useful growth checker should not only say whether tags exist. It should show what is missing across SEO, GEO, Reddit demand, content depth, and conversion readiness.",
    ],
    auditChecks: [
      {
        title: "SEO readiness",
        text: "Checks homepage metadata, crawl files, canonical setup, H1 clarity, and structured data basics.",
      },
      {
        title: "GEO readiness",
        text: "Looks for llms.txt, FAQ pages, documentation, pricing, comparison content, and AI-readable context.",
      },
      {
        title: "Distribution fit",
        text: "Highlights whether your site has enough problem framing to support careful, manual Reddit participation.",
      },
      {
        title: "Conversion basics",
        text: "Reviews whether visitors can understand the offer, see the next step, and find buyer objections answered.",
      },
    ],
    steps: [
      "Open the free audit form and enter your live website URL.",
      "Choose your website type and describe the audience you want to reach.",
      "Add competitors if you know them, especially tools buyers compare you against.",
      "Review the report and start with the highest-priority fixes before publishing more content.",
    ],
    faqs: [
      {
        question: "Is this only for websites built with AI?",
        answer:
          "No. It is designed around AI-built websites, but the same checks also help micro SaaS products, indie tools, and small business websites.",
      },
      {
        question: "Does the checker need my login or private data?",
        answer:
          "No. The audit checks public website signals only. You do not need to create an account, add payment details, or submit sensitive information.",
      },
      {
        question: "Can it tell me exactly why I have no traffic?",
        answer:
          "It cannot replace analytics or customer research, but it can quickly surface common growth blockers such as missing sitemap files, thin buyer pages, weak AI-search signals, and unclear conversion paths.",
      },
      {
        question: "What should I do after running the audit?",
        answer:
          "Start with the fastest next step in the report, then work through the recommended fixes and the 7-day growth plan.",
      },
    ],
    related: [
      {
        href: "/",
        label: "Home",
        text: "See the main AI Website Growth Checker overview.",
      },
      {
        href: "/free-website-growth-audit",
        label: "Free Website Growth Audit",
        text: "Compare this with the broader free audit use case.",
      },
      {
        href: "/blog",
        label: "Blog",
        text: "Read growth notes for small websites and micro SaaS products.",
      },
    ],
    finalCtaTitle: "Find the first growth blockers on your AI-built website",
    finalCtaText:
      "Run a free audit and get a practical report across SEO, GEO, Reddit opportunities, content gaps, and conversion basics.",
  },
  freeWebsiteGrowthAudit: {
    slug: "/free-website-growth-audit",
    metaTitle: "Free Website Growth Audit",
    metaDescription:
      "Run a free website growth audit to check SEO basics, content gaps, conversion friction, AI-search readiness, and low-cost acquisition opportunities.",
    eyebrow: "Free website growth audit",
    h1: "Free website growth audit for small online businesses",
    intro:
      "Get a practical first-pass audit of the public signals that affect whether a small website can earn search traffic, explain its offer, and turn visitors into the next step.",
    searchIntent:
      "You want a free way to check SEO, content, conversion, and acquisition problems before paying for complex tools or consultants.",
    checkIntro:
      "This audit is built for owners who need a plain-English list of growth issues, not another dashboard full of metrics without next steps.",
    checks: [
      "Whether your homepage has the metadata and crawl basics needed for search discovery.",
      "Whether buyers can find pricing, FAQ, docs, use cases, and comparison content from the homepage.",
      "Whether the site gives AI search systems enough structured context to understand what you offer.",
      "Whether your audience and category are specific enough to support content and Reddit research.",
    ],
    audiences: [
      "small website owners who need a no-cost growth diagnosis",
      "micro SaaS founders before they invest in paid ads",
      "indie hackers deciding which pages to build next",
      "product managers testing a new online tool or internal launch",
    ],
    whyTitle: "Why a free audit is useful before buying growth software",
    whyParagraphs: [
      "Early traffic problems are often caused by missing basics: no sitemap, vague metadata, no pricing page, thin FAQ answers, or no comparison content for buyers who are already evaluating options.",
      "A free audit helps you separate quick fixes from bigger strategic work. Sometimes the best first move is not a new campaign, but a clearer homepage, crawlable pages, and better buyer education.",
      "For small sites, low-cost growth usually comes from fixing discoverability and trust before scaling content, Reddit participation, partnerships, or paid acquisition.",
    ],
    auditChecks: [
      {
        title: "Search setup",
        text: "Checks whether your homepage and crawl files give search engines a clean starting point.",
      },
      {
        title: "Content gaps",
        text: "Looks for missing buyer pages such as FAQ, pricing, docs, use cases, blog, and comparison pages.",
      },
      {
        title: "Conversion friction",
        text: "Reviews whether the site has a clear H1, useful description, and obvious CTA path.",
      },
      {
        title: "Acquisition clues",
        text: "Uses your website type and audience to suggest low-cost channels and Reddit research steps.",
      },
    ],
    steps: [
      "Enter your public website URL in the free audit form.",
      "Select the website type that best matches your business.",
      "Describe your target audience in plain language.",
      "Use the score, checks, and recommended fixes to choose one week of focused growth work.",
    ],
    faqs: [
      {
        question: "Is the website growth audit really free?",
        answer:
          "Yes. The first version is free and does not require login, payment, a database account, or an AI API key.",
      },
      {
        question: "What does the audit look at?",
        answer:
          "It checks public website signals including homepage status, title, description, H1, canonical tag, robots.txt, sitemap.xml, llms.txt, structured data, and linked growth pages.",
      },
      {
        question: "Will this crawl my entire website?",
        answer:
          "No. The MVP focuses on the homepage and common public files. That keeps the audit lightweight and fast while still finding many early growth blockers.",
      },
      {
        question: "Who should use this audit?",
        answer:
          "It is best for solo founders, micro SaaS teams, indie hackers, AI tool builders, and small website owners who need practical growth priorities.",
      },
    ],
    related: [
      {
        href: "/",
        label: "Home",
        text: "Learn what AI Website Growth Checker does.",
      },
      {
        href: "/ai-website-growth-checker",
        label: "AI Website Growth Checker",
        text: "Use the product-focused page for AI-built website traffic problems.",
      },
      {
        href: "/blog",
        label: "Blog",
        text: "Browse growth guides and examples for small sites.",
      },
    ],
    finalCtaTitle: "Run a free growth audit before guessing what to fix",
    finalCtaText:
      "Check your site for SEO basics, GEO readiness, content gaps, Reddit opportunities, and conversion blockers.",
  },
} satisfies Record<string, LandingPage>;

export const growthToolLinks = Object.values(landingPages).map((page) => ({
  href: page.slug,
  title: page.eyebrow,
  description: page.searchIntent,
}));
