import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const POSTS_PATH = path.join(ROOT, "public", "blog-posts.json");
const BLOG_DIR = path.join(ROOT, "public", "blog");
const SITE_URL = "https://futurereadyprep.org";

function escapeHtml(value = "") {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function formatDate(dateStr) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function baseStyles() {
  return `
    :root { color-scheme: light; }
    body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; background:#f7fbff; color:#0f172a; }
    .topbar { background:#1e40af; color:#fff; text-align:center; font-size:13px; font-weight:700; padding:8px 16px; }
    .topbar a { color:#fff; text-decoration:underline; text-underline-offset:2px; margin-left:6px; }
    .nav { position: sticky; top: 0; z-index: 50; background: rgba(255,255,255,.92); backdrop-filter: blur(8px); border-bottom: 1px solid #e2e8f0; box-shadow: 0 2px 8px rgba(15,23,42,.05); }
    .nav-inner { max-width: 1280px; margin: 0 auto; padding: 16px 24px; display:flex; align-items:center; justify-content:space-between; gap:16px; }
    .brand { display:flex; align-items:center; gap:12px; color:#020617; text-decoration:none; }
    .brand img { height:56px; width:56px; object-fit:contain; }
    .brand h1 { margin:0; font-size:20px; font-weight:900; letter-spacing:-.02em; }
    .brand p { margin:0; font-size:12px; color:#64748b; font-weight:600; }
    .nav-links { display:flex; gap:24px; font-size:14px; font-weight:700; }
    .nav-links a { color:#475569; text-decoration:none; }
    .nav-links a:hover { color:#1d4ed8; }
    .cta { display:inline-flex; border-radius:12px; padding:10px 14px; font-size:14px; font-weight:800; text-decoration:none; background:#1d4ed8; color:#fff; }
    .wrap { max-width: 1280px; margin: 0 auto; padding: 32px 24px; }
    .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 22px; padding: 28px; box-shadow: 0 8px 24px rgba(15,23,42,.06); }
    .btn { display:inline-block; border-radius: 12px; padding: 10px 14px; font-weight:700; text-decoration:none; }
    .btn-primary { background:#1d4ed8; color:#fff; }
    .btn-secondary { background:#fff; color:#334155; border:1px solid #e2e8f0; }
    .meta { color:#64748b; font-size: 13px; }
    .toolbar { display:flex; flex-wrap:wrap; gap:12px; align-items:center; margin: 18px 0 0; padding: 12px; border:1px solid #e2e8f0; border-radius:16px; background:#f8fafc; }
    .search { flex: 1 1 260px; min-width: 220px; border:1px solid #cbd5e1; border-radius:12px; padding:12px 14px; font-size:14px; background:#fff; }
    .chips { display:flex; flex-wrap:wrap; gap:8px; }
    .chip { border:1px solid #e2e8f0; background:#fff; color:#334155; border-radius:999px; padding:8px 12px; font-size:12px; font-weight:800; cursor:pointer; }
    .chip.active { background:#1d4ed8; border-color:#1d4ed8; color:#fff; }
    .grid { display:grid; gap:16px; grid-template-columns: repeat(1,minmax(0,1fr)); margin-top: 18px; }
    .post-card { border:1px solid #e2e8f0; border-radius:18px; overflow:hidden; background:#f8fafc; }
    .post-card img { width:100%; height:170px; object-fit:cover; display:block; }
    .post-card .content { padding:14px; }
    .tag { color:#1d4ed8; text-transform:uppercase; letter-spacing:.09em; font-weight:800; font-size:11px; }
    h1,h2 { margin:0; line-height:1.12; }
    h1 { font-size: clamp(1.9rem, 5vw, 2.7rem); }
    h2 { font-size: clamp(1.25rem, 4vw, 1.7rem); margin-top: 24px; }
    p,li { color:#334155; line-height:1.7; }
    ul { padding-left: 20px; }
    .hero { width:100%; height:320px; object-fit:cover; border-radius:14px; border:1px solid #e2e8f0; margin-top:16px; }
    .top-actions { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:18px; }
    .share { display:flex; gap:8px; flex-wrap:wrap; margin-top:20px; }
    @media (min-width: 768px) { .grid { grid-template-columns: repeat(2,minmax(0,1fr)); } }
    @media (min-width: 1200px) { .grid { grid-template-columns: repeat(3,minmax(0,1fr)); } }
    @media (max-width: 980px) { .nav-links { display:none; } .cta { display:none; } }
  `;
}

function sharedHeader() {
  return `
  <div class="topbar">
    Early Bird: Students who book by June 15 get a free SAT diagnostic + 15% off.
    <a href="https://calendly.com/futurereadycollegeprep/free-15-min-consultation" target="_blank" rel="noopener noreferrer">Reserve Your Spot -></a>
  </div>
  <header class="nav">
    <div class="nav-inner">
      <a class="brand" href="/">
        <img src="/logo.png" alt="FutureReady logo" />
        <div>
          <h1>FutureReady College & Career Prep</h1>
          <p>SAT Prep • College Apps • Tutoring</p>
        </div>
      </a>
      <nav class="nav-links">
        <a href="/#services">Services</a>
        <a href="/#about">About & Results</a>
        <a href="/#testimonials">Testimonials</a>
        <a href="/#/college-list-builder">College List Builder</a>
        <a href="/blog/">Blog</a>
      </nav>
      <a class="cta" href="https://calendly.com/futurereadycollegeprep/free-15-min-consultation" target="_blank" rel="noopener noreferrer">Book a Free Consultation</a>
    </div>
  </header>`;
}

function blogIndexHtml(posts) {
  const cards = posts
    .map((post) => {
      const url = `/blog/${post.slug}/`;
      const linkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        `${SITE_URL}${url}`,
      )}`;
      const share = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        `${SITE_URL}${url}`,
      )}&text=${encodeURIComponent(post.title)}`;
      return `
        <article class="post-card" data-topic="${escapeHtml(post.topic)}" data-title="${escapeHtml(post.title).toLowerCase()}" data-excerpt="${escapeHtml(post.excerpt).toLowerCase()}">
          <img src="${escapeHtml(post.imageUrl)}" alt="${escapeHtml(post.title)}" loading="lazy" />
          <div class="content">
            <p class="tag">${escapeHtml(post.topic)}</p>
            <h2>${escapeHtml(post.title)}</h2>
            <p>${escapeHtml(post.excerpt)}</p>
            <p class="meta">${escapeHtml(formatDate(post.publishedAt))} • ${post.readTimeMinutes} min read</p>
            <div class="share">
              <a class="btn btn-primary" href="${url}">Read</a>
              <a class="btn btn-secondary" href="${linkedIn}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a class="btn btn-secondary" href="${share}" target="_blank" rel="noopener noreferrer">Share</a>
            </div>
          </div>
        </article>
      `;
    })
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FutureReady Blog | SAT & College Admissions Tips</title>
  <meta name="description" content="Useful SAT prep and college admissions articles for students and families." />
  <link rel="canonical" href="${SITE_URL}/blog/" />
  <meta property="og:title" content="FutureReady Blog | SAT & College Admissions Tips" />
  <meta property="og:description" content="Useful SAT prep and college admissions articles for students and families." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${SITE_URL}/blog/" />
  <meta property="og:image" content="${posts[0] ? escapeHtml(posts[0].imageUrl) : `${SITE_URL}/logo.png`}" />
  <style>${baseStyles()}</style>
