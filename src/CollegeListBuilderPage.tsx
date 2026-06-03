import { useMemo, useState, type FormEvent } from "react";
import { trackConsultationClick, trackCollegeBuilderSubmit } from "./lib/analytics";

type CollegeListBuilderPageProps = { onBack: () => void };
type Region = "West Coast" | "East Coast" | "Midwest" | "South";
type PublicPrivate = "Public" | "Private";
type SchoolSize = "Small" | "Medium" | "Large";
type MajorArea =
  | "Computer Science / Engineering"
  | "Business"
  | "Health / Pre-Med"
  | "Social Sciences"
  | "Humanities"
  | "Undecided";
type CampusVibe =
  | "Competitive / research-focused"
  | "Balanced academics and social life"
  | "Supportive / collaborative"
  | "Big school spirit";
type SelectivityTier = "Elite" | "Highly Selective" | "Selective" | "Moderate" | "Accessible";
type MeritAidStrength = "Strong" | "Moderate" | "Limited";
type AcademicTier = "Very Strong" | "Strong" | "Solid" | "Developing" | "Unknown";
type Bucket = "reach" | "target" | "likely";

type FormState = {
  grade: "9th" | "10th" | "11th" | "12th";
  gpa: "Below 3.0" | "3.0–3.4" | "3.5–3.7" | "3.8–4.0";
  testStatus:
    | "Haven't taken yet"
    | "Below 1200 SAT / below 25 ACT"
    | "1200–1350 SAT / 25–30 ACT"
    | "1360–1450 SAT / 31–33 ACT"
    | "1460+ SAT / 34+ ACT"
    | "Test optional";
  studyArea: MajorArea;
  location: Region | "Anywhere";
  schoolSize: SchoolSize | "No preference";
  budget:
    | "Need strong merit scholarships"
    | "In-state/public options preferred"
    | "Flexible"
    | "Not sure yet";
  vibe: CampusVibe | "No preference";
};

type College = {
  name: string;
  region: Region;
  state: string;
  publicPrivate: PublicPrivate;
  size: SchoolSize;
  strengths: MajorArea[];
  vibe: CampusVibe[];
  selectivityTier: SelectivityTier;
  estimatedAcceptanceRate: string;
  satRange: string;
  gpaRange: string;
  costNote: string;
  meritAidStrength: MeritAidStrength;
  shortReason: string;
  website: string;
  logo: string;
};

type RankedCollege = College & {
  score: number;
  bucket: Bucket;
  fitBadges: string[];
  crossRegionReason?: string;
};

const CONSULTATION_URL = "https://calendly.com/futurereadycollegeprep/free-15-min-consultation";

type ResultsConversionSectionProps = {
  consultationUrl: string;
  onConsultationClick: () => void;
};

