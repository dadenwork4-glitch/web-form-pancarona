import { Sparkles } from 'lucide-react'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative w-full py-12 md:py-20 lg:py-24 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Blue gradient blur shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-6 md:gap-8">
          {/* Logo */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 mb-6">
            <Image
              src="/logo-utama.jpeg"
              alt="Pancarona Logo"
              fill
              className="object-contain"
              priority
            />
          </div>


          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Build, Grow, Earn</span>
          </div>

          {/* Main Headline */}
          <div className="max-w-4xl space-y-4 md:space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-pretty leading-tight text-foreground">
              Join{' '}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Pancarona Creator Circle
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-pretty text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Daftarkan dirimu untuk kesempatan kolaborasi berbagai brand terbaik dan kembangkan karir creator kamu bersama kami
            </p>
          </div>

          {/* Features Pills */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-4">
            {['Brand Collaborations', 'Growth Support', 'Exclusive Network'].map((feature) => (
              <div
                key={feature}
                className="px-4 py-2 rounded-full bg-card border border-border/50 backdrop-blur-sm text-sm font-medium text-foreground hover:border-primary/50 transition-colors"
              >
                {feature}
              </div>
            ))}
          </div>

   

          {/* Scroll indicator */}
          <div className="mt-12 animate-bounce">
            <svg className="w-6 h-6 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
