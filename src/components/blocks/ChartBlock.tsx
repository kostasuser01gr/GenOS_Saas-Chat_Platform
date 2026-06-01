import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { BarChart as BarChartIcon } from 'lucide-react';

export function ChartBlock({ title, data }: { title?: string, data?: any }) {
  const chartData = data || [
    { name: 'Q1', value: 400 },
    { name: 'Q2', value: 300 },
    { name: 'Q3', value: 550 },
    { name: 'Q4', value: 890 },
  ];

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 h-full shadow-lg shadow-black/40 flex flex-col relative overflow-hidden">
       {/* Background Glow */}
       <div className="absolute -top-10 -right-10 w-32 h-32 bg-[hsl(var(--primary))]/10 rounded-full blur-3xl pointer-events-none"></div>
       
       <div className="flex items-center justify-between mb-8 z-10 relative">
          <h3 className="text-sm font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider flex items-center gap-2">
            <BarChartIcon size={16} />
            {title || "Quarterly Growth"}
          </h3>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">+42% YoY</span>
       </div>
       <div className="flex-1 w-full min-h-[200px] z-10 relative">
         <ResponsiveContainer width="100%" height="100%">
           <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
             <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} dy={10} />
             <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} dx={-10} />
             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
             <Tooltip 
                cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
             />
             <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={'hsl(var(--primary))'} fillOpacity={index === chartData.length - 1 ? 1 : 0.4} />
                ))}
             </Bar>
           </BarChart>
         </ResponsiveContainer>
       </div>
    </div>
  )
}
