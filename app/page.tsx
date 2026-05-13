import Image from 'next/image'
import { HeroSection } from '@/components/hero-section'
import { WhyCollaborateSection } from '@/components/why-collaborate-section'
import { CreatorBenefitsSection } from '@/components/creator-benefits-section'
import { ExpectationsSection } from '@/components/expectations-section'
import { CreatorForm } from '@/components/creator-form'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Why Collaborate Section */}
      <WhyCollaborateSection />

      {/* Benefits Section */}
      {/* <CreatorBenefitsSection /> */}
      
      {/* Expectations Section */}
      {/* <ExpectationsSection /> */}

      {/* Form Section */}
      <section className="relative w-full py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8">
            {/* Section Header */}
            <div className="text-center space-y-4 max-w-2xl mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                Daftarkan Dirimu Sekarang
              </h2>
              <p className="text-lg text-muted-foreground">
                Lengkapi data dirimu untuk mendapatkan akses ke kolaborasi brand eksklusif dan komunitas creator kami
              </p>
            </div>

            {/* Form Container */}
            <div className="w-full max-w-2xl">
              <CreatorForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-border/30 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="relative w-28 h-28">
                <Image
                  src="/logo-utama.jpeg"
                  alt="Pancarona Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Pancarona</h3>
                <p className="text-sm text-muted-foreground">
                  Platform untuk creators dan brand collaborations
                </p>
              </div>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/30 text-center text-xs text-muted-foreground space-y-2">
  <p>
    Developed by <span className="font-semibold text-foreground"> Deden Julianto</span>
  </p>

  <div className="flex items-center justify-center gap-4">
    <a
      href="https://instagram.com/dadensjulianto"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-primary transition-colors"
    >
      Instagram
    </a>

    <a
      href="https://wa.me/6281211832567"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-primary transition-colors"
    >
      WhatsApp
    </a>

    <a
      href="mailto:dadensjulianto@gmail.com"
      className="hover:text-primary transition-colors"
    >
      Email
    </a>
  </div>

  <p className="text-[11px] text-muted-foreground/70">
    © 2026 Creator Community. All rights reserved.
  </p>
</div>
        </div>
      </footer>
    </main>
  )
}