function ResultsConversionSection({ consultationUrl, onConsultationClick }: ResultsConversionSectionProps) {
  const valueCards = [
    {
      title: "Understand why each school fits",
      description:
        "Go beyond reach, target, and likely labels. We'll look at academic fit, major strength, admissions competitiveness, location, cost, campus culture, and how each school supports your goals.",
    },
    {
      title: "Build a smarter application strategy",
      description:
        "A good list is not just about adding famous schools. It's about creating the right mix of ambition, realism, affordability, and opportunity - while making sure every application has a purpose.",
    },
    {
      title: "Turn the list into an action plan",
      description:
        "From SAT prep to essays, deadlines, activities, and school-specific positioning, FutureReady helps you understand what to do next instead of leaving you with a list and no direction.",
    },
  ];

  const unlockItems = [
    "Full personalized college list review",
    "Reach / target / likely balance analysis",
    "Major and career alignment discussion",
    "SAT or test-optional strategy",
    "Essay and application positioning guidance",
    "Cost, value, and scholarship considerations",
    "Step-by-step admissions roadmap",
    "Access to future planning tools and personalized resources",
  ];

  return (
    <section id="results-conversion-section" className="mt-8 rounded-[2rem] border border-slate-300 bg-white px-5 py-6 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200 md:px-7 md:py-10">
      <div className="mb-6 h-2 w-28 rounded-full bg-slate-900" />
      <div className="mx-auto max-w-6xl">
        <h3 className="text-3xl font-black leading-tight text-slate-950 md:text-4xl">
          Your list is a starting point. The strategy behind it is what matters.
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          The tool gives you a quick preview of schools that may fit your profile - but a strong college plan also needs admissions positioning, essay strategy, SAT planning, cost awareness, and a balanced application roadmap.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {valueCards.map((card) => (
            <article key={card.title} className="rounded-3xl border border-blue-100 bg-blue-50/40 p-5">
              <h4 className="text-xl font-black text-slate-900">{card.title}</h4>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">{card.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h4 className="text-2xl font-black text-slate-950">What you unlock when we work together</h4>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {unlockItems.map((item) => (
              <p key={item} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-black text-blue-700">
                  ✓
                </span>
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-700 to-blue-600 p-6 text-white shadow-lg md:p-8">
          <h4 className="text-2xl font-black md:text-3xl">Want help turning this into a real college plan?</h4>
          <p className="mt-3 max-w-3xl text-blue-100">
            Book a free consultation and we'll walk through your goals, current profile, school interests, and next steps. No pressure - just a clear conversation about how to make your college process less confusing and more strategic.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={consultationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onConsultationClick}
              className="inline-flex rounded-xl bg-white px-6 py-3 text-sm font-black text-blue-700 shadow-md transition hover:bg-blue-50"
            >
              Book a Free Consultation
            </a>
            <a
              href="#services"
              className="inline-flex rounded-xl border border-blue-100 bg-blue-800/50 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800/70"
            >
              Explore Services
            </a>
          </div>
          <p className="mt-4 text-sm text-blue-100">
            Built by a current college student who recently went through the process - with experience in tutoring, mentoring, SAT prep, and admissions planning.
          </p>
          <p className="mt-2 text-xs text-blue-200">Free consultation spots are limited during summer application season.</p>
        </div>
      </div>
    </section>
  );
}

const COLLEGES: College[] = [
  { name: "University of Maryland", region: "East Coast", state: "MD", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Business"], vibe: ["Competitive / research-focused", "Balanced academics and social life"], selectivityTier: "Selective", estimatedAcceptanceRate: "~45%", satRange: "1340–1510", gpaRange: "4.0+ weighted", costNote: "~$31k in-state / ~$56k out-of-state", meritAidStrength: "Moderate", shortReason: "Strong CS and engineering with major research opportunities.", website: "https://www.umd.edu/", logo: "https://www.google.com/s2/favicons?domain=umd.edu&sz=128" },
  { name: "Virginia Tech", region: "East Coast", state: "VA", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Business"], vibe: ["Competitive / research-focused", "Big school spirit"], selectivityTier: "Selective", estimatedAcceptanceRate: "~57%", satRange: "1240–1430", gpaRange: "3.8–4.0", costNote: "~$31k in-state / ~$53k out-of-state", meritAidStrength: "Moderate", shortReason: "Well-known engineering culture and school spirit.", website: "https://www.vt.edu/", logo: "https://www.google.com/s2/favicons?domain=vt.edu&sz=128" },
  { name: "Rutgers", region: "East Coast", state: "NJ", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Business", "Health / Pre-Med", "Social Sciences"], vibe: ["Balanced academics and social life"], selectivityTier: "Moderate", estimatedAcceptanceRate: "~66%", satRange: "1270–1480", gpaRange: "3.7–4.0", costNote: "~$38k in-state / ~$57k out-of-state", meritAidStrength: "Moderate", shortReason: "Strong public option with broad academics.", website: "https://www.rutgers.edu/", logo: "https://www.google.com/s2/favicons?domain=rutgers.edu&sz=128" },
  { name: "Penn State", region: "East Coast", state: "PA", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Business", "Health / Pre-Med"], vibe: ["Big school spirit", "Balanced academics and social life"], selectivityTier: "Moderate", estimatedAcceptanceRate: "~55%", satRange: "1220–1400", gpaRange: "3.6–3.9", costNote: "~$38k in-state / ~$58k out-of-state", meritAidStrength: "Moderate", shortReason: "Large-school resources and strong alumni network.", website: "https://www.psu.edu/", logo: "https://www.google.com/s2/favicons?domain=psu.edu&sz=128" },
  { name: "UMass Amherst", region: "East Coast", state: "MA", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Business", "Social Sciences"], vibe: ["Balanced academics and social life"], selectivityTier: "Moderate", estimatedAcceptanceRate: "~64%", satRange: "1240–1450", gpaRange: "3.7–4.0", costNote: "~$36k in-state / ~$59k out-of-state", meritAidStrength: "Strong", shortReason: "Great value with strong academics, including CS.", website: "https://www.umass.edu/", logo: "https://www.google.com/s2/favicons?domain=umass.edu&sz=128" },
  { name: "Northeastern", region: "East Coast", state: "MA", publicPrivate: "Private", size: "Large", strengths: ["Computer Science / Engineering", "Business"], vibe: ["Competitive / research-focused"], selectivityTier: "Highly Selective", estimatedAcceptanceRate: "~7%", satRange: "1460–1540", gpaRange: "4.1+ weighted", costNote: "~$88k", meritAidStrength: "Limited", shortReason: "Career-focused co-op model with strong CS/business.", website: "https://www.northeastern.edu/", logo: "https://www.google.com/s2/favicons?domain=northeastern.edu&sz=128" },
  { name: "Boston University", region: "East Coast", state: "MA", publicPrivate: "Private", size: "Large", strengths: ["Computer Science / Engineering", "Business", "Health / Pre-Med", "Humanities"], vibe: ["Competitive / research-focused", "Balanced academics and social life"], selectivityTier: "Highly Selective", estimatedAcceptanceRate: "~11%", satRange: "1400–1520", gpaRange: "3.9–4.1 weighted", costNote: "~$87k", meritAidStrength: "Moderate", shortReason: "Strong academics with urban opportunities.", website: "https://www.bu.edu/", logo: "https://www.google.com/s2/favicons?domain=bu.edu&sz=128" },
  { name: "Drexel", region: "East Coast", state: "PA", publicPrivate: "Private", size: "Large", strengths: ["Computer Science / Engineering", "Business", "Health / Pre-Med"], vibe: ["Balanced academics and social life"], selectivityTier: "Moderate", estimatedAcceptanceRate: "~79%", satRange: "1200–1420", gpaRange: "3.5–3.9", costNote: "~$79k", meritAidStrength: "Strong", shortReason: "Co-op pathways and practical career outcomes.", website: "https://drexel.edu/", logo: "https://www.google.com/s2/favicons?domain=drexel.edu&sz=128" },
  { name: "RIT", region: "East Coast", state: "NY", publicPrivate: "Private", size: "Medium", strengths: ["Computer Science / Engineering", "Business"], vibe: ["Competitive / research-focused", "Supportive / collaborative"], selectivityTier: "Selective", estimatedAcceptanceRate: "~67%", satRange: "1280–1460", gpaRange: "3.7–4.0", costNote: "~$76k", meritAidStrength: "Strong", shortReason: "Tech-heavy campus with strong co-op culture.", website: "https://www.rit.edu/", logo: "https://www.google.com/s2/favicons?domain=rit.edu&sz=128" },
  { name: "Stony Brook", region: "East Coast", state: "NY", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Health / Pre-Med"], vibe: ["Competitive / research-focused"], selectivityTier: "Selective", estimatedAcceptanceRate: "~49%", satRange: "1300–1480", gpaRange: "3.8–4.0", costNote: "~$31k in-state / ~$51k out-of-state", meritAidStrength: "Moderate", shortReason: "Strong STEM value option on the East Coast.", website: "https://www.stonybrook.edu/", logo: "https://www.google.com/s2/favicons?domain=stonybrook.edu&sz=128" },
  { name: "University of Pittsburgh", region: "East Coast", state: "PA", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Health / Pre-Med", "Business"], vibe: ["Balanced academics and social life"], selectivityTier: "Moderate", estimatedAcceptanceRate: "~49%", satRange: "1250–1440", gpaRange: "3.7–4.0", costNote: "~$39k in-state / ~$59k out-of-state", meritAidStrength: "Moderate", shortReason: "Balanced academics with strong health and STEM pathways.", website: "https://www.pitt.edu/", logo: "https://www.google.com/s2/favicons?domain=pitt.edu&sz=128" },
  { name: "University of Delaware", region: "East Coast", state: "DE", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Business", "Health / Pre-Med"], vibe: ["Balanced academics and social life"], selectivityTier: "Moderate", estimatedAcceptanceRate: "~72%", satRange: "1160–1350", gpaRange: "3.5–3.9", costNote: "~$34k in-state / ~$56k out-of-state", meritAidStrength: "Strong", shortReason: "Solid public option with strong merit possibilities.", website: "https://www.udel.edu/", logo: "https://www.google.com/s2/favicons?domain=udel.edu&sz=128" },
  { name: "Temple", region: "East Coast", state: "PA", publicPrivate: "Public", size: "Large", strengths: ["Business", "Health / Pre-Med", "Social Sciences", "Humanities"], vibe: ["Balanced academics and social life"], selectivityTier: "Accessible", estimatedAcceptanceRate: "~80%", satRange: "1080–1320", gpaRange: "3.3–3.8", costNote: "~$35k in-state / ~$53k out-of-state", meritAidStrength: "Strong", shortReason: "Accessible urban public university with broad options.", website: "https://www.temple.edu/", logo: "https://www.google.com/s2/favicons?domain=temple.edu&sz=128" },
  { name: "University of Washington", region: "West Coast", state: "WA", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Health / Pre-Med"], vibe: ["Competitive / research-focused"], selectivityTier: "Selective", estimatedAcceptanceRate: "~48%", satRange: "1220–1480", gpaRange: "3.8–4.0", costNote: "~$33k in-state / ~$62k out-of-state", meritAidStrength: "Limited", shortReason: "Top West Coast research university with strong tech ties.", website: "https://www.washington.edu/", logo: "https://www.google.com/s2/favicons?domain=washington.edu&sz=128" },
  { name: "UC Irvine", region: "West Coast", state: "CA", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Business"], vibe: ["Competitive / research-focused"], selectivityTier: "Highly Selective", estimatedAcceptanceRate: "~26%", satRange: "1250–1500", gpaRange: "3.9–4.0", costNote: "~$43k in-state / ~$73k out-of-state", meritAidStrength: "Limited", shortReason: "Strong STEM and business profile in SoCal.", website: "https://www.uci.edu/", logo: "https://www.google.com/s2/favicons?domain=uci.edu&sz=128" },
  { name: "UC Davis", region: "West Coast", state: "CA", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Health / Pre-Med"], vibe: ["Balanced academics and social life"], selectivityTier: "Selective", estimatedAcceptanceRate: "~37%", satRange: "1230–1450", gpaRange: "3.9–4.0", costNote: "~$44k in-state / ~$74k out-of-state", meritAidStrength: "Limited", shortReason: "Strong STEM and pre-health environment.", website: "https://www.ucdavis.edu/", logo: "https://www.google.com/s2/favicons?domain=ucdavis.edu&sz=128" },
  { name: "Cal Poly SLO", region: "West Coast", state: "CA", publicPrivate: "Public", size: "Medium", strengths: ["Computer Science / Engineering", "Business"], vibe: ["Balanced academics and social life"], selectivityTier: "Selective", estimatedAcceptanceRate: "~30%", satRange: "1240–1440", gpaRange: "3.9–4.1 weighted", costNote: "~$31k in-state / ~$49k out-of-state", meritAidStrength: "Moderate", shortReason: "Hands-on engineering and CS outcomes.", website: "https://www.calpoly.edu/", logo: "https://www.google.com/s2/favicons?domain=calpoly.edu&sz=128" },
  { name: "Purdue", region: "Midwest", state: "IN", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Business"], vibe: ["Competitive / research-focused"], selectivityTier: "Selective", estimatedAcceptanceRate: "~53%", satRange: "1190–1460", gpaRange: "3.6–3.9", costNote: "~$26k in-state / ~$45k out-of-state", meritAidStrength: "Moderate", shortReason: "Nationally known engineering and CS pathways.", website: "https://www.purdue.edu/", logo: "https://www.google.com/s2/favicons?domain=purdue.edu&sz=128" },
  { name: "UIUC", region: "Midwest", state: "IL", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Business"], vibe: ["Competitive / research-focused"], selectivityTier: "Highly Selective", estimatedAcceptanceRate: "~45%", satRange: "1340–1530", gpaRange: "3.8–4.0", costNote: "~$37k in-state / ~$57k out-of-state", meritAidStrength: "Limited", shortReason: "Highly ranked CS and engineering programs.", website: "https://illinois.edu/", logo: "https://www.google.com/s2/favicons?domain=illinois.edu&sz=128" },
  { name: "Ohio State", region: "Midwest", state: "OH", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Business", "Health / Pre-Med"], vibe: ["Big school spirit", "Balanced academics and social life"], selectivityTier: "Moderate", estimatedAcceptanceRate: "~53%", satRange: "1280–1460", gpaRange: "3.7–4.0", costNote: "~$30k in-state / ~$55k out-of-state", meritAidStrength: "Moderate", shortReason: "Large campus resources and strong academics.", website: "https://www.osu.edu/", logo: "https://www.google.com/s2/favicons?domain=osu.edu&sz=128" },
  { name: "University of Minnesota", region: "Midwest", state: "MN", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Health / Pre-Med"], vibe: ["Balanced academics and social life"], selectivityTier: "Moderate", estimatedAcceptanceRate: "~75%", satRange: "1310–1480", gpaRange: "3.7–4.0", costNote: "~$33k in-state / ~$54k out-of-state", meritAidStrength: "Moderate", shortReason: "Research-driven public with broad STEM options.", website: "https://twin-cities.umn.edu/", logo: "https://www.google.com/s2/favicons?domain=umn.edu&sz=128" },
  { name: "NC State", region: "South", state: "NC", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Business"], vibe: ["Competitive / research-focused", "Balanced academics and social life"], selectivityTier: "Selective", estimatedAcceptanceRate: "~47%", satRange: "1270–1450", gpaRange: "3.7–4.0", costNote: "~$26k in-state / ~$51k out-of-state", meritAidStrength: "Moderate", shortReason: "Strong technical programs with practical focus.", website: "https://www.ncsu.edu/", logo: "https://www.google.com/s2/favicons?domain=ncsu.edu&sz=128" },
  { name: "University of Florida", region: "South", state: "FL", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Business", "Health / Pre-Med"], vibe: ["Competitive / research-focused", "Big school spirit"], selectivityTier: "Highly Selective", estimatedAcceptanceRate: "~24%", satRange: "1330–1490", gpaRange: "4.0+ weighted", costNote: "~$23k in-state / ~$46k out-of-state", meritAidStrength: "Limited", shortReason: "High-value, high-performing public flagship.", website: "https://www.ufl.edu/", logo: "https://www.google.com/s2/favicons?domain=ufl.edu&sz=128" },
  { name: "Harvard University", region: "East Coast", state: "MA", publicPrivate: "Private", size: "Small", strengths: ["Computer Science / Engineering", "Humanities", "Social Sciences"], vibe: ["Competitive / research-focused"], selectivityTier: "Elite", estimatedAcceptanceRate: "~4%", satRange: "1500–1580", gpaRange: "4.3+ weighted", costNote: "~$80k", meritAidStrength: "Limited", shortReason: "World-class research university with deep resources across fields.", website: "https://www.harvard.edu/", logo: "https://www.google.com/s2/favicons?domain=harvard.edu&sz=128" },
  { name: "Yale University", region: "East Coast", state: "CT", publicPrivate: "Private", size: "Small", strengths: ["Humanities", "Social Sciences", "Computer Science / Engineering"], vibe: ["Competitive / research-focused"], selectivityTier: "Elite", estimatedAcceptanceRate: "~5%", satRange: "1480–1570", gpaRange: "4.2+ weighted", costNote: "~$80k", meritAidStrength: "Limited", shortReason: "Strong liberal arts and research emphasis with talented faculty.", website: "https://www.yale.edu/", logo: "https://www.google.com/s2/favicons?domain=yale.edu&sz=128" },
  { name: "Princeton University", region: "East Coast", state: "NJ", publicPrivate: "Private", size: "Small", strengths: ["Computer Science / Engineering", "Humanities"], vibe: ["Competitive / research-focused", "Supportive / collaborative"], selectivityTier: "Elite", estimatedAcceptanceRate: "~4%", satRange: "1500–1570", gpaRange: "4.2+ weighted", costNote: "~$80k", meritAidStrength: "Limited", shortReason: "Undergraduate-focused research university with strong advising.", website: "https://www.princeton.edu/", logo: "https://www.google.com/s2/favicons?domain=princeton.edu&sz=128" },
  { name: "Stanford University", region: "West Coast", state: "CA", publicPrivate: "Private", size: "Medium", strengths: ["Computer Science / Engineering", "Business"], vibe: ["Competitive / research-focused", "Balanced academics and social life"], selectivityTier: "Elite", estimatedAcceptanceRate: "~4%", satRange: "1500–1580", gpaRange: "4.3+ weighted", costNote: "~$82k", meritAidStrength: "Limited", shortReason: "Leading tech and entrepreneurship network near Silicon Valley.", website: "https://www.stanford.edu/", logo: "https://www.google.com/s2/favicons?domain=stanford.edu&sz=128" },
  { name: "MIT", region: "East Coast", state: "MA", publicPrivate: "Private", size: "Small", strengths: ["Computer Science / Engineering"], vibe: ["Competitive / research-focused"], selectivityTier: "Elite", estimatedAcceptanceRate: "~5%", satRange: "1510–1580", gpaRange: "4.3+ weighted", costNote: "~$82k", meritAidStrength: "Limited", shortReason: "Top STEM-focused research and innovation university.", website: "https://www.mit.edu/", logo: "https://www.google.com/s2/favicons?domain=mit.edu&sz=128" },
  { name: "UC Berkeley", region: "West Coast", state: "CA", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Social Sciences"], vibe: ["Competitive / research-focused"], selectivityTier: "Highly Selective", estimatedAcceptanceRate: "~13%", satRange: "1360–1540", gpaRange: "3.9–4.3 weighted", costNote: "~$30k in-state / ~$60k out-of-state", meritAidStrength: "Limited", shortReason: "Top public university with elite STEM and humanities programs.", website: "https://www.berkeley.edu/", logo: "https://www.google.com/s2/favicons?domain=berkeley.edu&sz=128" },
  { name: "UCLA", region: "West Coast", state: "CA", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Humanities"], vibe: ["Balanced academics and social life"], selectivityTier: "Highly Selective", estimatedAcceptanceRate: "~12%", satRange: "1350–1530", gpaRange: "3.9–4.2 weighted", costNote: "~$31k in-state / ~$60k out-of-state", meritAidStrength: "Limited", shortReason: "Strong public research university in Los Angeles with broad majors.", website: "https://www.ucla.edu/", logo: "https://www.google.com/s2/favicons?domain=ucla.edu&sz=128" },
  { name: "University of Southern California", region: "West Coast", state: "CA", publicPrivate: "Private", size: "Large", strengths: ["Business", "Computer Science / Engineering"], vibe: ["Big school spirit", "Balanced academics and social life"], selectivityTier: "Highly Selective", estimatedAcceptanceRate: "~13%", satRange: "1370–1540", gpaRange: "3.9–4.2 weighted", costNote: "~$85k", meritAidStrength: "Moderate", shortReason: "Strong career outcomes and industry connections in LA.", website: "https://www.usc.edu/", logo: "https://www.google.com/s2/favicons?domain=usc.edu&sz=128" },
  { name: "Caltech", region: "West Coast", state: "CA", publicPrivate: "Private", size: "Small", strengths: ["Computer Science / Engineering"], vibe: ["Competitive / research-focused"], selectivityTier: "Elite", estimatedAcceptanceRate: "~4%", satRange: "1530–1580", gpaRange: "4.3+ weighted", costNote: "~$82k", meritAidStrength: "Limited", shortReason: "World-leading STEM focus with tiny class sizes.", website: "https://www.caltech.edu/", logo: "https://www.google.com/s2/favicons?domain=caltech.edu&sz=128" },
  { name: "University of Michigan", region: "Midwest", state: "MI", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Business"], vibe: ["Competitive / research-focused", "Big school spirit"], selectivityTier: "Highly Selective", estimatedAcceptanceRate: "~23%", satRange: "1380–1540", gpaRange: "3.9–4.2 weighted", costNote: "~$28k in-state / ~$55k out-of-state", meritAidStrength: "Moderate", shortReason: "Top public research university with strong engineering and business.", website: "https://umich.edu/", logo: "https://www.google.com/s2/favicons?domain=umich.edu&sz=128" },
  { name: "University of Texas at Austin", region: "South", state: "TX", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Business"], vibe: ["Big school spirit", "Competitive / research-focused"], selectivityTier: "Highly Selective", estimatedAcceptanceRate: "~28%", satRange: "1310–1500", gpaRange: "3.7–4.1", costNote: "~$27k in-state / ~$55k out-of-state", meritAidStrength: "Limited", shortReason: "Flagship public with strong STEM and business programs.", website: "https://www.utexas.edu/", logo: "https://www.google.com/s2/favicons?domain=utexas.edu&sz=128" },
  { name: "University of North Carolina at Chapel Hill", region: "South", state: "NC", publicPrivate: "Public", size: "Large", strengths: ["Social Sciences", "Business", "Health / Pre-Med"], vibe: ["Balanced academics and social life"], selectivityTier: "Highly Selective", estimatedAcceptanceRate: "~21%", satRange: "1310–1500", gpaRange: "3.8–4.1", costNote: "~$25k in-state / ~$53k out-of-state", meritAidStrength: "Limited", shortReason: "Strong public university with notable health and social sciences programs.", website: "https://www.unc.edu/", logo: "https://www.google.com/s2/favicons?domain=unc.edu&sz=128" },
  { name: "Duke University", region: "South", state: "NC", publicPrivate: "Private", size: "Small", strengths: ["Computer Science / Engineering", "Humanities", "Business"], vibe: ["Competitive / research-focused", "Balanced academics and social life"], selectivityTier: "Elite", estimatedAcceptanceRate: "~6%", satRange: "1480–1570", gpaRange: "4.2+ weighted", costNote: "~$82k", meritAidStrength: "Limited", shortReason: "Top private research university with strong programs across disciplines.", website: "https://www.duke.edu/", logo: "https://www.google.com/s2/favicons?domain=duke.edu&sz=128" },
  { name: "Vanderbilt University", region: "South", state: "TN", publicPrivate: "Private", size: "Medium", strengths: ["Humanities", "Social Sciences", "Computer Science / Engineering"], vibe: ["Balanced academics and social life"], selectivityTier: "Highly Selective", estimatedAcceptanceRate: "~8%", satRange: "1450–1550", gpaRange: "4.1+ weighted", costNote: "~$80k", meritAidStrength: "Moderate", shortReason: "Strong academics with a supportive residential culture.", website: "https://www.vanderbilt.edu/", logo: "https://www.google.com/s2/favicons?domain=vanderbilt.edu&sz=128" },
  { name: "Emory University", region: "South", state: "GA", publicPrivate: "Private", size: "Medium", strengths: ["Health / Pre-Med", "Humanities"], vibe: ["Supportive / collaborative"], selectivityTier: "Highly Selective", estimatedAcceptanceRate: "~15%", satRange: "1360–1510", gpaRange: "3.9–4.2", costNote: "~$78k", meritAidStrength: "Moderate", shortReason: "Well-regarded medical and liberal arts preparation.", website: "https://www.emory.edu/", logo: "https://www.google.com/s2/favicons?domain=emory.edu&sz=128" },
  { name: "Rice University", region: "South", state: "TX", publicPrivate: "Private", size: "Small", strengths: ["Computer Science / Engineering", "Humanities"], vibe: ["Supportive / collaborative"], selectivityTier: "Highly Selective", estimatedAcceptanceRate: "~9%", satRange: "1480–1560", gpaRange: "4.1+ weighted", costNote: "~$78k", meritAidStrength: "Moderate", shortReason: "Strong STEM and research with small cohorts.", website: "https://www.rice.edu/", logo: "https://www.google.com/s2/favicons?domain=rice.edu&sz=128" },
  { name: "University of Virginia", region: "East Coast", state: "VA", publicPrivate: "Public", size: "Large", strengths: ["Social Sciences", "Business", "Computer Science / Engineering"], vibe: ["Balanced academics and social life"], selectivityTier: "Highly Selective", estimatedAcceptanceRate: "~17%", satRange: "1340–1510", gpaRange: "3.9–4.2", costNote: "~$28k in-state / ~$56k out-of-state", meritAidStrength: "Limited", shortReason: "Top public university with strong liberal arts and STEM.", website: "https://www.virginia.edu/", logo: "https://www.google.com/s2/favicons?domain=virginia.edu&sz=128" },
  { name: "University of Chicago", region: "Midwest", state: "IL", publicPrivate: "Private", size: "Small", strengths: ["Social Sciences", "Humanities", "Computer Science / Engineering"], vibe: ["Competitive / research-focused"], selectivityTier: "Elite", estimatedAcceptanceRate: "~6%", satRange: "1500–1560", gpaRange: "4.2+ weighted", costNote: "~$82k", meritAidStrength: "Moderate", shortReason: "Strong quantitative and research focus across disciplines.", website: "https://www.uchicago.edu/", logo: "https://www.google.com/s2/favicons?domain=uchicago.edu&sz=128" },
  { name: "Northwestern University", region: "Midwest", state: "IL", publicPrivate: "Private", size: "Medium", strengths: ["Computer Science / Engineering", "Business", "Humanities"], vibe: ["Balanced academics and social life"], selectivityTier: "Highly Selective", estimatedAcceptanceRate: "~8%", satRange: "1460–1560", gpaRange: "4.1+ weighted", costNote: "~$80k", meritAidStrength: "Limited", shortReason: "Strong interdisciplinary programs and industry links.", website: "https://www.northwestern.edu/", logo: "https://www.google.com/s2/favicons?domain=northwestern.edu&sz=128" },
  { name: "Johns Hopkins University", region: "East Coast", state: "MD", publicPrivate: "Private", size: "Small", strengths: ["Health / Pre-Med", "Computer Science / Engineering"], vibe: ["Competitive / research-focused"], selectivityTier: "Highly Selective", estimatedAcceptanceRate: "~9%", satRange: "1480–1560", gpaRange: "4.1+ weighted", costNote: "~$82k", meritAidStrength: "Limited", shortReason: "Top-tier research university with strong pre-med pathways.", website: "https://www.jhu.edu/", logo: "https://www.google.com/s2/favicons?domain=jhu.edu&sz=128" },
  { name: "University of Wisconsin-Madison", region: "Midwest", state: "WI", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Social Sciences"], vibe: ["Balanced academics and social life"], selectivityTier: "Moderate", estimatedAcceptanceRate: "~52%", satRange: "1240–1460", gpaRange: "3.6–4.0", costNote: "~$25k in-state / ~$50k out-of-state", meritAidStrength: "Moderate", shortReason: "Large research university with wide academic offerings.", website: "https://www.wisc.edu/", logo: "https://www.google.com/s2/favicons?domain=wisc.edu&sz=128" },
  { name: "Michigan State University", region: "Midwest", state: "MI", publicPrivate: "Public", size: "Large", strengths: ["Business", "Health / Pre-Med"], vibe: ["Big school spirit"], selectivityTier: "Moderate", estimatedAcceptanceRate: "~77%", satRange: "1110–1320", gpaRange: "3.5–3.9", costNote: "~$24k in-state / ~$46k out-of-state", meritAidStrength: "Moderate", shortReason: "Broad-access public with strong professional programs.", website: "https://msu.edu/", logo: "https://www.google.com/s2/favicons?domain=msu.edu&sz=128" },
  { name: "Ohio University", region: "Midwest", state: "OH", publicPrivate: "Public", size: "Medium", strengths: ["Humanities", "Social Sciences"], vibe: ["Supportive / collaborative"], selectivityTier: "Accessible", estimatedAcceptanceRate: "~88%", satRange: "1000–1250", gpaRange: "3.2–3.8", costNote: "~$24k in-state / ~$42k out-of-state", meritAidStrength: "Strong", shortReason: "Regional public with strong scholarship programs.", website: "https://www.ohio.edu/", logo: "https://www.google.com/s2/favicons?domain=ohio.edu&sz=128" },
  { name: "University of Maryland, College Park", region: "East Coast", state: "MD", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Business"], vibe: ["Competitive / research-focused"], selectivityTier: "Selective", estimatedAcceptanceRate: "~40%", satRange: "1340–1510", gpaRange: "3.9–4.2", costNote: "~$31k in-state / ~$56k out-of-state", meritAidStrength: "Moderate", shortReason: "Large research institution strong in tech and applied fields.", website: "https://www.umd.edu/", logo: "https://www.google.com/s2/favicons?domain=umd.edu&sz=128" },
  { name: "Arizona State University", region: "West Coast", state: "AZ", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Business"], vibe: ["Balanced academics and social life"], selectivityTier: "Accessible", estimatedAcceptanceRate: "~85%", satRange: "1080–1310", gpaRange: "3.2–3.8", costNote: "~$26k in-state / ~$42k out-of-state", meritAidStrength: "Strong", shortReason: "Wide-access public with expanded program offerings and innovation initiatives.", website: "https://www.asu.edu/", logo: "https://www.google.com/s2/favicons?domain=asu.edu&sz=128" },
  { name: "Georgia Institute of Technology", region: "South", state: "GA", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering"], vibe: ["Competitive / research-focused"], selectivityTier: "Highly Selective", estimatedAcceptanceRate: "~21%", satRange: "1400–1540", gpaRange: "3.9–4.2", costNote: "~$28k in-state / ~$48k out-of-state", meritAidStrength: "Limited", shortReason: "Top public tech university with strong engineering programs.", website: "https://www.gatech.edu/", logo: "https://www.google.com/s2/favicons?domain=gatech.edu&sz=128" },
  { name: "Pennsylvania State University, University Park", region: "East Coast", state: "PA", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Business"], vibe: ["Big school spirit"], selectivityTier: "Moderate", estimatedAcceptanceRate: "~55%", satRange: "1220–1400", gpaRange: "3.6–3.9", costNote: "~$38k in-state / ~$58k out-of-state", meritAidStrength: "Moderate", shortReason: "Large flagship public with broad program strengths and alumni network.", website: "https://www.psu.edu/", logo: "https://www.google.com/s2/favicons?domain=psu.edu&sz=128" },
  { name: "Syracuse University", region: "East Coast", state: "NY", publicPrivate: "Private", size: "Medium", strengths: ["Business", "Humanities"], vibe: ["Balanced academics and social life"], selectivityTier: "Selective", estimatedAcceptanceRate: "~60%", satRange: "1200–1400", gpaRange: "3.6–4.0", costNote: "~$75k", meritAidStrength: "Moderate", shortReason: "Strong communication and business programs with urban engagement.", website: "https://www.syracuse.edu/", logo: "https://www.google.com/s2/favicons?domain=syracuse.edu&sz=128" },
  { name: "Tulane University", region: "South", state: "LA", publicPrivate: "Private", size: "Medium", strengths: ["Social Sciences", "Health / Pre-Med"], vibe: ["Supportive / collaborative"], selectivityTier: "Selective", estimatedAcceptanceRate: "~12%", satRange: "1360–1520", gpaRange: "3.9–4.2", costNote: "~$78k", meritAidStrength: "Moderate", shortReason: "Strong pre-med and social science programs with urban research.", website: "https://tulane.edu/", logo: "https://www.google.com/s2/favicons?domain=tulane.edu&sz=128" },
  { name: "Southern Methodist University", region: "South", state: "TX", publicPrivate: "Private", size: "Medium", strengths: ["Business", "Computer Science / Engineering"], vibe: ["Balanced academics and social life"], selectivityTier: "Selective", estimatedAcceptanceRate: "~43%", satRange: "1270–1450", gpaRange: "3.7–4.1", costNote: "~$75k", meritAidStrength: "Moderate", shortReason: "Strong business and regional industry connections.", website: "https://www.smu.edu/", logo: "https://www.google.com/s2/favicons?domain=smu.edu&sz=128" },
  { name: "Baylor University", region: "South", state: "TX", publicPrivate: "Private", size: "Large", strengths: ["Business", "Health / Pre-Med"], vibe: ["Big school spirit"], selectivityTier: "Selective", estimatedAcceptanceRate: "~38%", satRange: "1180–1350", gpaRange: "3.6–4.0", costNote: "~$65k", meritAidStrength: "Moderate", shortReason: "Strong regional program offerings and growing research.", website: "https://www.baylor.edu/", logo: "https://www.google.com/s2/favicons?domain=baylor.edu&sz=128" },
  { name: "San Diego State University", region: "West Coast", state: "CA", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Business"], vibe: ["Balanced academics and social life"], selectivityTier: "Moderate", estimatedAcceptanceRate: "~34%", satRange: "1150–1350", gpaRange: "3.5–3.9", costNote: "~$28k in-state / ~$48k out-of-state", meritAidStrength: "Moderate", shortReason: "Strong regional public with practical career focus.", website: "https://www.sdsu.edu/", logo: "https://www.google.com/s2/favicons?domain=sdsu.edu&sz=128" },
  { name: "UC Santa Barbara", region: "West Coast", state: "CA", publicPrivate: "Public", size: "Large", strengths: ["Social Sciences", "Humanities"], vibe: ["Balanced academics and social life"], selectivityTier: "Selective", estimatedAcceptanceRate: "~27%", satRange: "1250–1450", gpaRange: "3.8–4.1", costNote: "~$30k in-state / ~$58k out-of-state", meritAidStrength: "Limited", shortReason: "Strong research university with notable humanities and social science programs.", website: "https://www.ucsb.edu/", logo: "https://www.google.com/s2/favicons?domain=ucsb.edu&sz=128" },
  { name: "UC Santa Cruz", region: "West Coast", state: "CA", publicPrivate: "Public", size: "Medium", strengths: ["Computer Science / Engineering", "Social Sciences"], vibe: ["Supportive / collaborative"], selectivityTier: "Selective", estimatedAcceptanceRate: "~45%", satRange: "1150–1370", gpaRange: "3.6–4.0", costNote: "~$29k in-state / ~$55k out-of-state", meritAidStrength: "Moderate", shortReason: "Good CS programs with collaborative research culture.", website: "https://www.ucsc.edu/", logo: "https://www.google.com/s2/favicons?domain=ucsc.edu&sz=128" },
  { name: "Cal State Long Beach", region: "West Coast", state: "CA", publicPrivate: "Public", size: "Large", strengths: ["Business", "Social Sciences"], vibe: ["Balanced academics and social life"], selectivityTier: "Accessible", estimatedAcceptanceRate: "~55%", satRange: "1000–1280", gpaRange: "3.2–3.8", costNote: "~$18k in-state / ~$35k out-of-state", meritAidStrength: "Strong", shortReason: "Large, accessible public with strong regional programs.", website: "https://www.csulb.edu/", logo: "https://www.google.com/s2/favicons?domain=csulb.edu&sz=128" },
  { name: "University of Arizona", region: "West Coast", state: "AZ", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Business"], vibe: ["Balanced academics and social life"], selectivityTier: "Moderate", estimatedAcceptanceRate: "~85%", satRange: "1080–1310", gpaRange: "3.3–3.8", costNote: "~$28k in-state / ~$44k out-of-state", meritAidStrength: "Moderate", shortReason: "Large public research university with broad program offerings.", website: "https://www.arizona.edu/", logo: "https://www.google.com/s2/favicons?domain=arizona.edu&sz=128" },
  { name: "University of Colorado Boulder", region: "West Coast", state: "CO", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Social Sciences"], vibe: ["Competitive / research-focused"], selectivityTier: "Selective", estimatedAcceptanceRate: "~78%", satRange: "1200–1400", gpaRange: "3.5–3.9", costNote: "~$28k in-state / ~$50k out-of-state", meritAidStrength: "Moderate", shortReason: "Strong engineering and outdoor campus culture.", website: "https://www.colorado.edu/", logo: "https://www.google.com/s2/favicons?domain=colorado.edu&sz=128" },
  { name: "Colorado School of Mines", region: "West Coast", state: "CO", publicPrivate: "Public", size: "Small", strengths: ["Computer Science / Engineering"], vibe: ["Competitive / research-focused"], selectivityTier: "Selective", estimatedAcceptanceRate: "~30%", satRange: "1280–1480", gpaRange: "3.8–4.2", costNote: "~$30k in-state / ~$55k out-of-state", meritAidStrength: "Moderate", shortReason: "Strong engineering focus with high outcomes.", website: "https://www.mines.edu/", logo: "https://www.google.com/s2/favicons?domain=mines.edu&sz=128" },
  { name: "Oregon State University", region: "West Coast", state: "OR", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Business"], vibe: ["Supportive / collaborative"], selectivityTier: "Moderate", estimatedAcceptanceRate: "~82%", satRange: "1050–1290", gpaRange: "3.2–3.8", costNote: "~$26k in-state / ~$45k out-of-state", meritAidStrength: "Moderate", shortReason: "Growing public research university with practical programs.", website: "https://oregonstate.edu/", logo: "https://www.google.com/s2/favicons?domain=oregonstate.edu&sz=128" },
  { name: "University of Oregon", region: "West Coast", state: "OR", publicPrivate: "Public", size: "Large", strengths: ["Social Sciences", "Business"], vibe: ["Big school spirit"], selectivityTier: "Moderate", estimatedAcceptanceRate: "~82%", satRange: "1040–1290", gpaRange: "3.2–3.8", costNote: "~$26k in-state / ~$45k out-of-state", meritAidStrength: "Moderate", shortReason: "Strong campus life and regional programs.", website: "https://www.uoregon.edu/", logo: "https://www.google.com/s2/favicons?domain=uoregon.edu&sz=128" },
  { name: "Washington State University", region: "West Coast", state: "WA", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Business"], vibe: ["Big school spirit"], selectivityTier: "Accessible", estimatedAcceptanceRate: "~80%", satRange: "1050–1290", gpaRange: "3.2–3.8", costNote: "~25k in-state / ~$45k out-of-state", meritAidStrength: "Moderate", shortReason: "Large public with strong regional engagement and applied research.", website: "https://wsu.edu/", logo: "https://www.google.com/s2/favicons?domain=wsu.edu&sz=128" },
  { name: "George Washington University", region: "East Coast", state: "DC", publicPrivate: "Private", size: "Medium", strengths: ["Social Sciences", "Business"], vibe: ["Balanced academics and social life"], selectivityTier: "Selective", estimatedAcceptanceRate: "~40%", satRange: "1310–1480", gpaRange: "3.7–4.1", costNote: "~$80k", meritAidStrength: "Moderate", shortReason: "Urban research university with strong public affairs and business programs.", website: "https://www.gwu.edu/", logo: "https://www.google.com/s2/favicons?domain=gwu.edu&sz=128" },
  { name: "American University", region: "East Coast", state: "DC", publicPrivate: "Private", size: "Medium", strengths: ["Social Sciences", "Humanities"], vibe: ["Supportive / collaborative"], selectivityTier: "Selective", estimatedAcceptanceRate: "~37%", satRange: "1250–1450", gpaRange: "3.6–4.0", costNote: "~70k", meritAidStrength: "Moderate", shortReason: "Strong public affairs and international relations programs.", website: "https://www.american.edu/", logo: "https://www.google.com/s2/favicons?domain=american.edu&sz=128" },
  { name: "Fordham University", region: "East Coast", state: "NY", publicPrivate: "Private", size: "Medium", strengths: ["Humanities", "Social Sciences"], vibe: ["Balanced academics and social life"], selectivityTier: "Selective", estimatedAcceptanceRate: "~46%", satRange: "1200–1400", gpaRange: "3.6–4.0", costNote: "~72k", meritAidStrength: "Moderate", shortReason: "Urban campus with strong humanities and social sciences.", website: "https://www.fordham.edu/", logo: "https://www.google.com/s2/favicons?domain=fordham.edu&sz=128" },
  { name: "Case Western Reserve University", region: "Midwest", state: "OH", publicPrivate: "Private", size: "Medium", strengths: ["Computer Science / Engineering", "Health / Pre-Med"], vibe: ["Competitive / research-focused"], selectivityTier: "Selective", estimatedAcceptanceRate: "~27%", satRange: "1370–1510", gpaRange: "3.9–4.2", costNote: "~$70k", meritAidStrength: "Moderate", shortReason: "Strong engineering and medical pathways with research opportunities.", website: "https://case.edu/", logo: "https://www.google.com/s2/favicons?domain=case.edu&sz=128" },
  { name: "Brown University", region: "East Coast", state: "RI", publicPrivate: "Private", size: "Small", strengths: ["Humanities", "Social Sciences"], vibe: ["Competitive / research-focused"], selectivityTier: "Elite", estimatedAcceptanceRate: "~6%", satRange: "1460–1560", gpaRange: "4.1+ weighted", costNote: "~82k", meritAidStrength: "Limited", shortReason: "Ivy League research university with open curriculum strengths.", website: "https://www.brown.edu/", logo: "https://www.google.com/s2/favicons?domain=brown.edu&sz=128" },
  { name: "Cornell University", region: "East Coast", state: "NY", publicPrivate: "Private", size: "Large", strengths: ["Computer Science / Engineering", "Humanities"], vibe: ["Competitive / research-focused"], selectivityTier: "Elite", estimatedAcceptanceRate: "~10%", satRange: "1400–1560", gpaRange: "4.0+ weighted", costNote: "~82k", meritAidStrength: "Limited", shortReason: "Ivy League engineering and varied colleges across campuses.", website: "https://www.cornell.edu/", logo: "https://www.google.com/s2/favicons?domain=cornell.edu&sz=128" },
  { name: "Columbia University", region: "East Coast", state: "NY", publicPrivate: "Private", size: "Small", strengths: ["Humanities", "Social Sciences"], vibe: ["Competitive / research-focused"], selectivityTier: "Elite", estimatedAcceptanceRate: "~4%", satRange: "1500–1560", gpaRange: "4.2+ weighted", costNote: "~82k", meritAidStrength: "Limited", shortReason: "Ivy League with strong urban research and global networks.", website: "https://www.columbia.edu/", logo: "https://www.google.com/s2/favicons?domain=columbia.edu&sz=128" },
  { name: "New York University", region: "East Coast", state: "NY", publicPrivate: "Private", size: "Large", strengths: ["Business", "Humanities"], vibe: ["Balanced academics and social life"], selectivityTier: "Highly Selective", estimatedAcceptanceRate: "~15%", satRange: "1350–1530", gpaRange: "3.8–4.2", costNote: "~78k", meritAidStrength: "Limited", shortReason: "Urban university with strong arts, business, and global programs.", website: "https://www.nyu.edu/", logo: "https://www.google.com/s2/favicons?domain=nyu.edu&sz=128" },
  { name: "University of Rochester", region: "East Coast", state: "NY", publicPrivate: "Private", size: "Medium", strengths: ["Computer Science / Engineering", "Humanities"], vibe: ["Supportive / collaborative"], selectivityTier: "Selective", estimatedAcceptanceRate: "~34%", satRange: "1350–1500", gpaRange: "3.8–4.1", costNote: "~75k", meritAidStrength: "Moderate", shortReason: "Strong research and liberal arts blend with flexible curriculum.", website: "https://www.rochester.edu/", logo: "https://www.google.com/s2/favicons?domain=rochester.edu&sz=128" },
  { name: "Brandeis University", region: "East Coast", state: "MA", publicPrivate: "Private", size: "Small", strengths: ["Humanities", "Social Sciences"], vibe: ["Supportive / collaborative"], selectivityTier: "Selective", estimatedAcceptanceRate: "~30%", satRange: "1320–1480", gpaRange: "3.7–4.1", costNote: "~72k", meritAidStrength: "Moderate", shortReason: "Strong social sciences and humanities with research opportunities.", website: "https://www.brandeis.edu/", logo: "https://www.google.com/s2/favicons?domain=brandeis.edu&sz=128" },
  { name: "Northwestern University", region: "Midwest", state: "IL", publicPrivate: "Private", size: "Medium", strengths: ["Computer Science / Engineering", "Business", "Humanities"], vibe: ["Balanced academics and social life"], selectivityTier: "Highly Selective", estimatedAcceptanceRate: "~8%", satRange: "1460–1560", gpaRange: "4.1+ weighted", costNote: "~80k", meritAidStrength: "Limited", shortReason: "Strong interdisciplinary programs and industry links.", website: "https://www.northwestern.edu/", logo: "https://www.google.com/s2/favicons?domain=northwestern.edu&sz=128" },
  { name: "Johns Hopkins University", region: "East Coast", state: "MD", publicPrivate: "Private", size: "Small", strengths: ["Health / Pre-Med", "Computer Science / Engineering"], vibe: ["Competitive / research-focused"], selectivityTier: "Highly Selective", estimatedAcceptanceRate: "~9%", satRange: "1480–1560", gpaRange: "4.1+ weighted", costNote: "~82k", meritAidStrength: "Limited", shortReason: "Top-tier research university with strong pre-med pathways.", website: "https://www.jhu.edu/", logo: "https://www.google.com/s2/favicons?domain=jhu.edu&sz=128" },
  { name: "University of Wisconsin-Madison", region: "Midwest", state: "WI", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Social Sciences"], vibe: ["Balanced academics and social life"], selectivityTier: "Moderate", estimatedAcceptanceRate: "~52%", satRange: "1240–1460", gpaRange: "3.6–4.0", costNote: "~25k in-state / ~$50k out-of-state", meritAidStrength: "Moderate", shortReason: "Large research university with wide academic offerings.", website: "https://www.wisc.edu/", logo: "https://www.google.com/s2/favicons?domain=wisc.edu&sz=128" },
  { name: "Michigan State University", region: "Midwest", state: "MI", publicPrivate: "Public", size: "Large", strengths: ["Business", "Health / Pre-Med"], vibe: ["Big school spirit"], selectivityTier: "Moderate", estimatedAcceptanceRate: "~77%", satRange: "1110–1320", gpaRange: "3.5–3.9", costNote: "~24k in-state / ~$46k out-of-state", meritAidStrength: "Moderate", shortReason: "Broad-access public with strong professional programs.", website: "https://msu.edu/", logo: "https://www.google.com/s2/favicons?domain=msu.edu&sz=128" },
  { name: "Ohio University", region: "Midwest", state: "OH", publicPrivate: "Public", size: "Medium", strengths: ["Humanities", "Social Sciences"], vibe: ["Supportive / collaborative"], selectivityTier: "Accessible", estimatedAcceptanceRate: "~88%", satRange: "1000–1250", gpaRange: "3.2–3.8", costNote: "~24k in-state / ~$42k out-of-state", meritAidStrength: "Strong", shortReason: "Regional public with strong scholarship programs.", website: "https://www.ohio.edu/", logo: "https://www.google.com/s2/favicons?domain=ohio.edu&sz=128" },
  { name: "University of Maryland, College Park", region: "East Coast", state: "MD", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Business"], vibe: ["Competitive / research-focused"], selectivityTier: "Selective", estimatedAcceptanceRate: "~40%", satRange: "1340–1510", gpaRange: "3.9–4.2", costNote: "~31k in-state / ~$56k out-of-state", meritAidStrength: "Moderate", shortReason: "Large research institution strong in tech and applied fields.", website: "https://www.umd.edu/", logo: "https://www.google.com/s2/favicons?domain=umd.edu&sz=128" },
  { name: "Arizona State University", region: "West Coast", state: "AZ", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Business"], vibe: ["Balanced academics and social life"], selectivityTier: "Accessible", estimatedAcceptanceRate: "~85%", satRange: "1080–1310", gpaRange: "3.2–3.8", costNote: "~26k in-state / ~$42k out-of-state", meritAidStrength: "Strong", shortReason: "Wide-access public with expanded program offerings and innovation initiatives.", website: "https://www.asu.edu/", logo: "https://www.google.com/s2/favicons?domain=asu.edu&sz=128" },
  { name: "Georgia Institute of Technology", region: "South", state: "GA", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering"], vibe: ["Competitive / research-focused"], selectivityTier: "Highly Selective", estimatedAcceptanceRate: "~21%", satRange: "1400–1540", gpaRange: "3.9–4.2", costNote: "~28k in-state / ~$48k out-of-state", meritAidStrength: "Limited", shortReason: "Top public tech university with strong engineering programs.", website: "https://www.gatech.edu/", logo: "https://www.google.com/s2/favicons?domain=gatech.edu&sz=128" },
  { name: "Pennsylvania State University, University Park", region: "East Coast", state: "PA", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Business"], vibe: ["Big school spirit"], selectivityTier: "Moderate", estimatedAcceptanceRate: "~55%", satRange: "1220–1400", gpaRange: "3.6–3.9", costNote: "~38k in-state / ~$58k out-of-state", meritAidStrength: "Moderate", shortReason: "Large flagship public with broad program strengths and alumni network.", website: "https://www.psu.edu/", logo: "https://www.google.com/s2/favicons?domain=psu.edu&sz=128" },
  { name: "University of Tennessee, Knoxville", region: "South", state: "TN", publicPrivate: "Public", size: "Large", strengths: ["Business", "Computer Science / Engineering"], vibe: ["Big school spirit"], selectivityTier: "Moderate", estimatedAcceptanceRate: "~80%", satRange: "1100–1320", gpaRange: "3.3–3.8", costNote: "~24k in-state / ~$44k out-of-state", meritAidStrength: "Moderate", shortReason: "Large flagship with broad program offerings and strong alumni network.", website: "https://www.utk.edu/", logo: "https://www.google.com/s2/favicons?domain=utk.edu&sz=128" },
  { name: "Auburn University", region: "South", state: "AL", publicPrivate: "Public", size: "Large", strengths: ["Computer Science / Engineering", "Business"], vibe: ["Big school spirit"], selectivityTier: "Moderate", estimatedAcceptanceRate: "~85%", satRange: "1100–1320", gpaRange: "3.2–3.8", costNote: "~22k in-state / ~$42k out-of-state", meritAidStrength: "Moderate", shortReason: "Strong engineering and regional impact.", website: "https://www.auburn.edu/", logo: "https://www.google.com/s2/favicons?domain=auburn.edu&sz=128" },
  { name: "Kent State University", region: "Midwest", state: "OH", publicPrivate: "Public", size: "Large", strengths: ["Humanities", "Social Sciences"], vibe: ["Supportive / collaborative"], selectivityTier: "Accessible", estimatedAcceptanceRate: "~92%", satRange: "950–1220", gpaRange: "2.9–3.6", costNote: "~20k in-state / ~$38k out-of-state", meritAidStrength: "Strong", shortReason: "Regional public with broad program access and scholarship opportunities.", website: "https://www.kent.edu/", logo: "https://www.google.com/s2/favicons?domain=kent.edu&sz=128" },
  { name: "University of Louisville", region: "South", state: "KY", publicPrivate: "Public", size: "Large", strengths: ["Health / Pre-Med", "Business"], vibe: ["Balanced academics and social life"], selectivityTier: "Moderate", estimatedAcceptanceRate: "~76%", satRange: "1060–1280", gpaRange: "3.2–3.8", costNote: "~22k in-state / ~$40k out-of-state", meritAidStrength: "Moderate", shortReason: "Urban research university with strong health programs.", website: "https://louisville.edu/", logo: "https://www.google.com/s2/favicons?domain=louisville.edu&sz=128" },
];

function filterCollegesStrict(input: FormState): College[] {
  return COLLEGES.filter((c) => {
    // location
    if (input.location !== "Anywhere" && c.region !== input.location) return false;
    // study area
    if (input.studyArea !== "Undecided" && !c.strengths.includes(input.studyArea)) return false;
    // school size
    if (input.schoolSize !== "No preference" && c.size !== input.schoolSize) return false;
    // vibe
    if (input.vibe !== "No preference" && !c.vibe.includes(input.vibe)) return false;
    // budget
    if (input.budget === "In-state/public options preferred" && c.publicPrivate !== "Public") return false;
    if (input.budget === "Need strong merit scholarships" && c.meritAidStrength === "Limited") return false;
    // passed all strict checks
    return true;
  });
}

function getAcademicTier(input: FormState): AcademicTier {
  const isUnknown = input.testStatus === "Haven't taken yet" || input.testStatus === "Test optional";
  if (input.gpa === "3.8–4.0" && input.testStatus === "1460+ SAT / 34+ ACT") return "Very Strong";
  if (
    (input.gpa === "3.8–4.0" && input.testStatus === "1360–1450 SAT / 31–33 ACT") ||
    (input.gpa === "3.5–3.7" && (input.testStatus === "1360–1450 SAT / 31–33 ACT" || input.testStatus === "1460+ SAT / 34+ ACT"))
  ) return "Strong";
  if (input.gpa === "3.0–3.4" && input.testStatus === "1200–1350 SAT / 25–30 ACT") return "Solid";
  if (input.gpa === "Below 3.0" || input.testStatus === "Below 1200 SAT / below 25 ACT") return "Developing";
  if (isUnknown) return "Unknown";
  return "Solid";
}

function bucketFromTier(tier: AcademicTier, schoolTier: SelectivityTier): Bucket {
  if (tier === "Very Strong") {
    if (schoolTier === "Elite") return "reach";
    if (schoolTier === "Highly Selective") return "reach";
    if (schoolTier === "Selective") return "target";
    return "likely";
  }
  if (tier === "Strong") {
    if (schoolTier === "Elite" || schoolTier === "Highly Selective") return "reach";
    if (schoolTier === "Selective") return "target";
    return "likely";
  }
  if (tier === "Solid") {
    if (schoolTier === "Elite" || schoolTier === "Highly Selective") return "reach";
    if (schoolTier === "Selective") return "target";
    if (schoolTier === "Moderate") return "target";
    return "likely";
  }
  if (tier === "Developing") {
    if (schoolTier === "Accessible") return "likely";
    if (schoolTier === "Moderate") return "target";
    return "reach";
  }
  if (schoolTier === "Elite" || schoolTier === "Highly Selective") return "reach";
  if (schoolTier === "Selective") return "target";
  return "likely";
}

function majorPenaltyOrBoost(college: College, major: MajorArea): number {
  if (major === "Undecided") return 10;
  return college.strengths.includes(major) ? 35 : -25;
}

function academicFitScore(tier: AcademicTier, college: College): number {
  const bucket = bucketFromTier(tier, college.selectivityTier);
  if (bucket === "target") return 25;
  if (bucket === "reach") return 14;
  return 18;
}

function buildBadges(college: College, input: FormState): string[] {
  const badges = [college.region, college.publicPrivate, `${college.size} Campus`];
  if (input.studyArea !== "Undecided" && college.strengths.includes(input.studyArea)) {
    badges.push(`Strong ${input.studyArea}`);
  }
  if (college.meritAidStrength === "Strong" || college.meritAidStrength === "Moderate") {
    badges.push("Merit Aid Potential");
  }
  if (college.vibe.includes("Competitive / research-focused")) badges.push("Research-Focused");
  if (college.vibe.includes("Big school spirit")) badges.push("School Spirit");
  return badges.slice(0, 6);
}

function scoreCollege(college: College, input: FormState, tier: AcademicTier): RankedCollege {
  let score = 0;
  score += majorPenaltyOrBoost(college, input.studyArea);

  if (input.location === "Anywhere") score += 10;
  else if (college.region === input.location) score += 25;
  else score -= 20;

  if (input.budget === "In-state/public options preferred") {
    score += college.publicPrivate === "Public" ? 20 : -10;
  }
  if (input.budget === "Need strong merit scholarships") {
    if (college.meritAidStrength === "Strong") score += 20;
    else if (college.meritAidStrength === "Moderate") score += 10;
  }

  if (input.schoolSize !== "No preference") {
    score += college.size === input.schoolSize ? 10 : 0;
  }
  if (input.vibe !== "No preference") {
    score += college.vibe.includes(input.vibe) ? 10 : 0;
  }

  score += academicFitScore(tier, college);

  const bucket = bucketFromTier(tier, college.selectivityTier);
  const badges = buildBadges(college, input);

  return { ...college, score, bucket, fitBadges: badges };
}

// selectivity weight helper removed — selection now uses ranked sorting and strictness checks

function selectBucketWithRelaxation(
  bucket: Bucket,
  rankedAll: RankedCollege[],
  rankedStrict: RankedCollege[],
  region: FormState["location"],
  count: number,
  excludedNames?: Set<string>
): { items: RankedCollege[]; strictCount: number } {
  const chosen: RankedCollege[] = [];
  const blocked = excludedNames ?? new Set<string>();

  const strictPool = rankedStrict.filter((r) => r.bucket === bucket && !blocked.has(r.name));
  const allPool = rankedAll.filter((r) => !blocked.has(r.name));

  // pick up to 3 strict matches first
  for (const s of strictPool) {
    if (chosen.length >= Math.min(3, count)) break;
    if (!chosen.some((c) => c.name === s.name)) chosen.push(s);
  }

  const strictCount = chosen.length;

  // determine allowed non-strict additions: if we already have >=3 strict, allow at most 1 non-strict
  const allowNonStrict = strictCount >= 3 ? 1 : count - strictCount;
  let nonStrictAdded = 0;

  // fill remaining slots from allPool, preferring same-region and higher score
  const remainingPool = allPool
    .filter((r) => !chosen.some((c) => c.name === r.name))
    .sort((a, b) => {
      const regionScoreA = region === "Anywhere" ? 0 : a.region === region ? 0 : 1;
      const regionScoreB = region === "Anywhere" ? 0 : b.region === region ? 0 : 1;
      if (regionScoreA !== regionScoreB) return regionScoreA - regionScoreB;
      return b.score - a.score;
    });

  for (const candidate of remainingPool) {
    if (chosen.length >= count) break;
    const isStrict = rankedStrict.some((r) => r.name === candidate.name);
    if (!isStrict) {
      if (nonStrictAdded >= allowNonStrict) continue;
      nonStrictAdded += 1;
      candidate.crossRegionReason = "Included as an extra strong overall fit beyond your preferences.";
    }
    chosen.push(candidate);
  }

  return { items: chosen.slice(0, count), strictCount };
}

function buildWarning(input: FormState): string | null {
  if (
    input.schoolSize === "Small" &&
    input.budget === "In-state/public options preferred" &&
    input.studyArea === "Computer Science / Engineering" &&
    input.location !== "Anywhere"
  ) {
    return "Note: Small public universities with strong CS/Engineering programs are less common, so this list may include some medium or large schools that better match your academic/program preferences.";
  }
  return null;
}

function buildSummary(input: FormState, tier: AcademicTier): string {
  const budgetText =
    input.budget === "In-state/public options preferred"
      ? "public-school budget preference"
      : input.budget === "Need strong merit scholarships"
      ? "merit-scholarship focus"
      : "current budget preference";
  return `Based on your ${input.gpa} GPA, ${input.testStatus} profile (${tier}), ${input.studyArea} interest, ${input.location} preference, and ${budgetText}, this list prioritizes best-fit starter options with balanced reach, target, and likely choices.`;
}

export default function CollegeListBuilderPage({ onBack }: CollegeListBuilderPageProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    grade: "11th",
    gpa: "3.5–3.7",
    testStatus: "1200–1350 SAT / 25–30 ACT",
    studyArea: "Undecided",
    location: "Anywhere",
    schoolSize: "No preference",
    budget: "Not sure yet",
    vibe: "No preference",
  });

  const computed = useMemo(() => {
    const tier = getAcademicTier(formState);
    const candidates = filterCollegesStrict(formState);

    if (candidates.length === 0) {
      return {
        tier,
        warning:
          "No colleges match all of your strict preferences. Try widening location, major, size, or budget to see more options.",
        summary: buildSummary(formState, tier),
        buckets: [
          { title: "Possible Reach Schools", tone: "", items: [] },
          { title: "Potential Target Schools", tone: "", items: [] },
          { title: "Likely / Safer-Fit Options", tone: "", items: [] },
        ],
      };
    }

    const rankedAll = COLLEGES.map((c) => scoreCollege(c, formState, tier));
    const strictCandidates = filterCollegesStrict(formState);
    const rankedStrict = strictCandidates.map((c) => scoreCollege(c, formState, tier));

    const usedNames = new Set<string>();

    const reachSel = selectBucketWithRelaxation("reach", rankedAll, rankedStrict, formState.location, 4, usedNames);
    reachSel.items.forEach((i) => usedNames.add(i.name));
    const targetSel = selectBucketWithRelaxation("target", rankedAll, rankedStrict, formState.location, 4, usedNames);
    targetSel.items.forEach((i) => usedNames.add(i.name));
    const likelySel = selectBucketWithRelaxation("likely", rankedAll, rankedStrict, formState.location, 4, usedNames);

    const reach = reachSel.items;
    const target = targetSel.items;
    const likely = likelySel.items;

    // build warning if any bucket had fewer than 3 strict matches
    const shortageBuckets = [] as string[];
    if (reachSel.strictCount < 3) shortageBuckets.push("reach");
    if (targetSel.strictCount < 3) shortageBuckets.push("target");
    if (likelySel.strictCount < 3) shortageBuckets.push("likely");

    const shortageWarning =
      shortageBuckets.length > 0
        ? `Some buckets had fewer than 3 strict matches (${shortageBuckets.join(", ")}). Consider widening location, major, size, or budget preferences to see more exact matches.`
        : null;

    return {
      tier,
      warning: shortageWarning ?? buildWarning(formState),
      summary: buildSummary(formState, tier),
      buckets: [
        { title: "Possible Reach Schools", tone: "Aspirational options that may require a strong overall application.", items: reach },
        { title: "Potential Target Schools", tone: "Balanced-fit schools based on your current profile and preferences.", items: target },
        { title: "Likely / Safer-Fit Options", tone: "Stronger-fit options to help keep your final list practical and balanced.", items: likely },
      ],
    };
  }, [formState]);

  function trackCalendlyClick() {
    trackConsultationClick("college_list_builder");
  }
  function scrollToConversionSection() {
    const target = document.getElementById("results-conversion-section");
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    // track college builder usage with summary metadata
    const count = computed.buckets.reduce((sum, b) => sum + (b.items?.length ?? 0), 0);
    trackCollegeBuilderSubmit({
      count,
      intendedMajor: formState.studyArea,
      gpa: formState.gpa,
      testStatus: formState.testStatus,
    });
  }

  const selectClassName =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fbff] via-blue-50 to-indigo-50 text-slate-900">
      <div className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-2 text-center text-xs sm:text-sm font-semibold tracking-[0.01em]">
          Early Bird: Students who book by June 15 get a free SAT diagnostic + 15% off.
          <a
            href={CONSULTATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackCalendlyClick}
            className="ml-2 underline underline-offset-2 hover:text-blue-100"
          >
            Reserve Your Spot →
          </a>
        </div>
      </div>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/70 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-3 rounded-xl text-left transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Go to FutureReady home page"
          >
            <div className="flex items-center justify-center">
              <img src="/logo.png" alt="FutureReady logo" className="h-16 w-16 object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-950">
                FutureReady College & Career Prep
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                SAT Prep • College Apps • Tutoring
              </p>
            </div>
          </button>

          <div className="flex items-center gap-5 lg:gap-8 ml-auto">
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
              <a href="#services" className="hover:text-blue-700 transition">Services</a>
              <a href="#about" className="hover:text-blue-700 transition">About & Results</a>
              <a href="#testimonials" className="hover:text-blue-700 transition">Testimonials</a>
              <a href="#/college-list-builder" className="hover:text-blue-700 transition">College List Builder</a>
              <a href="/blog/" className="hover:text-blue-700 transition">Blog</a>
            </div>

            <a
              href={CONSULTATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackCalendlyClick}
              className="hidden sm:inline-flex rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-800 transition"
            >
              Book a Free Consultation
            </a>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <button type="button" onClick={onBack} className="inline-flex items-center rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800">
          ← Back to Home
        </button>

        <section className="mt-6 rounded-[2rem] border border-blue-200 bg-gradient-to-r from-white to-blue-50 p-8 shadow-xl md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-blue-700">FutureReady Tool</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Build Your Starter College List</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            Answer a few quick questions and get a personalized starting point for reach, target, and likely schools.
          </p>
        </section>

        <section className="mt-6 rounded-[2rem] border border-blue-200 bg-white/95 p-6 shadow-sm md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-950">College List Builder</h2>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">Step 1 of 1</span>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
            <label className="text-sm font-semibold text-slate-700">Student grade level
              <select className={selectClassName} value={formState.grade} onChange={(e) => setFormState((p) => ({ ...p, grade: e.target.value as FormState["grade"] }))}>
                <option>9th</option><option>10th</option><option>11th</option><option>12th</option>
              </select>
            </label>
            <label className="text-sm font-semibold text-slate-700">GPA range
              <select className={selectClassName} value={formState.gpa} onChange={(e) => setFormState((p) => ({ ...p, gpa: e.target.value as FormState["gpa"] }))}>
                <option>Below 3.0</option><option>3.0–3.4</option><option>3.5–3.7</option><option>3.8–4.0</option>
              </select>
            </label>
            <label className="text-sm font-semibold text-slate-700 md:col-span-2">SAT/ACT status
              <select className={selectClassName} value={formState.testStatus} onChange={(e) => setFormState((p) => ({ ...p, testStatus: e.target.value as FormState["testStatus"] }))}>
                <option>Haven't taken yet</option><option>Below 1200 SAT / below 25 ACT</option><option>1200–1350 SAT / 25–30 ACT</option><option>1360–1450 SAT / 31–33 ACT</option><option>1460+ SAT / 34+ ACT</option><option>Test optional</option>
              </select>
            </label>
            <label className="text-sm font-semibold text-slate-700">Intended area of study
              <select className={selectClassName} value={formState.studyArea} onChange={(e) => setFormState((p) => ({ ...p, studyArea: e.target.value as FormState["studyArea"] }))}>
                <option>Computer Science / Engineering</option><option>Business</option><option>Health / Pre-Med</option><option>Social Sciences</option><option>Humanities</option><option>Undecided</option>
              </select>
            </label>
            <label className="text-sm font-semibold text-slate-700">Location preference
              <select className={selectClassName} value={formState.location} onChange={(e) => setFormState((p) => ({ ...p, location: e.target.value as FormState["location"] }))}>
                <option>West Coast</option><option>East Coast</option><option>Midwest</option><option>South</option><option>Anywhere</option>
              </select>
            </label>
            <label className="text-sm font-semibold text-slate-700">School size preference
              <select className={selectClassName} value={formState.schoolSize} onChange={(e) => setFormState((p) => ({ ...p, schoolSize: e.target.value as FormState["schoolSize"] }))}>
                <option>Small</option><option>Medium</option><option>Large</option><option>No preference</option>
              </select>
            </label>
            <label className="text-sm font-semibold text-slate-700">Budget / scholarship importance
              <select className={selectClassName} value={formState.budget} onChange={(e) => setFormState((p) => ({ ...p, budget: e.target.value as FormState["budget"] }))}>
                <option>Need strong merit scholarships</option><option>In-state/public options preferred</option><option>Flexible</option><option>Not sure yet</option>
              </select>
            </label>
            <label className="text-sm font-semibold text-slate-700 md:col-span-2">Campus vibe
              <select className={selectClassName} value={formState.vibe} onChange={(e) => setFormState((p) => ({ ...p, vibe: e.target.value as FormState["vibe"] }))}>
                <option>Competitive / research-focused</option><option>Balanced academics and social life</option><option>Supportive / collaborative</option><option>Big school spirit</option><option>No preference</option>
              </select>
            </label>
            <div className="md:col-span-2">
              <button type="submit" className="rounded-xl bg-blue-700 px-7 py-3 text-white font-bold shadow-lg shadow-blue-700/20 hover:bg-blue-800 transition">
                Generate My Starter List
              </button>
            </div>
          </form>
        </section>

        {submitted && (
          <section className="mt-6">
            {computed.warning && <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">{computed.warning}</div>}

            <div className="mt-5 grid gap-5 lg:grid-cols-3">
              {computed.buckets.map((bucket) => (
                <div key={bucket.title} className="rounded-[1.5rem] border border-blue-200 bg-gradient-to-b from-white to-blue-50/50 p-6 shadow-sm">
                  <h3 className="text-xl font-black text-slate-950">{bucket.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{bucket.tone}</p>
                  <div className="mt-3 rounded-xl border border-blue-200 bg-blue-100/70 px-3 py-2 text-xs font-semibold text-blue-800 shadow-sm ring-1 ring-blue-200/60">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />
                      Preview shown - full strategy available through a free consultation.
                    </span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {Array.from({ length: 4 }).map((_, index) => {
                      const item = bucket.items[index];
                      const isLocked = index >= 2;

                      if (!item) {
                        return (
                          <article key={`${bucket.title}-fallback-${index}`} className="rounded-2xl border border-blue-100 bg-white p-4">
                            <p className="text-sm font-semibold text-slate-700">Not sure which schools fit you best?</p>
                            <button
                              type="button"
                              onClick={scrollToConversionSection}
                              className="mt-2 inline-flex text-sm font-bold text-blue-700 underline-offset-2 hover:underline"
                            >
                              Let&apos;s Build Your College List
                            </button>
                          </article>
                        );
                      }

                      return (
                        <article key={`${bucket.title}-${item.name}-${index}`} className="relative rounded-2xl border border-blue-100 bg-white p-4">
                          <div className={isLocked ? "pointer-events-none select-none blur-[3px]" : ""}>
                            <div className="flex items-center gap-3">
                              <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-blue-100 bg-white">
                                <img src={item.logo} alt="" className="h-6 w-6 object-contain" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                              </span>
                              <a href={item.website} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-700 underline-offset-2 transition hover:underline hover:text-blue-800 focus:underline visited:text-violet-700">
                                {item.name}
                              </a>
                            </div>
                            <p className="mt-1 text-sm text-slate-700">{item.shortReason}</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {item.fitBadges.map((badge) => (
                                <span key={`${item.name}-${badge}`} className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">{badge}</span>
                              ))}
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
                              <p><span className="font-semibold text-slate-700">Acceptance:</span> {item.estimatedAcceptanceRate}</p>
                              <p><span className="font-semibold text-slate-700">SAT:</span> {item.satRange}</p>
                            </div>
                            <details className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
                              <summary className="cursor-pointer font-semibold text-slate-800">More details</summary>
                              <div className="mt-2 space-y-1">
                                <p><span className="font-semibold text-slate-700">Location:</span> {item.state} ({item.region})</p>
                                <p><span className="font-semibold text-slate-700">GPA Range:</span> {item.gpaRange}</p>
                                <p><span className="font-semibold text-slate-700">Estimated Cost (COA):</span> {item.costNote}</p>
                                <p><span className="font-semibold text-slate-700">Extended Notes:</span> {item.shortReason}</p>
                              </div>
                            </details>
                            {item.crossRegionReason && <p className="mt-2 text-xs text-amber-700">{item.crossRegionReason}</p>}
                          </div>

                          {isLocked && (
                            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70 p-4 text-center">
                              <div>
                                <p className="text-sm font-semibold text-slate-800">Not sure which schools fit you best?</p>
                                <button
                                  type="button"
                                  onClick={scrollToConversionSection}
                                  className="mt-2 inline-flex text-sm font-bold text-blue-700 underline-offset-2 hover:underline"
                                >
                                  Let&apos;s Build Your College List
                                </button>
                              </div>
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <ResultsConversionSection consultationUrl={CONSULTATION_URL} onConsultationClick={trackCalendlyClick} />

            <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm text-slate-600">
                This tool is for brainstorming only and does not predict admissions outcomes. A strong final college list should consider grades, rigor, activities, essays, finances, and personal fit.
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Cost, acceptance rate, SAT, and GPA ranges are approximate and can change year to year.
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
