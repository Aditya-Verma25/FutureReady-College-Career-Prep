import { useEffect } from "react";
import ReactGA from "react-ga4";

type CollegeAppsPageProps = {
  onBack: () => void;
};

export default function CollegeAppsPage({ onBack }: CollegeAppsPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  function trackCalendlyClick() {
    ReactGA.event({
      category: "Consultation",
      action: "Clicked Calendly Button",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fcfaff] via-violet-50 to-rose-50 text-slate-900">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
        >
          ← Back to Home
        </button>

        <div className="mt-6 rounded-[2rem] border border-violet-200 bg-gradient-to-r from-white to-violet-50 p-8 shadow-xl md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-violet-700">
            FutureReady College Apps Program
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
            College Applications With Clarity, Strategy, and Your Own Voice
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            We simplify the process into clear weekly steps, so students avoid
            last-minute stress and submit stronger, more authentic applications.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5">
              <p className="text-sm font-bold text-violet-700">College List Strategy</p>
              <p className="mt-2 text-sm text-slate-600">
                Build a balanced reach/target/likely list aligned with goals and fit.
              </p>
            </div>
            <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5">
              <p className="text-sm font-bold text-violet-700">Essay Coaching</p>
              <p className="mt-2 text-sm text-slate-600">
                Structure, storytelling, and revisions that keep your voice intact.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
              <p className="text-sm font-bold text-emerald-700">Execution Plan</p>
              <p className="mt-2 text-sm text-slate-600">
                Timeline management so deadlines never sneak up on you.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-2xl font-black text-slate-950">What You Get</h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              <li>✓ Application timeline from start to submission</li>
              <li>✓ Common App activities + honors section support</li>
              <li>✓ Personal statement and supplemental essay editing</li>
              <li>✓ College list positioning and final review</li>
              <li>✓ Interview prep and confidence coaching</li>
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="https://calendly.com/futurereadycollegeprep/free-15-min-consultation"
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackCalendlyClick}
              className="rounded-xl bg-violet-700 px-7 py-4 text-white font-bold shadow-lg shadow-violet-700/20 hover:bg-violet-800 transition"
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
