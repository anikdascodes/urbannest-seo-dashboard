/* ──────────────────────────────────────────────────────────────
   UrbanNest SEO Dashboard — Traffic Mock Data
   Period: Oct 7 2025 – Dec 30 2025 (13 weekly snapshots)
   Story: Strong Q4 growth through BF/CM peak; CTR + rankings
          softening in Dec, driving recommendations.
   ────────────────────────────────────────────────────────────── */
window.UN = window.UN || {};

window.UN.traffic = {

  /* 13 weekly data points for the trend chart */
  weekly: [
    { label: "Oct 7",  sessions: 2840, users: 2100, conversions:  68, bounceRate: 54.2, revenue:  5440 },
    { label: "Oct 14", sessions: 3120, users: 2380, conversions:  74, bounceRate: 53.8, revenue:  5920 },
    { label: "Oct 21", sessions: 2960, users: 2210, conversions:  71, bounceRate: 55.1, revenue:  5680 },
    { label: "Oct 28", sessions: 3340, users: 2540, conversions:  82, bounceRate: 52.9, revenue:  6560 },
    { label: "Nov 4",  sessions: 3580, users: 2740, conversions:  92, bounceRate: 53.4, revenue:  7360 },
    { label: "Nov 11", sessions: 3820, users: 2920, conversions:  98, bounceRate: 52.6, revenue:  7840 },
    { label: "Nov 18", sessions: 4240, users: 3280, conversions: 112, bounceRate: 51.8, revenue:  8960 },
    { label: "Nov 25", sessions: 4580, users: 3560, conversions: 148, bounceRate: 50.2, revenue: 11840 }, /* Black Friday */
    { label: "Dec 2",  sessions: 4120, users: 3180, conversions:  96, bounceRate: 53.6, revenue:  7680 },
    { label: "Dec 9",  sessions: 3940, users: 3020, conversions:  88, bounceRate: 54.8, revenue:  7040 },
    { label: "Dec 16", sessions: 4280, users: 3290, conversions: 106, bounceRate: 53.2, revenue:  8480 },
    { label: "Dec 23", sessions: 3720, users: 2860, conversions:  82, bounceRate: 57.4, revenue:  6560 }, /* Holiday dip */
    { label: "Dec 30", sessions: 2940, users: 2210, conversions:  62, bounceRate: 59.1, revenue:  4960 }  /* New Year lull */
  ],

  /* KPI summaries per date range: current period vs previous period */
  kpis: {
    last7: {
      current:  { sessions: 2940,  users: 2210,  conversions:  62, bounceRate: 59.1, ctr: 4.2, position: 15.1, revenue:  4960 },
      previous: { sessions: 3720,  users: 2860,  conversions:  82, bounceRate: 57.4, ctr: 4.7, position: 14.6, revenue:  6560 }
    },
    last28: {
      current:  { sessions: 14980, users: 11560, conversions: 334, bounceRate: 55.9, ctr: 4.5, position: 14.6, revenue: 26720 },
      previous: { sessions: 16220, users: 12460, conversions: 450, bounceRate: 51.8, ctr: 5.2, position: 12.8, revenue: 36000 }
    },
    last90: {
      current:  { sessions: 47480, users: 35610, conversions: 1179, bounceRate: 53.9, ctr: 4.8, position: 14.2, revenue: 95920 },
      previous: { sessions: 41200, users: 31800, conversions: 1014, bounceRate: 56.4, ctr: 5.4, position: 12.1, revenue: 81120 }
    }
  },

  /* Which weeks to show per filter (index into weekly array) */
  ranges: {
    last7:  { start: 11, end: 13 },
    last28: { start: 9,  end: 13 },
    last90: { start: 0,  end: 13 }
  }
};
