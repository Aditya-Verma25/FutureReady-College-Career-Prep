// NOTE: This serverless PDF endpoint is kept for future work but is not used
// by the demo-mode frontend. The site now serves a static sample PDF at
// `/sample-futureready-report.pdf` (placed in `public/`) so the frontend
// never depends on server-side PDF generation during demo mode.

import { renderReportPdf } from "../lib/report/renderPdf";
import { sampleReport } from "../lib/report/sampleReport";

export default async function handler(req: any, res: any) {
  try {
    // Left here for dev/debug but not relied on by the UI. If you want to use
    // this in production, ensure runtime supports pdf-lib and adjust build.
    const pdfBytes = await renderReportPdf(sampleReport as any);
    const buffer = Buffer.from(pdfBytes);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=sample-futureready-report.pdf");
    res.send(buffer);
  } catch (err) {
    console.error("sample-report generation error", err);
    res.status(500).json({ message: "Failed to generate sample PDF" });
  }
}
