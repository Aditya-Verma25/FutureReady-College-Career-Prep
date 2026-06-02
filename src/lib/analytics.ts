declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const isDev = (import.meta as any)?.env?.MODE !== "production";

function debugLog(eventName: string, payload?: Record<string, any>) {
  if (!isDev) return;
  // eslint-disable-next-line no-console
  console.log(`[Analytics] ${eventName}:`, payload ?? {});
}

function safeEvent(eventName: string, params?: Record<string, any>) {
  try {
    window.gtag?.("event", eventName, params ?? {});
  } catch (e) {
    // don't crash the app if gtag isn't available or throws
    if (isDev) {
      // eslint-disable-next-line no-console
      console.warn("gtag error", e);
    }
  }
}

export const trackConsultationClick = (location: string) => {
  safeEvent("consultation_click", { location });
  debugLog("consultation_click", { location });
};

export const trackCollegeBuilderSubmit = (opts: {
  count?: number;
  intendedMajor?: string;
  gpa?: string;
  testStatus?: string;
} = {}) => {
  safeEvent("college_builder_submit", {
    count: opts.count,
    intendedMajor: opts.intendedMajor,
    gpa: opts.gpa,
    testStatus: opts.testStatus,
  });
  debugLog("college_builder_submit", opts);
};

export const trackReportClick = (location: string, reportType?: string) => {
  safeEvent("report_cta_click", { location, reportType });
  debugLog("report_cta_click", { location, reportType });
};

export const trackPopupView = (location?: string) => {
  safeEvent("popup_view", { location });
  debugLog("popup_view", { location });
};

export const trackPopupDismiss = (location?: string) => {
  safeEvent("popup_dismiss", { location });
  debugLog("popup_dismiss", { location });
};

export const trackPopupCtaClick = (location?: string) => {
  safeEvent("popup_cta_click", { location });
  debugLog("popup_cta_click", { location });
};

export const trackContactSubmit = (formLocation?: string) => {
  safeEvent("contact_form_submit", { formLocation });
  debugLog("contact_form_submit", { formLocation });
};

// TODO: Add funnel-level tracking helpers:
// - Calendly booking completion (post-booking redirect / success hook)
// - Stripe checkout success for report purchases
// - Email capture funnel (newsletter signup, confirmation)
// - PDF report delivery / download tracking

export default {
  trackConsultationClick,
  trackCollegeBuilderSubmit,
  trackReportClick,
  trackPopupView,
  trackPopupDismiss,
  trackPopupCtaClick,
  trackContactSubmit,
};
