type OnetSnapshot = {
  occupation: string;
  typicalTasks: string[];
  keySkills: string[];
  sourceUrl: string;
};

export async function getOnetData(occupation: string): Promise<OnetSnapshot> {
  // TODO: Wire official O*NET Web Services credentials via env vars:
  // ONET_USERNAME and ONET_PASSWORD.
  return {
    occupation,
    typicalTasks: ["Analyze domain-specific problems", "Communicate findings", "Execute project deliverables"],
    keySkills: ["Analytical thinking", "Communication", "Digital literacy"],
    sourceUrl: "https://www.onetonline.org/",
  };
}
