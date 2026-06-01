import { Map as MapIcon } from 'lucide-react';

export function MapBlock({ title }: { title?: string }) {
  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 flex flex-col relative overflow-hidden h-full shadow-lg shadow-black/40">
      <div className="absolute top-0 right-0 p-4 z-10">
         <span className="text-[10px] font-mono text-violet-400 bg-violet-400/10 border border-violet-400/20 px-2 py-0.5 rounded shadow-sm">LIVE VIEW</span>
      </div>
      <h3 className="text-sm font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-4 flex items-center gap-2">
        <MapIcon size={16} />
        {title || "Regional Heatmap"}
      </h3>
      <div className="flex-1 bg-[hsl(var(--muted))]/30 rounded-xl border border-[hsl(var(--border))] flex items-center justify-center min-h-[160px] relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        {/* Placeholder Vector Map Representation */}
        <div className="relative w-full max-w-[300px] h-32 opacity-60 transition-transform duration-1000 group-hover:scale-105">
           <div className="absolute top-2 left-[20%] w-3 h-3 bg-violet-500 rounded-full blur-[2px] animate-pulse"></div>
           <div className="absolute top-20 left-[60%] w-4 h-4 bg-violet-500 rounded-full blur-[3px] animate-pulse" style={{ animationDelay: '1s' }}></div>
           <div className="absolute top-5 left-[80%] w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
           <div className="absolute bottom-4 left-[30%] w-2 h-2 bg-violet-400 rounded-full animate-ping opacity-75"></div>
           <div className="w-full h-full border-b border-l border-[hsl(var(--border))] border-dashed opacity-50 relative">
              {/* Lines connecting nodes */}
              <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                 <line x1="20%" y1="20%" x2="60%" y2="80%" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
                 <line x1="60%" y1="80%" x2="80%" y2="20%" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
              </svg>
           </div>
        </div>
        <span className="absolute text-[hsl(var(--muted-foreground))] text-xs font-mono bg-[hsl(var(--background))]/80 px-2 py-1 rounded backdrop-blur">GEOSPATIAL COMPONENT</span>
      </div>
    </div>
  );
}
