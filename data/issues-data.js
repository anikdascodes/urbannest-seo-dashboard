/* ──────────────────────────────────────────────────────────────
   UrbanNest SEO Dashboard — Technical Issues & Page Speed Data
   ────────────────────────────────────────────────────────────── */
window.UN = window.UN || {};

window.UN.issues = {

  summary: { critical: 4, warnings: 8, notices: 5 },

  critical: [
    {
      id:      "C1",
      title:   "Missing meta descriptions on 3 key pages",
      detail:  "/outdoor, /sale, /blog/category/tips — missing <meta name=\"description\"> tags.",
      impact:  "Lower CTR in SERPs; Google auto-generates descriptions, often poorly.",
      pages:   ["/outdoor", "/sale", "/blog/category/tips"],
      fix:     "Write unique, keyword-rich descriptions (140–160 chars) for each page."
    },
    {
      id:      "C2",
      title:   "Duplicate title tags on paginated product pages",
      detail:  "/products?page=2 through ?page=5 share the same <title> as /products.",
      impact:  "Confuses crawlers; dilutes ranking signal across paginated pages.",
      pages:   ["/products?page=2", "/products?page=3", "/products?page=4", "/products?page=5"],
      fix:     "Add 'Page 2 of 5' suffix to title tags; add rel=prev/next or canonical to page 1."
    },
    {
      id:      "C3",
      title:   "12 broken internal links (404 errors)",
      detail:  "Footer links to /inspiration, /lookbook, and 10 blog tags returning 404.",
      impact:  "Wastes crawl budget; degrades user experience; kills link equity flow.",
      pages:   ["/inspiration", "/lookbook"],
      fix:     "Redirect or update all broken links. Run Screaming Frog to find remaining 404s."
    },
    {
      id:      "C4",
      title:   "No structured data (Schema.org/Product) on product pages",
      detail:  "Product pages lack JSON-LD schema. No price, availability, or rating markup.",
      impact:  "Missing rich snippet eligibility; estimated −25% CTR vs. schema-enabled competitors.",
      pages:   ["/furniture/living-room", "/plants", "/lighting", "/wall-art"],
      fix:     "Add Product schema with name, image, price, availability, and AggregateRating."
    }
  ],

  warnings: [
    {
      id:     "W1",
      title:  "8 product images missing alt text",
      detail: "Decorative and product images on /plants and /outdoor lack descriptive alt attributes.",
      fix:    "Add descriptive alt text: include product name, color, and category."
    },
    {
      id:     "W2",
      title:  "5 pages with thin content (< 300 words)",
      detail: "/outdoor, /kitchen, /lighting, /sale, /blog/category/tips have very little body copy.",
      fix:    "Add descriptive intro copy, FAQ sections, or category descriptions to each page."
    },
    {
      id:     "W3",
      title:  "Canonical tag misconfiguration on blog pagination",
      detail: "/blog/page/2 and /blog/page/3 incorrectly self-canonicalize to themselves.",
      fix:    "Canonical on paginated blog pages should point to /blog (the root page)."
    },
    {
      id:     "W4",
      title:  "Mobile Cumulative Layout Shift (CLS): 0.14 — Poor",
      detail: "Above the 0.10 threshold. Cause: images without explicit width/height, font swap.",
      fix:    "Set explicit width/height on all images; use font-display:swap; avoid injecting content above fold."
    },
    {
      id:     "W5",
      title:  "Mobile Largest Contentful Paint (LCP): 5.8s — Poor",
      detail: "Hero image on homepage is 380 KB uncompressed JPEG. Exceeds 2.5s LCP threshold.",
      fix:    "Compress hero image to WebP (< 80 KB), add loading='eager' and fetchpriority='high'."
    },
    {
      id:     "W6",
      title:  "Slow TTFB on 6 pages (> 600 ms)",
      detail: "Homepage, /plants, /outdoor show Time to First Byte > 600 ms on mobile.",
      fix:    "Enable server-side caching or CDN. Defer non-critical third-party scripts."
    },
    {
      id:     "W7",
      title:  "No hreflang tags for international audiences",
      detail: "UK-targeting keyword 'scandinavian style furniture uk' ranks but has no hreflang.",
      fix:    "Add hreflang='en-gb' and hreflang='en-us' to relevant pages if international sales are a goal."
    },
    {
      id:     "W8",
      title:  "Duplicate H1 tags on 3 pages",
      detail: "/home-decor, /wall-art, and /furniture/living-room each have 2 H1 elements.",
      fix:    "Keep exactly one H1 per page. Move secondary heading to H2."
    }
  ],

  notices: [
    {
      id:     "N1",
      title:  "2 page title tags exceed 60 characters",
      detail: "/furniture/coffee-tables (68 chars) and /lighting/desk-lamps (64 chars).",
      fix:    "Trim titles to < 60 chars to prevent SERP truncation."
    },
    {
      id:     "N2",
      title:  "3 pages missing Open Graph tags",
      detail: "/outdoor, /kitchen, /blog/category/tips have no og:title, og:image, or og:description.",
      fix:    "Add complete OG tag set to every public page for social sharing previews."
    },
    {
      id:     "N3",
      title:  "Sitemap not re-submitted after last major content update",
      detail: "Sitemap was last submitted to Google Search Console on Sep 12 2025. 14 new pages added since.",
      fix:    "Update sitemap.xml with new page URLs and resubmit via Google Search Console."
    },
    {
      id:     "N4",
      title:  "robots.txt blocking /search/ paths unnecessarily",
      detail: "Disallow: /search/ prevents crawling of internal site search result pages (harmless) but also blocks category filter URLs that carry SEO value.",
      fix:    "Review /search/ block. Allow crawlable category filter pages; disallow only facet/sort param URLs."
    },
    {
      id:     "N5",
      title:  "No XML image sitemap",
      detail: "Product and decor images are not listed in an image sitemap.",
      fix:    "Generate an image sitemap and submit to Search Console for image search indexing."
    }
  ],

  contentOpportunities: [
    {
      keyword:    "modern sofa sets",
      volume:     4800,
      currentPos: "Not ranking",
      note:       "No targeting page exists. Create /furniture/sofas with curated sofa collection."
    },
    {
      keyword:    "indoor planter sets",
      volume:     2800,
      currentPos: "Page 3 (pos 24)",
      note:       "Existing /plants page does not mention 'sets'. Add a curated sets section."
    },
    {
      keyword:    "small apartment furniture",
      volume:     6200,
      currentPos: "Page 3 (pos 22)",
      note:       "High-volume, low-competition gap. Create a dedicated /furniture/small-spaces page."
    },
    {
      keyword:    "home decor gift ideas",
      volume:     3400,
      currentPos: "Not ranking",
      note:       "Strong seasonal signal. Create a gift guide blog post for Q4 optimization."
    }
  ]
};

