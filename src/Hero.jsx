import Logo from './components/Logo'

export default function Hero() {
  return (
    <section className="relative h-[30vh] md:h-[36vh] overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-8 md:pt-10">
        <div className="flex items-center gap-3">
          <Logo />
        </div>
        <p className="mt-1 md:mt-1.5 max-w-2xl text-base md:text-lg text-gray-700">
          Post ideas with vibe. Upvote, comment, and help decide what ships next — vibecoding app ideas that make money.
        </p>
      </div>
    </section>
  )
}
