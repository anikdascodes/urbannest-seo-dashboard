/* ──────────────────────────────────────────────────────────────
   UrbanNest SEO Dashboard — Landing Pages, Device & Source Data
   ────────────────────────────────────────────────────────────── */
window.UN = window.UN || {};

window.UN.pages = [
  {
    url:            "/",
    title:          "UrbanNest – Modern Home Decor & Furniture",
    sessions:       6240, organicSessions: 2808,
    bounceRate:     61.4, avgDuration: "1:42",
    conversionRate: 2.1,  conversions: 131,
    avgPosition:    8.4,  impressions: 42600, clicks: 2808, ctr: 6.6
  },
  {
    url:            "/home-decor",
    title:          "Modern Home Decor Collection | UrbanNest",
    sessions:       4820, organicSessions: 3011,
    bounceRate:     42.1, avgDuration: "2:54",
    conversionRate: 3.8,  conversions: 183,
    avgPosition:    4.0,  impressions: 28400, clicks: 1704, ctr: 6.0
  },
  {
    url:            "/furniture/living-room",
    title:          "Living Room Furniture | UrbanNest",
    sessions:       3210, organicSessions: 1863,
    bounceRate:     48.3, avgDuration: "2:28",
    conversionRate: 4.2,  conversions: 135,
    avgPosition:    7.0,  impressions: 18200, clicks: 910, ctr: 5.0
  },
  {
    url:            "/plants",
    title:          "Indoor Plants & Planters | UrbanNest",
    sessions:       2840, organicSessions: 1193,
    bounceRate:     58.6, avgDuration: "1:58",
    conversionRate: 2.9,  conversions:  82,
    avgPosition:    12.0, impressions: 6400,  clicks: 192, ctr: 3.0
  },
  {
    url:            "/sale",
    title:          "Sale – Up to 40% Off | UrbanNest",
    sessions:       2180, organicSessions:  436,
    bounceRate:     72.4, avgDuration: "1:18",
    conversionRate: 5.8,  conversions: 126,
    avgPosition:    21.6, impressions: 3800,  clicks: 190, ctr: 5.0
  },
  {
    url:            "/bedroom-decor",
    title:          "Bedroom Decor & Accessories | UrbanNest",
    sessions:       1940, organicSessions: 1165,
    bounceRate:     45.2, avgDuration: "2:36",
    conversionRate: 3.3,  conversions:  64,
    avgPosition:    3.0,  impressions: 8200,  clicks: 615, ctr: 7.5
  },
  {
    url:            "/wall-art",
    title:          "Wall Art & Prints | UrbanNest",
    sessions:       1820, organicSessions: 1092,
    bounceRate:     49.8, avgDuration: "2:12",
    conversionRate: 3.1,  conversions:  56,
    avgPosition:    9.0,  impressions: 9800,  clicks: 490, ctr: 5.0
  },
  {
    url:            "/lighting",
    title:          "Lighting Collection | UrbanNest",
    sessions:       1640, organicSessions:  821,
    bounceRate:     52.1, avgDuration: "2:04",
    conversionRate: 2.7,  conversions:  44,
    avgPosition:    11.0, impressions: 5400,  clicks: 270, ctr: 5.0
  },
  {
    url:            "/outdoor",
    title:          "Outdoor & Garden Decor | UrbanNest",
    sessions:       1280, organicSessions:  486,
    bounceRate:     63.2, avgDuration: "1:44",
    conversionRate: 1.8,  conversions:  23,
    avgPosition:    18.0, impressions: 3800,  clicks:  57, ctr: 1.5
  },
  {
    url:            "/blog",
    title:          "UrbanNest Design Blog",
    sessions:        980, organicSessions:  294,
    bounceRate:     78.3, avgDuration: "2:52",
    conversionRate: 0.4,  conversions:   4,
    avgPosition:    14.0, impressions: 2100,  clicks:  84, ctr: 4.0
  }
];

/* Device breakdown — share of total sessions */
window.UN.devices = {
  labels: ["Desktop", "Mobile", "Tablet"],
  values: [52, 39, 9],
  colors: ["#2563eb", "#7c3aed", "#06b6d4"]
};

/* Traffic source breakdown — share of total sessions */
window.UN.sources = {
  labels: ["Organic Search", "Direct", "Paid Search", "Referral", "Social"],
  values: [47, 22, 18, 8, 5],
  colors: ["#2563eb", "#10b981", "#f59e0b", "#6366f1", "#ef4444"]
};
