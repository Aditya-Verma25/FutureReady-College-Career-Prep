import { getBlsCareerData } from "../data/bls";
import { getCollegeScorecardData } from "../data/collegeScorecard";
import { getOnetData } from "../data/onet";
import type { CareerPath, GeneratedReport, ReportIntake } from "../types";
import { mapMajorToCareers } from "./majorMapping";

function parseSchools(raw: string): string[] {
  return raw
    .split(/[,\n]/g)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 8);
}

export async function generateReport(intake: ReportIntake): Promise<GeneratedReport> {
  const careers = mapMajorToCareers(intake.intendedMajor).slice(0, 6);
  const schools = parseSchools(intake.schoolsBeingConsidered);
  const generatedOn = new Date().toISOString();

  const careerPaths: CareerPath[] = [];
  for (const career of careers) {
    const [bls, onet] = await Promise.all([getBlsCareerData(career), getOnetData(career)]);
    careerPaths.push({
      title: career,
      description: bls.summary,
      medianSalary: bls.medianPayAnnual,
      projectedGrowth: bls.projectedGrowth,
      requiredEducation: "Varies by employer and specialization",
      keySkills: onet.keySkills,
      pros: ["Broad pathway options", "Transferable skills potential"],
      cons: ["Competitive entry points", "Role and market volatility"],
      aiRiskNote: "Automation may change task mix, but domain depth and communication remain durable.",
    });
  }

  const schoolFit = [];
  for (const school of schools) {
    const scorecard = await getCollegeScorecardData(school);
    schoolFit.push({
      schoolName: school,
      strengths: `Can support ${intake.intendedMajor} pathways depending on program strength and internship pipelines.`,
      risks: "Cost and debt exposure should be checked against expected post-grad outcomes.",
      costNotes: `In-state: ${scorecard.avgCostInState}; Out-of-state: ${scorecard.avgCostOutState}`,
      recruitingAndLocationNotes: "Consider employer density, alumni network access, and internship market proximity.",
    });
  }

  return {
    studentName: intake.studentName,
    intendedMajor: intake.intendedMajor,
    generatedOn,
    executiveSummary: {
      opportunityRating: "Moderate-High",
      keyTakeaways: [
        "Prioritize programs with internship conversion and employer visibility.",
        "Cost discipline is as important as rankings when evaluating long-term flexibility.",
      ],
      bestFitCareerPaths: careers.slice(0, 4),
      mainFinancialRisks: ["Overborrowing for unclear ROI", "Ignoring total cost of attendance"],
      recommendedNextSteps: ["Build a side-by-side cost/outcome table", "Validate internship access at each school"],
    },
    majorOverview: {
      whatYouStudy: `Students in ${intake.intendedMajor} typically build domain knowledge, problem-solving skills, and practical project experience.`,
      commonSkills: ["Critical thinking", "Communication", "Quantitative reasoning", "Project execution"],
      fitProfile: "Students who enjoy structured problem solving, iterative learning, and practical application often fit well.",
    },
    careerPaths,
    costAndRoi: {
      inStateVsOutState: "In-state public options often reduce debt pressure and shorten breakeven timelines.",
      publicVsPrivate: "Private institutions can offer value with aid, but net cost must be compared carefully.",
      debtRisk: `Given your concerns (${intake.budgetDebtConcerns}), debt should be modeled before committing.`,
      breakevenThinking: "Estimate first-job earnings range against total borrowing to understand repayment strain.",
      overBorrowingWarning: "Avoid borrowing levels that require optimistic salary assumptions to remain manageable.",
    },
    schoolFit,
    aiRiskAndResilience: {
      aiFieldImpact: "AI is likely to automate routine tasks and raise demand for higher-order analysis and communication.",
      resilientSkills: ["Domain depth", "Communication", "Data literacy", "Problem framing"],
      recommendations: ["Add practical project experience", "Build portfolio evidence", "Pursue adaptable tools and workflows"],
    },
    strategyPlan: {
      academicPath: "Choose a core major track, then stack practical electives aligned with target roles.",
      minorsAndElectives: ["Data analytics", "Communication", "Economics/finance literacy"],
      extracurricularsAndProjects: ["Career-relevant club leadership", "Applied projects", "Community or research initiatives"],
      internshipTimeline: ["Year 1: Exploration", "Year 2: Skill-building internship", "Year 3: Targeted internship applications", "Year 4: Conversion and full-time prep"],
      skillsToBuildNow: ["Resume iteration", "Interview readiness", "Networking habits", "Tool fluency"],
    },
    finalActionPlan: {
      next30Days: ["Shortlist schools", "Gather net cost estimates", "Identify role pathways"],
      next6Months: ["Build two portfolio projects", "Apply for exploratory internships", "Refine academic roadmap"],
      collegePlanning: ["Verify aid assumptions directly with schools", "Cross-check major outcomes and graduation constraints"],
    },
    sources: [
      { name: "BLS Occupational Outlook Handbook", url: "https://www.bls.gov/ooh/", accessedOn: generatedOn },
      { name: "College Scorecard", url: "https://collegescorecard.ed.gov/data/", accessedOn: generatedOn },
      { name: "O*NET Online", url: "https://www.onetonline.org/", accessedOn: generatedOn },
      { name: "NCES/IPEDS", url: "https://nces.ed.gov/ipeds/", accessedOn: generatedOn },
      { name: "Federal Student Aid", url: "https://studentaid.gov/", accessedOn: generatedOn },
    ],
    disclaimers: [
      "This report is for educational planning only.",
      "Salary and job data are estimates from public sources and may vary.",
      "This does not guarantee admission, employment, scholarships, or financial outcomes.",
      "Families should verify admissions and financial aid information directly with schools.",
    ],
  };
}
