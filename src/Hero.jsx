import Spline from '@splinetool/react-spline'
import Logo from './components/Logo'

export default function Hero() {
  return (
    <section className="relative h-[40vh] md:h-[46vh] overflow-hidden">
      {/* Background stays as-is (lets the original page gradient show through) */}

      {/* Spline layer: translucent and shifted down slightly */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/AEHPcpt-Lp9Pig5y/scene.splinecode"
          className="h-full w-full opacity-60 transform translate-y-8 pointer-events-none"
        />
      </div>

      {/* Content */}
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
