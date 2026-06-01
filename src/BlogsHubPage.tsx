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
  const consultationUrl =
    "https://calendly.com/futurereadycollegeprep/free-15-min-consultation";

  return (
    <div className="min-h-screen bg-[#f7fbff] text-slate-900">
      <div className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-2 text-center text-xs sm:text-sm font-semibold tracking-[0.01em]">
          Early Bird: Students who book by June 15 get a free SAT diagnostic + 15% off.
          <a
            href={consultationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 underline underline-offset-2 hover:text-blue-100"
          >
            Reserve Your Spot →
          </a>
        </div>
      </div>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/70 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <img src="/logo.png" alt="FutureReady logo" className="h-16 w-16 object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-950">
                FutureReady College & Career Prep
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                SAT Prep • College Apps • Tutoring
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 lg:gap-8 ml-auto">
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
              <a href="#services" className="hover:text-blue-700 transition">Services</a>
              <a href="#about" className="hover:text-blue-700 transition">About & Results</a>
              <a href="#testimonials" className="hover:text-blue-700 transition">Testimonials</a>
              <a href="#/college-list-builder" className="hover:text-blue-700 transition">College List Builder</a>
              <a href="/blog/" className="hover:text-blue-700 transition">Blog</a>
            </div>

            <a
              href={consultationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-800 transition"
            >
              Book a Free Consultation
            </a>
          </div>
        </div>
      </nav>
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
