type SchoolData = {
  schoolName: string;
  avgCostInState: string;
  avgCostOutState: string;
  graduationRate: string;
  medianEarnings: string;
  sourceUrl: string;
};

export async function getCollegeScorecardData(schoolName: string): Promise<SchoolData> {
  // TODO: Add real College Scorecard API integration with env var:
  // COLLEGE_SCORECARD_API_KEY.
  return {
    schoolName,
    avgCostInState: "Public data lookup recommended",
    avgCostOutState: "Public data lookup recommended",
    graduationRate: "Public data lookup recommended",
    medianEarnings: "Public data lookup recommended",
    sourceUrl: "https://collegescorecard.ed.gov/data/",
  };
}
