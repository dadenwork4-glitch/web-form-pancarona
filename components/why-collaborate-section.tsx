import { Users, Zap, Heart, Shield, ArrowRight } from 'lucide-react'

export function WhyCollaborateSection() {
  const features = [
    {
      title: 'Curated Creator Pool',
      description: 'Access ke creator pool yang lebih curated',
      icon: <Users className="h-8 w-8 text-purple-500" />,
      color: 'from-purple-500/20 to-purple-500/5'
    },
    {
      title: 'Easier Campaign Execution',
      description: 'Campaign execution yang lebih efficient',
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      color: 'from-blue-500/20 to-blue-500/5'
    },
    {
      title: 'Scalable Ecosystem',
      description: 'Memperluas exposure creator melalui sistem yang fleksibel dan siap berkembang.',
      icon: <Heart className="h-8 w-8 text-blue-400" />,
      color: 'from-blue-400/20 to-blue-400/5'
    },
    {
      title: 'Long-term Collaboration',
      description: 'Kolaborasi yang sustainable',
      icon: <Shield className="h-8 w-8 text-purple-400" />,
      color: 'from-purple-400/20 to-purple-400/5'
    }
  ]

  return (
    <section className="w-full flex flex-col md:flex-row min-h-[700px] overflow-hidden">
      {/* Left Side: Title Section */}
      <div className="w-full md:w-[45%] bg-primary relative p-8 sm:p-12 md:p-24 flex items-center justify-center overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-full h-full">
          <div className="absolute top-1/4 -right-20 w-80 h-80 bg-white/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 -left-10 w-64 h-64 bg-white/5 rounded-full blur-[120px] -rotate-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative z-10 w-full max-w-lg">
          <div className="mb-8 md:mb-10 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
            <ArrowRight className="h-6 w-6 md:h-8 md:w-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase">
            Why<br /><span className="text-white/70 italic">Collaborate</span><br />With Us?
          </h2>
        </div>
      </div>

      {/* Right Side: Features Grid */}
      <div className="w-full md:w-[55%] bg-slate-50 p-8 sm:p-12 md:p-24 flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12 w-full max-w-3xl">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4 md:space-y-6 group hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300">
              <div className={`h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-primary/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <div className="text-primary">{feature.icon}</div>
              </div>
              <div className="space-y-2 md:space-y-3">
                <h3 className="text-xl md:text-2xl font-black text-slate-800 leading-tight group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
