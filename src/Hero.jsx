import Logo from './components/Logo'

export default function Hero() {
  const videoSrc = import.meta.env.VITE_HERO_VIDEO_URL || 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
  const posterSrc = import.meta.env.VITE_HERO_VIDEO_POSTER || ''

  return (
    <section className="relative h-[40vh] md:h-[46vh] overflow-hidden">
      {/* Subtle background tint blobs */}
      <div className="absolute -top-24 -left-24 h-72 w-72 bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 bg-gradient-to-tr from-pink-400/20 to-purple-400/20 rounded-full blur-3xl" />

      {/* Half-cut orb container at the bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 sm:h-52 md:h-64 overflow-hidden">
        <div className="relative left-1/2 -translate-x-1/2 top-full -translate-y-[58%] w-[720px] h-[720px]">
          {/* Circular crop for video */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <video
              src={videoSrc}
              poster={posterSrc || undefined}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              controls={false}
            />
          </div>
          {/* overlays for cohesive glow + rings */}
          <div className="pointer-events-none absolute inset-0 rounded-full">
            {/* core glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-200 via-sky-200 to-cyan-200 opacity-40 blur-3xl" />
            {/* soft tint */}
            <div className="absolute inset-10 rounded-full bg-gradient-to-br from-indigo-400/20 via-blue-300/20 to-cyan-300/20 blur-2xl" />
            {/* inner pulse */}
            <div className="absolute inset-0 animate-pulse rounded-full bg-white/5" />
            {/* concentric rings */}
            <div className="absolute inset-16 rounded-full border border-white/20" />
            <div className="absolute inset-28 rounded-full border border-white/15" />
            <div className="absolute inset-40 rounded-full border border-white/10" />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-10 md:pt-12">
        <div className="flex items-center gap-3">
          <Logo />
        </div>
        <p className="mt-2 max-w-2xl text-base md:text-lg text-gray-700">
          Post ideas with vibe. Upvote, comment, and help decide what ships next.
        </p>
      </div>

      {/* subtle top fade to keep text legible */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent" />
    </section>
  )
}
