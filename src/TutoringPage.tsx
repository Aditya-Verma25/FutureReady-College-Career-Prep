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

  const consultationUrl = "https://calendly.com/futurereadycollegeprep/free-15-min-consultation";

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

        <div className="mt-6 rounded-[2rem] border border-amber-200 bg-gradient-to-r from-white to-amber-50/30 p-8 shadow-xl md:p-10">
          {/* Header */}
          <p className="text-sm font-black uppercase tracking-[0.14em] text-amber-700">
            FutureReady Academic Tutoring
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl leading-tight">
            Tutoring That Builds Grades and Confidence
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            Personalized support for math and computer science with clear explanations, smart practice, and accountability that helps students actually improve.
          </p>

          {/* Trust Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-slate-200/80 py-4 text-sm font-medium text-slate-600">
            <span className="flex items-center gap-1.5"><span className="text-amber-600">🎓</span> Built by current UMD CS student</span>
            <span className="hidden md:inline text-slate-300">•</span>
            <span className="flex items-center gap-1.5"><span className="text-amber-600">🤝</span> Personalized 1-on-1 support</span>
            <span className="hidden md:inline text-slate-300">•</span>
            <span className="flex items-center gap-1.5"><span className="text-amber-600">💡</span> Student-first approach</span>
            <span className="hidden md:inline text-slate-300">•</span>
            <span className="flex items-center gap-1.5"><span className="text-amber-600">✏️</span> Practical learning strategies</span>
          </div>

          {/* Best Fit For Students Who... */}
          <div className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">Best Fit For Students Who...</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Feel confused or stuck in math or computer science classes",
                "Need more structure and accountability outside school",
                "Want clear explanations instead of memorizing steps",
                "Struggle with test preparation or staying organized",
                "Want personalized support instead of falling behind in large classrooms",
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 rounded-2xl border border-amber-100 bg-cyan-50/30 p-5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">✓</span>
                  <p className="text-sm font-medium leading-relaxed text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How Tutoring Works */}
          <div className="mt-14">
            <h2 className="text-2xl font-black text-slate-950">How Tutoring Works</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { step: "Step 1", title: "Identify Gaps and Goals", desc: "Review coursework, current challenges, and academic goals." },
                { step: "Step 2", title: "Personalized Learning Plan", desc: "Build a focused strategy around weak areas, pacing, and upcoming tests or assignments." },
                { step: "Step 3", title: "Weekly Tutoring + guided practice", desc: "Use clear explanations, examples, and targeted practice to improve understanding and confidence." },
                { step: "Step 4", title: "Reinforcement + accountability", desc: "Track progress, improve study habits, and build long-term academic consistency." }
              ].map((step, idx) => (
                <div key={idx} className="relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                  <span className="inline-block rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-700">{step.step}</span>
                  <h3 className="mt-3 text-base font-bold text-slate-950">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Flexible Tutoring Options */}
          <div className="mt-14">
            <h2 className="text-2xl font-black text-slate-950">Flexible Tutoring Options</h2>
            <p className="mt-2 text-slate-600">Select the tutoring support style that fits your current coursework and goals.</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-2 max-w-3xl mx-auto">
              {[
                {
                  title: "1-on-1 Academic Tutoring",
                  price: "$55",
                  badge: "Starting at /hr",
                  desc: "Personalized support for math, computer science, and related coursework with targeted explanations and guided practice (includes homework & test prep support)."
                },
                {
                  title: "Ongoing Academic Coaching",
                  price: "$200",
                  badge: "Starting at /mo",
                  desc: "Weekly tutoring, accountability, study planning, assignment support, and long-term academic guidance."
                }
              ].map((pkg, idx) => (
                <div key={idx} className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">{pkg.badge}</span>
                    <h3 className="mt-3 text-lg font-bold text-slate-950">{pkg.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{pkg.desc}</p>
                  </div>
                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <span className="text-3xl font-black text-slate-950">{pkg.price}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs font-semibold text-slate-500">
              Most students begin with 1-on-1 tutoring before moving into ongoing academic support.
            </p>
          </div>

          {/* CTA & Urgency */}
          <div className="mt-14 border-t border-slate-200 pt-8 flex flex-col items-center">
            <p className="text-sm font-semibold text-rose-600 mb-4 flex items-center gap-1.5">
              <span className="animate-pulse h-2 w-2 rounded-full bg-rose-500" />
              Limited summer availability before the next school year begins.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={consultationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackCalendlyClick}
                className="rounded-xl bg-amber-700 px-7 py-4 text-white font-bold shadow-lg shadow-amber-700/20 hover:bg-amber-800 transition"
              >
                Book a Free 15-Min Consultation
              </a>
              <a
                href="#/personalized-feedback"
                className="rounded-xl bg-white px-7 py-4 text-slate-800 font-bold border border-slate-200 shadow-sm hover:border-amber-300 transition hover:text-amber-700"
              >
                Start With a Tutoring Session
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
          <div className="mt-14 rounded-2xl border border-amber-100 bg-amber-50/20 p-6 md:p-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-2xl">💡</span>
              <p className="mt-3 text-base md:text-lg font-medium italic text-slate-700 leading-relaxed">
                "The goal is not just short-term homework help. We focus on building stronger understanding, confidence, and independent learning habits over time."
              </p>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="mt-14 border-t border-slate-200 pt-8">
            <h2 className="text-2xl font-black text-slate-950">Frequently Asked Questions</h2>
            <div className="mt-6 space-y-4">
              {[
                {
                  q: "What subjects do you tutor?",
                  a: "Support is available for a range of math and computer science topics including algebra, geometry, precalculus, calculus, introductory programming, and foundational CS concepts."
                },
                {
                  q: "Do you tutor virtually?",
                  a: "Yes. Sessions are available virtually, with local in-person options when available."
                },
                {
                  q: "Do you help with homework and test prep?",
                  a: "Yes. Sessions can focus on assignments, quizzes, exams, study strategies, and strengthening core understanding."
                },
                {
                  q: "How often do students usually meet?",
                  a: "Most students meet once or twice per week depending on workload, goals, and academic needs."
                },
                {
                  q: "How is this different from school tutoring centers?",
                  a: "Students receive personalized 1-on-1 guidance, adaptive pacing, and consistent accountability tailored to their individual learning style and goals."
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
