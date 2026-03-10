/* ──────────────────────────────────────────────────────────────
   UrbanNest SEO Dashboard — Audit Page JavaScript
   Renders the SEO audit report from window.UN data
   ────────────────────────────────────────────────────────────── */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    renderCritical();
    renderWarnings();
    renderNotices();
    renderOpportunities();
    renderPriorityMatrix();
  });

  /* ── Critical issues ────────────────────────────────────── */
  function renderCritical() {
    const el = document.getElementById("critical-issues");
    if (!el) return;

    el.innerHTML = window.UN.issues.critical
      .map(
        (i) => `
      <details class="audit-issue">
        <summary>
          <span style="color:var(--danger)">●</span>
          [${i.id}] ${i.title}
        </summary>
        <div class="audit-issue-body">
          <p><strong>Detail:</strong> ${i.detail}</p>
          <p><strong>Business impact:</strong> ${i.impact}</p>
          ${
            i.pages
              ? `<p><strong>Affected pages:</strong>
              <span class="urls">${i.pages.join(" · ")}</span></p>`
              : ""
          }
          <p><span class="fix-label">Recommended fix:</span> ${i.fix}</p>
        </div>
      </details>`
      )
      .join("");
  }

  /* ── Warnings ───────────────────────────────────────────── */
  function renderWarnings() {
    const el = document.getElementById("warning-issues");
    if (!el) return;

    el.innerHTML = window.UN.issues.warnings
      .map(
        (i) => `
      <details class="audit-issue">
        <summary>
          <span style="color:var(--warning)">●</span>
          [${i.id}] ${i.title}
        </summary>
        <div class="audit-issue-body">
          <p><strong>Detail:</strong> ${i.detail}</p>
          <p><span class="fix-label">Recommended fix:</span> ${i.fix}</p>
        </div>
      </details>`
      )
      .join("");
  }

  /* ── Notices ────────────────────────────────────────────── */
  function renderNotices() {
    const el = document.getElementById("notice-issues");
    if (!el) return;

    el.innerHTML = window.UN.issues.notices
      .map(
        (i) => `
      <details class="audit-issue">
        <summary>
          <span style="color:var(--info)">●</span>
          [${i.id}] ${i.title}
        </summary>
        <div class="audit-issue-body">
          <p><strong>Detail:</strong> ${i.detail}</p>
          <p><span class="fix-label">Recommended fix:</span> ${i.fix}</p>
        </div>
      </details>`
      )
      .join("");
  }

  /* ── Content opportunities ──────────────────────────────── */
  function renderOpportunities() {
    const el = document.getElementById("opportunities-list");
    if (!el) return;

    el.innerHTML = window.UN.issues.contentOpportunities
      .map((o) => {
        const isRanking = o.currentPos !== "Not ranking";
        const posCls = isRanking ? "weak" : "missing";
        return `
        <div class="opp-card">
          <div style="flex:1">
            <div class="opp-kw">${o.keyword}</div>
            <div class="opp-note">${o.note}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div class="opp-vol">${o.volume.toLocaleString()} mo/searches</div>
            <div class="opp-pos ${posCls}">${o.currentPos}</div>
          </div>
        </div>`;
      })
      .join("");
  }

  /* ── Priority action matrix ─────────────────────────────── */
  function renderPriorityMatrix() {
    const el = document.getElementById("priority-matrix-body");
    if (!el) return;

    const matrix = [
      { rank: 1, action: "Compress hero images to WebP (< 80 KB)", category: "Performance", effort: "Low", impact: "High", timeframe: "1–2 days" },
      { rank: 2, action: "Add Product + AggregateRating schema to 4 product pages", category: "Schema", effort: "Medium", impact: "High", timeframe: "2–3 days" },
      { rank: 3, action: "Fix 12 broken internal links in footer", category: "Technical", effort: "Low", impact: "Medium", timeframe: "1 day" },
      { rank: 4, action: "Write meta descriptions for /outdoor, /sale, /blog/category/tips", category: "On-page", effort: "Low", impact: "Medium", timeframe: "Half day" },
      { rank: 5, action: "Set explicit width/height on all images (fix CLS: 0.14 mobile)", category: "Performance", effort: "Medium", impact: "High", timeframe: "2 days" },
      { rank: 6, action: "Refresh /plants and /outdoor content; add FAQ section", category: "Content", effort: "Medium", impact: "Medium", timeframe: "3–5 days" },
      { rank: 7, action: "Fix canonical tags on /blog/page/2 and /blog/page/3", category: "Technical", effort: "Low", impact: "Low", timeframe: "Half day" },
      { rank: 8, action: "Create /furniture/sofas and /furniture/small-spaces pages", category: "Content", effort: "High", impact: "High", timeframe: "1–2 weeks" },
      { rank: 9, action: "Add internal product links inside blog posts", category: "On-page", effort: "Medium", impact: "Medium", timeframe: "1–2 days" },
      { rank: 10, action: "Generate image sitemap and resubmit main sitemap to GSC", category: "Technical", effort: "Low", impact: "Low", timeframe: "Half day" }
    ];

    const impactCls = { High: "pill-good", Medium: "pill-warn", Low: "pill-danger" };
    const effortCls = { Low: "pill-good", Medium: "pill-warn", High: "pill-danger" };

    el.innerHTML = matrix
      .map(
        (r) => `
      <tr>
        <td style="font-weight:700;color:var(--muted)">#${r.rank}</td>
        <td>${r.action}</td>
        <td><span class="pill" style="background:var(--primary-light);color:var(--primary)">${r.category}</span></td>
        <td><span class="pill ${effortCls[r.effort]}">${r.effort}</span></td>
        <td><span class="pill ${impactCls[r.impact]}">${r.impact}</span></td>
        <td style="color:var(--muted);font-size:0.76rem">${r.timeframe}</td>
      </tr>`
      )
      .join("");
  }
})();
