import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

export function ExpectationsSection() {
  const expectations = [
    'Create content sesuai brief dan timeline',
    'Menggunakan hashtag dan campaign link yang ditentukan',
    'Konten harus original dan sesuai guideline',
    'Aktif dan responsif selama program',
    'Menjaga kualitas dan konsistensi konten',
    'Mencantumkan affiliate / link (jika diperlukan)',
    'Konten tidak mengandung unsur sensitif / SARA',
  ]

  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden bg-card/30">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Expectations List Content */}
          <div className="relative space-y-10 lg:pl-16 flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Vertical Line with Downward Arrow Indicator (Desktop) */}
            <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/20 via-primary/50 to-primary rounded-full">
               <div className="absolute -bottom-1 -left-[6px] w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[10px] border-t-primary"></div>
            </div>

            <div className="space-y-6 w-full">
              <h2 className="text-5xl md:text-7xl font-black text-primary tracking-tighter leading-[0.9] uppercase">
                What We <br /><span className="text-slate-900 italic">Expect</span>
              </h2>
              <p className="text-slate-500 text-xl max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                Kami mencari kreator yang berkomitmen untuk tumbuh bersama dan memberikan hasil terbaik dalam setiap kampanye.
              </p>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-left">
              {expectations.map((item, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="text-lg font-bold text-slate-700 group-hover:text-primary transition-colors duration-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