/* ── Core Web Vitals & Page Speed ─────────────────────────────── */
window.UN.pageSpeed = {
  desktop: {
    score:       72,
    fcp:         1.8,   fcpStatus: "good",
    lcp:         3.2,   lcpStatus: "needs-improvement",
    cls:         0.08,  clsStatus: "good",
    fid:         45,    fidStatus: "good",
    tbt:         210,   tbtStatus: "needs-improvement",
    ttfb:        420,   ttfbStatus: "good"
  },
  mobile: {
    score:       51,
    fcp:         3.4,   fcpStatus: "needs-improvement",
    lcp:         5.8,   lcpStatus: "poor",
    cls:         0.14,  clsStatus: "poor",
    fid:         120,   fidStatus: "needs-improvement",
    tbt:         580,   tbtStatus: "poor",
    ttfb:        820,   ttfbStatus: "needs-improvement"
  },
  thresholds: {
    fcp:  { good: 1.8, poor: 3.0 },
    lcp:  { good: 2.5, poor: 4.0 },
    cls:  { good: 0.1, poor: 0.25 },
    fid:  { good: 100, poor: 300 },
    tbt:  { good: 200, poor: 600 },
    ttfb: { good: 600, poor: 1800 }
  }
};

/* ── Prioritised Recommendations ─────────────────────────────── */
window.UN.recommendations = [
  {
    priority: "High",
    title:    "Fix Mobile Core Web Vitals",
    metric:   "Mobile LCP: 5.8s · CLS: 0.14 · TBT: 580ms",
    impact:   "Estimated +18% mobile conversion rate. Required for Google's Page Experience ranking signal.",
    actions: [
      "Compress hero image to WebP < 80 KB, add fetchpriority=\"high\"",
      "Set explicit width/height on all images to eliminate CLS",
      "Defer third-party scripts (chat widget, analytics) with async/defer",
      "Enable CDN caching and Gzip/Brotli compression on server"
    ]
  },
  {
    priority: "High",
    title:    "Add Product Schema Markup to All Product Pages",
    metric:   "0 of 4 core product pages have Schema.org/Product markup",
    impact:   "Estimated +25% CTR from rich snippet (star rating, price) in search results.",
    actions: [
      "Add JSON-LD Product schema: name, image, price, availability, brand",
      "Add AggregateRating where customer reviews exist",
      "Test with Google's Rich Results Test after implementation",
      "Submit updated sitemap after rollout"
    ]
  },
  {
    priority: "High",
    title:    "Recover 4 Declining Keyword Rankings",
    metric:   "buy indoor plants (pos 8→12) · kitchen accessories (12→15) · outdoor planters (14→18) · apartment storage (19→22)",
    impact:   "Recovering these 4 keywords to previous positions = +~780 monthly clicks.",
    actions: [
      "Refresh on-page copy on /plants, /kitchen, /outdoor — add semantic keywords",
      "Improve internal linking from homepage and blog to these pages",
      "Add FAQ schema sections targeting long-tail variants",
      "Build 2–3 topical blog posts to reinforce topical authority for each category"
    ]
  },
  {
    priority: "Medium",
    title:    "Fix 12 Broken Internal Links",
    metric:   "12 internal 404 errors found in footer navigation",
    impact:   "Reduces crawl waste; preserves link equity; improves user experience.",
    actions: [
      "Run Screaming Frog crawl to get full list of 404 URLs",
      "Set up 301 redirects for /inspiration and /lookbook to nearest live pages",
      "Update footer link targets to existing pages",
      "Schedule monthly broken link audit"
    ]
  },
  {
    priority: "Medium",
    title:    "Improve Blog Internal Linking to Reduce Bounce Rate",
    metric:   "/blog bounce rate: 78.3% — highest of any section",
    impact:   "Each 10% reduction in blog bounce = ~40 additional product page sessions/month.",
    actions: [
      "Add 2–3 contextual product links within each blog post body",
      "Add a 'You might also like' product widget at the end of each post",
      "Add related posts section to improve time-on-site",
      "Use breadcrumb navigation to improve crawlability and UX"
    ]
  }
];
