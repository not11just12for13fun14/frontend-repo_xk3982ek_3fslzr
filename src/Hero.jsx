import Logo from './components/Logo'

export default function Hero() {
  return (
    <section className="relative h-[36vh] md:h-[42vh] overflow-hidden">
      {/* Background: inherit the site gradient (no Spline) */}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-10 md:pt-12">
        <div className="flex items-center gap-3">
          <Logo />
        </div>
        <p className="mt-2 max-w-2xl text-base md:text-lg text-gray-700">
          Post ideas with vibe. Upvote, comment, and help decide what ships next — vibecoding app ideas that make money.
        </p>
      </div>
    </section>
  )
}
