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

  const consultationUrl = "https://calendly.com/futurereadycollegeprep/free-15-min-consultation";

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

        <div className="mt-6 rounded-[2rem] border border-cyan-200 bg-gradient-to-r from-white to-cyan-50/30 p-8 shadow-xl md:p-10">
          {/* Header */}
          <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-700">
            FutureReady SAT Program
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl leading-tight">
            Personalized SAT Prep That Actually Feels Manageable
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            We build a practical, student-first SAT plan focused on your exact weak areas, test strategy, and confidence. No generic workbook grind. Just clear progress each week.
          </p>

          {/* Trust Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-slate-200/80 py-4 text-sm font-medium text-slate-600">
            <span className="flex items-center gap-1.5"><span className="text-cyan-600">🎓</span> Built by current UMD CS student</span>
            <span className="hidden md:inline text-slate-300">•</span>
            <span className="flex items-center gap-1.5"><span className="text-cyan-600">✏️</span> 1520 SAT</span>
            <span className="hidden md:inline text-slate-300">•</span>
            <span className="flex items-center gap-1.5"><span className="text-cyan-600">🤝</span> Personalized 1-on-1 support</span>
            <span className="hidden md:inline text-slate-300">•</span>
            <span className="flex items-center gap-1.5"><span className="text-cyan-600">💡</span> Student-first approach</span>
          </div>

          {/* Best Fit For Students Who... */}
          <div className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">Best Fit For Students Who...</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Feel stuck despite studying already",
                "Need structure and accountability",
                "Want to improve efficiently instead of grinding random practice",
                "Struggle with timing, consistency, or test anxiety",
                "Want personalized support instead of large prep classes",
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 rounded-2xl border border-cyan-100 bg-cyan-50/30 p-5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-sm font-bold text-cyan-700">✓</span>
                  <p className="text-sm font-medium leading-relaxed text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How the Program Works */}
          <div className="mt-14">
            <h2 className="text-2xl font-black text-slate-950">How the Program Works</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { step: "Step 1", title: "Diagnostic + Score Analysis", desc: "Review strengths, weaknesses, and highest-impact score opportunities." },
                { step: "Step 2", title: "Personalized Roadmap", desc: "Create a realistic weekly study plan tailored to your schedule and goals." },
                { step: "Step 3", title: "Weekly Tutoring + Strategy", desc: "Target weak areas, improve timing, and build confidence." },
                { step: "Step 4", title: "Practice Tests + Refinement", desc: "Use full-length practice exams and mistake analysis to maximize score growth." }
              ].map((step, idx) => (
                <div key={idx} className="relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                  <span className="inline-block rounded-lg bg-cyan-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-cyan-700">{step.step}</span>
                  <h3 className="mt-3 text-base font-bold text-slate-950">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Flexible SAT Support Options */}
          <div className="mt-14">
            <h2 className="text-2xl font-black text-slate-950">Flexible SAT Support Options</h2>
            <p className="mt-2 text-slate-600">Select the support style that fits your current goals and timelines.</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "1-on-1 SAT Tutoring",
                  price: "$49",
                  unit: "/hr",
                  badge: "Starting at",
                  desc: "Personalized sessions focused on weak areas, pacing strategy, and score improvement."
                },
                {
                  title: "SAT Diagnostic & Custom Study Plan",
                  price: "$79",
                  unit: "",
                  badge: "Best Value Starter",
                  desc: "A comprehensive diagnostic test review and detailed analysis of your highest-impact growth areas, paired with a customized weekly study calendar."
                },
                {
                  title: "Practice Test Review",
                  price: "$59",
                  unit: "/review",
                  badge: "Starting at",
                  desc: "Detailed review of mistakes, pacing issues, and improvement opportunities after a full-length SAT."
                },
                {
                  title: "Monthly SAT Coaching",
                  price: "$249",
                  unit: "/mo",
                  badge: "Starting at",
                  desc: "Ongoing support including weekly sessions, structured study planning, homework guidance, and accountability."
                }
              ].map((pkg, idx) => (
                <div key={idx} className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-md">{pkg.badge}</span>
                    <h3 className="mt-3 text-lg font-bold text-slate-950">{pkg.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{pkg.desc}</p>
                  </div>
                  <div className="mt-6 border-t border-slate-100 pt-4 flex items-baseline">
                    <span className="text-3xl font-black text-slate-950 tracking-tight">{pkg.price}</span>
                    {pkg.unit && (
                      <span className="text-[13px] font-medium text-slate-400/90 ml-1">{pkg.unit}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs font-semibold text-slate-500">
              Most students begin with the Diagnostic & Custom Study Plan before moving into 1-on-1 tutoring or ongoing coaching.
            </p>
          </div>

          {/* CTA & Urgency */}
          <div className="mt-14 border-t border-slate-200 pt-8 flex flex-col items-center">
            <p className="text-sm font-semibold text-rose-600 mb-4 flex items-center gap-1.5">
              <span className="animate-pulse h-2 w-2 rounded-full bg-rose-500" />
              Limited summer availability before fall testing dates.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={consultationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackCalendlyClick}
                className="rounded-xl bg-cyan-700 px-7 py-4 text-white font-bold shadow-lg shadow-cyan-700/20 hover:bg-cyan-800 transition"
              >
                Book a Free 15-Min Consultation
              </a>
              <a
                href="#/personalized-feedback"
                className="rounded-xl bg-white px-7 py-4 text-slate-800 font-bold border border-slate-200 shadow-sm hover:border-cyan-300 transition hover:text-cyan-700"
              >
                Start With a Strategy Session
              </a>
              <button
                type="button"
                onClick={onBack}
                className="rounded-xl bg-slate-100 hover:bg-slate-200 px-7 py-4 text-slate-700 font-bold transition"
              >
                Return to Main Site
              </button>
            </div>
          </div>

          {/* Reassurance Section */}
          <div className="mt-14 rounded-2xl border border-cyan-100 bg-cyan-50/20 p-6 md:p-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-2xl">💡</span>
              <p className="mt-3 text-base md:text-lg font-medium italic text-slate-700 leading-relaxed">
                "The goal is not endless busywork or overwhelming homework. We focus on efficient improvement, confidence, and building sustainable testing habits."
              </p>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="mt-14 border-t border-slate-200 pt-8">
            <h2 className="text-2xl font-black text-slate-950">Frequently Asked Questions</h2>
            <div className="mt-6 space-y-4">
              {[
                {
                  q: "Do you tutor virtually?",
                  a: "Yes. Sessions are available virtually, with local in-person options when available."
                },
                {
                  q: "What score ranges do you work with?",
                  a: "Support is personalized for a wide range of starting scores and goals, from foundational improvement to competitive score targets."
                },
                {
                  q: "Do you assign homework?",
                  a: "Yes, but it is targeted and manageable. The focus is on high-impact practice rather than excessive busywork."
                },
                {
                  q: "How often do students usually meet?",
                  a: "Most students meet once or twice per week depending on timeline, goals, and availability."
                },
                {
                  q: "How is this different from large SAT prep companies?",
                  a: "Students receive personalized 1-on-1 guidance, adaptive pacing, and direct feedback instead of generic class-based instruction."
                }
              ].map((faq, idx) => (
                <details key={idx} className="group rounded-2xl border border-slate-200 bg-white p-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-slate-900 focus:outline-none">
                    <h3 className="text-base font-bold">{faq.q}</h3>
                    <span className="relative h-5 w-5 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 transition group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
