type SiteFooterProps = {
  consultationUrl: string;
  onConsultationClick?: () => void;
};

export default function SiteFooter({ consultationUrl, onConsultationClick }: SiteFooterProps) {
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
        </section>

        <section>
          <h4 className="text-sm font-black uppercase tracking-[0.12em] text-slate-800">Quick Links</h4>
          <nav className="mt-4 space-y-2 text-sm">
            <a href="#" className="block text-slate-600 transition hover:text-blue-700">Home</a>
            <a href="#services" className="block text-slate-600 transition hover:text-blue-700">Services</a>
            <a href="#/college-list-builder" className="block text-slate-600 transition hover:text-blue-700">College List Builder</a>
            <a href="#about" className="block text-slate-600 transition hover:text-blue-700">About</a>
            <a href="#testimonials" className="block text-slate-600 transition hover:text-blue-700">Testimonials</a>
            <a href={consultationUrl} target="_blank" rel="noopener noreferrer" onClick={onConsultationClick} className="block text-slate-600 transition hover:text-blue-700">
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
          <h4 className="text-lg font-black text-slate-900">Ready to get started?</h4>
          <p className="mt-2 text-sm text-slate-600">Free summer consultation calls available.</p>
          <a
            href={consultationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onConsultationClick}
            className="mt-4 inline-flex rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-blue-800"
          >
            Book a Free Consultation
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
