export default function Logo({ size = 28 }) {
  return (
    <div className="inline-flex items-center gap-2 select-none">
      <span
        className="relative inline-block"
        style={{ width: size, height: size }}
        aria-hidden
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-sky-400 to-cyan-400 shadow-[0_6px_20px_rgba(56,189,248,0.45)]" />
        <span className="absolute inset-0 rounded-full bg-white/20 mix-blend-overlay" />
        <span className="absolute left-1.5 top-1.5 h-2 w-2 rounded-full bg-white/80 blur-[1px]" />
      </span>
      <span className="font-display text-gray-900 font-extrabold tracking-tight">VibeHunt</span>
    </div>
  )
}
