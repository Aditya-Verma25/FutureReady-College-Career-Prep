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
      <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6">
        <button
          type="button"
          aria-label="Close early bird offer popup"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700"
        >
          ✕
        </button>

        <p className="pr-10 text-xl font-black leading-tight text-slate-950">
          🌟 Early Bird Summer Prep Special
        </p>

        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Summer is the best time to get ahead before fall testing and college
          application deadlines.
        </p>

        <p className="mt-3 text-sm font-semibold text-slate-700">
          The first 10 students who book before June 15th will receive:
        </p>
        <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
          <li>• Free consultation</li>
          <li>• Personalized success roadmap</li>
          <li>• 15% off summer prep packages</li>
        </ul>

        <p className="mt-3 text-xs leading-relaxed text-slate-500">
          Limited summer availability for personalized 1-on-1 SAT prep, college
          application help, and academic tutoring.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href={reserveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onReserve}
            className="inline-flex rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white shadow-md hover:bg-blue-800 transition"
          >
            Reserve Your Spot →
          </a>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-blue-300 transition"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
