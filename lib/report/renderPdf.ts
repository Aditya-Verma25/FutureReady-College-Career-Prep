import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { GeneratedReport } from "../types";

function drawWrappedText(
  page: import("pdf-lib").PDFPage,
  text: string,
  x: number,
  y: number,
  width: number,
  lineHeight: number,
  font: import("pdf-lib").PDFFont,
  size: number
): number {
  const words = text.split(" ");
  let line = "";
  let cursorY = y;
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > width) {
      page.drawText(line, { x, y: cursorY, size, font, color: rgb(0.2, 0.25, 0.33) });
      line = word;
      cursorY -= lineHeight;
    } else {
      line = candidate;
    }
  }
  if (line) {
    page.drawText(line, { x, y: cursorY, size, font, color: rgb(0.2, 0.25, 0.33) });
    cursorY -= lineHeight;
  }
  return cursorY;
}

export async function renderReportPdf(report: GeneratedReport): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const page = pdfDoc.addPage([612, 792]);
  page.drawRectangle({ x: 0, y: 712, width: 612, height: 80, color: rgb(0.09, 0.33, 0.75) });
  page.drawText("FutureReady Report", { x: 40, y: 744, size: 28, font: bold, color: rgb(1, 1, 1) });
  page.drawText(report.studentName, { x: 40, y: 712, size: 14, font: regular, color: rgb(0.96, 0.98, 1) });

  let y = 680;
  page.drawText(`Major/Interest: ${report.intendedMajor}`, { x: 40, y, size: 12, font: bold, color: rgb(0.08, 0.12, 0.2) });
  y -= 18;
  page.drawText(`Generated: ${new Date(report.generatedOn).toLocaleString()}`, { x: 40, y, size: 10, font: regular, color: rgb(0.35, 0.4, 0.48) });
  y -= 28;

  page.drawText("Executive Summary", { x: 40, y, size: 16, font: bold, color: rgb(0.08, 0.12, 0.2) });
  y -= 20;
  y = drawWrappedText(page, `Opportunity Rating: ${report.executiveSummary.opportunityRating}`, 40, y, 530, 14, regular, 11);
  y = drawWrappedText(page, `Top Takeaways: ${report.executiveSummary.keyTakeaways.join(" | ")}`, 40, y, 530, 14, regular, 11);
  y -= 10;

  page.drawText("Career Path Breakdown", { x: 40, y, size: 16, font: bold, color: rgb(0.08, 0.12, 0.2) });
  y -= 18;
  for (const career of report.careerPaths.slice(0, 4)) {
    y = drawWrappedText(
      page,
      `${career.title} - Median: ${career.medianSalary}; Growth: ${career.projectedGrowth}; Skills: ${career.keySkills.slice(0, 3).join(", ")}`,
      40,
      y,
      530,
      13,
      regular,
      10
    );
    if (y < 120) break;
  }

  const page2 = pdfDoc.addPage([612, 792]);
  let y2 = 750;
  page2.drawText("Cost, School Fit, and Action Plan", { x: 40, y: y2, size: 20, font: bold, color: rgb(0.08, 0.12, 0.2) });
  y2 -= 30;
  y2 = drawWrappedText(page2, `Cost and ROI: ${report.costAndRoi.inStateVsOutState} ${report.costAndRoi.publicVsPrivate}`, 40, y2, 530, 14, regular, 11);
  y2 = drawWrappedText(page2, `Debt Risk: ${report.costAndRoi.debtRisk}`, 40, y2, 530, 14, regular, 11);
  y2 -= 10;
  page2.drawText("School Fit Notes", { x: 40, y: y2, size: 16, font: bold, color: rgb(0.08, 0.12, 0.2) });
  y2 -= 18;
  for (const school of report.schoolFit.slice(0, 5)) {
    y2 = drawWrappedText(page2, `${school.schoolName}: ${school.strengths} Risk: ${school.risks}`, 40, y2, 530, 13, regular, 10);
    if (y2 < 120) break;
  }
  y2 -= 8;
  page2.drawText("Final Action Plan", { x: 40, y: y2, size: 16, font: bold, color: rgb(0.08, 0.12, 0.2) });
  y2 -= 18;
  y2 = drawWrappedText(page2, `30-Day: ${report.finalActionPlan.next30Days.join(" | ")}`, 40, y2, 530, 13, regular, 10);
  y2 = drawWrappedText(page2, `6-Month: ${report.finalActionPlan.next6Months.join(" | ")}`, 40, y2, 530, 13, regular, 10);

  const sourcePage = pdfDoc.addPage([612, 792]);
  let ys = 750;
  sourcePage.drawText("Sources and Disclaimers", { x: 40, y: ys, size: 20, font: bold, color: rgb(0.08, 0.12, 0.2) });
  ys -= 28;
  for (const source of report.sources) {
    ys = drawWrappedText(sourcePage, `${source.name}: ${source.url} (accessed ${new Date(source.accessedOn).toLocaleDateString()})`, 40, ys, 530, 13, regular, 10);
  }
  ys -= 10;
  for (const disclaimer of report.disclaimers) {
    ys = drawWrappedText(sourcePage, `- ${disclaimer}`, 40, ys, 530, 13, regular, 10);
  }

  return pdfDoc.save();
}
