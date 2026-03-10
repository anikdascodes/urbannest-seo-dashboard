/* ──────────────────────────────────────────────────────────────
   UrbanNest SEO Dashboard — Main JavaScript
   Depends on: Chart.js v4, window.UN (data files)
   ────────────────────────────────────────────────────────────── */
(function () {
  "use strict";

  /* active chart instances — destroyed before re-render */
  const charts = {};
  let activeRange = "last90";
  let kwSortCol = "position";
  let kwSortDir = "asc";
  let pgSortCol = "sessions";
  let pgSortDir = "desc";

  /* ── Bootstrap ──────────────────────────────────────────── */
  document.addEventListener("DOMContentLoaded", function () {
    renderKPICards(activeRange);
    initTrafficChart(activeRange);
    initDeviceChart();
    initSourceChart();
    renderKeywordsTable();
    renderPagesTable();
    renderIssuesPanel();
    renderSpeedPanel();
    renderRecommendations();
    setupDateFilter();
    setupExportBtn();
    setupSidebarToggle();
  });

  /* ── Utilities ──────────────────────────────────────────── */
  function fmt(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000)    return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return String(n);
  }

  function fmtFull(n) {
    return Number(n).toLocaleString();
  }

  function pct(current, previous) {
    return (((current - previous) / previous) * 100).toFixed(1);
  }

  function changeHTML(current, previous, lowerIsBetter, unit) {
    const diff = parseFloat(pct(current, previous));
    const positive = lowerIsBetter ? diff < 0 : diff > 0;
    const cls = diff === 0 ? "neutral" : (positive ? "positive" : "negative");
    const arrow = diff > 0 ? "↑" : diff < 0 ? "↓" : "→";
    const abs = Math.abs(diff);
    const label = unit ? `${abs}${unit}` : `${abs}%`;
    return `<span class="kpi-change ${cls}">${arrow} ${label} vs prev</span>`;
  }

  function statusClass(s) {
    if (s === "good") return "good";
    if (s === "needs-improvement") return "ni";
    return "poor";
  }

  /* ── KPI Cards ──────────────────────────────────────────── */
  function renderKPICards(range) {
    const d = window.UN.traffic.kpis[range];
    const c = d.current, p = d.previous;

    const cards = [
      {
        label: "Total Sessions",
        value: fmt(c.sessions),
        change: changeHTML(c.sessions, p.sessions, false)
      },
      {
        label: "Organic Users",
        value: fmt(c.users),
        change: changeHTML(c.users, p.users, false)
      },
      {
        label: "Conversions",
        value: fmtFull(c.conversions),
        change: changeHTML(c.conversions, p.conversions, false)
      },
      {
        label: "Bounce Rate",
        value: c.bounceRate + "%",
        change: changeHTML(c.bounceRate, p.bounceRate, true, "pp")
      },
      {
        label: "Avg. CTR",
        value: c.ctr + "%",
        change: changeHTML(c.ctr, p.ctr, false, "pp")
      },
      {
        label: "Avg. Position",
        value: c.position,
        change: changeHTML(c.position, p.position, true, " pos")
      }
    ];

    document.getElementById("kpi-grid").innerHTML = cards
      .map(
        (card) => `
      <div class="kpi-card">
        <div class="kpi-label">${card.label}</div>
        <div class="kpi-value">${card.value}</div>
        ${card.change}
      </div>`
      )
      .join("");
  }

  /* ── Traffic Trend Chart ────────────────────────────────── */
  function initTrafficChart(range) {
    const { start, end } = window.UN.traffic.ranges[range];
    const slice = window.UN.traffic.weekly.slice(start, end);
    const labels   = slice.map((w) => w.label);
    const sessions = slice.map((w) => w.sessions);
    const users    = slice.map((w) => w.users);

    const ctx = document.getElementById("trafficChart");
    if (!ctx) return;

    if (charts.traffic) charts.traffic.destroy();

    charts.traffic = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Sessions",
            data: sessions,
            borderColor: "#2563eb",
            backgroundColor: "rgba(37,99,235,0.08)",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 2
          },
          {
            label: "Users",
            data: users,
            borderColor: "#7c3aed",
            backgroundColor: "rgba(124,58,237,0)",
            fill: false,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 2,
            borderDash: [5, 3]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: {
            position: "top",
            labels: { boxWidth: 12, font: { size: 12 } }
          },
          tooltip: {
            callbacks: {
              label: (ctx) =>
                ` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()}`
            }
          }
        },
        scales: {
          x: {
            grid: { color: "rgba(0,0,0,0.04)" },
            ticks: { font: { size: 11 }, color: "#64748b" }
          },
          y: {
            beginAtZero: false,
            grid: { color: "rgba(0,0,0,0.04)" },
            ticks: {
              font: { size: 11 },
              color: "#64748b",
              callback: (v) => fmt(v)
            }
          }
        }
      }
    });
  }

  /* ── Device Breakdown Chart ─────────────────────────────── */
  function initDeviceChart() {
    const ctx = document.getElementById("deviceChart");
    if (!ctx) return;

    const { labels, values, colors } = window.UN.devices;

    charts.device = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels,
        datasets: [{ data: values, backgroundColor: colors, borderWidth: 2, borderColor: "#fff" }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 11 } } },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`
            }
          }
        },
        cutout: "62%"
      }
    });
  }

  /* ── Traffic Source Chart ───────────────────────────────── */
  function initSourceChart() {
    const ctx = document.getElementById("sourceChart");
    if (!ctx) return;

    const { labels, values, colors } = window.UN.sources;

    charts.source = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: colors,
            borderRadius: 4,
            borderSkipped: false
          }
        ]
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.parsed.x}% of sessions`
            }
          }
        },
        scales: {
          x: {
            grid: { color: "rgba(0,0,0,0.04)" },
            ticks: { font: { size: 10 }, color: "#64748b", callback: (v) => v + "%" }
          },
          y: {
            grid: { display: false },
            ticks: { font: { size: 11 }, color: "#64748b" }
          }
        }
      }
    });
  }

  /* ── Keyword Rankings Table ─────────────────────────────── */
  function renderKeywordsTable() {
    const container = document.getElementById("keywords-table-body");
    if (!container) return;

    const data = sortData([...window.UN.keywords], kwSortCol, kwSortDir);
    updateSortHeaders("keywords-thead", kwSortCol, kwSortDir);

    container.innerHTML = data
      .map((kw) => {
        const delta     = kw.prevPosition - kw.position;
        const dir       = delta > 0 ? "up" : delta < 0 ? "down" : "flat";
        const arrow     = delta > 0 ? "↑" : delta < 0 ? "↓" : "–";
        const diffText  = delta !== 0 ? `${Math.abs(delta)}` : "–";
        const ctrCls    = kw.ctr >= 6 ? "pill-good" : kw.ctr >= 3 ? "pill-warn" : "pill-danger";
        const posCls    = kw.position <= 3 ? "pill-good" : kw.position <= 10 ? "pill-warn" : "pill-danger";

        return `
        <tr>
          <td class="cell-keyword">${kw.keyword}</td>
          <td>
            <span class="pos-badge">
              <span class="pill ${posCls}">${kw.position}</span>
              <span class="pos-change ${dir}">${arrow} ${diffText}</span>
            </span>
          </td>
          <td>${fmtFull(kw.impressions)}</td>
          <td>${fmtFull(kw.clicks)}</td>
          <td><span class="pill ${ctrCls}">${kw.ctr}%</span></td>
          <td class="cell-url">${kw.url}</td>
        </tr>`;
      })
      .join("");
  }

  /* ── Landing Pages Table ────────────────────────────────── */
  function renderPagesTable() {
    const container = document.getElementById("pages-table-body");
    if (!container) return;

    const data = sortData([...window.UN.pages], pgSortCol, pgSortDir);
    updateSortHeaders("pages-thead", pgSortCol, pgSortDir);

    container.innerHTML = data
      .map((pg) => {
        const bounceCls = pg.bounceRate < 50 ? "pill-good" : pg.bounceRate < 65 ? "pill-warn" : "pill-danger";
        const convCls   = pg.conversionRate >= 3 ? "pill-good" : pg.conversionRate >= 1.5 ? "pill-warn" : "pill-danger";
        const posCls    = pg.avgPosition <= 5 ? "pill-good" : pg.avgPosition <= 15 ? "pill-warn" : "pill-danger";

        return `
        <tr>
          <td class="cell-url">${pg.url}</td>
          <td>${fmtFull(pg.sessions)}</td>
          <td><span class="pill ${bounceCls}">${pg.bounceRate}%</span></td>
          <td><span class="pill ${convCls}">${pg.conversionRate}%</span></td>
          <td>${fmtFull(pg.impressions)}</td>
          <td>${fmtFull(pg.clicks)}</td>
          <td><span class="pill ${posCls}">${pg.avgPosition}</span></td>
        </tr>`;
      })
      .join("");
  }

  /* ── Sort helpers ───────────────────────────────────────── */
  function sortData(arr, col, dir) {
    return arr.sort((a, b) => {
      const av = a[col], bv = b[col];
      const cmp = typeof av === "number" ? av - bv : String(av).localeCompare(String(bv));
      return dir === "asc" ? cmp : -cmp;
    });
  }

  function updateSortHeaders(theadId, activeCol, dir) {
    const thead = document.getElementById(theadId);
    if (!thead) return;
    thead.querySelectorAll("th[data-col]").forEach((th) => {
      th.classList.remove("sort-asc", "sort-desc");
      if (th.dataset.col === activeCol) {
        th.classList.add(dir === "asc" ? "sort-asc" : "sort-desc");
      }
    });
  }

  /* ── Table sort click handlers ──────────────────────────── */
  function setupTableSort(theadId, renderFn, getState, setState) {
    const thead = document.getElementById(theadId);
    if (!thead) return;
    thead.querySelectorAll("th[data-col]").forEach((th) => {
      th.addEventListener("click", function () {
        const { col, dir } = getState();
        const newDir = col === this.dataset.col && dir === "asc" ? "desc" : "asc";
        setState(this.dataset.col, newDir);
        renderFn();
      });
    });
  }

  /* ── Issues Panel ───────────────────────────────────────── */
  function renderIssuesPanel() {
    const el = document.getElementById("issues-panel-content");
    if (!el) return;

    const { summary, critical, warnings } = window.UN.issues;

    const chipsHTML = `
      <div class="issue-summary">
        <span class="issue-chip critical">🔴 ${summary.critical} Critical</span>
        <span class="issue-chip warning">🟡 ${summary.warnings} Warnings</span>
        <span class="issue-chip notice">🔵 ${summary.notices} Notices</span>
      </div>`;

    const critHTML = critical
      .map(
        (i) => `
      <li class="issue-item critical">
        <span class="issue-icon">🔴</span>
        <div>
          <div class="issue-title">${i.title}</div>
          <div style="font-size:0.74rem;color:var(--muted);margin-top:0.15rem">${i.impact}</div>
        </div>
      </li>`
      )
      .join("");

    const warnHTML = warnings
      .slice(0, 3)
      .map(
        (i) => `
      <li class="issue-item warning">
        <span class="issue-icon">🟡</span>
        <div><div class="issue-title">${i.title}</div></div>
      </li>`
      )
      .join("");

    el.innerHTML = `
      ${chipsHTML}
      <ul class="issue-list">
        ${critHTML}
        ${warnHTML}
      </ul>
      <div style="margin-top:0.85rem;font-size:0.78rem">
        <a href="audit.html" style="color:var(--primary);font-weight:600">
          View full audit report → ${summary.warnings + summary.notices - 3} more issues
        </a>
      </div>`;
  }

  /* ── Page Speed Panel ───────────────────────────────────── */
  function renderSpeedPanel() {
    const el = document.getElementById("speed-panel-content");
    if (!el) return;

    const { desktop: d, mobile: m } = window.UN.pageSpeed;

    const dCls = d.score >= 90 ? "good" : d.score >= 50 ? "average" : "poor";
    const mCls = m.score >= 90 ? "good" : m.score >= 50 ? "average" : "poor";

    function cwvRow(metric, dVal, dStat, mVal, mStat, unit) {
      return `
        <tr>
          <td><strong>${metric}</strong></td>
          <td><span class="cwv-cell"><span class="cwv-status ${statusClass(dStat)}"></span> ${dVal}${unit}</span></td>
          <td><span class="cwv-cell"><span class="cwv-status ${statusClass(mStat)}"></span> ${mVal}${unit}</span></td>
        </tr>`;
    }

    el.innerHTML = `
      <div class="speed-scores">
        <div class="speed-score-block">
          <div class="speed-score-num ${dCls}">${d.score}</div>
          <div class="speed-score-label">Desktop</div>
        </div>
        <div class="speed-score-block">
          <div class="speed-score-num ${mCls}">${m.score}</div>
          <div class="speed-score-label">Mobile</div>
        </div>
      </div>
      <table class="cwv-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Desktop</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          ${cwvRow("FCP", d.fcp, d.fcpStatus, m.fcp, m.fcpStatus, "s")}
          ${cwvRow("LCP", d.lcp, d.lcpStatus, m.lcp, m.lcpStatus, "s")}
          ${cwvRow("CLS", d.cls, d.clsStatus, m.cls, m.clsStatus, "")}
          ${cwvRow("TBT", d.tbt, d.tbtStatus, m.tbt, m.tbtStatus, "ms")}
          ${cwvRow("TTFB", d.ttfb, d.ttfbStatus, m.ttfb, m.ttfbStatus, "ms")}
        </tbody>
      </table>`;
  }

  /* ── Recommendations ────────────────────────────────────── */
  function renderRecommendations() {
    const el = document.getElementById("recommendations-list");
    if (!el) return;

    el.innerHTML = `<div class="recommendations-grid">${
      window.UN.recommendations
        .map(
          (r) => `
        <div class="rec-card">
          <div class="rec-card-header">
            <div class="rec-title">${r.title}</div>
            <span class="priority-badge ${r.priority}">${r.priority}</span>
          </div>
          <div class="rec-metric">${r.metric}</div>
          <div class="rec-impact">💡 ${r.impact}</div>
          <ul class="rec-actions">
            ${r.actions.map((a) => `<li>${a}</li>`).join("")}
          </ul>
        </div>`
        )
        .join("")
    }</div>`;
  }

  /* ── Date range filter ──────────────────────────────────── */
  function setupDateFilter() {
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        activeRange = this.dataset.range;
        document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        renderKPICards(activeRange);
        initTrafficChart(activeRange);
      });
    });
  }

  /* ── Export / Print ─────────────────────────────────────── */
  function setupExportBtn() {
    const btn = document.getElementById("exportBtn");
    if (btn) btn.addEventListener("click", () => window.print());
  }

  /* ── Sidebar toggle (mobile) ────────────────────────────── */
  function setupSidebarToggle() {
    const btn = document.getElementById("sidebarToggle");
    const sidebar = document.querySelector(".sidebar");
    if (!btn || !sidebar) return;

    btn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (sidebar.classList.contains("open") && !sidebar.contains(e.target) && e.target !== btn) {
        sidebar.classList.remove("open");
      }
    });
  }

  /* ── Wire up table sort after DOM is ready ──────────────── */
  document.addEventListener("DOMContentLoaded", function () {
    setupTableSort(
      "keywords-thead",
      renderKeywordsTable,
      () => ({ col: kwSortCol, dir: kwSortDir }),
      (c, d) => { kwSortCol = c; kwSortDir = d; }
    );

    setupTableSort(
      "pages-thead",
      renderPagesTable,
      () => ({ col: pgSortCol, dir: pgSortDir }),
      (c, d) => { pgSortCol = c; pgSortDir = d; }
    );
  });
})();
