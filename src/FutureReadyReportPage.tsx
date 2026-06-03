import { useState, type FormEvent } from "react";
import { trackReportClick } from "./lib/analytics";

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
  const [showSampleModal, setShowSampleModal] = useState(false);
  const [previewReport, setPreviewReport] = useState<any | null>(null);
  const sampleReport: any = {
    studentName: "Sample Student",
    intendedMajor: "Computer Science",
    generatedOn: new Date().toISOString(),
    executiveSummary: {
      opportunityRating: "Moderate-High",
      keyTakeaways: [
        "Prioritize programs with internship conversion and employer visibility.",
        "Compare net price, not sticker price, to avoid long-term debt risk.",
      ],
      bestFitCareerPaths: ["Software Engineer", "Data Analyst", "Product Manager", "UX Researcher"],
      mainFinancialRisks: ["Overborrowing for unclear ROI", "Ignoring total cost of attendance"],
      recommendedNextSteps: ["Build a side-by-side cost/outcome table", "Validate internship access at each school"],
    },
    majorOverview: {
      whatYouStudy: "Students in Computer Science typically build domain knowledge, problem-solving skills, and practical project experience.",
      commonSkills: ["Critical thinking", "Communication", "Quantitative reasoning", "Project execution"],
      fitProfile: "Students who enjoy structured problem solving, iterative learning, and practical application often fit well.",
    },
    careerPaths: [
      { title: "Software Engineer", medianSalary: "$95,000", projectedGrowth: "Strong", keySkills: ["Coding", "Systems design", "Testing"] , description: "High employer demand; strong internship pipelines matter."},
      { title: "Data Analyst", medianSalary: "$65,000", projectedGrowth: "Steady", keySkills: ["SQL", "Python", "Statistics"], description: "Good entry role for domain quant skills." },
      { title: "Product Manager", medianSalary: "$105,000", projectedGrowth: "Growing", keySkills: ["Communication", "Roadmapping", "User research"], description: "Requires cross-functional experience and internships help." },
      { title: "UX Researcher", medianSalary: "$85,000", projectedGrowth: "Moderate", keySkills: ["User interviews", "Analysis", "Writing"], description: "Pairs well with human-centered CS tracks." },
    ],
    costAndRoi: {
      inStateVsOutState: "In-state public options often reduce debt pressure and shorten breakeven timelines.",
      publicVsPrivate: "Private institutions can offer value with aid, but net cost must be compared carefully.",
      debtRisk: "Model borrowing conservatively; avoid optimistic salary assumptions.",
      breakevenThinking: "Estimate first-job earnings against total borrowing to understand repayment strain.",
    },
    schoolFit: [
      { schoolName: "University A", strengths: "Strong internship pipelines and regional employer access.", risks: "Moderate cost; check net price.", costNotes: "In-state: $18k; Out-of-state: $38k" },
      { schoolName: "College B", strengths: "High research visibility and selective CS program.", risks: "Higher sticker price and competitive admissions.", costNotes: "In-state: N/A; Out-of-state: $72k" },
      { schoolName: "State University C", strengths: "Large alumni network and broad recruiting.", risks: "Variable class sizes; check advising capacity.", costNotes: "In-state: $12k; Out-of-state: $30k" },
      { schoolName: "Regional Tech D", strengths: "Strong co-op and practical outcomes.", risks: "Smaller campus; consider fit.", costNotes: "In-state: $15k; Out-of-state: $35k" },
      { schoolName: "Private College E", strengths: "Personalized mentorship and undergrad research.", risks: "Net price can vary by aid.", costNotes: "Estimate: $48k" },
    ],
    aiRiskAndResilience: {
      aiFieldImpact: "AI will reshape routine tasks; depth and communication remain durable.",
      resilientSkills: ["Domain depth", "Communication", "Data literacy", "Problem framing"],
      recommendations: ["Add practical project experience", "Build a portfolio", "Pursue adaptable tools"],
    },
    strategyPlan: {
      academicPath: "Choose a core major track and stack practical electives.",
      minorsAndElectives: ["Data analytics", "Communication", "Economics"],
      extracurricularsAndProjects: ["Career-relevant club leadership", "Applied projects", "Community initiatives"],
      internshipTimeline: ["Year 1: Exploration", "Year 2: Skill-building internship", "Year 3: Targeted applications", "Year 4: Conversion"],
      skillsToBuildNow: ["Resume iteration", "Interview readiness", "Networking habits"],
    },
    finalActionPlan: {
      next30Days: ["Shortlist schools", "Gather net cost estimates", "Identify role pathways"],
      next6Months: ["Build two portfolio projects", "Apply for exploratory internships", "Refine academic roadmap"],
    },
    sources: [
      { name: "BLS Occupational Outlook Handbook", url: "https://www.bls.gov/ooh/", accessedOn: new Date().toISOString() },
      { name: "College Scorecard", url: "https://collegescorecard.ed.gov/data/", accessedOn: new Date().toISOString() },
      { name: "O*NET Online", url: "https://www.onetonline.org/", accessedOn: new Date().toISOString() },
    ],
    disclaimers: [
      "This report is for educational planning only.",
      "Salary and job data are estimates from public sources and may vary.",
    ],
  };

  function scrollToSection(sectionId: string, action: string) {
    // map action to a clean location and optional reportType
    if (action === "Clicked Hero Get My Report") {
      trackReportClick("hero", "full_report");
    }
    if (action === "Clicked View Sample Report") {
      trackReportClick("sample_section", "sample_report");
      setShowSampleModal(true);
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function parseSchools(raw: string) {
    return raw
      .split(/[\n,]/g)
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 8);
  }

  function buildPreview(payload: IntakePayload) {
    const schools = parseSchools(payload.schoolsBeingConsidered || "");
    const base = JSON.parse(JSON.stringify(sampleReport));
    base.studentName = payload.studentName || "Student";
    base.intendedMajor = payload.intendedMajor || base.intendedMajor;
    base.generatedOn = new Date().toISOString();

    base.executiveSummary.keyTakeaways = [
      `Because you listed ${payload.careerInterests || base.intendedMajor}, prioritize schools with strong internship funnels and career services.`,
      `Given budget concerns: ${payload.budgetDebtConcerns || 'none provided'}, net price should be a primary filter.`,
    ];
    base.executiveSummary.recommendedNextSteps = [
      'Shortlist 6 schools with clear internship outcomes',
      'Request net price estimates and aid offers',
    ];

    // personalizing careerPaths slightly by inserting major/career interest where helpful
    base.careerPaths = base.careerPaths.map((c: any) => ({
      ...c,
      earlyCareerReality: c.earlyCareerReality || 'Early roles often depend on internships; build projects early.',
      whatStudentsUnderestimate: c.whatStudentsUnderestimate || 'Timing and recruiter outreach matter earlier than expected.',
    }));

    // build schoolFit from user input
    base.schoolFit = schools.map((name: string) => {
      const normalized = name.toLowerCase();
      if (normalized.includes('maryland')) {
        return {
          schoolName: name,
          estimatedCostCategory: 'Moderate (in-state value)',
          majorStrength: 'Strong CS program with regional recruiting',
          internshipAccess: 'Strong—Baltimore/DC/MD employer networks',
          admissionsRisk: 'Moderate',
          financialRisk: 'Lower for in-state; out-of-state varies',
          notes: 'Good balance of research and industry recruiting.',
        };
      }
      if (normalized.includes('purdue')) {
        return {
          schoolName: name,
          estimatedCostCategory: 'Moderate',
          majorStrength: 'Large engineering & CS programs; strong placement',
          internshipAccess: 'Strong—Midwest and national recruiters',
          admissionsRisk: 'Moderate',
          financialRisk: 'Moderate',
          notes: 'Particularly strong for systems and engineering tracks.',
        };
      }
      if (normalized.includes('washington') || normalized.includes('uw')) {
        return {
          schoolName: name,
          estimatedCostCategory: 'Moderate-High',
          majorStrength: 'Highly ranked CS with deep employer networks',
          internshipAccess: 'Very strong—Seattle tech market',
          admissionsRisk: 'High (OOS)',
          financialRisk: 'Higher out-of-state cost',
          notes: 'Excellent tech recruiting; weigh cost vs opportunity.',
        };
      }
      // generic fallback
      return {
        schoolName: name,
        estimatedCostCategory: 'Estimate: check net price',
        majorStrength: 'Program strength varies—check major-specific outcomes',
        internshipAccess: 'Depends on region and employer presence',
        admissionsRisk: 'Varies by selectivity',
        financialRisk: 'Verify net price and aid offers',
        notes: 'Preliminary note—request program outcomes and internship stats from the school.',
      };
    });

    // personalize final action plan slightly
    base.finalActionPlan = {
      next30Days: ['Shortlist target schools', 'Request net price estimates', 'Start two recruiter-facing portfolio items'],
      next6Months: ['Apply for internships and research opportunities', 'Refine application list and essays', 'Secure strong recommenders'],
    };

    base.personalizationNote = `Personalized for ${payload.studentName} (${payload.gradeLevel}) in ${payload.stateOfResidence || 'your state'} considering ${payload.intendedMajor}.`;

    return base;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const payload: IntakePayload = {
        studentName: String(formData.get('studentName') ?? '').trim(),
        email: String(formData.get('email') ?? '').trim(),
        gradeLevel: String(formData.get('gradeLevel') ?? '').trim(),
        intendedMajor: String(formData.get('intendedMajor') ?? '').trim(),
        careerInterests: String(formData.get('careerInterests') ?? '').trim(),
        stateOfResidence: String(formData.get('stateOfResidence') ?? '').trim(),
        schoolsBeingConsidered: String(formData.get('schoolsBeingConsidered') ?? '').trim(),
        budgetDebtConcerns: String(formData.get('budgetDebtConcerns') ?? '').trim(),
        optionalNotes: String(formData.get('optionalNotes') ?? '').trim(),
      };

      const preview = buildPreview(payload);
      setPreviewReport(preview);
      setSubmitting(false);
      // scroll to preview
      setTimeout(() => document.getElementById('preview-section')?.scrollIntoView({ behavior: 'smooth' }), 200);
    } catch (err) {
      console.error('preview generation error', err);
      setSubmitError('Something went wrong while creating the preview. Please try again or book a free consultation.');
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
            <p className="mt-3 text-xs font-semibold text-slate-500">Demo mode: preview reports are available now; full checkout coming soon.</p>
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
          <button
            type="button"
            onClick={() => {
              trackReportClick('sample_section', 'sample_report');
              setShowSampleModal(true);
            }}
            className="mt-5 rounded-xl border border-blue-200 bg-blue-50 px-6 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
          >
            View Sample Report
          </button>
        </section>

        {showSampleModal && (
          <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black/40 p-6">
            <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black">Sample FutureReady Report (Preview)</h3>
                  <p className="mt-1 text-sm text-slate-500">Generated: {new Date(sampleReport.generatedOn).toLocaleString()}</p>
                </div>
                <div className="ml-auto">
                  <button onClick={() => setShowSampleModal(false)} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold">Close</button>
                </div>
              </div>

              <div className="mt-5 space-y-6">
                <section>
                  <h4 className="text-lg font-bold">Executive Summary</h4>
                  <p className="mt-2 text-sm text-slate-700"><strong>Opportunity Rating:</strong> {sampleReport.executiveSummary.opportunityRating}</p>
                  {sampleReport.executiveSummary.opportunityExplanation && (
                    <p className="mt-2 text-sm text-slate-700">{sampleReport.executiveSummary.opportunityExplanation}</p>
                  )}
                  <p className="mt-2 text-sm text-slate-700"><strong>Top takeaways:</strong> {sampleReport.executiveSummary.keyTakeaways.join(" ")}</p>
                  <p className="mt-2 text-sm text-slate-700"><strong>Recommended next steps:</strong> {sampleReport.executiveSummary.recommendedNextSteps.join("; ")}</p>
                </section>

                <section>
                  <h4 className="text-lg font-bold">Major Overview</h4>
                  <p className="mt-2 text-sm text-slate-700">{sampleReport.majorOverview.whatYouStudy}</p>
                  <p className="mt-2 text-sm text-slate-700"><strong>Common skills:</strong> {sampleReport.majorOverview.commonSkills.join(", ")}</p>
                </section>

                <section>
                  <h4 className="text-lg font-bold">Career Path Breakdown</h4>
                  <div className="mt-2 space-y-4 text-sm text-slate-700">
                    {sampleReport.careerPaths.map((c: any) => (
                      <div key={c.title} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                        <p className="font-semibold">{c.title} — {c.medianSalary} • {c.projectedGrowth}</p>
                        <p className="mt-1"><strong>Required education:</strong> {c.requiredEducation || "Varies"}</p>
                        <p className="mt-1"><strong>Top skills:</strong> {c.topSkills.join(", ")}</p>
                        <p className="mt-1"><strong>What students underestimate:</strong> {c.whatStudentsUnderestimate}</p>
                        <p className="mt-1"><strong>Early-career reality:</strong> {c.earlyCareerReality}</p>
                        <p className="mt-1 text-xs text-slate-500"><strong>AI resilience note:</strong> {c.aiResilienceNote || c.aiResilienceNote}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="text-lg font-bold">Cost, School Fit, and Action Plan</h4>
                  <p className="mt-2 text-sm text-slate-700"><strong>Cost & ROI:</strong> {sampleReport.costAndRoi.inStateVsOutState} {sampleReport.costAndRoi.publicVsPrivate}</p>
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full table-auto text-sm">
                      <thead>
                        <tr className="text-left text-xs text-slate-500">
                          <th className="px-2 py-2">School</th>
                          <th className="px-2 py-2">Cost</th>
                          <th className="px-2 py-2">Program Strength</th>
                          <th className="px-2 py-2">Internships/Recruiting</th>
                          <th className="px-2 py-2">Admissions Risk</th>
                          <th className="px-2 py-2">Financial Risk</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sampleReport.schoolFit.map((s: any) => (
                          <tr key={s.schoolName} className="border-t">
                            <td className="px-2 py-3 font-semibold">{s.schoolName}</td>
                            <td className="px-2 py-3">{s.estimatedCostCategory}</td>
                            <td className="px-2 py-3">{s.majorStrength}</td>
                            <td className="px-2 py-3">{s.internshipAccess}</td>
                            <td className="px-2 py-3">{s.admissionsRisk}</td>
                            <td className="px-2 py-3">{s.financialRisk}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section>
                  <h4 className="text-lg font-bold">AI Risk & Resilience</h4>
                  <p className="mt-2 text-sm text-slate-700">{sampleReport.aiRiskAndResilience.aiFieldImpact}</p>
                  <p className="mt-2 text-sm text-slate-700"><strong>Resilient skills:</strong> {sampleReport.aiRiskAndResilience.resilientSkills.join(", ")}</p>
                </section>

                <section>
                  <h4 className="text-lg font-bold">What Students Often Overlook</h4>
                  <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
                    {sampleReport.whatStudentsOftenOverlook?.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h4 className="text-lg font-bold">Strategy & Final Action Plan</h4>
                  <p className="mt-2 text-sm text-slate-700">Academic path: {sampleReport.strategyPlan.academicPath}</p>
                  <p className="mt-2 text-sm text-slate-700"><strong>30-day:</strong> {sampleReport.finalActionPlan.next30Days.join(", ")}</p>
                  <p className="mt-1 text-sm text-slate-700"><strong>6-month:</strong> {sampleReport.finalActionPlan.next6Months.join(", ")}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-bold text-white shadow hover:bg-blue-800"
                      onClick={() => setShowSampleModal(false)}
                    >
                      Close Preview
                    </button>

                    <a href="/book-consultation" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Book a Free Consultation</a>
                  </div>
                </section>

                <section>
                  <h4 className="text-lg font-bold">Sources & Disclaimers</h4>
                  <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
                    {sampleReport.sources.map((src: any) => (
                      <li key={src.name}>{src.name} — {src.url}</li>
                    ))}
                  </ul>
                  <div className="mt-2 text-xs text-slate-500">
                    {sampleReport.disclaimers.map((d: string, i: number) => (
                      <div key={i}>• {d}</div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}

        <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <h2 className="text-3xl font-black text-slate-950">How It Works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5"><p className="text-xs font-black uppercase tracking-[0.12em] text-blue-700">Step 1</p><p className="mt-2 text-sm font-semibold text-slate-700">Tell us your major, school interests, and goals.</p></article>
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5"><p className="text-xs font-black uppercase tracking-[0.12em] text-blue-700">Step 2</p><p className="mt-2 text-sm font-semibold text-slate-700">Complete one-time checkout.</p></article>
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5"><p className="text-xs font-black uppercase tracking-[0.12em] text-blue-700">Step 3</p><p className="mt-2 text-sm font-semibold text-slate-700">Your PDF report is generated and emailed to you.</p></article>
          </div>
        </section>

        <section id={checkoutSectionId} className="mt-6 rounded-[2rem] border border-blue-200 bg-gradient-to-r from-white to-blue-50 p-6 shadow-sm md:p-10">
          <h2 className="text-3xl font-black text-slate-950">FutureReady Report Preview Intake</h2>
          <p className="mt-2 text-slate-600">Submit a few details to preview the type of insights a full FutureReady Report would provide (demo mode).</p>
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
                {submitting ? 'Generating preview...' : 'Generate Preview'}
              </button>
            </div>
          </form>
          {submitError && <p className="mt-3 text-sm font-semibold text-red-600">{submitError}</p>}
          <p className="mt-4 text-xs text-slate-500">This report is an educational planning tool. It does not guarantee admission, scholarships, employment, or financial outcomes.</p>
          <p className="mt-2 text-xs text-slate-500">Salary and job data are estimates from public sources and can vary by location, experience, market conditions, and individual decisions.</p>
        </section>

        {previewReport && (
          <section id="preview-section" className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <h2 className="text-3xl font-black text-slate-950">Preview: {previewReport.studentName}'s FutureReady Report</h2>
            <p className="mt-2 text-sm text-slate-600">{previewReport.personalizationNote}</p>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-xl font-bold">Executive Summary</h3>
                <p className="mt-2 text-sm text-slate-700">{previewReport.executiveSummary.opportunityExplanation}</p>
                <p className="mt-2 text-sm text-slate-700"><strong>Top takeaways:</strong> {previewReport.executiveSummary.keyTakeaways.join(' ')}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold">Career Path Breakdown</h3>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  {previewReport.careerPaths.map((c: any) => (
                    <article key={c.title} className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                      <p className="font-semibold">{c.title} — {c.medianSalary} • {c.projectedGrowth}</p>
                      <p className="mt-1 text-sm"><strong>What students underestimate:</strong> {c.whatStudentsUnderestimate}</p>
                      <p className="mt-1 text-sm"><strong>Early-career reality:</strong> {c.earlyCareerReality}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold">School Fit Snapshot</h3>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full table-auto text-sm">
                    <thead>
                      <tr className="text-left text-xs text-slate-500">
                        <th className="px-2 py-2">School</th>
                        <th className="px-2 py-2">Cost</th>
                        <th className="px-2 py-2">Program Strength</th>
                        <th className="px-2 py-2">Internships</th>
                        <th className="px-2 py-2">Admissions Risk</th>
                        <th className="px-2 py-2">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewReport.schoolFit.map((s: any) => (
                        <tr key={s.schoolName} className="border-t">
                          <td className="px-2 py-3 font-semibold">{s.schoolName}</td>
                          <td className="px-2 py-3">{s.estimatedCostCategory}</td>
                          <td className="px-2 py-3">{s.majorStrength}</td>
                          <td className="px-2 py-3">{s.internshipAccess}</td>
                          <td className="px-2 py-3">{s.admissionsRisk}</td>
                          <td className="px-2 py-3">{s.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold">What Students Often Overlook</h3>
                <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
                  {previewReport.whatStudentsOftenOverlook?.map((w: string, i: number) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold">Action Plan</h3>
                <p className="mt-2 text-sm"><strong>30 days:</strong> {previewReport.finalActionPlan.next30Days.join(', ')}</p>
                <p className="mt-2 text-sm"><strong>6 months:</strong> {previewReport.finalActionPlan.next6Months.join(', ')}</p>
              </div>

              <div className="mt-4">
                <button
                  className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-bold text-white shadow hover:bg-blue-800"
                  onClick={() => setShowSampleModal(true)}
                >
                  View Sample Details
                </button>
                <a href="/book-consultation" className="ml-3 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Book a Free Consultation</a>
              </div>
            </div>
          </section>
        )}

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