</head>
<body>
  ${sharedHeader()}
  <main class="wrap">
    <div class="top-actions">
      <a class="btn btn-primary" href="/"><- Back to Home</a>
    </div>
    <section class="card">
      <p class="tag">FutureReady Blog</p>
      <h1>SAT + College Admissions Insights</h1>
      <p>Practical, student-friendly strategies for SAT prep, essays, activities, and college planning.</p>
      <div class="toolbar">
        <input id="blog-search" class="search" type="search" placeholder="Search blog posts..." />
        <div id="topic-chips" class="chips">
          <button class="chip active" data-topic="All">All</button>
          <button class="chip" data-topic="SAT Prep">SAT Prep</button>
          <button class="chip" data-topic="College Admissions">College Admissions</button>
        </div>
      </div>
      <div class="grid" id="blog-grid">
        ${cards}
      </div>
    </section>
  </main>
  <script>
    (function () {
      const search = document.getElementById("blog-search");
      const chips = Array.from(document.querySelectorAll(".chip"));
      const cards = Array.from(document.querySelectorAll(".post-card"));
      let activeTopic = "All";
      function applyFilters() {
        const q = (search.value || "").trim().toLowerCase();
        cards.forEach((card) => {
          const topic = card.getAttribute("data-topic") || "";
          const title = card.getAttribute("data-title") || "";
          const excerpt = card.getAttribute("data-excerpt") || "";
          const topicMatch = activeTopic === "All" || topic === activeTopic;
          const textMatch = !q || title.includes(q) || excerpt.includes(q);
          card.style.display = topicMatch && textMatch ? "" : "none";
        });
      }
      chips.forEach((chip) => {
        chip.addEventListener("click", () => {
          activeTopic = chip.getAttribute("data-topic") || "All";
          chips.forEach((c) => c.classList.remove("active"));
          chip.classList.add("active");
          applyFilters();
        });
      });
      search.addEventListener("input", applyFilters);
      applyFilters();
    })();
  </script>
