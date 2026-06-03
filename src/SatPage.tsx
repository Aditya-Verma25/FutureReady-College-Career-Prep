import { useEffect } from "react";
import { trackConsultationClick } from "./lib/analytics";

type SatPageProps = {
  onBack: () => void;
};

export default function SatPage({ onBack }: SatPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  function trackCalendlyClick() {
    trackConsultationClick("sat_program");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5fbff] via-cyan-50 to-blue-50 text-slate-900">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
        >
          ← Back to Home
        </button>

        <div className="mt-6 rounded-[2rem] border border-cyan-200 bg-gradient-to-r from-white to-cyan-50 p-8 shadow-xl md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-700">
            FutureReady SAT Program
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
            Personalized SAT Prep That Actually Feels Manageable
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            We build a practical, student-first SAT plan focused on your exact
            weak areas, test strategy, and confidence. No generic workbook
            grind. Just clear progress each week.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-5">
              <p className="text-sm font-bold text-cyan-700">Diagnostic First</p>
              <p className="mt-2 text-sm text-slate-600">
                Start with a targeted review to identify highest-impact score
                opportunities.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
              <p className="text-sm font-bold text-emerald-700">Custom Plan</p>
              <p className="mt-2 text-sm text-slate-600">
                Weekly structure for Math and Reading/Writing with realistic
                pacing.
              </p>
            </div>
            <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5">
              <p className="text-sm font-bold text-violet-700">Score Strategy</p>
              <p className="mt-2 text-sm text-slate-600">
                Time management, question selection, and test-day execution.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-2xl font-black text-slate-950">
              What You Get
            </h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              <li>✓ 1-on-1 tutoring sessions tailored to your goals</li>
              <li>✓ Targeted homework and review between sessions</li>
              <li>✓ Mistake analysis so errors do not repeat</li>
              <li>✓ Full-length practice test planning and debriefs</li>
              <li>✓ Parent/student progress updates and next steps</li>
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="https://calendly.com/futurereadycollegeprep/free-15-min-consultation"
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackCalendlyClick}
              className="rounded-xl bg-cyan-700 px-7 py-4 text-white font-bold shadow-lg shadow-cyan-700/20 hover:bg-cyan-800 transition"
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
