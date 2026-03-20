"use client";

interface Props {
  onClose: () => void;
  onMinimise: () => void;
  onMaximise: () => void;
  isCrtMode: boolean;
}

export default function TitleBar({ onClose, onMinimise, onMaximise, isCrtMode }: Props) {
  return (
    <div className="flex items-center px-4 py-3 bg-slate-800/80 border-b border-slate-700/50 select-none shrink-0">
      <div className="flex gap-2">
        <button
          onClick={onClose}
          className="group w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <span className="hidden group-hover:block text-[8px] font-bold text-red-900 leading-none">
            x
          </span>
        </button>
        <button
          onClick={onMinimise}
          className="group w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 flex items-center justify-center transition-colors"
          aria-label="Minimise"
        >
          <span className="hidden group-hover:block text-[8px] font-bold text-yellow-900 leading-none">
            -
          </span>
        </button>
        <button
          onClick={onMaximise}
          className={`group w-3 h-3 rounded-full flex items-center justify-center transition-colors ${
            isCrtMode
              ? "bg-green-400 ring-1 ring-green-300/50"
              : "bg-green-500/80 hover:bg-green-500"
          }`}
          aria-label="Maximise"
        >
          <span className="hidden group-hover:block text-[8px] font-bold text-green-900 leading-none">
            +
          </span>
        </button>
      </div>
      <div className="flex-1 text-center text-sm text-slate-500 tracking-wide">
        visitor@danny: ~
      </div>
      <div className="w-[52px]" />
    </div>
  );
}
