import { useState, type FormEvent } from "react";
import ReactGA from "react-ga4";

type FutureReadyReportPageProps = { onBack: () => void };

type IntakePayload = {
  studentName: string;
  email: string;
  gradeLevel: string;
  intendedMajor: string;
  careerInterests: string;
  stateOfResidence: string;
  schoolsBeingConsidered: string;
  budgetDebtConcerns: string;
  optionalNotes: string;
};

const checkoutSectionId = "report-checkout";
const sampleSectionId = "sample-report";

const trustPoints = [
  "Built by a current University of Maryland Computer Science student",
  "1500+ SAT scorer",
  "Published AI/ML researcher",
  "Experience tutoring and mentoring students",
  "Recent firsthand college admissions experience",
];

const reportCards = [
  { title: "College Fit Snapshot", description: "A quick fit analysis of your schools and major direction based on your goals and constraints." },
  { title: "Major ROI Breakdown", description: "A practical look at potential value, flexibility, and likely tradeoffs for your selected major path." },
  { title: "Career Path Map", description: "4-6 likely career tracks, required skills, education expectations, and trajectory notes." },
  { title: "Debt and Cost Reality Check", description: "A parent-friendly view of cost pressure, debt exposure, and risk-aware planning considerations." },
  { title: "AI Disruption Snapshot", description: "How automation and AI may affect key roles and what skills improve long-term resilience." },
  { title: "Recommended Next Steps", description: "A prioritized action plan so students and families can make decisions with more confidence." },
];

const faqs = [
  {
    question: "Is this college counseling?",
    answer: "No. This is a one-time digital report, not live counseling or an ongoing advising package.",
  },
  {
    question: "Who is this for?",
    answer:
      "High school students, college applicants, undecided students, and parents who want clearer information before making college or major decisions.",
  },
  { question: "Is this personalized?", answer: "Yes, based on the information you submit." },
  {
    question: "Does this guarantee admissions or salary outcomes?",
    answer: "No. It provides data-informed guidance, not guarantees.",
  },
  {
    question: "How is this different from a college counselor?",
    answer:
      "It is faster, more affordable, and focused on data-backed clarity. Families who want deeper support can still use counseling separately.",
  },
];

