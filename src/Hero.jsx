import Logo from './components/Logo'

export default function Hero() {
  return (
    <section className="relative h-[36vh] md:h-[42vh] overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute -top-24 -left-24 h-72 w-72 bg-gradient-to-br from-indigo-400/30 to-cyan-400/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 bg-gradient-to-tr from-pink-400/30 to-purple-400/30 rounded-full blur-3xl" />

      {/* Calm orb spline-like graphic */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-[720px] h-[720px] pointer-events-none">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-200 via-sky-200 to-cyan-200 opacity-60 blur-3xl" />
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-indigo-400/30 via-blue-300/30 to-cyan-300/30 blur-2xl" />
          <div className="absolute inset-0 animate-pulse rounded-full bg-white/10" />
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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent" />
    </section>
  )
}
