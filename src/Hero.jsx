export default function Hero() {
  return (
    <section className="relative h-[32vh] md:h-[40vh] overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute -top-24 -left-24 h-72 w-72 bg-gradient-to-br from-indigo-400/30 to-cyan-400/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 bg-gradient-to-tr from-pink-400/30 to-purple-400/30 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-10 md:pt-12">
        <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          VibeHunt
        </h1>
        <p className="mt-2 max-w-2xl text-base md:text-lg text-gray-700">
          Post ideas with vibe. Upvote, comment, and help decide what ships next.
        </p>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent" />
    </section>
  )
}
