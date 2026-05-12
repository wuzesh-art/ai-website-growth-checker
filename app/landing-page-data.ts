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
  seoCheckerForAiBuiltWebsites: {
    slug: "/seo-checker-for-ai-built-websites",
    metaTitle: "SEO Checker for AI-Built Websites",
    metaDescription:
      "Check whether your AI-built website has the SEO basics needed for search visibility, including title, description, H1, canonical, robots, sitemap, and structured data.",
    eyebrow: "SEO checker for AI-built websites",
    h1: "SEO Checker for AI-Built Websites",
    intro:
      "Use this SEO checker to review whether a website built with AI coding tools has the basic search signals needed to be crawled, understood, and improved.",
    searchIntent:
      "You used AI to build a website, but you are not sure whether the SEO setup is good enough for Google and other search engines.",
    checkIntro:
      "This page focuses on the technical and on-page SEO checks that often get missed when founders move quickly from AI-generated code to a live website.",
    checks: [
      "Whether your homepage has a clear title tag, meta description, and H1 that explain the product and audience.",
      "Whether search engines can find crawl signals such as robots.txt, sitemap.xml, and a canonical homepage URL.",
      "Whether the page includes structured data that gives search systems more context about the product or business.",
      "Whether SEO basics connect to buyer pages like pricing, FAQ, docs, and comparison content instead of stopping at the homepage.",
    ],
    audiences: [
      "solo founders who launched a site with AI coding tools",
      "non-technical founders unsure whether their website can rank",
      "product managers reviewing a quick AI-built landing page",
      "AI tool builders who need a practical SEO checklist before content work",
    ],
    whyTitle: "Why AI-built websites can look finished but still miss SEO basics",
    whyParagraphs: [
      "AI-generated sites often produce attractive layouts before they produce a search-ready information architecture. A homepage can look polished while still missing metadata, crawl files, canonical signals, and useful internal links.",
      "For small SaaS and indie products, basic SEO is not only about ranking. It also forces clearer positioning: who the page is for, what problem it solves, and which buyer questions deserve dedicated pages.",
      "A lightweight SEO checker helps you find fixable issues before you publish dozens of blog posts or spend time on channels that send visitors to an unclear site.",
    ],
    auditChecks: [
      {
        title: "Metadata quality",
        text: "Checks title length, description presence, and whether the H1 gives visitors and search engines a clear topic.",
      },
      {
        title: "Crawl discovery",
        text: "Looks for robots.txt and sitemap.xml so search engines have a clean path to discover important pages.",
      },
      {
        title: "Canonical and structure",
        text: "Reviews whether the homepage has a canonical URL and structured data that reduce ambiguity.",
      },
      {
        title: "SEO-to-growth gaps",
        text: "Connects SEO checks with missing pricing, FAQ, blog, docs, and comparison pages that support organic demand.",
      },
    ],
    steps: [
      "Run the free audit with the live URL of your AI-built website.",
      "Review the SEO score and the Technical SEO checks before changing copy.",
      "Fix missing metadata, crawl files, canonical tags, and structured data first.",
      "Use the suggested pages to decide which search-intent pages to build next.",
    ],
    faqs: [
      {
        question: "Is this a full technical SEO crawler?",
        answer:
          "No. The MVP focuses on public homepage and common file checks. It is meant to catch early SEO blockers quickly, not replace a full enterprise crawler.",
      },
      {
        question: "Why does an AI-built website need an SEO checker?",
        answer:
          "AI tools can help generate code and layouts, but they do not always create search-ready metadata, crawl files, canonical tags, structured data, or useful buyer pages.",
      },
      {
        question: "Does the audit check sitemap.xml and robots.txt?",
        answer:
          "Yes. The audit checks whether public robots.txt and sitemap.xml files are available, then includes them in the SEO readiness score.",
      },
      {
        question: "Can this help if my site has no organic traffic yet?",
        answer:
          "Yes. It gives you a baseline for search readiness and shows which public signals to fix before investing in more content.",
      },
    ],
    related: [
      {
        href: "/",
        label: "Home",
        text: "See the full AI Website Growth Checker overview.",
      },
      {
        href: "/blog",
        label: "Blog",
        text: "Read practical growth notes for small websites and SaaS tools.",
      },
      {
        href: "/ai-website-growth-checker",
        label: "AI Website Growth Checker",
        text: "Diagnose why an AI-built website may not be getting traffic.",
      },
      {
        href: "/free-website-growth-audit",
        label: "Free Website Growth Audit",
        text: "Run a broader free audit across SEO, content, conversion, and acquisition.",
      },
    ],
    finalCtaTitle: "Check your AI-built website's SEO basics",
    finalCtaText:
      "Run a free audit to see whether your homepage has the search signals, crawl files, and buyer pages needed for early organic growth.",
  },
  geoCheckerForAiWebsites: {
    slug: "/geo-checker-for-ai-websites",
    metaTitle: "GEO Checker for AI Websites",
    metaDescription:
      "Check whether your AI website is ready for AI search engines like ChatGPT, Perplexity, and Gemini with GEO signals, llms.txt, structured data, FAQ, docs, and comparison pages.",
    eyebrow: "GEO checker for AI websites",
    h1: "GEO Checker for AI Websites",
    intro:
      "Use this GEO checker to see whether your website gives AI search tools enough public context to understand, summarize, and recommend your product.",
    searchIntent:
      "You want to know whether ChatGPT, Perplexity, Gemini, and other AI search experiences can understand what your website does.",
    checkIntro:
      "This page focuses on AI-search readiness: the public files, answer-ready pages, and structured context that help AI systems interpret a small website.",
    checks: [
      "Whether your site has llms.txt to summarize the product, audience, important pages, and source context for AI tools.",
      "Whether the homepage includes structured data that helps machines understand the organization, product, or FAQ content.",
      "Whether visitors and AI systems can find FAQ, pricing, docs, comparison, and use-case pages from the homepage.",
      "Whether your site provides concise answers and enough buyer context instead of relying only on a marketing headline.",
    ],
    audiences: [
      "AI tool builders preparing for AI search discovery",
      "micro SaaS founders who want to be understood by answer engines",
      "indie hackers building comparison and FAQ pages for long-tail demand",
      "small website owners who need clearer public context for their offer",
    ],
    whyTitle: "Why GEO matters for small AI and SaaS websites",
    whyParagraphs: [
      "Generative Engine Optimization is about making your website easier for AI answer systems to parse, cite, and compare. It does not replace SEO, but it adds a new layer of public context.",
      "AI search tools often need direct answers, structured entities, documentation, pricing clarity, and comparison language. A thin homepage rarely gives enough evidence by itself.",
      "For early-stage tools, GEO work is also useful for humans: FAQ pages, docs, pricing explanations, and comparison content help buyers understand whether the product fits their workflow.",
    ],
    auditChecks: [
      {
        title: "llms.txt readiness",
        text: "Checks whether a public llms.txt file exists as a concise map for AI search and assistant tools.",
      },
      {
        title: "Structured data",
        text: "Looks for application/ld+json on the homepage so machines get explicit product or organization context.",
      },
      {
        title: "Answer-ready pages",
        text: "Reviews whether FAQ, docs, pricing, use cases, and comparison pages are discoverable from the homepage.",
      },
      {
        title: "AI-search content gaps",
        text: "Highlights missing pages that make it harder for AI systems to explain what your product does and who it serves.",
      },
    ],
    steps: [
      "Enter your website URL and choose the website type that best matches your product.",
      "Read the GEO score and the GEO / AI Search check group in the report.",
      "Add or improve llms.txt, structured data, FAQ, docs, pricing, and comparison pages.",
      "Use the suggested pages to create answer-ready content that AI systems and buyers can understand.",
    ],
    faqs: [
      {
        question: "What is a GEO checker?",
        answer:
          "A GEO checker reviews whether your website has public signals that help generative search and AI answer tools understand your product, category, audience, and useful source pages.",
      },
      {
        question: "Does this guarantee visibility in ChatGPT or Perplexity?",
        answer:
          "No. No lightweight checker can guarantee AI-search visibility. The audit helps you identify missing signals that make your site harder to understand or cite.",
      },
      {
        question: "Why does llms.txt matter?",
        answer:
          "llms.txt can provide a concise, public guide to your product, important pages, and source context. It is not a ranking guarantee, but it is a practical AI-search readiness signal.",
      },
      {
        question: "Is GEO different from SEO?",
        answer:
          "Yes, but they overlap. SEO focuses on search discovery and ranking signals, while GEO emphasizes answer-ready context, entities, structured data, and pages AI tools can interpret.",
      },
    ],
    related: [
      {
        href: "/",
        label: "Home",
        text: "See how AI Website Growth Checker combines SEO, GEO, Reddit, content, and conversion checks.",
      },
      {
        href: "/blog",
        label: "Blog",
        text: "Read growth notes for small online tools and AI-built websites.",
      },
      {
        href: "/ai-website-growth-checker",
        label: "AI Website Growth Checker",
        text: "Use the broader checker for AI-built websites with no traffic.",
      },
      {
        href: "/free-website-growth-audit",
        label: "Free Website Growth Audit",
        text: "Run a general free growth audit before building more pages.",
      },
    ],
    finalCtaTitle: "Check whether your website is ready for AI search",
    finalCtaText:
      "Run a free audit to find missing GEO signals such as llms.txt, structured data, FAQ, docs, pricing, and comparison pages.",
  },
} satisfies Record<string, LandingPage>;

export const growthToolLinks = Object.values(landingPages).map((page) => ({
  href: page.slug,
  title: page.eyebrow,
  description: page.searchIntent,
}));
