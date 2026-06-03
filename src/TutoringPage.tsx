import { useEffect } from "react";
import { trackConsultationClick } from "./lib/analytics";

type TutoringPageProps = {
  onBack: () => void;
};

export default function TutoringPage({ onBack }: TutoringPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  function trackCalendlyClick() {
    trackConsultationClick("tutoring");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffdf8] via-amber-50 to-orange-50 text-slate-900">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
        >
          ← Back to Home
        </button>

        <div className="mt-6 rounded-[2rem] border border-amber-200 bg-gradient-to-r from-white to-amber-50 p-8 shadow-xl md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-amber-700">
            FutureReady Academic Tutoring
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
            Tutoring That Builds Grades and Confidence
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            Personalized support for math and computer science with clear explanations,
            smart practice, and accountability that helps students actually improve.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5">
              <p className="text-sm font-bold text-orange-700">Core Concepts</p>
              <p className="mt-2 text-sm text-slate-600">
                Fix gaps in algebra, geometry, precalculus, calculus, and CS fundamentals.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
              <p className="text-sm font-bold text-amber-700">Homework + Tests</p>
              <p className="mt-2 text-sm text-slate-600">
                Better systems for assignments, quizzes, and exam preparation.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
              <p className="text-sm font-bold text-emerald-700">Study Habits</p>
              <p className="mt-2 text-sm text-slate-600">
                Practical routines for time management and long-term retention.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-2xl font-black text-slate-950">What You Get</h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              <li>✓ 1-on-1 targeted tutoring sessions</li>
              <li>✓ Topic-by-topic practice and mistake breakdowns</li>
              <li>✓ Pre-test review plans and study checklists</li>
              <li>✓ Support for school coursework and pacing</li>
              <li>✓ Progress updates for students and families</li>
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="https://calendly.com/futurereadycollegeprep/free-15-min-consultation"
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackCalendlyClick}
              className="rounded-xl bg-amber-700 px-7 py-4 text-white font-bold shadow-lg shadow-amber-700/20 hover:bg-amber-800 transition"
            >
              Book a Free 15-Min Consultation
            </a>
            <button
              type="button"
              onClick={onBack}
              className="rounded-xl bg-white px-7 py-4 text-slate-800 font-bold border border-slate-200 shadow-sm hover:border-blue-300 transition"
            >
              Return to Main Site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
