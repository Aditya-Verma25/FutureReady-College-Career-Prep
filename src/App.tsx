import { useEffect, useState, useRef, type FormEvent, type ReactNode } from "react";
import ReactGA from "react-ga4";
import { trackConsultationClick, trackContactSubmit } from "./lib/analytics";
import SatPage from "./SatPage";
import CollegeAppsPage from "./CollegeAppsPage";
import TutoringPage from "./TutoringPage";
import BlogsHubPage from "./BlogsHubPage";
import PersonalizedFeedback from "./PersonalizedFeedback";
import CollegeAdmissionsArticlePage from "./CollegeAdmissionsArticlePage";
import CollegeListBuilderPage from "./CollegeListBuilderPage";
import FutureReadyReportPage from "./FutureReadyReportPage";
import ReportSuccessPage from "./ReportSuccessPage";
import type { BlogPost } from "./BlogsHubPage";
import EarlyBirdPopup from "./EarlyBirdPopup";
import SiteFooter from "./SiteFooter";

const whyDifferentCards = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Recent & Relatable",
    description: "I went through the U.S. college process recently. I understand today's pressures because I just lived them.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: "First-Gen Insight",
    description: "With parents who attended college abroad, I navigated the U.S. system from scratch. I know how to translate it for families.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Practical & Fair",
    description: "No massive multi-thousand dollar packages or corporate fluff. Just high-impact, student-first mentorship.",
  },
];

const testimonials = [
  {
    quote: "I stopped procrastinating on applications because I actually had structure each week. Aditya helped me break down the essays so I didn't feel overwhelmed.",
    author: "Siddharth S.",
    role: "Student",
  },
  {
    quote: "Honestly, having someone close to his age explain physics made a huge difference. My son actually listened to Aditya's advice and ended up with an A.",
    author: "Sarah L.",
    role: "Parent",
  },
  {
    quote: "I raised my SAT score from a 1390 to a 1480. Aditya's study schedule was the first one I actually stuck to because it wasn't just pages of dry homework.",
    author: "Ryan K.",
    role: "Student",
  },
  {
    quote: "We were so stressed about college essays, but Aditya helped my daughter figure out what she actually wanted to write about, keeping her voice completely real.",
    author: "Michelle T.",
    role: "Parent",
  },
  {
    quote: "The weekly check-ins made sure I didn't leave my prep to the last minute. It felt more like a study partner who knew exactly what they were doing.",
    author: "Jane P.",
    role: "Student",
  },
];