</body>
</html>`;
}

function articleHtml(post) {
  const articlePath = `/blog/${post.slug}/`;
  const articleUrl = `${SITE_URL}${articlePath}`;
  const linkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
  const share = `https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(post.title)}`;

  const sections = (post.sections || [])
    .map((section) => {
      if (section.points && Array.isArray(section.points)) {
        return `
      <section>
        <h2>${escapeHtml(section.heading)}</h2>
        <ul>
          ${section.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
        </ul>
      </section>
    `;
      }

      if (section.paragraph) {
        return `
      <section>
        <h2>${escapeHtml(section.heading)}</h2>
        <p>${escapeHtml(section.paragraph)}</p>
      </section>
    `;
      }

      return `
      <section>
        <h2>${escapeHtml(section.heading)}</h2>
        <p></p>
      </section>
    `;
    })
    .join("\n");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: [post.imageUrl],
    author: { "@type": "Person", name: "Aditya Verma" },
    publisher: {
      "@type": "Organization",
      name: "FutureReady Prep",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: articleUrl,
    description: post.excerpt,
  };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(post.title)} | FutureReady Prep Blog</title>
  <meta name="description" content="${escapeHtml(post.excerpt)}" />
  <link rel="canonical" href="${articleUrl}" />
  <meta property="og:title" content="${escapeHtml(post.title)}" />
  <meta property="og:description" content="${escapeHtml(post.excerpt)}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${articleUrl}" />
  <meta property="og:image" content="${escapeHtml(post.imageUrl)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(post.title)}" />
  <meta name="twitter:description" content="${escapeHtml(post.excerpt)}" />
  <meta name="twitter:image" content="${escapeHtml(post.imageUrl)}" />
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  <style>${baseStyles()}</style>
</head>
<body>
  ${sharedHeader()}
  <main class="wrap">
    <div class="top-actions">
      <a class="btn btn-primary" href="/"><- Home</a>
      <a class="btn btn-secondary" href="/blog/">Back to Blog Hub</a>
    </div>
    <article class="card">
      <p class="tag">${escapeHtml(post.topic)}</p>
      <h1>${escapeHtml(post.title)}</h1>
      <p class="meta">${escapeHtml(formatDate(post.publishedAt))} • ${post.readTimeMinutes} min read</p>
      <img class="hero" src="${escapeHtml(post.imageUrl)}" alt="${escapeHtml(post.title)}" />
      ${post.imageAttribution ? `<p class="meta">${escapeHtml(post.imageAttribution)}</p>` : ""}
      <p>${escapeHtml(post.excerpt)}</p>
      ${sections}
      ${post.cta ? `<section><h2>Key Takeaway</h2><p>${escapeHtml(post.cta)}</p></section>` : ""}
      <div class="share">
        <a class="btn btn-primary" href="${linkedIn}" target="_blank" rel="noopener noreferrer">Share on LinkedIn</a>
        <a class="btn btn-secondary" href="${share}" target="_blank" rel="noopener noreferrer">Share Link</a>
      </div>
    </article>
  </main>
</body>
</html>`;
}

function writeSitemap(posts) {
  const urls = [
    { loc: `${SITE_URL}/`, priority: "1.0" },
    { loc: `${SITE_URL}/blog/`, priority: "0.9" },
    ...posts.map((post) => ({
      loc: `${SITE_URL}/blog/${post.slug}/`,
      priority: "0.8",
      lastmod: post.publishedAt,
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
${u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>` : ""}    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

  fs.writeFileSync(path.join(ROOT, "public", "sitemap.xml"), xml, "utf-8");
}

function main() {
  if (!fs.existsSync(POSTS_PATH)) {
    console.error("public/blog-posts.json not found");
    process.exit(1);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_PATH, "utf-8"));
  ensureDir(BLOG_DIR);

  fs.writeFileSync(path.join(BLOG_DIR, "index.html"), blogIndexHtml(posts), "utf-8");

  for (const post of posts) {
    const postDir = path.join(BLOG_DIR, post.slug);
    ensureDir(postDir);
    fs.writeFileSync(path.join(postDir, "index.html"), articleHtml(post), "utf-8");
  }

  writeSitemap(posts);
  console.log(`Generated ${posts.length} static blog pages + sitemap`);
}

main();
