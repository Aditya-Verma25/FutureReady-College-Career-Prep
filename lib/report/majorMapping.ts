const MAJOR_CAREER_MAP: Record<string, string[]> = {
  "computer science": ["Software Developer", "Data Scientist", "Cybersecurity Analyst", "Product Manager", "Machine Learning Engineer"],
  psychology: ["UX Researcher", "HR Specialist", "Mental Health Counselor", "Market Research Analyst"],
  finance: ["Financial Analyst", "Investment Analyst", "Accountant", "Risk Analyst"],
  nursing: ["Registered Nurse", "Nurse Practitioner", "Healthcare Administrator"],
  business: ["Business Analyst", "Operations Analyst", "Marketing Manager", "Sales Manager"],
  biology: ["Clinical Research Coordinator", "Lab Scientist", "Biotech Analyst", "Public Health Analyst"],
};

export function mapMajorToCareers(major: string): string[] {
  const normalized = major.trim().toLowerCase();
  for (const [key, careers] of Object.entries(MAJOR_CAREER_MAP)) {
    if (normalized.includes(key)) return careers;
  }
  return ["Business Analyst", "Project Coordinator", "Research Analyst", "Operations Associate"];
}
