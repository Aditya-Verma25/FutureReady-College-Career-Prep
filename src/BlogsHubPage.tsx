export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  topic: string;
  publishedAt: string;
  readTimeMinutes: number;
  imageUrl: string;
  imageAttribution?: string;
  sections: Array<{
    heading: string;
    points: string[];
  }>;
  cta?: string;
};

type BlogsHubPageProps = {
  onBack: () => void;
  posts: BlogPost[];
};

const siteBaseUrl = "https://futurereadyprep.org";

function formatDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogsHubPage({ onBack, posts }: BlogsHubPageProps) {
  return (
    <div className="min-h-screen bg-[#f7fbff] text-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
        >
          ← Back to Home
        </button>

        <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-blue-700">
            FutureReady Blog
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
            SAT + College Admissions Insights
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            Useful, practical reads for students and families navigating SAT prep,
            activities, essays, and admissions strategy.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {posts.map((post) => {
              const articleUrl = `${siteBaseUrl}/#/blogs/${post.slug}`;
              const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
              const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(post.title)}`;

              return (
                <article
                  key={post.slug}
                  className="rounded-3xl border border-slate-200 bg-slate-50 overflow-hidden shadow-sm"
                >
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="h-44 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <p className="text-xs font-black uppercase tracking-wider text-blue-700">
                      {post.topic}
                    </p>
                    <h2 className="mt-2 text-xl font-black text-slate-950">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <p className="mt-3 text-xs text-slate-500">
                      {formatDate(post.publishedAt)} • {post.readTimeMinutes} min read
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <a
                        href={`#/blogs/${post.slug}`}
                        className="rounded-xl bg-blue-700 px-4 py-2 text-xs font-bold text-white hover:bg-blue-800 transition"
                      >
                        Read Article
                      </a>
                      <a
                        href={linkedInShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-slate-800 border border-slate-200 hover:border-blue-300 transition"
                      >
                        LinkedIn
                      </a>
                      <a
                        href={shareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-slate-800 border border-slate-200 hover:border-blue-300 transition"
                      >
                        Share
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