export default function EdupreneurLandingPage() {
  const consultationUrl =
    "https://calendly.com/futurereadycollegeprep/free-15-min-consultation";
  const messageUrl = 
    "https://m.me/FutureReadyPrep";
  const linkedInUrl = "https://www.linkedin.com/company/futurereadyprep";
  const facebookUrl = "https://www.facebook.com/profile.php?id=61590099885144";
  const popupDismissKey = "frp_early_bird_popup_dismissed_at";
  const popupDismissCooldownMs = 24 * 60 * 60 * 1000;
  const formspreeEndpoint = "https://formspree.io/f/xredoaqn";
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [hashPath, setHashPath] = useState(window.location.hash);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [showEarlyBirdPopup, setShowEarlyBirdPopup] = useState(false);
  const [pendingSectionScroll, setPendingSectionScroll] = useState<"services" | "about" | "testimonials" | null>(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMentorExpanded, setIsMentorExpanded] = useState(false);
  const [isResultsExpanded, setIsResultsExpanded] = useState(false);
  const [isContactFormExpanded, setIsContactFormExpanded] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const servicesScrollRef = useRef<HTMLDivElement>(null);
  const whyDifferentScrollRef = useRef<HTMLDivElement>(null);

  const [servicesScrollState, setServicesScrollState] = useState({ canScrollLeft: false, canScrollRight: true });
  const [whyDifferentScrollState, setWhyDifferentScrollState] = useState({ canScrollLeft: false, canScrollRight: true });

  const checkScrollBounds = (ref: React.RefObject<HTMLDivElement | null>, setScrollState: React.Dispatch<React.SetStateAction<{ canScrollLeft: boolean; canScrollRight: boolean }>>) => {
    if (!ref.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;
    setScrollState({
      canScrollLeft: scrollLeft > 20,
      canScrollRight: scrollWidth - (scrollLeft + clientWidth) > 50,
    });
  };

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (!ref.current) return;
    const container = ref.current;
    const firstChild = container.firstElementChild as HTMLElement;
    if (!firstChild) return;
    
    const cardWidth = firstChild.offsetWidth;
    const computedGap = parseFloat(window.getComputedStyle(container).gap) || 24;
    const scrollAmount = cardWidth + computedGap;
    
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const nextSlide = () => {
    const itemsPerView = window.innerWidth >= 768 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    const maxIndex = testimonials.length - itemsPerView;
    setCurrentTestimonialIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentTestimonialIndex((prev) => Math.max(prev - 1, 0));
  };

  const scrollToSection = (sectionId: string, initialBehavior: ScrollBehavior = "smooth") => {
    let lastAbsoluteTop = -1;

    const performScroll = (behavior: ScrollBehavior) => {
      const target = document.getElementById(sectionId);
      if (!target) return;
      
      const headerOffset = window.innerWidth >= 768 ? 105 : 69;
      const elementPosition = target.getBoundingClientRect().top;
      const absoluteTop = elementPosition + window.scrollY;

      if (Math.abs(absoluteTop - lastAbsoluteTop) > 1) {
        lastAbsoluteTop = absoluteTop;
        window.scrollTo({
          top: absoluteTop - headerOffset,
          behavior
        });
      }
    };

    // Run initial scroll
    performScroll(initialBehavior);
    
    // Check and adjust as layout settles
    const intervals = [100, 250, 500, 800, 1200];
    intervals.forEach((delay) => {
      setTimeout(() => performScroll("smooth"), delay);
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      const itemsPerView = window.innerWidth >= 768 ? 3 : window.innerWidth >= 640 ? 2 : 1;
      const maxIndex = testimonials.length - itemsPerView;
      setCurrentTestimonialIndex((prev) => Math.min(prev, maxIndex));

      // Update native scroll bounds on resize
      checkScrollBounds(servicesScrollRef, setServicesScrollState);
      checkScrollBounds(whyDifferentScrollRef, setWhyDifferentScrollState);
    };
    window.addEventListener("resize", handleResize);
    // Initial check on mount after short timeout to allow rendering
    const timer = setTimeout(handleResize, 100);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    ReactGA.initialize("G-2STM34BZQ2");
    ReactGA.send("pageview");
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const nextHash = window.location.hash;
      setHashPath(nextHash);
      if (!nextHash || nextHash === "#" || nextHash.startsWith("#/")) {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const sectionHashes = new Set(["#services", "#about", "#testimonials"]);
    if (!sectionHashes.has(hashPath)) return;

    const sectionId = hashPath.slice(1);
    scrollToSection(sectionId, "smooth");
  }, [hashPath]);

  useEffect(() => {
    if (!pendingSectionScroll) return;
    if (hashPath && hashPath.startsWith("#/")) return;

    scrollToSection(pendingSectionScroll, "auto");
    setPendingSectionScroll(null);
  }, [hashPath, pendingSectionScroll]);

  useEffect(() => {
    async function loadBlogPosts() {
      try {
        const response = await fetch("/blog-posts.json");
        if (!response.ok) return;
        const posts = (await response.json()) as BlogPost[];
        setBlogPosts(posts);
      } catch {
        setBlogPosts([]);
      }
    }

    loadBlogPosts();
  }, []);

  useEffect(() => {
    const dismissedAt = localStorage.getItem(popupDismissKey);
    if (dismissedAt) {
      const lastDismissed = Number(dismissedAt);
      if (!Number.isNaN(lastDismissed) && Date.now() - lastDismissed < popupDismissCooldownMs) {
        return;
      }
    }

    const isHomepage = !hashPath || hashPath === "#" || hashPath === "#/";
    const isServicePage = hashPath === "#/sat" || hashPath === "#/college-apps" || hashPath === "#/tutoring";
    const isBlogOrToolPage = hashPath === "#/blogs" || hashPath.startsWith("#/blogs/") || hashPath === "#/college-list-builder" || hashPath === "#/report" || hashPath.startsWith("#/report-success") || hashPath === "#/personalized-feedback";

    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

    let timeThresholdMs = 30000;
    let scrollThresholdPercent = 50;
    let useExitIntent = false;
    let useScrollTrigger = false;

    if (isHomepage) {
      timeThresholdMs = isMobile ? 75000 : 60000; // 75s on mobile, 60s on desktop
      scrollThresholdPercent = isMobile ? 60 : 50; // 60% scroll on mobile, 50% on desktop
      useScrollTrigger = true;
    } else if (isServicePage) {
      timeThresholdMs = isMobile ? 90000 : 75000; // 90s on mobile, 75s on desktop
      useScrollTrigger = false;
    } else if (isBlogOrToolPage) {
      timeThresholdMs = isMobile ? 120000 : 90000; // 120s on mobile, 90s on desktop
      useExitIntent = !isMobile; // No exit intent on mobile
      useScrollTrigger = false;
    }

    let timerId: number | undefined;
    let hasTriggered = false;

    const triggerPopup = () => {
      if (hasTriggered) return;
      hasTriggered = true;
      setShowEarlyBirdPopup(true);
      cleanup();
    };

    timerId = window.setTimeout(() => {
      triggerPopup();
    }, timeThresholdMs);

    const handleScroll = () => {
      if (hasTriggered) return;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight <= 0) return;
      const scrollPercent = (scrollTop / scrollHeight) * 100;

      if (scrollPercent >= scrollThresholdPercent) {
        triggerPopup();
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (hasTriggered) return;
      if (e.clientY < 20) {
        triggerPopup();
      }
    };

    if (useScrollTrigger) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    if (useExitIntent) {
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    const cleanup = () => {
      if (timerId) window.clearTimeout(timerId);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };

    return cleanup;
  }, [hashPath]);

  useEffect(() => {
    if (!showEarlyBirdPopup) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleDismissEarlyBirdPopup();
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [showEarlyBirdPopup]);

  function trackCalendlyClick() {
    // fallback: record a generic consultation click from an unspecified location
    trackConsultationClick("site");
  }

  function handleBrandClick() {
    if (!window.location.hash || window.location.hash === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = "";
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function handleNavSectionClick(sectionId: "services" | "about" | "testimonials") {
    const isSubpage = !!window.location.hash && window.location.hash.startsWith("#/");
    if (!isSubpage) {
      scrollToSection(sectionId, "smooth");
      return;
    }

    setPendingSectionScroll(sectionId);
    window.location.hash = "";
  }

  function handleDismissEarlyBirdPopup() {
    localStorage.setItem(popupDismissKey, String(Date.now()));
    setShowEarlyBirdPopup(false);
  }

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus("sending");
    // track contact form submit after a successful submission

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Submission failed");

      form.reset();
      setFormStatus("success");
      trackContactSubmit("contact_section");
    } catch {
      setFormStatus("error");
    }
  }
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
      color: "bg-slate-100 text-slate-900 border-slate-200",
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
      logo: "data:image/png;base64,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",
      color: "bg-white text-slate-900 border-slate-200",
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
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/University_of_Minnesota_Logo.svg",
      color: "bg-slate-100 text-slate-900 border-slate-200",
    },
  ];

  const heroLogoPositionsByShortName: Record<string, string> = {
    PU: "top-[6%] left-[51%] w-24 rotate-[-6deg]",
    UIUC: "top-[11%] left-[60%] w-24 rotate-[4deg]",
    UMD: "top-[8%] right-[25%] w-24 rotate-[-3deg]",
    UNC: "top-[12%] right-[15%] w-24 rotate-[3deg]",
    UW: "top-[20%] right-[8%] w-20 rotate-[-2deg]",
    UCI: "top-[31%] right-[5%] w-20 rotate-[5deg]",
    VT: "top-[21%] left-[45%] w-16 rotate-[1deg]",
    OSU: "top-[57%] right-[6%] w-16 rotate-[-3deg]",
    UMass: "bottom-[15%] right-[9%] w-16 rotate-[2deg]",
    PSU: "bottom-[17%] right-[16%] w-16 rotate-[-4deg]",
    UMN: "bottom-[8%] right-[24%] w-16 rotate-[1deg]",
    UCSB: "bottom-[5%] right-[35%] w-16 rotate-[3deg]",
    UCSC: "bottom-[15%] left-[66%] w-16 rotate-[1deg]",
    UCD: "top-[45%] left-[46%] w-16 rotate-[-4deg]",
    "Cal Poly": "top-[62%] left-[46%] w-16 rotate-[2deg]",
    SDSU: "bottom-[18%] left-[55%] w-16 rotate-[-1deg]",
  };

  const heroLogoPriorityByShortName: Record<string, string> = {
    PU: "opacity-[0.32]",
    UIUC: "opacity-[0.32]",
    UMD: "opacity-[0.32]",
    UNC: "opacity-[0.32]",
    UW: "opacity-[0.32]",
    UCI: "opacity-[0.32]",
    UCD: "opacity-[0.32]",
    VT: "opacity-[0.32]",
    UMass: "opacity-[0.32]",
    PSU: "opacity-[0.32]",
    UCSB: "opacity-[0.32]",
    UCSC: "opacity-[0.32]",
    OSU: "opacity-[0.32]",
    "Cal Poly": "opacity-[0.32]",
    SDSU: "opacity-[0.32]",
    UMN: "opacity-[0.32]",
  };

  const achievements = [
    { value: "1500+", label: "SAT Score" },
    { value: "30+", label: "Students Mentored" },
    { value: "IB Diploma", label: "Graduate" },
    { value: "$200K+", label: "College Merit Scholarships Earned" },
    { value: "National Merit", label: "Commended Scholar" },
    { value: "University of Maryland CS", label: "Top 20 CS School" },
  ];

  const FloatingMessageButton = () => (
  <a
    href={messageUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-[60] inline-flex items-center gap-1.5 rounded-full bg-blue-700 px-3.5 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-xl shadow-blue-900/20 transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
    aria-label="Message me with a question"
  >
    <span className="text-xs sm:text-base leading-none">💬</span>
    <span>
      <span className="hidden sm:inline">Questions? </span>Chat with Me
    </span>
  </a>
);
  const renderNavbar = () => {
    return (
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/70 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBrandClick}
            className="flex items-center gap-2 sm:gap-3 rounded-xl text-left transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Go to FutureReady home page"
          >
            <div className="flex items-center justify-center shrink-0">
              <img
                src="/logo.png"
                alt="FutureReady logo"
                className="h-11 w-11 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain"
              />
            </div>
            <div>
              <h1 className="text-sm sm:text-base md:text-xl font-black tracking-tight text-slate-950 leading-tight">
                FutureReady College & Career Prep
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium">
                SAT Prep • College Apps • Tutoring
              </p>
            </div>
          </button>

          <div className="flex items-center gap-3 sm:gap-5 ml-auto">
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
              <div
                className="relative"
                onMouseLeave={() => setIsServicesDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                  onMouseEnter={() => setIsServicesDropdownOpen(true)}
                  className="hover:text-blue-700 transition flex items-center gap-1 focus:outline-none"
                >
                  <span>Services</span>
                  <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isServicesDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isServicesDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2 w-48 z-[60]">
                    <div className="rounded-2xl border border-slate-150 bg-white p-2 shadow-xl animate-fadeIn">
                      <a
                        href="#/sat"
                        onClick={() => setIsServicesDropdownOpen(false)}
                        className="block rounded-xl px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition"
                      >
                        SAT Prep
                      </a>
                      <a
                        href="#/college-apps"
                        onClick={() => setIsServicesDropdownOpen(false)}
                        className="block rounded-xl px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition"
                      >
                        College Apps
                      </a>
                      <a
                        href="#/tutoring"
                        onClick={() => setIsServicesDropdownOpen(false)}
                        className="block rounded-xl px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition"
                      >
                        Academic Tutoring
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <button type="button" onClick={() => handleNavSectionClick("about")} className="hover:text-blue-700 transition">
                About & Results
              </button>
              <button type="button" onClick={() => handleNavSectionClick("testimonials")} className="hover:text-blue-700 transition">
                Testimonials
              </button>
              <a href="#/college-list-builder" className="hover:text-blue-700 transition">
                College List Builder
              </a>
              <a href="/blog/" className="hover:text-blue-700 transition">
                Blog
              </a>
            </div>

            <a
              href="#/personalized-feedback"
              onClick={() => {
                window.gtag?.("event", "generate_lead", {
                  source: "homepage_cta",
                });
              }}
              className="hidden sm:inline-flex rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-700/10 hover:bg-blue-800 transition"
            >
              Get Personalized Feedback
            </a>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-blue-300 hover:text-blue-700 transition cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Slide-down Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-150 bg-white/95 backdrop-blur-xl py-6 px-8 space-y-6 shadow-2xl flex flex-col">
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2 block">Navigation</span>
              <div className="flex flex-col border-b border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className="text-left py-3.5 text-lg font-bold text-slate-800 hover:text-blue-700 transition flex items-center justify-between"
                >
                  <span>Services</span>
                  <span className={`text-slate-400 text-sm transition-transform duration-200 ${isMobileServicesOpen ? "rotate-90" : ""}`}>→</span>
                </button>
                {isMobileServicesOpen && (
                  <div className="pl-4 pb-3 flex flex-col space-y-3 animate-fadeIn">
                    <a 
                      href="#/sat"
                      onClick={() => { setIsMobileMenuOpen(false); setIsMobileServicesOpen(false); }}
                      className="text-left py-1 text-base font-semibold text-slate-600 hover:text-blue-700 transition"
                    >
                      SAT Prep
                    </a>
                    <a 
                      href="#/college-apps"
                      onClick={() => { setIsMobileMenuOpen(false); setIsMobileServicesOpen(false); }}
                      className="text-left py-1 text-base font-semibold text-slate-600 hover:text-blue-700 transition"
                    >
                      College Apps
                    </a>
                    <a 
                      href="#/tutoring"
                      onClick={() => { setIsMobileMenuOpen(false); setIsMobileServicesOpen(false); }}
                      className="text-left py-1 text-base font-semibold text-slate-600 hover:text-blue-700 transition"
                    >
                      Tutoring
                    </a>
                  </div>
                )}
              </div>
              <button 
                type="button" 
                onClick={() => { setIsMobileMenuOpen(false); handleNavSectionClick("about"); }}
                className="text-left py-3.5 text-lg font-bold text-slate-800 hover:text-blue-700 transition flex items-center justify-between border-b border-slate-100"
              >
                <span>About & Results</span>
                <span className="text-slate-400 text-sm">→</span>
              </button>
              <button 
                type="button" 
                onClick={() => { setIsMobileMenuOpen(false); handleNavSectionClick("testimonials"); }}
                className="text-left py-3.5 text-lg font-bold text-slate-800 hover:text-blue-700 transition flex items-center justify-between border-b border-slate-100"
              >
                <span>Testimonials</span>
                <span className="text-slate-400 text-sm">→</span>
              </button>
              <a 
                href="#/college-list-builder"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3.5 text-lg font-bold text-slate-800 hover:text-blue-700 transition flex items-center justify-between border-b border-slate-100"
              >
                <span>College List Builder</span>
                <span className="text-slate-400 text-sm">→</span>
              </a>
              <a 
                href="/blog/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3.5 text-lg font-bold text-slate-800 hover:text-blue-700 transition flex items-center justify-between border-b border-slate-100"
              >
                <span>Blog</span>
                <span className="text-slate-400 text-sm">→</span>
              </a>
            </div>

            <div className="flex flex-col gap-3 pt-3">
              <a
                href="#/personalized-feedback"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.gtag?.("event", "generate_lead", { source: "mobile_menu" });
                }}
                className="w-full text-center rounded-2xl bg-gradient-to-r from-blue-700 to-blue-600 py-3.5 text-white font-black shadow-lg shadow-blue-700/20 hover:from-blue-800 hover:to-blue-700 transition"
              >
                Get Personalized Feedback
              </a>
              <a
                href={consultationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  trackCalendlyClick();
                }}
                className="w-full text-center rounded-2xl border border-slate-200 bg-slate-50 py-3.5 text-slate-800 font-black hover:bg-slate-100 transition"
              >
                Book Consultation
              </a>
            </div>
          </div>
        )}
      </nav>
    );
  };

  const renderWithHeaderAndFooter = (content: ReactNode) => (
    <>
      <div className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-2 text-center text-xs sm:text-sm font-semibold tracking-[0.01em]">
          Early Bird: Students who book by June 30 get a free SAT diagnostic + 15% off.
          <a
            href={consultationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackCalendlyClick}
            className="ml-2 underline underline-offset-2 hover:text-blue-100"
          >
            Reserve Your Spot →
          </a>
        </div>
      </div>
      {renderNavbar()}
      {content}
      <FloatingMessageButton />
      <SiteFooter consultationUrl={consultationUrl} onConsultationClick={() => trackConsultationClick("footer")} linkedInUrl={linkedInUrl} facebookUrl={facebookUrl} />
    </>
  );



  if (hashPath === "#/sat") {
    return renderWithHeaderAndFooter(<SatPage onBack={() => (window.location.hash = "")} />);
  }
  if (hashPath === "#/college-apps") {
    return renderWithHeaderAndFooter(<CollegeAppsPage onBack={() => (window.location.hash = "")} />);
  }
  if (hashPath === "#/tutoring") {
    return renderWithHeaderAndFooter(<TutoringPage onBack={() => (window.location.hash = "")} />);
  }
  if (hashPath === "#/college-list-builder") {
    return renderWithHeaderAndFooter(<CollegeListBuilderPage onBack={() => (window.location.hash = "")} />);
  }
  if (hashPath === "#/report") {
    return renderWithHeaderAndFooter(<FutureReadyReportPage onBack={() => (window.location.hash = "")} />);
  }
  if (hashPath.startsWith("#/report-success")) {
    return renderWithHeaderAndFooter(<ReportSuccessPage onBack={() => (window.location.hash = "")} />);
  }
  if (hashPath === "#/blogs") {
    return renderWithHeaderAndFooter(<BlogsHubPage onBack={() => (window.location.hash = "")} posts={blogPosts} />);
  }
  if (hashPath.startsWith("#/blogs/")) {
    const slug = hashPath.replace("#/blogs/", "");
    const post = blogPosts.find((item) => item.slug === slug);
    if (!post) {
      return renderWithHeaderAndFooter(<BlogsHubPage onBack={() => (window.location.hash = "")} posts={blogPosts} />);
    }

    return renderWithHeaderAndFooter(
      <CollegeAdmissionsArticlePage
        post={post}
        onBackHome={() => (window.location.hash = "")}
        onBackToHub={() => (window.location.hash = "#/blogs")}
      />
    );
  }

  if (hashPath === "#/personalized-feedback") {
    return renderWithHeaderAndFooter(<PersonalizedFeedback />);
  }

  const itemsPerView = windowWidth >= 768 ? 3 : windowWidth >= 640 ? 2 : 1;
  const maxTestimonialIndex = testimonials.length - itemsPerView;
  const isPrevTestimonialDisabled = currentTestimonialIndex <= 0;
  const isNextTestimonialDisabled = currentTestimonialIndex >= maxTestimonialIndex;

  return (
    <div className="min-h-screen bg-[#f7fbff] text-slate-900 font-sans">
      <div className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-2 text-center text-xs sm:text-sm font-semibold tracking-[0.01em]">
          Early Bird: Students who book by June 30 get a free SAT diagnostic + 15% off.
          <a
            href={consultationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackCalendlyClick}
            className="ml-2 underline underline-offset-2 hover:text-blue-100"
          >
            Reserve Your Spot →
          </a>
        </div>
      </div>
      {renderNavbar()}

      <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-white">
        <div className="absolute inset-0 pointer-events-none select-none hidden md:block">
          {colleges.map((college) => (
            <div
              key={college.name}
              className={`absolute ${heroLogoPositionsByShortName[college.shortName] ?? "top-[20%] right-[10%] w-16"} ${heroLogoPriorityByShortName[college.shortName] ?? "opacity-[0.25]"}`}
              aria-label={college.name}
            >
              <div className={`relative h-24 w-24 rounded-3xl border ${college.color} shadow-sm flex items-center justify-center overflow-hidden bg-white/80 backdrop-blur-sm`}>
                <img
                  src={college.logo}
                  alt=""
                  className="relative z-10 h-14 w-14 object-contain opacity-85"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-10 md:pt-24 pb-16 md:pb-32 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="max-w-2xl text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm mb-7">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Summer sessions now open
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.02] tracking-tight text-slate-950 max-w-4xl text-center lg:text-left">
              <a href="#/sat" className="block hover:text-blue-700 transition">
                <span className="mr-3 inline-block align-middle -translate-y-[0.11em] text-[0.55em] text-blue-500">✦</span>
                SAT Prep
              </a>
              <a href="#/college-apps" className="block hover:text-blue-700 transition">
                <span className="mr-3 inline-block align-middle -translate-y-[0.11em] text-[0.55em] text-blue-500">✦</span>
                College Apps
              </a>
              <a href="#/tutoring" className="block hover:text-blue-700 transition">
                <span className="mr-3 inline-block align-middle -translate-y-[0.11em] text-[0.55em] text-blue-500">✦</span>
                Tutoring
              </a>
            </h2>

            <p className="mt-6 text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl text-center lg:text-left">
              Personalized guidance from a current successful college<br className="hidden md:inline" /> student who recently went through the same process.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-stretch sm:items-center">
            <a
              href="#/personalized-feedback"
              onClick={() => {
                window.gtag?.("event", "generate_lead", {
                  source: "homepage_cta",
                });
              }}
              className="rounded-xl bg-blue-700 px-5 py-3 text-base font-bold text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800 transition text-center"
            >
              Get Personalized Feedback
            </a>
              <a
                href="#services"
                className="rounded-xl bg-white px-7 py-4 text-slate-800 font-bold border border-slate-200 shadow-sm hover:border-blue-300 transition text-center"
              >
                Explore Services
              </a>
            </div>

            <div className="mt-10 hidden md:flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-6 text-sm font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <span className="text-blue-700">★</span> 1500+ SAT Scorer
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-700">♡</span> Background in Mentoring & Tutoring
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-700">◆</span> Earned Over $200K in Merit Scholarships
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-700">♟</span> University of Maryland CS Student
              </div>
            </div>

          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -inset-6 bg-blue-200/50 blur-3xl rounded-full" />
            <div className="relative rounded-[2rem] bg-white border border-slate-200 shadow-2xl overflow-hidden">
              <div className="h-80 bg-gradient-to-br from-blue-100 via-white to-orange-50 p-8 flex flex-col justify-between">
                <div className="rounded-2xl bg-yellow-100 border border-yellow-200 shadow-sm w-48 p-4 sm:w-56 sm:p-5 rotate-[-2deg] ml-4 sm:ml-8">
                  <p className="text-slate-800 leading-relaxed font-bold text-sm">
                    Recent applicant.<br />Real advice.
                  </p>
                  <div className="text-right text-xl mt-2 text-red-500">❤️</div>
                </div>

                <div className="bg-white/85 backdrop-blur rounded-3xl border border-slate-200 shadow-lg p-4 sm:p-6 max-w-[18rem] sm:max-w-md ml-auto">
                  <p className="text-sm font-bold text-blue-700 mb-2">
                    Mentorship feels different when it’s personal.
                  </p>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    I help students turn confusing goals into a clear plan — whether that means SAT improvement, stronger essays, or better grades.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-28 px-6 py-8 md:py-16">
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-white border border-slate-200 shadow-xl p-5 md:p-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-slate-950">
              Ways I Can Help You
            </h2>
            <p className="mt-4 text-slate-600 text-lg">
              Clear, practical support for the parts of high school that feel the most overwhelming.
            </p>
            {/* Scroll navigation arrows for mobile/tablet */}
            <div className="flex justify-center gap-2 mt-4 lg:hidden">
              <button
                type="button"
                onClick={() => scrollContainer(servicesScrollRef, "left")}
                disabled={!servicesScrollState.canScrollLeft}
                className="w-9 h-9 rounded-full border border-slate-200 bg-slate-50 text-slate-700 flex items-center justify-center hover:bg-slate-100 hover:border-blue-300 hover:text-blue-700 active:scale-95 transition-all shadow-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-50 disabled:hover:text-slate-700 disabled:hover:border-slate-200"
                aria-label="Scroll left"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollContainer(servicesScrollRef, "right")}
                disabled={!servicesScrollState.canScrollRight}
                className="w-9 h-9 rounded-full border border-slate-200 bg-slate-50 text-slate-700 flex items-center justify-center hover:bg-slate-100 hover:border-blue-300 hover:text-blue-700 active:scale-95 transition-all shadow-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-50 disabled:hover:text-slate-700 disabled:hover:border-slate-200"
                aria-label="Scroll right"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div
            ref={servicesScrollRef}
            onScroll={() => checkScrollBounds(servicesScrollRef, setServicesScrollState)}
            className="flex lg:grid lg:grid-cols-3 overflow-x-auto lg:overflow-x-visible gap-6 snap-x snap-mandatory pb-4 lg:pb-0 -mx-4 px-4 scrollbar-none w-full max-w-full"
          >
            {services.map((service) => (
              <div
                key={service.title}
                className={`w-full lg:w-auto shrink-0 snap-center rounded-3xl border p-6 sm:p-8 shadow-sm hover:shadow-lg transition flex flex-col justify-between ${service.cardClass}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black mb-4">{service.title}</h3>
                <p className="text-slate-700 leading-relaxed mb-7 text-sm sm:text-base">
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
                <a
                  href={service.title === "SAT Prep" ? "#/sat" : service.title === "College Application Help" ? "#/college-apps" : service.title === "Academic Tutoring" ? "#/tutoring" : "#contact"}
                  className="font-bold underline underline-offset-2 hover:no-underline text-sm sm:text-base">
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-28 px-6 pb-10 md:pb-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-4 md:gap-6">
          <div className="min-w-0 lg:col-span-2 rounded-[2rem] bg-white border border-slate-200 shadow-sm p-4 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700 mb-3 hidden sm:block">
              Meet Your Mentor
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-5">
              <img
                src="/aditya.jpg"
                alt="Aditya"
                className="h-36 w-36 sm:h-40 sm:w-40 shrink-0 rounded-2xl object-cover shadow-sm ring-1 ring-slate-100"
              />
              <div className="text-center sm:text-left">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700 mb-1 sm:hidden">
                  Meet Your Mentor
                </p>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
                  A Little About Me
                </h2>
              </div>
            </div>
            <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
              <p className="text-[1.05rem] leading-7 text-slate-700">
                Hi, I'm Aditya, a University of Maryland Computer Science student helping students navigate college admissions, SAT prep, and academic success with confidence.
              </p>
            </div>

            <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
              <p>
                As a first-generation American college student, I understand how confusing this process can feel when your family hasn’t navigated the U.S. admissions system before. My parents attended college abroad, so much of this journey was something I had to figure out myself.
              </p>
              
              <div className={`${isMentorExpanded ? "block animate-fadeIn" : "hidden md:block"} space-y-4`}>
                <p>
                  That’s a big reason why I started this mentorship platform. Students and families shouldn’t feel pressured to spend tens of thousands of dollars on large counseling companies just to get clear, honest guidance.
                </p>
                <p>
                  I also think mentorship feels more relatable when it comes from someone who recently went through the process themselves — not someone who hasn’t applied to college in decades. I understand the current SAT, Common App, extracurricular expectations, and the stress students experience today.
                </p>
                <p>
                  My goal is to make the process feel less overwhelming, more personal, and a lot more achievable.
                </p>
                <p className="pt-2 text-blue-700 font-semibold italic">
                  <a href="#contact" className="hover:underline">Let’s build your future, together.</a> — Aditya
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsMentorExpanded(!isMentorExpanded)}
                className="md:hidden text-blue-700 font-bold text-sm flex items-center gap-1 focus:outline-none cursor-pointer mt-2"
              >
                {isMentorExpanded ? "Read Less ↑" : "Read More About Me ↓"}
              </button>
            </div>
          </div>

          <div id="results" className="min-w-0 scroll-mt-28 lg:col-span-3 rounded-[2rem] bg-white border border-slate-200 shadow-sm p-4 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 mb-6">
              My Results & Achievements
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {achievements.map((item, index) => (
                <div
                  key={`${item.value}-${item.label}`}
                  className={`${!isResultsExpanded && index >= 4 ? "hidden md:flex" : "flex"} rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:p-6 flex-col justify-between`}
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 text-base sm:text-lg font-black shrink-0">
                    ✦
                  </div>
                  <div>
                    <div className="text-[1.05rem] sm:text-xl md:text-2xl font-black text-blue-700 leading-tight break-words">
                      {item.value}
                    </div>
                    <div className="mt-1 text-[0.7rem] sm:text-xs md:text-sm font-medium text-slate-600 leading-tight">
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsResultsExpanded(!isResultsExpanded)}
              className="md:hidden text-blue-700 font-bold text-sm flex items-center gap-1 focus:outline-none cursor-pointer mt-4"
            >
              {isResultsExpanded ? "Read Less ↑" : "Read More Results ↓"}
            </button>

            <div className={`${isResultsExpanded ? "block animate-fadeIn" : "hidden md:block"} mt-6 rounded-3xl bg-blue-50 border border-blue-100 p-4 sm:p-6`}>
              <h3 className="font-black text-slate-950 mb-4">
                Accepted Colleges
              </h3>

              {/* Desktop view: original flex wrap */}
              <div className="hidden lg:flex lg:flex-wrap gap-2">
                {colleges.map((college) => (
                  <span
                    key={`${college.name}-desktop`}
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

              {/* Mobile/Tablet view: marquee */}
              <div className="lg:hidden">
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                  }
                  .animate-marquee {
                    display: flex;
                    width: max-content;
                    animation: marquee 30s linear infinite;
                  }
                  .animate-marquee:hover {
                    animation-play-state: paused;
                  }
                `}} />

                <div className="relative w-full overflow-hidden py-1">
                  {/* Fade masks */}
                  <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-blue-50 to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-blue-50 to-transparent z-10 pointer-events-none" />

                  <div className="flex gap-2 animate-marquee whitespace-nowrap">
                    {/* Copy 1 */}
                    {colleges.map((college) => (
                      <span
                        key={`${college.name}-mobile-1`}
                        className="inline-flex items-center gap-2 rounded-full bg-white border border-blue-100 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm shrink-0"
                      >
                        <span className="relative h-6 w-6 rounded-full bg-white flex items-center justify-center overflow-hidden">
                          <img
                            src={college.logo}
                            alt=""
                            className="h-4.5 w-4.5 object-contain"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                          />
                        </span>
                        {college.name}
                      </span>
                    ))}
                    {/* Copy 2 for infinite looping */}
                    {colleges.map((college) => (
                      <span
                        key={`${college.name}-mobile-2`}
                        className="inline-flex items-center gap-2 rounded-full bg-white border border-blue-100 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm shrink-0"
                      >
                        <span className="relative h-6 w-6 rounded-full bg-white flex items-center justify-center overflow-hidden">
                          <img
                            src={college.logo}
                            alt=""
                            className="h-4.5 w-4.5 object-contain"
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
          </div>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-white border border-slate-200 shadow-sm p-6 md:p-8">
          <div className="text-center mb-8">
            <p className="text-sm font-black uppercase tracking-wider text-blue-700 mb-2">
              Why this feels different
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-950 leading-tight sm:whitespace-nowrap">
              Guidance from someone who remembers the college process.
            </h2>
            <p className="mt-2 text-slate-600 text-base md:text-lg leading-relaxed">
              No overpriced packages. Just practical, student-first mentorship.
            </p>
            {/* Scroll navigation arrows for mobile/tablet */}
            <div className="flex justify-center gap-2 mt-4 md:hidden">
              <button
                type="button"
                onClick={() => scrollContainer(whyDifferentScrollRef, "left")}
                disabled={!whyDifferentScrollState.canScrollLeft}
                className="w-9 h-9 rounded-full border border-slate-200 bg-slate-50 text-slate-700 flex items-center justify-center hover:bg-slate-100 hover:border-blue-300 hover:text-blue-700 active:scale-95 transition-all shadow-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-50 disabled:hover:text-slate-700 disabled:hover:border-slate-200"
                aria-label="Scroll left"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollContainer(whyDifferentScrollRef, "right")}
                disabled={!whyDifferentScrollState.canScrollRight}
                className="w-9 h-9 rounded-full border border-slate-200 bg-slate-50 text-slate-700 flex items-center justify-center hover:bg-slate-100 hover:border-blue-300 hover:text-blue-700 active:scale-95 transition-all shadow-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-50 disabled:hover:text-slate-700 disabled:hover:border-slate-200"
                aria-label="Scroll right"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div
            ref={whyDifferentScrollRef}
            onScroll={() => checkScrollBounds(whyDifferentScrollRef, setWhyDifferentScrollState)}
            className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-x-visible gap-6 snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 scrollbar-none w-full max-w-full"
          >
            {whyDifferentCards.map((card) => (
              <div
                key={card.title}
                className="w-full md:w-auto shrink-0 snap-center rounded-2xl border border-slate-200 bg-slate-50 p-6 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:shadow-md hover:border-blue-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-black transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white shrink-0">
                  {card.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-blue-700 transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="scroll-mt-28 px-6 pb-16">
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-white border border-slate-200 shadow-sm p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div className="text-left">
              <h2 className="text-3xl font-black text-slate-950">
                What Students & Parents Say
              </h2>
              <p className="mt-2 text-slate-600">
                Guidance built around real student experiences and modern admissions.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                disabled={isPrevTestimonialDisabled}
                className="w-11 h-11 rounded-full border border-slate-200 bg-white text-slate-700 flex items-center justify-center hover:bg-slate-50 hover:border-blue-300 hover:text-blue-700 active:scale-95 transition-all shadow-sm focus:outline-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-200"
                aria-label="Previous testimonials"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={nextSlide}
                disabled={isNextTestimonialDisabled}
                className="w-11 h-11 rounded-full border border-slate-200 bg-white text-slate-700 flex items-center justify-center hover:bg-slate-50 hover:border-blue-300 hover:text-blue-700 active:scale-95 transition-all shadow-sm focus:outline-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-200"
                aria-label="Next testimonials"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="overflow-hidden -mx-3 px-3 py-4">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentTestimonialIndex * (100 / (windowWidth >= 768 ? 3 : windowWidth >= 640 ? 2 : 1))}%)` 
              }}
            >
              {testimonials.map((item, idx) => (
                <div
                  key={idx}
                  className="w-full sm:w-1/2 md:w-1/3 shrink-0 px-3 flex animate-slide"
                >
                  <div className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-blue-100">
                    <div>
                      <div className="flex items-center gap-1 text-yellow-500 mb-4">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed text-[15px] italic">
                        “{item.quote}”
                      </p>
                    </div>
                    <div className="mt-6 border-t border-slate-200/60 pt-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {item.author}
                        </p>
                        <p className="text-xs font-semibold text-blue-600">
                          {item.role}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full text-[10px] font-bold">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-28 px-6 pb-20">
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
              onClick={trackCalendlyClick}
              className="mt-6 inline-flex rounded-xl bg-white px-7 py-4 text-blue-700 font-black shadow-md hover:bg-blue-50 transition"
            >
              Book Consultation →
            </a>
            <div className="lg:hidden mt-6">
              <button
                type="button"
                onClick={() => setIsContactFormExpanded(!isContactFormExpanded)}
                className="w-full text-center rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-bold text-white hover:bg-white/20 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isContactFormExpanded ? "Hide Message Form ↑" : "Send a Message instead ↓"}</span>
              </button>
            </div>
          </div>
          <div className={`${isContactFormExpanded ? "block animate-fadeIn" : "hidden"} lg:block w-full`}>
            <form
              onSubmit={handleContactSubmit}
              className="rounded-2xl bg-white/95 p-5 md:p-6 text-slate-900 shadow-lg space-y-4"
            >
            <input type="hidden" name="_subject" value="New consultation request" />            <div>
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
              disabled={formStatus === "sending"}
              className="w-full rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-800 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {formStatus === "sending" ? "Sending..." : "Send Message"}
            </button>
            {formStatus === "success" && (
              <p className="text-sm font-semibold text-green-700">
                Thanks. Your message was sent successfully.
              </p>
            )}
            {formStatus === "error" && (
              <p className="text-sm font-semibold text-red-600">
                Something went wrong. Please try again or email us directly.
              </p>
            )}
            <p className="text-xs text-slate-500">
              Reach out to us via this form. We will get back to you within 24 hours. If you don't receive a response, please check your spam folder or email us directly at <a href="mailto: futurereadycollegeprep@gmail.com" className="text-blue-700 hover:underline">
                futurereadycollegeprep@gmail.com
              </a>
            </p>
          </form>
          </div>
        </div>
      </section>
      <FloatingMessageButton />
      
      <a
        href="#/report"
        className="fixed right-2 top-2 z-[70] text-[10px] text-slate-300 transition hover:text-slate-500"
        aria-label="Demo report page"
        title="Demo report page"
      >
        ★
      </a>
      <EarlyBirdPopup
        isOpen={showEarlyBirdPopup}
        onClose={handleDismissEarlyBirdPopup}
        onReserve={() => {
          trackCalendlyClick();
          handleDismissEarlyBirdPopup();
        }}
        reserveUrl={consultationUrl}
      />
      
      <SiteFooter
          consultationUrl={consultationUrl}
          onConsultationClick={() => trackConsultationClick("footer")}
          onPersonalizedFeedbackClick={() => {
            window.gtag?.("event", "generate_lead", {
              source: "footer_cta",
            });
          }}
      />
    </div>
  );
}

















