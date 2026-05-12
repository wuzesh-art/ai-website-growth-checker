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
      "Check SEO basics for AI-built websites: title, description, H1, canonical, robots.txt, sitemap.xml, and structured data.",
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
      "Check if your AI website is easy for ChatGPT, Perplexity, and Gemini to understand with llms.txt, structured data, FAQ, docs, and comparison pages.",
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
  redditMarketingCheckerForSaas: {
    slug: "/reddit-marketing-checker-for-saas",
    metaTitle: "Reddit Marketing Checker for SaaS",
    metaDescription:
      "Check whether your SaaS is ready for low-cost Reddit marketing without spam, fake accounts, automated posting, or vote manipulation.",
    eyebrow: "Reddit marketing checker for SaaS",
    h1: "Reddit Marketing Checker for SaaS",
    intro:
      "Use this Reddit marketing checker to understand whether your SaaS has the positioning, proof, and helpful content needed for ethical community participation.",
    searchIntent:
      "You want to know whether your SaaS product is a fit for low-cost Reddit promotion and how to avoid spam, bans, and low-quality outreach.",
    checkIntro:
      "This page helps SaaS founders think through Reddit readiness before they post: the product context, buyer questions, landing pages, and manual participation rules that make community work safer.",
    checks: [
      "Whether your site clearly explains the problem, audience, and use case before you mention it in a discussion.",
      "Whether you have FAQ, pricing, comparison, and use-case pages that can answer objections raised in Reddit threads.",
      "Whether your homepage and content give enough context to answer questions manually without dropping a naked product link.",
      "Whether your growth plan respects Reddit norms: no spam, no fake accounts, no automated posting, and no vote manipulation.",
    ],
    audiences: [
      "SaaS founders testing low-cost distribution channels",
      "indie hackers who want Reddit research without burning trust",
      "micro SaaS teams looking for problem-aware communities",
      "AI tool builders who need transparent, helpful launch conversations",
    ],
    whyTitle: "Why Reddit marketing only works when it starts with trust",
    whyParagraphs: [
      "Reddit can be useful for SaaS discovery, but it punishes lazy promotion quickly. If your first move is to paste a link, use fake accounts, automate posting, or manipulate votes, the channel can damage trust instead of creating demand.",
      "The safer path is slower and more useful: find real questions, answer manually, be transparent when mentioning your product, and turn repeated objections into better website content.",
      "A Reddit-ready SaaS site should make it easy to explain who the product helps, what problem it solves, how pricing works, and how it compares with alternatives before you ever join a thread.",
    ],
    auditChecks: [
      {
        title: "Message clarity",
        text: "Checks whether the homepage has a clear title, description, H1, and CTA that can support a helpful Reddit answer.",
      },
      {
        title: "Buyer objection pages",
        text: "Looks for FAQ, pricing, docs, comparison, and use-case pages that answer the questions people ask in communities.",
      },
      {
        title: "Content gap signals",
        text: "Highlights missing pages you can create from repeated Reddit questions before doing more outreach.",
      },
      {
        title: "Manual promotion readiness",
        text: "Keeps Reddit suggestions focused on manual answers, transparency, and research instead of automation or spam.",
      },
    ],
    steps: [
      "Run the audit and review whether your homepage explains the product clearly enough for a cold reader.",
      "Fix missing FAQ, pricing, comparison, and use-case pages before linking to your product in discussions.",
      "Search manually for 10 relevant Reddit threads and save the exact words users use to describe the problem.",
      "Answer questions manually, be transparent when mentioning your product, and avoid spam, fake accounts, automated posting, and vote manipulation.",
    ],
    faqs: [
      {
        question: "Can this checker tell me which subreddits to post in?",
        answer:
          "The MVP does not scrape Reddit or recommend specific subreddits. It helps you prepare the website and manual research process before you participate in communities.",
      },
      {
        question: "What is the safest way to mention my SaaS on Reddit?",
        answer:
          "Answer the question first, be transparent if you are connected to the product, and share a link only when it directly helps the thread. Do not spam, use fake accounts, automate posting, or manipulate votes.",
      },
      {
        question: "Why does website content matter for Reddit marketing?",
        answer:
          "If Reddit users click through and find vague copy, no pricing, no FAQ, and no comparison context, the discussion will not turn into trust. Good pages make helpful answers more credible.",
      },
      {
        question: "Can Reddit work for small SaaS products?",
        answer:
          "Yes, when the product solves a real problem discussed in a niche community and the founder participates manually with useful answers instead of treating Reddit as an ad board.",
      },
    ],
    related: [
      {
        href: "/",
        label: "Home",
        text: "See how AI Website Growth Checker covers SEO, GEO, Reddit, content, and conversion.",
      },
      {
        href: "/blog",
        label: "Blog",
        text: "Read growth notes for small websites, SaaS tools, and indie founders.",
      },
      {
        href: "/ai-website-growth-checker",
        label: "AI Website Growth Checker",
        text: "Diagnose why an AI-built website may not be getting traffic.",
      },
      {
        href: "/free-website-growth-audit",
        label: "Free Website Growth Audit",
        text: "Run a broader audit across SEO, content, conversion, and acquisition.",
      },
      {
        href: "/seo-checker-for-ai-built-websites",
        label: "SEO Checker for AI-Built Websites",
        text: "Check whether the site has search basics before doing outreach.",
      },
      {
        href: "/geo-checker-for-ai-websites",
        label: "GEO Checker for AI Websites",
        text: "Review AI-search readiness signals that make your product easier to understand.",
      },
    ],
    finalCtaTitle: "Check whether your SaaS is ready for ethical Reddit growth",
    finalCtaText:
      "Run a free audit before you post, so your website can support helpful manual answers and avoid low-quality promotion.",
  },
  contentGapAnalysisForMicroSaas: {
    slug: "/content-gap-analysis-for-micro-saas",
    metaTitle: "Content Gap Analysis for Micro SaaS",
    metaDescription:
      "Find missing SEO and GEO pages for your micro SaaS: FAQ, comparison, alternatives, use case, pricing, problem-solution pages, and AI-search summaries.",
    eyebrow: "Content gap analysis for micro SaaS",
    h1: "Content Gap Analysis for Micro SaaS",
    intro:
      "Use this content gap analysis page to find which SEO and GEO pages your micro SaaS is missing and which ones to create first.",
    searchIntent:
      "You want to know why your micro SaaS website has no traffic, which pages are missing, and what to prioritize before writing more generic blog posts.",
    checkIntro:
      "This page focuses on content gaps that block organic discovery and buyer trust: FAQ pages, comparison pages, alternatives pages, use case pages, pricing pages, problem-solution pages, and AI-search friendly summaries.",
    checks: [
      "Whether your homepage links to buyer pages such as FAQ, pricing, docs, blog, comparison, alternatives, and use cases.",
      "Whether your site has enough problem-solution content for visitors who know the pain but not your product.",
      "Whether your pages are useful for both search engines and AI answer tools that need concise summaries and context.",
      "Whether your content plan should start with bottom-of-funnel pages before broad educational articles.",
    ],
    audiences: [
      "micro SaaS founders deciding which pages to build next",
      "solo founders with a thin landing page and low search traffic",
      "indie hackers who need SEO and GEO content priorities",
      "small SaaS teams trying to turn buyer questions into pages",
    ],
    whyTitle: "Why micro SaaS sites often need pages before more posts",
    whyParagraphs: [
      "Many micro SaaS websites publish broad blog posts while missing the pages buyers actually search for: pricing, FAQ, alternatives, comparisons, use cases, and problem-solution pages.",
      "Content gaps also affect AI search. If your site does not provide concise summaries, clear use cases, and answer-ready buyer information, AI tools have less context to explain or recommend your product.",
      "A practical content gap analysis should help you prioritize the pages closest to demand first, then expand into broader education once the buying path is clear.",
    ],
    auditChecks: [
      {
        title: "Buyer page coverage",
        text: "Checks whether pricing, FAQ, docs, blog, comparison, and use-case links are discoverable from the homepage.",
      },
      {
        title: "Comparison and alternatives gaps",
        text: "Highlights whether your site has pages for buyers who are already evaluating substitutes or competitors.",
      },
      {
        title: "Problem-solution opportunities",
        text: "Uses your website type and audience to suggest pages that connect buyer pain to your product category.",
      },
      {
        title: "AI-search friendly summaries",
        text: "Reviews GEO signals such as structured data and llms.txt that make content easier for AI tools to interpret.",
      },
    ],
    steps: [
      "Run the free audit and review the Content Gap score plus the Suggested SEO/GEO Pages section.",
      "Create or improve FAQ, pricing, comparison, alternatives, and use case pages before broad top-of-funnel content.",
      "Add problem-solution pages that use the exact language your target users use to describe the pain.",
      "Write concise summaries on important pages so search engines, AI tools, and buyers can quickly understand the offer.",
    ],
    faqs: [
      {
        question: "What is a content gap for micro SaaS?",
        answer:
          "A content gap is a missing page or section that buyers, search engines, or AI tools need to understand your product. Common gaps include FAQ, pricing, comparison, alternatives, use case, and problem-solution pages.",
      },
      {
        question: "Should I create blog posts or landing pages first?",
        answer:
          "Most micro SaaS teams should fix bottom-of-funnel pages first: pricing, FAQ, use cases, comparisons, alternatives, and problem-solution pages. Blog posts work better after the buying path is clear.",
      },
      {
        question: "How does this help GEO?",
        answer:
          "AI-search friendly summaries, structured data, llms.txt, FAQ answers, and comparison context make it easier for AI tools to understand what the product does and who it helps.",
      },
      {
        question: "Does the audit write the pages for me?",
        answer:
          "No. It gives page suggestions and priorities. You still write the content, but the report helps you choose the pages most likely to improve discovery and conversion.",
      },
    ],
    related: [
      {
        href: "/",
        label: "Home",
        text: "See how the product checks content gaps alongside SEO, GEO, Reddit, and conversion.",
      },
      {
        href: "/blog",
        label: "Blog",
        text: "Read growth notes for micro SaaS and small online businesses.",
      },
      {
        href: "/ai-website-growth-checker",
        label: "AI Website Growth Checker",
        text: "Diagnose why an AI-built website may not be getting traffic.",
      },
      {
        href: "/free-website-growth-audit",
        label: "Free Website Growth Audit",
        text: "Run the broader audit for SEO, content, conversion, and acquisition issues.",
      },
      {
        href: "/seo-checker-for-ai-built-websites",
        label: "SEO Checker for AI-Built Websites",
        text: "Check metadata, crawl files, canonical tags, and search basics.",
      },
      {
        href: "/geo-checker-for-ai-websites",
        label: "GEO Checker for AI Websites",
        text: "Review llms.txt, structured data, FAQ, docs, and AI-search context.",
      },
    ],
    finalCtaTitle: "Find the missing pages your micro SaaS should build first",
    finalCtaText:
      "Run a free audit to identify content gaps across FAQ, comparison, alternatives, use cases, pricing, problem-solution pages, and AI-search summaries.",
  },
} satisfies Record<string, LandingPage>;

export const growthToolLinks = Object.values(landingPages).map((page) => ({
  href: page.slug,
  title: page.eyebrow,
  description: page.searchIntent,
}));
