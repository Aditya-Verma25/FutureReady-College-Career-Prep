type SiteHeaderProps = {
  onBrandClick?: () => void;
  onServicesClick?: () => void;
  onAboutClick?: () => void;
  onTestimonialsClick?: () => void;
};

export default function SiteHeader({
  onBrandClick,
  onServicesClick,
  onAboutClick,
  onTestimonialsClick,
}: SiteHeaderProps) {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm">
        Free College & SAT Strategy Session — Leave with a personalized action plan for your student's next steps.
        <a
          href="#/personalized-feedback"
          className="ml-2 underline underline-offset-2 hover:text-blue-100"
        >
          Reserve Your Spot →
        </a>
      </div>

      <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button
            type="button"
            onClick={onBrandClick}
            className="flex items-center gap-3 rounded-xl text-left transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Go to FutureReady home page"
          >
            <div className="flex items-center justify-center">
              <img
                src="/logo.png"
                alt="FutureReady logo"
                className="h-16 w-16 object-contain"
              />
            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-950">
                FutureReady College & Career Prep
              </h1>

              <p className="text-xs font-medium text-slate-500">
                SAT Prep • College Apps • Tutoring
              </p>
            </div>
          </button>

          <div className="ml-auto flex items-center gap-8">
            <div className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
              <button
                type="button"
                onClick={onServicesClick}
                className="transition hover:text-blue-700"
              >
                Services
              </button>

              <button
                type="button"
                onClick={onAboutClick}
                className="transition hover:text-blue-700"
              >
                About & Results
              </button>

              <button
                type="button"
                onClick={onTestimonialsClick}
                className="transition hover:text-blue-700"
              >
                Testimonials
              </button>

              <a
                href="#/college-list-builder"
                className="transition hover:text-blue-700"
              >
                College List Builder
              </a>

              <a
                href="/blog/"
                className="transition hover:text-blue-700"
              >
                Blog
              </a>
            </div>

            <a
              href="#/personalized-feedback"
              onClick={() => {
                window.gtag?.("event", "generate_lead", {
                  source: "header_cta",
                });
              }}
              className="hidden sm:inline-flex rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-blue-800"
            >
              Consultation Interest Form
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}