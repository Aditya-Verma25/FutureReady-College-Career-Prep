type SiteFooterProps = {
  consultationUrl: string;
  onConsultationClick?: () => void;
  onPersonalizedFeedbackClick?: () => void;
  linkedInUrl?: string;
  facebookUrl?: string;
};

export default function SiteFooter({
  consultationUrl,
  onConsultationClick,
  onPersonalizedFeedbackClick,
  linkedInUrl,
  facebookUrl,
}: SiteFooterProps) {
  return (
    <footer className="bg-blue-200 shadow-[0_-10px_30px_rgba(37,99,235,0.10)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-2 lg:grid-cols-4">
        <section>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="FutureReady logo" className="h-9 w-9 object-contain" />
            <h3 className="text-base font-black text-slate-900">FutureReady College & Career Prep</h3>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Personalized SAT prep, college application guidance, and academic tutoring from a current college student mentor.
          </p>

          {(linkedInUrl || facebookUrl) && (
            <div className="mt-5 flex flex-wrap gap-3 items-center">
              {linkedInUrl && (
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0077b5] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#006097] focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>Follow on LinkedIn</span>
                </a>
              )}

              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1877f2] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#166fe5] focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                  </svg>
                  <span>Follow on Facebook</span>
                </a>
              )}
            </div>
          )}
        </section>

        <section>
          <h4 className="text-sm font-black uppercase tracking-[0.12em] text-slate-800">Quick Links</h4>

          <nav className="mt-4 space-y-2 text-sm">
            <a href="/" className="block text-slate-600 transition hover:text-blue-700">Home</a>
            <a href="/personalized-feedback" onClick={onPersonalizedFeedbackClick} className="block text-slate-600 transition hover:text-blue-700">
              Get Personalized Feedback
            </a>
            <a href="#services" className="block text-slate-600 transition hover:text-blue-700">Services</a>
            <a href="#/college-list-builder" className="block text-slate-600 transition hover:text-blue-700">College List Builder</a>
            <a href="#about" className="block text-slate-600 transition hover:text-blue-700">About</a>
            <a href="#testimonials" className="block text-slate-600 transition hover:text-blue-700">Testimonials</a>
            <a
              href={consultationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onConsultationClick}
              className="block text-slate-600 transition hover:text-blue-700"
            >
              Book a Free Consultation
            </a>
          </nav>
        </section>

        <section>
          <h4 className="text-sm font-black uppercase tracking-[0.12em] text-slate-800">Services</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>SAT Prep</li>
            <li>College Applications</li>
            <li>Essay Guidance</li>
            <li>Academic Tutoring</li>
          </ul>
        </section>

        <section>
          <h4 className="text-lg font-black text-slate-900">Want personalized guidance?</h4>
          <p className="mt-2 text-sm text-slate-600">
            Share your student’s profile and I’ll personally review it.
          </p>

          <a
            href="#/personalized-feedback"
            onClick={onPersonalizedFeedbackClick}
            className="mt-4 inline-flex rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-blue-800"
          >
            Get Personalized Feedback
          </a>

          <a
            href={consultationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onConsultationClick}
            className="mt-3 block text-sm font-medium text-blue-800 hover:underline"
          >
            Prefer to talk? Book a free call.
          </a>
        </section>
      </div>

      <div className="border-t border-slate-200 px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 FutureReady College & Career Prep. All rights reserved.</p>
          <p>FutureReady does not guarantee admissions results, test score increases, or scholarship outcomes.</p>
        </div>
      </div>
    </footer>
  );
}