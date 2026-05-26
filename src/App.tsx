export default function EdupreneurLandingPage() {
  const formspreeEndpoint = "https://formspree.io/f/xredoaqn";
  const services = [
    {
      title: "SAT Prep",
      icon: "📗",
      cardClass: "border-emerald-200 bg-emerald-50/60 text-emerald-700",
      description:
        "Custom SAT strategies, practice plans, and 1-on-1 tutoring to help students raise their score with confidence.",
      highlights: [
        "Math & Evidence-Based Reading",
        "Personalized study plans",
        "Practice and review sessions",
      ],
    },
    {
      title: "College Application Help",
      icon: "🎓",
      cardClass: "border-violet-200 bg-violet-50/60 text-violet-700",
      description:
        "Essay review, college list strategy, activity section feedback, and guidance from someone who recently went through the process.",
      highlights: [
        "Essay review & editing",
        "College list strategy",
        "Activity & resume review",
        "Interview prep",
      ],
    },
    {
      title: "Academic Tutoring",
      icon: "✏️",
      cardClass: "border-orange-200 bg-orange-50/60 text-orange-700",
      description:
        "Online or in-person support for math, computer science, and academic confidence-building.",
      highlights: [
        "Algebra through calculus",
        "Computer science tutoring",
        "Study skills & time management",
        "Online or in-person",
      ],
    },
  ];

  const colleges = [
    {
      name: "Purdue",
      shortName: "PU",
      logo: "https://www.google.com/s2/favicons?domain=purdue.edu&sz=128",
      color: "bg-yellow-100 text-yellow-900 border-yellow-200",
    },
    {
      name: "UIUC",
      shortName: "UIUC",
      logo: "https://www.google.com/s2/favicons?domain=illinois.edu&sz=128",
      color: "bg-orange-100 text-orange-900 border-orange-200",
    },
    {
      name: "University of Maryland",
      shortName: "UMD",
      logo: "https://www.google.com/s2/favicons?domain=umd.edu&sz=128",
      color: "bg-red-100 text-red-900 border-red-200",
    },
    {
      name: "UNC Chapel Hill",
      shortName: "UNC",
      logo: "https://www.google.com/s2/favicons?domain=unc.edu&sz=128",
      color: "bg-sky-100 text-sky-900 border-sky-200",
    },
    {
      name: "University of Washington",
      shortName: "UW",
      logo: "https://depts.washington.edu/compfin/web/wp-content/uploads/2015/09/cropped-UW-logo-512.png",
      color: "bg-purple-100 text-purple-900 border-purple-200",
    },
    {
      name: "UC Irvine",
      shortName: "UCI",
      logo: "https://www.google.com/s2/favicons?domain=uci.edu&sz=128",
      color: "bg-blue-100 text-blue-900 border-blue-200",
    }, 
    {
      name: "UC Davis",
      shortName: "UCD",
      logo: "https://www.google.com/s2/favicons?domain=ucdavis.edu&sz=128",
      color: "bg-blue-100 text-blue-900 border-blue-200",
    },
    {
      name: "Virginia Tech",
      shortName: "VT",
      logo: "https://www.google.com/s2/favicons?domain=vt.edu&sz=128",
      color: "bg-orange-100 text-orange-900 border-orange-200",
    },
    {
      name: "UMass Amherst",
      shortName: "UMass",
      logo: "https://www.google.com/s2/favicons?domain=umass.edu&sz=128",
      color: "bg-rose-100 text-rose-900 border-rose-200",
    },
    {
      name: "Penn State",
      shortName: "PSU",
      logo: "https://www.google.com/s2/favicons?domain=psu.edu&sz=128",
      color: "bg-blue-100 text-blue-900 border-blue-200",
    },
    {
      name: "UC Santa Barbara",
      shortName: "UCSB",
      logo: "https://www.google.com/s2/favicons?domain=ucsb.edu&sz=128",
      color: "bg-yellow-100 text-yellow-900 border-yellow-200",
    },
    {
      name: "UC Santa Cruz",
      shortName: "UCSC",
      logo: "https://www.google.com/s2/favicons?domain=ucsc.edu&sz=128",
      color: "bg-lime-100 text-lime-900 border-lime-200",
    },
    {
      name: "Ohio State",
      shortName: "OSU",
      logo: "https://www.google.com/s2/favicons?domain=osu.edu&sz=128",
      color: "bg-red-100 text-red-900 border-red-200",
    },
    {
      name: "Cal Poly SLO",
      shortName: "Cal Poly",
      logo: "https://www.google.com/s2/favicons?domain=calpoly.edu&sz=128",
      color: "bg-green-100 text-green-900 border-green-200",
    },
    {
      name: "San Diego State",
      shortName: "SDSU",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/San_Diego_State_Aztecs_logo.svg/960px-San_Diego_State_Aztecs_logo.svg.png?_=20170216201152",
      color: "bg-red-100 text-red-900 border-red-200",
    },
    {
      name: "University of Minnesota",
      shortName: "UMN",
      logo: "https://www.google.com/s2/favicons?domain=umn.edu&sz=128",
      color: "bg-yellow-100 text-yellow-900 border-yellow-200",
    },
  ];

  const heroLogoPositions = [
   "top-4 left-[49%] w-28 rotate-[-5deg]", // Purdue
    "top-14 left-[58%] w-24 rotate-[3deg]", // UCI
    "top-8 left-[68%] w-24 rotate-[-2deg]", // Maryland
    "top-10 right-[19%] w-28 rotate-[2deg]", // UNC
    "top-20 right-[10%] w-24 rotate-[-1deg]", // UIUC
    "top-38 right-[6%] w-20 rotate-[4deg]", // UW
    "bottom-18 left-[59%] w-16 rotate-[2deg]", // UCSB
    "top-64 right-[18%] w-18 rotate-[2deg]", // UCSC

     "bottom-10 left-[69%] w-16 rotate-[-1deg]", // Minnesota
    "bottom-14 right-[16%] w-16 rotate-[1deg]", // VT
    "bottom-8 right-[26%] w-16 rotate-[3deg]", // UMass
    "bottom-28 right-[8%] w-16 rotate-[-2deg]", // UC Davis
    "top-52 right-[11%] w-18 rotate-[-3deg]", // SDSU
    "bottom-28 left-[50%] w-16 rotate-[-3deg]", // PSU
    "top-[57%] left-[45%] w-16 rotate-[1deg]", // Cal Poly
    "top-[38%] left-[44%] w-16 rotate-[-2deg]", // OSU
  ];

  const heroLogoPriorityClasses = [
    "opacity-[0.52] scale-110", // Purdue
    "opacity-[0.5] scale-105", // UCI
    "opacity-[0.47] scale-105", // Maryland
    "opacity-[0.46] scale-105", // UNC
    "opacity-[0.35]", // UIUC
    "opacity-[0.32]", // UW
    "opacity-[0.3]", // UCSB
    "opacity-[0.28]", // UCSC
    "opacity-[0.26]", // UC Davis
    "opacity-[0.24]", // Minnesota
    "opacity-[0.22]", // VT
    "opacity-[0.2]", // UMass
    "opacity-[0.2]", // SDSU
    "opacity-[0.22]", // PSU
    "opacity-[0.24]", // Cal Poly
    "opacity-[0.34]", // OSU
  ];

  const achievements = [
    { value: "1500+", label: "SAT Score" },
    { value: "30+", label: "Students Mentored" },
    { value: "Published", label: "AI Researcher" },
    { value: "Founder", label: "EZ Math Tutoring" },
    { value: "$1M+", label: "Student Impact" },
    { value: "UMD CS", label: "Computer Science Student" },
  ];

  const trustPoints = [
    "Recently went through the U.S. college application process myself",
    "First-generation American perspective with parents who attended college abroad",
    "Relatable mentorship from someone close to the student experience today",
    "Clear guidance without needing to spend tens of thousands on private counseling",
  ];

  const testimonials = [
    "Aditya helped my son improve his SAT math score by identifying the exact mistakes holding him back.",
    "His essay feedback was honest, specific, and made my application sound much more like me.",
    "He explains concepts clearly and makes tutoring feel encouraging instead of intimidating.",
  ];

  return (
    <div className="min-h-screen bg-[#f7fbff] text-slate-900 font-sans">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/70 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
              <p className="text-xs text-slate-500 font-medium">
                SAT Prep • College Apps • Tutoring
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#services" className="hover:text-blue-700 transition">
              Services
            </a>
            <a href="#about" className="hover:text-blue-700 transition">
              About
            </a>
            <a href="#results" className="hover:text-blue-700 transition">
              Results
            </a>
            <a href="#testimonials" className="hover:text-blue-700 transition">
              Testimonials
            </a>
          </div>

          <a
            href="https://calendly.com/futurereadycollegeprep/free-15-min-consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-800 transition"
          >
            Book a Free Consultation
          </a>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-white">
        <div className="absolute inset-0 pointer-events-none select-none hidden md:block">
          {colleges.map((college, index) => (
            <div
              key={college.name}
              className={`absolute ${heroLogoPositions[index]} ${heroLogoPriorityClasses[index]}`}
              aria-label={college.name}
            >
              <div className={`h-24 w-24 rounded-3xl border ${college.color} shadow-sm flex items-center justify-center overflow-hidden bg-white/80 backdrop-blur-sm`}>
                <img
                  src={college.logo}
                  alt=""
                  className="h-14 w-14 object-contain opacity-80"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm mb-7">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Summer sessions now open
            </div>

            <h2 className="text-5xl md:text-7xl font-black leading-[0.98] tracking-tight text-slate-950">
              Your Journey.
              <span className="block">My Guidance.</span>
              <span className="block text-blue-700">Your Future.</span>
            </h2>

            <div className="mt-4 h-3 w-72 rounded-full bg-blue-200 rotate-[-1deg]" />

            <p className="mt-8 text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
              Personalized SAT prep, college application help, and academic tutoring from a UMD CS student who has been through the same process — and knows how stressful it can feel.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="https://calendly.com/futurereadycollegeprep/free-15-min-consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-blue-700 px-7 py-4 text-white font-bold shadow-lg shadow-blue-700/20 hover:bg-blue-800 transition"
              >
                Book a Free Consultation →
              </a>
              <a
                href="#services"
                className="rounded-xl bg-white px-7 py-4 text-slate-800 font-bold border border-slate-200 shadow-sm hover:border-blue-300 transition"
              >
                Explore Services
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <span className="text-blue-700">★</span> 1500+ SAT Scorer
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-700">♡</span> Background in Mentoring & Tutoring
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-700">✦</span> Published Researcher
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-700">♟</span> UMD CS Student
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-blue-200/50 blur-3xl rounded-full" />
            <div className="relative rounded-[2rem] bg-white border border-slate-200 shadow-2xl overflow-hidden">
              <div className="h-80 bg-gradient-to-br from-blue-100 via-white to-orange-50 p-8 flex flex-col justify-between">
                <div className="rounded-2xl bg-yellow-100 border border-yellow-200 shadow-sm w-56 p-5 rotate-[-2deg] ml-8">
                  <p className="text-slate-800 leading-relaxed">
                    It’s not just about getting in. It’s about discovering what’s next.
                  </p>
                  <div className="text-right text-xl mt-2">♡</div>
                </div>

                <div className="bg-white/85 backdrop-blur rounded-3xl border border-slate-200 shadow-lg p-6 max-w-md ml-auto">
                  <p className="text-sm font-bold text-blue-700 mb-2">
                    Mentorship feels different when it’s personal.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    I help students turn confusing goals into a clear plan — whether that means SAT improvement, stronger essays, or better grades.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="px-6 py-16">
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-white border border-slate-200 shadow-xl p-6 md:p-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-slate-950">
              Ways I Can Help You
            </h2>
            <p className="mt-4 text-slate-600 text-lg">
              Clear, practical support for the parts of high school that feel the most overwhelming.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className={`rounded-3xl border p-8 shadow-sm hover:shadow-lg transition ${service.cardClass}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black mb-4">{service.title}</h3>
                <p className="text-slate-700 leading-relaxed mb-7">
                  {service.description}
                </p>
                <div className="space-y-3 mb-8">
                  {service.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-start gap-3 text-sm font-medium text-slate-700"
                    >
                      <span className="text-blue-700">✓</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
                <a href="#contact" className="font-bold hover:underline">
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="px-6 pb-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 rounded-[2rem] bg-white border border-slate-200 shadow-sm p-8">
            <h2 className="text-2xl font-black text-slate-950 mb-6">
              A Little About Me
            </h2>
            <div className="flex items-start gap-5 mb-6">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-100 to-green-100 border border-slate-200 flex items-center justify-center text-4xl shadow-inner">
                👋
              </div>
              <div className="text-sm text-slate-600 leading-relaxed">
                <p>
                  Hi, I’m Aditya. I’m a Computer Science student at the University of Maryland, and I’ve always cared about helping students feel less alone in academics.
                </p>
              </div>
            </div>

            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                During COVID, I founded EZ Math Tutoring to support local students when school went online. Since then, I’ve mentored students through academics, SAT prep, and the college admissions process.
              </p>
              <p>
                As a first-generation American college student, I understand how confusing this process can feel when your family hasn’t navigated the U.S. admissions system before. My parents attended college abroad, so much of this journey was something I had to figure out myself.
              </p>
              <p>
                That’s a big reason why I started this mentorship platform. Students and families shouldn’t feel pressured to spend tens of thousands of dollars on large counseling companies just to get clear, honest guidance.
              </p>
              <p>
                I also think mentorship feels more relatable when it comes from someone who recently went through the process themselves — not someone who hasn’t applied to college in decades. I understand the current SAT, Common App, extracurricular expectations, and the stress students experience today.
              </p>
              <p>
                My goal is to make the process feel less overwhelming, more personal, and a lot more achievable.
              </p>
              <p className="pt-4 text-blue-700 font-semibold italic">
                Let’s build your future, together. — Aditya
              </p>
            </div>
          </div>

          <div id="results" className="lg:col-span-3 rounded-[2rem] bg-white border border-slate-200 shadow-sm p-8">
            <h2 className="text-2xl font-black text-slate-950 mb-6">
              My Results & Achievements
            </h2>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {achievements.map((item) => (
                <div
                  key={`${item.value}-${item.label}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                    ✦
                  </div>
                  <div className="text-2xl font-black text-blue-700">
                    {item.value}
                  </div>
                  <div className="mt-1 text-sm font-medium text-slate-600">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl bg-blue-50 border border-blue-100 p-6">
              <h3 className="font-black text-slate-950 mb-4">
                Accepted Colleges
              </h3>
              <div className="flex flex-wrap gap-2">
                {colleges.map((college) => (
                  <span
                  key={college.name}
                  className="inline-flex items-center gap-2 rounded-full bg-white border border-blue-100 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm"
                >
                  <span className="relative h-7 w-7 rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <img
                      src={college.logo}
                      alt=""
                      className="h-5 w-5 object-contain"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </span>

                  {college.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-white border border-slate-200 shadow-sm p-8 md:p-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-wider text-blue-700 mb-3">
                Why this feels different
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-slate-950 leading-tight">
                Guidance from someone who actually remembers what this process feels like.
              </h2>
              <p className="mt-5 text-slate-600 text-lg leading-relaxed">
                This is not a giant counseling package or a generic tutoring center. It is practical, student-first mentorship built around clarity, confidence, and realistic next steps.
              </p>
            </div>

            <div className="grid gap-4">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
                    ✓
                  </div>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="px-6 pb-16">
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-white border border-slate-200 shadow-sm p-8 md:p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-950">
              What Students & Parents Say
            </h2>
            <p className="mt-3 text-slate-600">
              Real testimonials can go here once you collect them.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((quote, index) => (
              <div
                key={quote}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <div className="text-yellow-500 mb-4">★★★★★</div>
                <p className="text-slate-700 leading-relaxed">“{quote}”</p>
                <p className="mt-5 text-sm font-bold text-slate-500">
                  — Placeholder testimonial {index + 1}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 pb-20">
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-gradient-to-r from-blue-700 to-blue-600 text-white p-8 md:p-12 shadow-xl grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-black">
              Ready to get started?
            </h2>
            <p className="mt-3 text-blue-100 text-lg">
              Let’s make your goals feel realistic, organized, and achievable.
            </p>
            <a
              href="https://calendly.com/futurereadycollegeprep/free-15-min-consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-xl border border-white/30 px-7 py-4 text-white font-black hover:bg-white/10 transition"
            >
              Book Consultation →
            </a>
          </div>
          <form
            action={formspreeEndpoint}
            method="POST"
            className="rounded-2xl bg-white/95 p-5 md:p-6 text-slate-900 shadow-lg space-y-4"
          >
            <input type="hidden" name="_subject" value="New consultation request" />
            <input
              type="hidden"
              name="_next"
              value="https://futurereadycollegeprep.com/thank-you"
            />
            <div>
              <label htmlFor="contact-name" className="block text-sm font-bold mb-1">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-bold mb-1">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-bold mb-1">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell me what you want help with."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-800 transition"
            >
              Send Message
            </button>
            <p className="text-xs text-slate-500">
              Replace <code>your-form-id</code> in <code>formspreeEndpoint</code> with your live Formspree form ID.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}

