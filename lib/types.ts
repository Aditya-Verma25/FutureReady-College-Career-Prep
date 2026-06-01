export type ReportIntake = {
  studentName: string;
  email: string;
  gradeLevel: string;
  intendedMajor: string;
  careerInterests: string;
  stateOfResidence: string;
  schoolsBeingConsidered: string;
  budgetDebtConcerns: string;
  optionalNotes?: string;
};

export type ReportOrderStatus = "pending_payment" | "paid" | "generating" | "generated" | "failed";

export type ReportOrderRecord = {
  orderId: string;
  createdAt: string;
  intake: ReportIntake;
  paymentStatus: "pending" | "paid" | "failed";
  paymentSessionId?: string;
  reportGenerationStatus: ReportOrderStatus;
  emailSentStatus: "pending" | "sent" | "failed";
  errorMessage?: string;
};

export type CareerPath = {
  title: string;
  description: string;
  medianSalary: string;
  projectedGrowth: string;
  requiredEducation: string;
  keySkills: string[];
  pros: string[];
  cons: string[];
  aiRiskNote: string;
};

export type GeneratedReport = {
  studentName: string;
  intendedMajor: string;
  generatedOn: string;
  executiveSummary: {
    opportunityRating: string;
    keyTakeaways: string[];
    bestFitCareerPaths: string[];
    mainFinancialRisks: string[];
    recommendedNextSteps: string[];
  };
  majorOverview: {
    whatYouStudy: string;
    commonSkills: string[];
    fitProfile: string;
  };
  careerPaths: CareerPath[];
  costAndRoi: {
    inStateVsOutState: string;
    publicVsPrivate: string;
    debtRisk: string;
    breakevenThinking: string;
    overBorrowingWarning: string;
  };
  schoolFit: Array<{
    schoolName: string;
    strengths: string;
    risks: string;
    costNotes: string;
    recruitingAndLocationNotes: string;
  }>;
  aiRiskAndResilience: {
    aiFieldImpact: string;
    resilientSkills: string[];
    recommendations: string[];
  };
  strategyPlan: {
    academicPath: string;
    minorsAndElectives: string[];
    extracurricularsAndProjects: string[];
    internshipTimeline: string[];
    skillsToBuildNow: string[];
  };
  finalActionPlan: {
    next30Days: string[];
    next6Months: string[];
    collegePlanning: string[];
  };
  sources: Array<{ name: string; url: string; accessedOn: string }>;
  disclaimers: string[];
};
