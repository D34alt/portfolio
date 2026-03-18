"use client";

export default function TitleBar() {
  return (
    <div className="flex items-center px-4 py-3 bg-slate-800/80 border-b border-slate-700/50 select-none shrink-0">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
      </div>
      <div className="flex-1 text-center text-sm text-slate-500 tracking-wide">
        visitor@danny: ~
      </div>
      <div className="w-[52px]" />
    </div>
  );
}
