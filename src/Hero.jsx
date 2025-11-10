import Logo from './components/Logo'

export default function Hero() {
  return (
    <section className="relative h-[24vh] md:h-[28vh] overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-7 md:pt-8 text-center">
        <div className="flex items-center justify-center gap-3">
          <Logo />
        </div>
        <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900">
          VibeHunt
        </h1>
        <p className="mt-2 max-w-2xl mx-auto text-base md:text-lg font-medium text-gray-700">
          Share money-making vibe‑coding ideas. Upvote, comment, and help decide what ships next.
        </p>
      </div>
    </section>
  )
}
