import { Activity } from 'lucide-react';

export function RadarBlock({ title }: { title?: string }) {
  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 flex flex-col items-center justify-center gap-4 h-full shadow-lg shadow-black/40 relative">
      <h3 className="text-sm font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider self-start w-full flex items-center gap-2">
        <Activity size={16} />
        {title || "Efficiency Index"}
      </h3>
      <div className="w-40 h-40 rounded-full border-[8px] border-[hsl(var(--muted))] flex items-center justify-center relative shadow-inner">
         {/* Animated Ring */}
         <div className="w-40 h-40 rounded-full border-[8px] border-[hsl(var(--primary))] border-t-transparent absolute rotate-45 transition-all duration-[3000ms] ease-out hover:rotate-[225deg]"></div>
         <div className="text-center z-10">
           <div className="text-4xl font-bold tracking-tighter text-[hsl(var(--foreground))]">84.2</div>
           <div className="text-[10px] text-[hsl(var(--muted-foreground))] uppercase font-semibold tracking-wider mt-1">Lead Score</div>
         </div>
      </div>
      <div className="w-full flex justify-between px-4 mt-2">
         <div className="text-center">
            <div className="text-[10px] text-[hsl(var(--muted-foreground))] uppercase">Uptime</div>
            <div className="text-xs font-mono text-emerald-400">99.9%</div>
         </div>
         <div className="text-center">
            <div className="text-[10px] text-[hsl(var(--muted-foreground))] uppercase">Latency</div>
            <div className="text-xs font-mono text-amber-400">42ms</div>
         </div>
      </div>
    </div>
  );
}