export default function FutureReadyReportPage({ onBack }: FutureReadyReportPageProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function trackReport(action: string) {
    ReactGA.event({ category: "Report", action });
  }

  function scrollToSection(sectionId: string, action: string) {
    trackReport(action);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    const formData = new FormData(event.currentTarget);
    const payload: IntakePayload = {
      studentName: String(formData.get("studentName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      gradeLevel: String(formData.get("gradeLevel") ?? "").trim(),
      intendedMajor: String(formData.get("intendedMajor") ?? "").trim(),
      careerInterests: String(formData.get("careerInterests") ?? "").trim(),
      stateOfResidence: String(formData.get("stateOfResidence") ?? "").trim(),
      schoolsBeingConsidered: String(formData.get("schoolsBeingConsidered") ?? "").trim(),
      budgetDebtConcerns: String(formData.get("budgetDebtConcerns") ?? "").trim(),
      optionalNotes: String(formData.get("optionalNotes") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { checkoutUrl?: string; message?: string };
      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data.message || "Unable to start checkout.");
      }

      trackReport("Started Checkout");
      window.location.href = data.checkoutUrl;
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to start checkout.");
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fbff] via-blue-50 to-indigo-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <button type="button" onClick={onBack} className="inline-flex items-center rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800">
          Back to Home
        </button>

        <section className="mt-6 rounded-[2rem] border border-blue-200 bg-gradient-to-r from-white to-blue-50 p-8 shadow-xl md:p-12">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-blue-700">FutureReady Report</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            You are not just choosing a major. You are choosing a future.
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">
            Get a personalized college, major, and career intelligence report that shows real costs, salary outcomes, career paths, risk factors, and smarter next steps before you commit.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-blue-100 bg-white px-4 py-3 text-sm font-semibold text-slate-700">Ranked school and major fit insights</div>
            <div className="rounded-2xl border border-blue-100 bg-white px-4 py-3 text-sm font-semibold text-slate-700">Realistic cost and debt considerations</div>
            <div className="rounded-2xl border border-blue-100 bg-white px-4 py-3 text-sm font-semibold text-slate-700">Salary and career path breakdowns</div>
            <div className="rounded-2xl border border-blue-100 bg-white px-4 py-3 text-sm font-semibold text-slate-700">AI and job market disruption risk</div>
            <div className="rounded-2xl border border-blue-100 bg-white px-4 py-3 text-sm font-semibold text-slate-700 sm:col-span-2">Personalized next-step recommendations</div>
          </div>
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <input type="text" placeholder="Enter a major or career interest..." className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
              <button type="button" onClick={() => scrollToSection(checkoutSectionId, "Clicked Hero Get My Report")} className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800">
                Get My Report
              </button>
            </div>
            <p className="mt-3 text-xs font-semibold text-slate-500">One-time payment - Delivered digitally - No subscription</p>
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {trustPoints.map((point) => (
              <p key={point} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">{point}</p>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <h2 className="text-3xl font-black text-slate-950">What You Get</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reportCards.map((card) => (
              <article key={card.title} className="rounded-3xl border border-blue-100 bg-gradient-to-b from-white to-blue-50/40 p-5">
                <h3 className="text-lg font-black text-slate-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <h2 className="text-3xl font-black text-slate-950">Most college decisions are made with incomplete information.</h2>
          <p className="mt-4 max-w-4xl text-slate-600 leading-relaxed">
            Many students choose based on rankings, vibes, pressure, or familiarity. But these choices affect debt load, internships, long-term flexibility, and early career options. This report helps families evaluate those tradeoffs with structured, data-informed guidance.
          </p>
        </section>

        <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <h2 className="text-3xl font-black text-slate-950">Illustrative Scenario Comparison</h2>
          <p className="mt-2 text-sm text-slate-500">Illustrative examples only. These are not guaranteed outcomes.</p>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <article className="rounded-3xl border border-rose-100 bg-rose-50/40 p-6">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-rose-700">Example A</p>
              <h3 className="mt-2 text-xl font-black text-slate-900">Prestige-first decision</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">Student A picks a school mainly for prestige and later faces high debt with weaker alignment to role outcomes and internship pathways.</p>
            </article>
            <article className="rounded-3xl border border-emerald-100 bg-emerald-50/40 p-6">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-700">Example B</p>
              <h3 className="mt-2 text-xl font-black text-slate-900">Data-informed decision</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">Student B compares major outcomes, cost, debt exposure, and recruiting access, then picks a path with stronger flexibility and lower financial strain.</p>
            </article>
          </div>
        </section>

        <section id={sampleSectionId} className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <h2 className="text-3xl font-black text-slate-950">See what is inside the report</h2>
          <button type="button" onClick={() => scrollToSection(checkoutSectionId, "Clicked View Sample Report")} className="mt-5 rounded-xl border border-blue-200 bg-blue-50 px-6 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-100">
            View Sample Report
          </button>
        </section>

        <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <h2 className="text-3xl font-black text-slate-950">How It Works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5"><p className="text-xs font-black uppercase tracking-[0.12em] text-blue-700">Step 1</p><p className="mt-2 text-sm font-semibold text-slate-700">Tell us your major, school interests, and goals.</p></article>
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5"><p className="text-xs font-black uppercase tracking-[0.12em] text-blue-700">Step 2</p><p className="mt-2 text-sm font-semibold text-slate-700">Complete one-time checkout.</p></article>
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5"><p className="text-xs font-black uppercase tracking-[0.12em] text-blue-700">Step 3</p><p className="mt-2 text-sm font-semibold text-slate-700">Your PDF report is generated and emailed to you.</p></article>
          </div>
        </section>

        <section id={checkoutSectionId} className="mt-6 rounded-[2rem] border border-blue-200 bg-gradient-to-r from-white to-blue-50 p-6 shadow-sm md:p-10">
          <h2 className="text-3xl font-black text-slate-950">FutureReady Report Checkout Intake</h2>
          <p className="mt-2 text-slate-600">Submit details below, then complete one-time payment. Report generation runs only after payment confirmation.</p>
          <form onSubmit={handleSubmit} className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="text-sm font-semibold text-slate-700">Student name<input name="studentName" type="text" required className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200" /></label>
            <label className="text-sm font-semibold text-slate-700">Parent/guardian or student email<input name="email" type="email" required className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200" /></label>
            <label className="text-sm font-semibold text-slate-700">Grade level<input name="gradeLevel" type="text" required className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200" /></label>
            <label className="text-sm font-semibold text-slate-700">Intended major or area of interest<input name="intendedMajor" type="text" required className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200" /></label>
            <label className="text-sm font-semibold text-slate-700">Career interests<input name="careerInterests" type="text" required className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200" /></label>
            <label className="text-sm font-semibold text-slate-700">State of residence<input name="stateOfResidence" type="text" required className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200" /></label>
            <label className="text-sm font-semibold text-slate-700 md:col-span-2">Schools being considered<textarea name="schoolsBeingConsidered" rows={3} required className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200" /></label>
            <label className="text-sm font-semibold text-slate-700">Budget/debt concerns<textarea name="budgetDebtConcerns" rows={3} required className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200" /></label>
            <label className="text-sm font-semibold text-slate-700">Optional notes/goals<textarea name="optionalNotes" rows={3} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200" /></label>
            <div className="md:col-span-2">
              <button type="submit" disabled={submitting} className="rounded-xl bg-blue-700 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70">
                {submitting ? "Starting Checkout..." : "Get My Report"}
              </button>
            </div>
          </form>
          {submitError && <p className="mt-3 text-sm font-semibold text-red-600">{submitError}</p>}
          <p className="mt-4 text-xs text-slate-500">This report is an educational planning tool. It does not guarantee admission, scholarships, employment, or financial outcomes.</p>
          <p className="mt-2 text-xs text-slate-500">Salary and job data are estimates from public sources and can vary by location, experience, market conditions, and individual decisions.</p>
        </section>

        <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <h2 className="text-3xl font-black text-slate-950">FAQ</h2>
          <div className="mt-5 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <summary className="cursor-pointer text-sm font-bold text-slate-800">{faq.question}</summary>
                <p className="mt-2 text-sm text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
