import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

function drawWrappedText(page, text, x, y, width, lineHeight, font, size, color = rgb(0.15, 0.18, 0.25)) {
  const words = String(text).split(' ');
  let line = '';
  let cursorY = y;
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > width) {
      page.drawText(line, { x, y: cursorY, size, font, color });
      line = word;
      cursorY -= lineHeight;
    } else {
      line = candidate;
    }
  }
  if (line) {
    page.drawText(line, { x, y: cursorY, size, font, color });
    cursorY -= lineHeight;
  }
  return cursorY;
}

const sample = {
  studentName: 'Jordan Rivera',
  intendedMajor: 'Computer Science',
  generatedOn: new Date().toISOString(),
  executiveSummary: {
    opportunityRating: 'Moderate-High',
    opportunityExplanation:
      'Strong employer demand for software and data roles; internship conversion is the key driver of early-career outcomes. Net price and internship access should be primary selectors.',
    keyTakeaways: [
      'Prioritize schools with proven internship-to-hire funnels and nearby employer networks.',
      'Compare net price, not sticker price, and model likely first-job earnings against debt.',
    ],
    recommendedNextSteps: ['Shortlist 6 schools with internship data', 'Request net price estimates from each school'],
  },
  careerPaths: [
    {
      title: 'Software Engineer',
      medianSalary: '$95,000',
      projectedGrowth: 'Strong',
      requiredEducation: "Bachelor's",
      topSkills: ['Algorithmic problem solving', 'System design basics', 'Code review'],
      whatStudentsUnderestimate: 'How early internship recruiting cycles begin (late summer/fall).',
      earlyCareerReality: 'Internships usually lead to full-time offers; perform well in internships.',
    },
    {
      title: 'Data Analyst',
      medianSalary: '$65,000',
      projectedGrowth: 'Steady',
      requiredEducation: "Bachelor's",
      topSkills: ['SQL', 'Data cleaning', 'Storytelling with data'],
      whatStudentsUnderestimate: 'Domain knowledge matters as much as technical skill.',
      earlyCareerReality: 'Junior roles focus on cleaning and reporting; portfolio projects accelerate growth.',
    },
    {
      title: 'Product Manager',
      medianSalary: '$105,000',
      projectedGrowth: 'Growing',
      requiredEducation: 'Varies',
      topSkills: ['User research synthesis', 'Roadmapping', 'Stakeholder communication'],
      whatStudentsUnderestimate: 'Cross-functional experience is often required; internships are rare but valuable.',
      earlyCareerReality: 'May transition from PM internships or technical roles.',
    },
  ],
  schoolFit: [
    {
      schoolName: 'University of Maryland, College Park',
      estimatedCostCategory: 'Moderate (in-state value)',
      majorStrength: 'Regional CS leader; strong employer recruiting',
      internshipAccess: 'Strong',
      admissionsRisk: 'Moderate',
      financialRisk: 'Lower for in-state',
      notes: 'Balance of research and industry connections.',
    },
    { schoolName: 'Purdue University', estimatedCostCategory: 'Moderate', majorStrength: 'Large engineering & CS programs', internshipAccess: 'Strong', admissionsRisk: 'Moderate', financialRisk: 'Moderate', notes: 'Particularly strong for systems and engineering.' },
    { schoolName: 'University of Washington', estimatedCostCategory: 'Moderate-High', majorStrength: 'Top-tier CS with Seattle hiring', internshipAccess: 'Very strong', admissionsRisk: 'High (OOS)', financialRisk: 'Higher OOS cost', notes: 'Excellent tech recruiting; weigh cost vs opportunity.' },
  ],
  whatStudentsOftenOverlook: [
    'Internship timelines often start early—projects and outreach should begin in Year 1-2.',
    'Net price after aid can change the rankings dramatically—always request net price estimates.',
    'Class size and advising capacity impact major switches and research access.',
  ],
  finalActionPlan: { next30Days: ['Shortlist target schools', 'Request net price estimates', 'Build two recruiter-facing portfolio items'], next6Months: ['Apply for internships', 'Refine essays', 'Secure recommenders'] },
  sources: ['BLS OOH', 'College Scorecard', 'O*NET'],
  disclaimers: ['Estimates only; verify with schools.'],
};

