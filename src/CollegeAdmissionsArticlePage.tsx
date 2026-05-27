type CollegeAdmissionsArticlePageProps = {
  onBackToHub: () => void;
  onBackHome: () => void;
};

const ARTICLE_URL = "https://futurereadyprep.org/#/blogs/college-admissions-guide";
const LINKEDIN_SHARE_URL = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
  ARTICLE_URL,
)}`;
const X_SHARE_URL = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
  ARTICLE_URL,
)}&text=${encodeURIComponent("A clear 9th-12th grade college admissions roadmap.")}`;

export default function CollegeAdmissionsArticlePage({
  onBackToHub,
  onBackHome,
}: CollegeAdmissionsArticlePageProps) {
  return (
    <div className="min-h-screen bg-[#f7fbff] text-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-blue-300"
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
            College Admissions Guide
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
            The 9th-12th Grade College Admissions Roadmap
          </h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Most students do not fail college admissions because they are not
            smart enough. They struggle because they start too late or follow a
            random strategy. This roadmap helps you focus on the highest-impact
            moves each year.
          </p>

          <div className="mt-8 space-y-8 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-black text-slate-950">9th Grade: Build Your Foundation</h2>
              <ul className="mt-3 space-y-2">
                <li>1. Prioritize strong grades and good study habits from day one.</li>
                <li>2. Join 1-2 activities you genuinely enjoy instead of 8 random clubs.</li>
                <li>3. Start a basic “achievement tracker” document for awards, projects, and impact.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">10th Grade: Start Showing Direction</h2>
              <ul className="mt-3 space-y-2">
                <li>1. Move toward leadership or deeper contribution in your main activities.</li>
                <li>2. Begin SAT/ACT baseline practice to identify strengths and weaknesses.</li>
                <li>3. Take rigorous classes where possible, but keep your GPA healthy.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">11th Grade: Your Highest-Leverage Year</h2>
              <ul className="mt-3 space-y-2">
                <li>1. Set a clear SAT/ACT schedule and treat prep like a real weekly commitment.</li>
                <li>2. Build a preliminary college list (reach / target / likely).</li>
                <li>3. Collect meaningful achievements, not just participation lines.</li>
                <li>4. Build relationships with teachers for recommendation letters.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950">12th Grade: Execute, Do Not Panic</h2>
              <ul className="mt-3 space-y-2">
                <li>1. Finalize your list early and track every deadline in one place.</li>
                <li>2. Write essays that show personal growth, decision-making, and impact.</li>
                <li>3. Submit polished applications early whenever possible.</li>
                <li>4. Apply for scholarships consistently, even smaller ones.</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
              <h2 className="text-xl font-black text-slate-950">Quick Reality Check</h2>
              <p className="mt-2">
                You do not need to be “perfect.” You need a clear narrative:
                strong academics, authentic involvement, and thoughtful
                applications submitted on time.
              </p>
            </section>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={LINKEDIN_SHARE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[#0a66c2] px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-[#0958a6] transition"
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
        </article>
      </div>
    </div>
  );
}
