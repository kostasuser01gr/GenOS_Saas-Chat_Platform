import { DollarSign } from 'lucide-react';

export function BudgetVarianceBlock({ title }: { title?: string }) {
  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 shadow-lg shadow-black/40 h-full">
      <div className="flex justify-between items-start sm:items-center mb-6 flex-col sm:flex-row gap-4">
        <h3 className="text-sm font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider flex items-center gap-2">
          <DollarSign size={16} />
          {title || "Budget Variance Computation"}
        </h3>
        <div className="flex gap-6 bg-[hsl(var(--muted))]/20 p-2 rounded-lg border border-[hsl(var(--border))]/50">
           <div className="text-right">
             <p className="text-[10px] text-[hsl(var(--muted-foreground))] uppercase font-semibold">Projected</p>
             <p className="text-sm font-mono text-[hsl(var(--foreground))]">$2.4M</p>
           </div>
           <div className="text-right">
             <p className="text-[10px] text-[hsl(var(--muted-foreground))] uppercase font-semibold">Actual</p>
             <p className="text-sm font-mono text-emerald-400 font-semibold">$2.1M</p>
           </div>
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between items-center py-3.5 border-b border-[hsl(var(--border))]/50 hover:bg-[hsl(var(--muted))]/10 px-2 rounded transition-colors group">
           <span className="text-sm text-[hsl(var(--foreground))] opacity-90 font-medium">Western European Territory</span>
           <span className="text-[11px] font-mono bg-[hsl(var(--muted))] px-2.5 py-1 rounded-md text-violet-400 border border-violet-500/20 group-hover:border-violet-500/50 transition-colors">+12.4% vs Target</span>
        </div>
        <div className="flex justify-between items-center py-3.5 border-b border-[hsl(var(--border))]/50 hover:bg-[hsl(var(--muted))]/10 px-2 rounded transition-colors group">
           <span className="text-sm text-[hsl(var(--foreground))] opacity-90 font-medium">North American Enterprise</span>
           <span className="text-[11px] font-mono bg-[hsl(var(--muted))] px-2.5 py-1 rounded-md text-emerald-400 border border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors">-2.1% Under Budget</span>
        </div>
        <div className="flex justify-between items-center py-3.5 hover:bg-[hsl(var(--muted))]/10 px-2 rounded transition-colors group">
           <span className="text-sm text-[hsl(var(--foreground))] opacity-90 font-medium">APAC Growth Corridor</span>
           <span className="text-[11px] font-mono bg-violet-600/20 px-2.5 py-1 rounded-md text-violet-300 font-bold border border-violet-500/40 group-hover:bg-violet-600/30 transition-colors">+38.9% High Growth</span>
        </div>
      </div>
    </div>
  );
}
