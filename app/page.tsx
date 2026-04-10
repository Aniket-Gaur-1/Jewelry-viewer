import Link from 'next/link';
import Animate from '@/components/Animate';

export default function LandingPage() {
  return (
    <Animate>
      <main className="bg-[#0a0a0a] text-[#ededed] min-h-screen font-sans selection:bg-white/10">
        
        {/* Nav: Thin & Integrated */}
        <nav className="fixed top-0 w-full z-50 border-b border-white/[0.03] backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
            <div className="text-[10px] tracking-[0.4em] font-light text-white/40 uppercase">
              System / Jewelry_Studio_v1
            </div>
            <Link href="/studio" className="text-[10px] tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors">
              Enter Workspace →
            </Link>
          </div>
        </nav>

        {/* Hero: Focused on Typography & Space */}
        <section className="px-8 pt-48 pb-32 max-w-7xl mx-auto">
          <div className="reveal opacity-0">
            <h1 className="text-4xl md:text-6xl font-extralight tracking-tight leading-none mb-8">
              Precision in <span className="opacity-40 italic">digital</span> craft.
            </h1>
            
            <p className="max-w-xl text-sm md:text-base text-white/40 leading-relaxed font-light mb-12">
              A streamlined environment for high-fidelity 3D jewelry visualization. 
              No distractions. Just pure light and geometry.
            </p>

            <div className="flex items-center gap-12">
              <Link 
                href="/studio" 
                className="group flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase font-bold"
              >
                <span className="w-12 h-[1px] bg-white/20 group-hover:w-20 group-hover:bg-white transition-all duration-500" />
                Open Studio
              </Link>
              
              <div className="hidden md:block h-[1px] flex-1 bg-white/[0.03]" />
            </div>
          </div>

          {/* Canvas Preview: Minimal Frame */}
          <div className="mt-32 reveal opacity-0 delay-1 border border-white/[0.05] rounded-sm bg-black aspect-video relative group overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
               <div className="w-full h-[0.5px] bg-white/10 absolute rotate-12" />
               <div className="w-full h-[0.5px] bg-white/10 absolute -rotate-12" />
               <span className="text-[9px] uppercase tracking-[1em] text-white">Renderer_IDLE</span>
            </div>
          </div>
        </section>

        {/* Features: Blueprint Style */}
        <section className="px-8 py-32 border-t border-white/[0.03]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
            <Feature 
              title="Real-time PBR" 
              desc="Accurate light physics for gold and gemstones. No artificial enhancements." 
            />
            <Feature 
              title="Nomenclature" 
              desc="Automatic identification and mapping of STL, OBJ, and GLB hierarchies." 
            />
            <Feature 
              title="Matrix Export" 
              desc="Standardized orthographic views for technical marketing documentation." 
            />
          </div>
        </section>

        <footer className="px-8 py-12 text-[9px] tracking-[0.5em] text-white/20 uppercase text-center">
          © 2026 / Laboratory for Jewelry Design
        </footer>
      </main>
    </Animate>
  );
}

function Feature({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="reveal opacity-0 delay-2 space-y-4">
      <h3 className="text-[11px] tracking-[0.2em] font-semibold text-white/80 uppercase">
        {title}
      </h3>
      <div className="w-4 h-[1px] bg-white/20" />
      <p className="text-xs text-white/40 leading-relaxed font-light">
        {desc}
      </p>
    </div>
  );
}