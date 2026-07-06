import { useState } from "react";
import type { FormEvent } from "react";

const formspreeEndpoint = "https://formspree.io/f/xredoaqn";

export default function PersonalizedFeedback() {
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Submission failed");

      window.gtag?.("event", "generate_lead", {
        source: "personalized_feedback_form",
      });

      form.reset();
      setSubmitted(true);
    } catch {
      setStatus("error");
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-6 py-20">
        <section className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-slate-900">
            Thanks — I got your submission!
          </h1>
          <p className="mt-4 text-slate-600">
            I’ll personally review your student's profile and reach out to you soon with details to schedule our consultation.
          </p>
          <a
            href="/"
            className="mt-8 inline-block rounded-full bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            Back to Home
          </a>
        </section>
      </main>
    );
  }

  return (
    <>

    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-6 py-16">
      <section className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">
            FutureReady College & Career Prep
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Consultation Interest Form
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Submit this interest form to share a few details about your student's goals and academics. Once received, I will personally review your profile and reach out to you with details to schedule a consultation.
          </p>
        </div>

        <div className="rounded-3xl border border-blue-100 bg-white/90 p-6 shadow-xl backdrop-blur md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="hidden"
              name="_subject"
              value="New Consultation Interest Form Submission"
            />

            <div>
              <label
                htmlFor="studentName"
                className="mb-2 block font-medium text-slate-800"
              >
                Student Name
              </label>
              <input
                id="studentName"
                name="studentName"
                required
                type="text"
                placeholder="Student's first name"
                className="w-full rounded-xl border border-slate-300 bg-blue-50/40 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label
                htmlFor="parentEmail"
                className="mb-2 block font-medium text-slate-800"
              >
                Parent Email
              </label>
              <input
                id="parentEmail"
                name="parentEmail"
                required
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-300 bg-blue-50/40 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label
                htmlFor="grade"
                className="mb-2 block font-medium text-slate-800"
              >
                Current Grade
              </label>
              <select
                id="grade"
                name="grade"
                required
                className="w-full rounded-xl border border-slate-300 bg-blue-50/40 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
              >
                <option value="">Select grade</option>
                <option>8th Grade</option>
                <option>9th Grade</option>
                <option>10th Grade</option>
                <option>11th Grade</option>
                <option>12th Grade</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="gpaRange"
                className="mb-2 block font-medium text-slate-800"
              >
                GPA Range
              </label>
              <select
                id="gpaRange"
                name="gpaRange"
                required
                className="w-full rounded-xl border border-slate-300 bg-blue-50/40 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
              >
                <option value="">Select range</option>
                <option>3.8 – 4.0+</option>
                <option>3.5 – 3.79</option>
                <option>3.0 – 3.49</option>
                <option>Below 3.0</option>
                <option>Not sure yet</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="testScore"
                className="mb-2 block font-medium text-slate-800"
              >
                SAT/ACT Score, if available
              </label>
              <input
                id="testScore"
                name="testScore"
                type="text"
                placeholder="Example: 1450 SAT, 32 ACT, or not taken yet"
                className="w-full rounded-xl border border-slate-300 bg-blue-50/40 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label
                htmlFor="majorInterest"
                className="mb-2 block font-medium text-slate-800"
              >
                Intended Major or Interests
              </label>
              <input
                id="majorInterest"
                name="majorInterest"
                required
                type="text"
                placeholder="Business, CS, Pre-Med, Engineering, Undecided..."
                className="w-full rounded-xl border border-slate-300 bg-blue-50/40 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label
                htmlFor="targetSchools"
                className="mb-2 block font-medium text-slate-800"
              >
                Schools You’re Considering
              </label>
              <input
                id="targetSchools"
                name="targetSchools"
                type="text"
                placeholder="Example: UW, Purdue, UMD, UC Irvine, not sure yet"
                className="w-full rounded-xl border border-slate-300 bg-blue-50/40 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label
                htmlFor="supportNeeded"
                className="mb-2 block font-medium text-slate-800"
              >
                What kind of help are you looking for?
              </label>
              <select
                id="supportNeeded"
                name="supportNeeded"
                required
                className="w-full rounded-xl border border-slate-300 bg-blue-50/40 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
              >
                <option value="">Select one</option>
                <option>Building a balanced college list</option>
                <option>SAT/ACT prep strategy</option>
                <option>Essay or application guidance</option>
                <option>General college planning</option>
                <option>Academic tutoring</option>
                <option>Not sure yet</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="biggestConcern"
                className="mb-2 block font-medium text-slate-800"
              >
                Biggest Question or Concern Right Now
              </label>
              <textarea
                id="biggestConcern"
                name="biggestConcern"
                required
                rows={5}
                placeholder="Example: We don’t know which schools are realistic, how to improve chances, whether SAT matters, or where to start..."
                className="w-full rounded-xl border border-slate-300 bg-blue-50/40 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-blue-700 px-6 py-4 text-lg font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "sending"
                ? "Submitting..."
                : "Submit Interest Form"}
            </button>

            {status === "error" && (
              <p className="text-sm font-medium text-red-600">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>

        <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-100/70 p-6">
          <h2 className="text-xl font-bold text-slate-900">
            What happens next?
          </h2>

          <div className="mt-4 space-y-3 text-slate-700">
            <p>1. I personally review your student’s profile and goals.</p>
            <p>
              2. I reach out to you with initial feedback and details to schedule a consultation.
            </p>
            <p>
              3. During our consultation, we will map out a customized plan for SAT prep, college essays, tutoring, or application support.
            </p>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            No pressure — this is meant to give families a clearer starting
            point before committing to anything.
          </p>
        </div>
      </section>
    </main>

    </>
  );
}