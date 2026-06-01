import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

export function StatBlock({ title, data }: any) {
  const value = data?.value || "12,492";
  const label = data?.label || "Active Connections";
  const trend = data?.trend || 14.2;
  const isPositive = trend > 0;

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 flex flex-col justify-between h-full shadow-lg shadow-black/40 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[hsl(var(--primary))]/10 rounded-full blur-3xl group-hover:bg-[hsl(var(--primary))]/20 transition-all pointer-events-none"></div>
      <h3 className="text-[11px] font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider relative z-10 flex items-center gap-2">
        <Activity size={14} className="opacity-70" />
        {title || "Metric"}
      </h3>
      <div className="mt-6 relative z-10 flex items-end justify-between">
        <div>
           <div className="text-3xl font-light tracking-tight text-[hsl(var(--foreground))]">{value}</div>
           <div className="text-[11px] text-[hsl(var(--muted-foreground))] mt-1 font-mono tracking-widest uppercase">{label}</div>
        </div>
        {trend && (
           <div className={`flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded-md border ${isPositive ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-rose-400 bg-rose-500/10 border-rose-500/20'}`}>
             {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
             {Math.abs(trend)}%
           </div>
        )}
      </div>
    </div>
  )
}
