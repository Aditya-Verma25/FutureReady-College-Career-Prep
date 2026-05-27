type BlogsHubPageProps = {
  onBack: () => void;
};

const ARTICLE_URL = "https://futurereadyprep.org/#/blogs/college-admissions-guide";
const LINKEDIN_SHARE_URL = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
  ARTICLE_URL,
)}`;
const X_SHARE_URL = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
  ARTICLE_URL,
)}&text=${encodeURIComponent("A practical college admissions guide for high school students.")}`;

export default function BlogsHubPage({ onBack }: BlogsHubPageProps) {
  return (
    <div className="min-h-screen bg-[#f7fbff] text-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-blue-300"
        >
          ← Back to Home
        </button>

        <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-blue-700">
            FutureReady Blog
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
            College Admissions Insights For Students
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            Practical, current, no-fluff guidance that helps you make better
            decisions in high school and build a stronger college application.
          </p>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
              Featured Article
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">
              The 9th-12th Grade College Admissions Roadmap
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              A simple year-by-year guide for students who want to stay ahead
              without burning out.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="#/blogs/college-admissions-guide"
                className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-800 transition"
              >
                Read Article
              </a>
              <a
                href={LINKEDIN_SHARE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-800 border border-slate-200 shadow-sm hover:border-blue-300 transition"
              >
                Share on LinkedIn
              </a>
              <a
                href={X_SHARE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-800 border border-slate-200 shadow-sm hover:border-blue-300 transition"
              >
                Share Link
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
