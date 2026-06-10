import { useEffect } from "react";
import { trackConsultationClick } from "./lib/analytics";

type CollegeAppsPageProps = {
  onBack: () => void;
};

export default function CollegeAppsPage({ onBack }: CollegeAppsPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  function trackCalendlyClick() {
    trackConsultationClick("college_apps");
  }

  const consultationUrl = "https://calendly.com/futurereadycollegeprep/free-15-min-consultation";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fcfaff] via-violet-50 to-rose-50 text-slate-900">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center rounded-xl bg-slate-200/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-300"
        >
          ← Back to Home
        </button>

        <div className="mt-6 rounded-[2rem] border border-violet-200 bg-gradient-to-r from-white to-violet-50/30 p-8 shadow-xl md:p-10">
          {/* Header */}
          <p className="text-sm font-black uppercase tracking-[0.14em] text-violet-700">
            FutureReady College Apps Program
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl leading-tight">
            College Applications With Clarity, Strategy, and Your Own Voice
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            We simplify the process into clear weekly steps, so students avoid
            last-minute stress and submit stronger, more authentic applications.
          </p>

          {/* Trust Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-slate-200/80 py-4 text-sm font-medium text-slate-600">
            <span className="flex items-center gap-1.5"><span className="text-violet-600">🎓</span> Built by current UMD CS student</span>
            <span className="hidden md:inline text-slate-300">•</span>
            <span className="flex items-center gap-1.5"><span className="text-violet-600">✏️</span> 1520 SAT</span>
            <span className="hidden md:inline text-slate-300">•</span>
            <span className="flex items-center gap-1.5"><span className="text-violet-600">💰</span> $200k+ merit scholarships</span>
            <span className="hidden md:inline text-slate-300">•</span>
            <span className="flex items-center gap-1.5"><span className="text-violet-600">🤝</span> Personalized 1:1 support</span>
          </div>

          {/* Best Fit For Students Who... */}
          <div className="mt-12">
            <h2 className="text-2xl font-black text-slate-950">Best Fit For Students Who...</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Feel overwhelmed by the college application process",
                "Need structure and accountability",
                "Want authentic essays that still sound like them",
                "Are applying to competitive schools and want strategic guidance",
                "Want support without the pressure or cost of traditional admissions consulting",
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 rounded-2xl border border-violet-100 bg-violet-50/30 p-5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">✓</span>
                  <p className="text-sm font-medium leading-relaxed text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How the Process Works */}
          <div className="mt-14">
            <h2 className="text-2xl font-black text-slate-950">How the Process Works</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { step: "Step 1", title: "Free Intro Consultation", desc: "A 15-minute call to discuss goals, academic background, and timeline." },
                { step: "Step 2", title: "Personalized Roadmap", desc: "We design a custom list building, essay writing, and submission schedule." },
                { step: "Step 3", title: "Weekly Support & Feedback", desc: "Actionable essay coaching, application check-ins, and consistent accountability." },
                { step: "Step 4", title: "Final Review", desc: "A detailed final pass of all applications before you hit submit." }
              ].map((step, idx) => (
                <div key={idx} className="relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                  <span className="inline-block rounded-lg bg-violet-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-violet-700">{step.step}</span>
                  <h3 className="mt-3 text-base font-bold text-slate-950">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Flexible Support Options */}
          <div className="mt-14">
            <h2 className="text-2xl font-black text-slate-950">Flexible Support Options</h2>
            <p className="mt-2 text-slate-600">Select the plan that fits your current goals and budget. No long-term contracts required.</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "College Strategy Session",
                  price: "$79",
                  badge: "Popular Starter",
                  desc: "Personalized roadmap, application strategy, college list direction, timeline planning, and Q&A."
                },
                {
                  title: "Essay Review",
                  price: "$59",
                  badge: "Starting at",
                  desc: "Actionable written feedback on structure, storytelling, clarity, and authenticity while keeping the student's voice intact."
                },
                {
                  title: "Live Essay Coaching",
                  price: "$75",
                  badge: "45–60 min session",
                  desc: "A collaborative live session to brainstorm, draft, revise, or strengthen an essay in real time."
                },
                {
                  title: "Ongoing Coaching",
                  price: "$249",
                  badge: "Starting at /mo",
                  desc: "Weekly guidance, timeline support, essay coaching, messaging support, and overall application planning."
                }
              ].map((pkg, idx) => (
                <div key={idx} className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-violet-700 bg-violet-50 px-2 py-0.5 rounded-md">{pkg.badge}</span>
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
              Most families start with a strategy session or essay review before moving into ongoing support.
            </p>
          </div>

          {/* CTA & Urgency */}
          <div className="mt-14 border-t border-slate-200 pt-8 flex flex-col items-center">
            <p className="text-sm font-semibold text-rose-600 mb-4 flex items-center gap-1.5">
              <span className="animate-pulse h-2 w-2 rounded-full bg-rose-500" />
              Limited summer availability as application season approaches.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={consultationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackCalendlyClick}
                className="rounded-xl bg-violet-700 px-7 py-4 text-white font-bold shadow-lg shadow-violet-700/20 hover:bg-violet-800 transition"
              >
                Book a Free 15-Min Consultation
              </a>
              <a
                href="#/personalized-feedback"
                className="rounded-xl bg-white px-7 py-4 text-slate-800 font-bold border border-slate-200 shadow-sm hover:border-violet-300 transition hover:text-violet-700"
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
          <div className="mt-14 rounded-2xl border border-violet-100 bg-violet-50/20 p-6 md:p-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-2xl">💡</span>
              <p className="mt-3 text-base md:text-lg font-medium italic text-slate-700 leading-relaxed">
                "Essays should sound like the student — just clearer, stronger, and more intentional. The goal is never to rewrite a student’s personality. It’s to help them communicate their story with confidence."
              </p>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="mt-14 border-t border-slate-200 pt-8">
            <h2 className="text-2xl font-black text-slate-950">Frequently Asked Questions</h2>
            <div className="mt-6 space-y-4">
              {[
                {
                  q: "Do you work virtually?",
                  a: "Yes. Support is available virtually, with local in-person options when available."
                },
                {
                  q: "What grades do you work with?",
                  a: "Primarily rising juniors and seniors, but younger students can also benefit from early planning."
                },
                {
                  q: "Can you help with Common App essays and supplements?",
                  a: "Yes. Support includes personal statements, supplemental essays, activities sections, honors sections, and overall application positioning."
                },
                {
                  q: "Is this only for students applying to highly selective colleges?",
                  a: "No. The goal is to build the strongest possible application strategy for each student's goals, whether they are applying to state schools, honors programs, UCs, private universities, or competitive majors."
                },
                {
                  q: "How is this different from just using AI?",
                  a: "AI can give generic feedback, but this program focuses on personal strategy, authentic storytelling, accountability, and helping students make decisions with real human guidance."
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
