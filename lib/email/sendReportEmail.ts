type SendReportEmailInput = {
  toEmail: string;
  studentName: string;
  major: string;
  pdfBytes: Uint8Array;
};

export async function sendReportEmail(input: SendReportEmailInput): Promise<void> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.REPORT_FROM_EMAIL || "FutureReady <no-reply@futurereadyprep.org>";
  const filename = `FutureReady-${input.major.replace(/[^a-z0-9]/gi, "-")}-Report.pdf`;

  if (!resendApiKey) {
    // TODO: Configure RESEND_API_KEY and REPORT_FROM_EMAIL for production email delivery.
    console.log("Email provider not configured. Skipping send.", { to: input.toEmail, filename });
    return;
  }

  const attachmentBase64 = Buffer.from(input.pdfBytes).toString("base64");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [input.toEmail],
      subject: "Your FutureReady Major Report is Ready",
      html: `<p>Hi ${input.studentName},</p>
             <p>Attached is your personalized FutureReady Report for ${input.major}.</p>
             <p>This report is designed to help you compare career paths, costs, risks, and next steps using data-informed guidance.</p>`,
      attachments: [{ filename, content: attachmentBase64 }],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Email send failed: ${text}`);
  }
}
