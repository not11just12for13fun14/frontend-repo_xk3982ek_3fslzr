import Logo from './components/Logo'

export default function Hero() {
  return (
    <section className="relative h-[22vh] md:h-[26vh] overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-6 md:pt-6 text-center">
        <div className="flex items-center justify-center gap-3">
          <Logo />
        </div>
        {/* Remove duplicate title, keep a clean, compact subtitle */}
        <p className="mt-2 max-w-2xl mx-auto text-sm md:text-base font-medium text-gray-700">
          Post money-making vibe-coding ideas. Upvote, comment, and help decide what ships next.
        </p>
      </div>
    </section>
  )
}
