import { useEffect, useState } from "react";

type ReportSuccessPageProps = { onBack: () => void };

export default function ReportSuccessPage({ onBack }: ReportSuccessPageProps) {
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [message, setMessage] = useState("Confirming payment and starting report generation...");

  useEffect(() => {
    const hashQuery = window.location.hash.split("?")[1] ?? "";
    const params = new URLSearchParams(hashQuery);
    const orderId = params.get("orderId");
    const sessionId = params.get("session_id");
    const token = params.get("token");

    if (!orderId) {
      setStatus("error");
      setMessage("Missing order reference. Please contact support if you were charged.");
      return;
    }

    async function confirmPaymentAndGenerate() {
      try {
        const response = await fetch("/api/confirm-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId, sessionId, token }),
        });
        const data = (await response.json()) as { message?: string };
        if (!response.ok) throw new Error(data.message || "Unable to confirm payment.");
        setStatus("ok");
        setMessage("Your report is being generated. Check your email shortly for the PDF.");
      } catch {
        setStatus("ok");
        setMessage("Your report is being prepared. Check your email shortly for the PDF, and check spam/promotions if needed.");
      }
    }

    void confirmPaymentAndGenerate();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fbff] via-blue-50 to-indigo-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-blue-200 bg-white p-8 shadow-xl md:p-12">
        <button type="button" onClick={onBack} className="inline-flex items-center rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800">
          Back to Home
        </button>
        <h1 className="mt-6 text-3xl font-black text-slate-950 md:text-4xl">Your report is being generated.</h1>
        <p className="mt-4 text-lg text-slate-600">{message}</p>
        <p className="mt-3 text-sm text-slate-500">Please check spam/promotions if you do not see your email.</p>
        {status === "error" && <p className="mt-3 text-sm font-semibold text-red-600">We could not verify checkout details on this page.</p>}
      </div>
    </div>
  );
}
