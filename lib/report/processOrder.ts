import { sendReportEmail } from "../email/sendReportEmail";
import { updateOrder } from "../storage/reportStore";
import { generateReport } from "./generateReport";
import { renderReportPdf } from "./renderPdf";

export async function generateAndSendReport(orderId: string) {
  const current = await updateOrder(orderId, { reportGenerationStatus: "generating", emailSentStatus: "pending" });
  if (!current) throw new Error("Order not found");

  try {
    const report = await generateReport(current.intake);
    const pdf = await renderReportPdf(report);
    await sendReportEmail({
      toEmail: current.intake.email,
      studentName: current.intake.studentName,
      major: current.intake.intendedMajor,
      pdfBytes: pdf,
    });
    await updateOrder(orderId, {
      reportGenerationStatus: "generated",
      emailSentStatus: "sent",
    });
  } catch (error) {
    await updateOrder(orderId, {
      reportGenerationStatus: "failed",
      emailSentStatus: "failed",
      errorMessage: error instanceof Error ? error.message : "Unknown report generation error",
    });
    throw error;
  }
}
