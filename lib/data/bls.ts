type BlsCareerSnapshot = {
  occupation: string;
  medianPayAnnual: string;
  projectedGrowth: string;
  summary: string;
  sourceUrl: string;
};

export async function getBlsCareerData(occupation: string): Promise<BlsCareerSnapshot> {
  // TODO: Replace placeholder fetch with official BLS/OOH endpoint integration and API key flow if needed.
  const fallback: BlsCareerSnapshot = {
    occupation,
    medianPayAnnual: "See latest OOH estimate",
    projectedGrowth: "See latest OOH estimate",
    summary: "Public labor-market outlook data should be pulled from the Occupational Outlook Handbook.",
    sourceUrl: "https://www.bls.gov/ooh/",
  };

  return fallback;
}