async function makePdf() {
  const pdfDoc = await PDFDocument.create();
  let regular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  let bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Page 1: Cover
  let cover = pdfDoc.addPage([612, 792]);
  cover.drawRectangle({ x: 0, y: 720, width: 612, height: 96, color: rgb(0.09, 0.33, 0.75) });
  cover.drawText('FutureReady Report', { x: 40, y: 760, size: 32, font: bold, color: rgb(1, 1, 1) });
  cover.drawText(sample.studentName, { x: 40, y: 730, size: 12, font: regular, color: rgb(0.96, 0.98, 1) });
  cover.drawText(`Intended Major: ${sample.intendedMajor}`, { x: 40, y: 710, size: 12, font: regular });
  cover.drawText(`Generated: ${new Date(sample.generatedOn).toLocaleDateString()}`, { x: 40, y: 694, size: 10, font: regular, color: rgb(0.35, 0.4, 0.48) });
  cover.drawText('Preview (Demo Mode)', { x: 420, y: 730, size: 10, font: regular, color: rgb(0.95, 0.95, 0.95) });

  // Page 2: Executive Summary + bar chart
  let p1 = pdfDoc.addPage([612, 792]);
  let y = 740;
  p1.drawText('Executive Summary', { x: 40, y, size: 18, font: bold });
  y -= 26;
  y = drawWrappedText(p1, sample.executiveSummary.opportunityExplanation, 40, y, 520, 14, regular, 11);
  y -= 8;
  y = drawWrappedText(p1, `Top takeaways: ${sample.executiveSummary.keyTakeaways.join(' | ')}`, 40, y, 520, 14, regular, 11);
  y -= 18;
  // Simple bar chart showing relative strengths
  const chartX = 60;
  let chartY = y;
  p1.drawText('Opportunity factors', { x: chartX, y: chartY, size: 12, font: bold });
  chartY -= 16;
  const factors = [
    { name: 'Employer demand', value: 85 },
    { name: 'Internship access', value: 75 },
    { name: 'Net price friendliness', value: 60 },
    { name: 'Selectivity risk', value: 50 },
  ];
  for (const f of factors) {
    const barW = 360;
    p1.drawText(f.name, { x: chartX, y: chartY, size: 10, font: regular });
    chartY -= 12;
    // background
    p1.drawRectangle({ x: chartX, y: chartY, width: barW, height: 8, color: rgb(0.9, 0.92, 0.95) });
    // value
    p1.drawRectangle({ x: chartX, y: chartY, width: (f.value / 100) * barW, height: 8, color: rgb(0.09, 0.33, 0.75) });
    chartY -= 18;
  }

  // Page 3: Career Paths (two-column cards)
  let p2 = pdfDoc.addPage([612, 792]);
  let cy = 740;
  p2.drawText('Career Path Breakdown', { x: 40, y: cy, size: 18, font: bold });
  cy -= 22;
  const cardW = 260;
  const leftX = 40;
  const rightX = 320;
  let col = 0;
  for (const career of sample.careerPaths) {
    const x = col === 0 ? leftX : rightX;
    p2.drawRectangle({ x: x - 6, y: cy - 86, width: cardW + 12, height: 86, color: rgb(0.98, 0.99, 1) });
    p2.drawText(career.title, { x, y: cy, size: 12, font: bold });
    p2.drawText(`${career.medianSalary} • ${career.projectedGrowth}`, { x, y: cy - 16, size: 10, font: regular });
    drawWrappedText(p2, `Skills: ${career.topSkills.join(', ')}`, x, cy - 34, cardW, 12, regular, 9);
    drawWrappedText(p2, `What students underestimate: ${career.whatStudentsUnderestimate}`, x, cy - 52, cardW, 12, regular, 8, rgb(0.2, 0.22, 0.26));
    col = col === 0 ? 1 : 0;
    if (col === 0) cy -= 110;
    if (cy < 120) {
      // new page
      cy = 740;
      p2 = pdfDoc.addPage([612, 792]);
    }
  }

  // Page 4: School Fit Table (visual rows)
  let p3 = pdfDoc.addPage([612, 792]);
  let sy = 740;
  p3.drawText('School Fit Snapshot', { x: 40, y: sy, size: 18, font: bold });
  sy -= 22;
  const tableX = 40;
  const tableW = 520;
  const colWidths = [180, 100, 120, 120];
  // header
  p3.drawRectangle({ x: tableX, y: sy - 18, width: tableW, height: 18, color: rgb(0.95, 0.97, 1) });
  p3.drawText('School', { x: tableX + 6, y: sy - 14, size: 10, font: bold });
  p3.drawText('Cost', { x: tableX + colWidths[0] + 6, y: sy - 14, size: 10, font: bold });
  p3.drawText('Program strength', { x: tableX + colWidths[0] + colWidths[1] + 6, y: sy - 14, size: 10, font: bold });
  p3.drawText('Internships', { x: tableX + colWidths[0] + colWidths[1] + colWidths[2] + 6, y: sy - 14, size: 10, font: bold });
  sy -= 26;
  for (const s of sample.schoolFit) {
    p3.drawText(s.schoolName, { x: tableX + 6, y: sy, size: 10, font: regular });
    p3.drawText(s.estimatedCostCategory, { x: tableX + colWidths[0] + 6, y: sy, size: 10, font: regular });
    p3.drawText(s.majorStrength, { x: tableX + colWidths[0] + colWidths[1] + 6, y: sy, size: 10, font: regular });
    // internships visual bar
    const barX = tableX + colWidths[0] + colWidths[1] + colWidths[2] + 6;
    const barMax = 80;
    const val = s.internshipAccess === 'Very strong' ? 90 : s.internshipAccess === 'Strong' ? 70 : 40;
    p3.drawRectangle({ x: barX, y: sy - 6, width: barMax, height: 8, color: rgb(0.92, 0.94, 0.96) });
    p3.drawRectangle({ x: barX, y: sy - 6, width: (val / 100) * barMax, height: 8, color: rgb(0.09, 0.33, 0.75) });
    sy -= 20;
  }

  // Page 5: Cost & ROI with simple bar chart and bullets
  let p4 = pdfDoc.addPage([612, 792]);
  let ry = 740;
  p4.drawText('Cost & ROI Considerations', { x: 40, y: ry, size: 18, font: bold });
  ry -= 24;
  ry = drawWrappedText(p4, 'Compare estimated net price against likely starting salaries to assess breakeven timelines. The chart below shows relative estimated net-price categories for illustrative schools.', 40, ry, 520, 14, regular, 11);
  ry -= 12;
  const costChartX = 60;
  const costChartY = ry;
  const costBars = [
    { label: 'UMD', value: 45 },
    { label: 'Purdue', value: 50 },
    { label: 'UW', value: 75 },
  ];
  let cbY = costChartY;
  for (const b of costBars) {
    p4.drawText(b.label, { x: costChartX, y: cbY, size: 10, font: regular });
    p4.drawRectangle({ x: costChartX + 40, y: cbY - 6, width: 360, height: 10, color: rgb(0.93, 0.94, 0.96) });
    p4.drawRectangle({ x: costChartX + 40, y: cbY - 6, width: (b.value / 100) * 360, height: 10, color: rgb(0.09, 0.33, 0.75) });
    cbY -= 22;
  }
  ry = cbY - 10;
  ry = drawWrappedText(p4, 'Notes: Net price can shift final recommendations; verify financial aid offers and consider in-state options when debt tolerance is limited.', 40, ry, 520, 14, regular, 11);

  // Page 6: What students often overlook / Action plan / Sources
  let p5 = pdfDoc.addPage([612, 792]);
  let ay = 740;
  p5.drawText('What Students Often Overlook', { x: 40, y: ay, size: 18, font: bold });
  ay -= 22;
  for (const item of sample.whatStudentsOftenOverlook) {
    ay = drawWrappedText(p5, `• ${item}`, 40, ay, 520, 14, regular, 11);
    ay -= 6;
  }
  ay -= 8;
  ay = drawWrappedText(p5, `30-day plan: ${sample.finalActionPlan.next30Days.join(' • ')}`, 40, ay, 520, 14, regular, 11);
  ay -= 8;
  ay = drawWrappedText(p5, `6-month plan: ${sample.finalActionPlan.next6Months.join(' • ')}`, 40, ay, 520, 14, regular, 11);
  ay -= 12;
  ay = drawWrappedText(p5, `Sources: ${sample.sources.join(', ')}`, 40, ay, 520, 14, regular, 10);
  ay -= 12;
  p5.drawText('Disclaimer: Estimates only; verify with official school sources.', { x: 40, y: ay, size: 9, font: regular, color: rgb(0.4, 0.42, 0.45) });

  const pdfBytes = await pdfDoc.save();
  const outPath = path.join(process.cwd(), 'public', 'sample-futureready-report.pdf');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, pdfBytes);
  console.log('Wrote', outPath);
}

makePdf().catch((err) => {
  console.error(err);
  process.exit(1);
});

