import type { BlogPost } from "./BlogsHubPage";

type CollegeAdmissionsArticlePageProps = {
  post: BlogPost;
  onBackToHub: () => void;
  onBackHome: () => void;
};

const siteBaseUrl = "https://futurereadyprep.org";

function formatDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function CollegeAdmissionsArticlePage({
  post,
  onBackToHub,
  onBackHome,
}: CollegeAdmissionsArticlePageProps) {
  const articleUrl = `${siteBaseUrl}/#/blogs/${post.slug}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
  const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(post.title)}`;

  return (
    <div className="min-h-screen bg-[#f7fbff] text-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
          >
            ← Home
          </button>
          <button
            type="button"
            onClick={onBackToHub}
            className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-blue-300"
          >
            Back to Blog Hub
          </button>
        </div>

        <article className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-blue-700">
            {post.topic}
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {formatDate(post.publishedAt)} • {post.readTimeMinutes} min read
          </p>

          <img
            src={post.imageUrl}
            alt={post.title}
            className="mt-6 h-64 w-full rounded-2xl object-cover border border-slate-200"
          />
          {post.imageAttribution && (
            <p className="mt-2 text-xs text-slate-500">{post.imageAttribution}</p>
          )}

          <p className="mt-6 text-slate-600 leading-relaxed">{post.excerpt}</p>

          <div className="mt-8 space-y-8 text-slate-700 leading-relaxed">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-black text-slate-950">{section.heading}</h2>
                <ul className="mt-3 space-y-2">
                  {section.points.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              </section>
            ))}

            {post.cta && (
              <section className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                <h2 className="text-xl font-black text-slate-950">Key Takeaway</h2>
                <p className="mt-2">{post.cta}</p>
              </section>
            )}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={linkedInShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[#0a66c2] px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-[#0958a6] transition"
            >
              Share on LinkedIn
            </a>
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-800 border border-slate-200 shadow-sm hover:border-blue-300 transition"
            >
              Share Link
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}
