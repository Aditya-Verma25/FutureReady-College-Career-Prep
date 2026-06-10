type EarlyBirdPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onReserve: () => void;
  reserveUrl: string;
};

export default function EarlyBirdPopup({
  isOpen,
  onClose,
  onReserve,
  reserveUrl,
}: EarlyBirdPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-950/35 p-3 sm:items-center sm:p-6">
      <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <button
          type="button"
          aria-label="Close offer popup"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
        >
          ✕
        </button>

        <p className="pr-10 text-xl font-black leading-tight text-slate-950">
          Summer SAT & College Prep Spots Filling Up
        </p>

        <p className="mt-4 text-sm font-bold text-slate-800">
          Book by June 15 to receive:
        </p>
        <ul className="mt-3 space-y-2.5">
          <li className="flex items-start gap-2.5">
            <svg className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-slate-700 font-medium text-sm">Free SAT diagnostic review</span>
          </li>
          <li className="flex items-start gap-2.5">
            <svg className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-slate-700 font-medium text-sm">15% off first month/session</span>
          </li>
        </ul>

        <div className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">
          <span className="text-sm">⚠️</span> Limited summer availability.
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={reserveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onReserve}
            className="inline-flex rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white shadow-md hover:bg-blue-800 transition cursor-pointer"
          >
            Reserve My Spot →
          </a>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:border-blue-300 transition cursor-pointer"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
