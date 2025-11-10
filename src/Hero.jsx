import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-10 md:pt-14">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm">
          Vibe Ideas
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-700">
          Post ideas you want built with vibe coding. Upvote, comment, and help decide what ships next.
        </p>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent" />
    </section>
  )
}
