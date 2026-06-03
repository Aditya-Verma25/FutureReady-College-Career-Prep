import { generateReport } from "../lib/report/generateReport";
import { renderReportPdf } from "../lib/report/renderPdf";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });
  try {
    const intake = req.body;
    if (!intake || !intake.studentName || !intake.email) return res.status(400).json({ message: "Missing intake fields" });
    const report = await generateReport(intake);
    const pdfBytes = await renderReportPdf(report as any);
    const buffer = Buffer.from(pdfBytes);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=FutureReady-${(report.intendedMajor||'report').replace(/[^a-z0-9]/gi,'-')}-Report.pdf`);
    res.send(buffer);
  } catch (err) {
    console.error("generate-report error", err);
    const message = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error && err.stack ? err.stack : undefined;
    // Return error details to help debug in dev; remove in production.
    res.status(500).json({ message: "Failed to generate report", error: message, stack });
  }
}
