import { Gift, Megaphone, TrendingUp, Star, Tag, GraduationCap, ArrowRight } from 'lucide-react'

export function CreatorBenefitsSection() {
  const benefits = [
    {
      title: 'Product Seeding',
      description: 'Monthly product seeding dari Wardah',
      icon: <Gift className="h-7 w-7" />
    },
    {
      title: 'Campaign Access',
      description: 'Early access ke produk terbaru & campaign',
      icon: <Megaphone className="h-7 w-7" />
    },
    {
      title: 'Exposure Boost',
      description: 'Performance-based reward & bonus',
      icon: <TrendingUp className="h-7 w-7" />
    },
    {
      title: 'Performance Reward',
      description: 'Exposure dari brand & agency',
      icon: <Star className="h-7 w-7" />
    },
    {
      title: 'Affiliate Income',
      description: 'Affiliate & commission opportunity',
      icon: <Tag className="h-7 w-7" />
    },
    {
      title: 'Creator development',
      description: 'Workshop, content review & pengembangan skill',
      icon: <GraduationCap className="h-7 w-7" />
    }
  ]

  return (
    <section className="w-full flex flex-col md:flex-row min-h-[700px] overflow-hidden border-y border-slate-100">
      {/* Left Side: Title Section */}
      <div className="w-full md:w-[45%] bg-white p-12 md:p-24 flex flex-col justify-center items-center text-center">
  
  <div className="flex items-center gap-4 mb-12 group">
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white font-black text-2xl shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
      PM
    </div>

    <div className="flex flex-col text-left">
      <span className="text-xs font-black text-primary uppercase tracking-widest leading-none">
        Pancarona
      </span>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">
        Management
      </span>
    </div>
  </div>

  <div className="space-y-8 flex flex-col items-center">
    <h2 className="text-5xl md:text-7xl font-black text-primary leading-[0.9] tracking-tighter uppercase">
      What You<br />
      <span className="text-slate-900 italic">Will Get</span>
    </h2>

    <div className="flex flex-col items-center gap-5">
      <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 transition-transform hover:scale-110">
        <ArrowRight className="h-7 w-7 text-white" />
      </div>

      <p className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight leading-tight">
        Access. Exposure.<br />
        Opportunity.
      </p>
    </div>
  </div>
</div>

      {/* Right Side: Benefits Grid */}
      <div className="w-full md:w-[55%] bg-primary p-12 md:p-24 flex items-center relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16 w-full max-w-3xl relative z-10">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex gap-6 items-start group">
              <div className="flex-shrink-0 h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-primary transition-all duration-500 shadow-lg">
                {benefit.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white uppercase tracking-wider leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-blue-50 text-base leading-relaxed opacity-80 group-hover:opacity-100 transition-all">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
