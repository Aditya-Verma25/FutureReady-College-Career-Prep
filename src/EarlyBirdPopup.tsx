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
          Know Exactly What Your Student Should Focus on Next
        </p>

        <p className="mt-4 text-sm text-slate-600 leading-relaxed">
          Stop guessing what matters most. In this free strategy session, we'll identify the highest-impact opportunities for your student's SAT prep and college journey, then build a personalized action plan they can start using immediately.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={reserveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onReserve}
            className="inline-flex rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white shadow-md hover:bg-blue-800 transition cursor-pointer"
          >
            Get My Student's Free Action Plan →
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
