import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export function DashboardBlock({ title, data }: { title?: string, data?: any }) {
  const chartData = data || [
    { name: 'Mon', revenue: 4000, users: 2400 },
    { name: 'Tue', revenue: 3000, users: 1398 },
    { name: 'Wed', revenue: 2000, users: 9800 },
    { name: 'Thu', revenue: 2780, users: 3908 },
    { name: 'Fri', revenue: 1890, users: 4800 },
    { name: 'Sat', revenue: 2390, users: 3800 },
    { name: 'Sun', revenue: 3490, users: 4300 },
  ];

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 w-full max-w-4xl shadow-xl shadow-black/40">
       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
              {title || "Overview"}
            </h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">Real-time metrics for the selected period.</p>
          </div>
          <div className="flex gap-2 bg-[hsl(var(--muted))] p-1 rounded-lg">
             <button className="px-3 py-1 text-xs font-medium rounded-md bg-[hsl(var(--foreground))] text-black shadow-sm">7d</button>
             <button className="px-3 py-1 text-xs font-medium rounded-md text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">30d</button>
             <button className="px-3 py-1 text-xs font-medium rounded-md text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">YTD</button>
          </div>
       </div>
       <div className="h-[300px] w-full">
         <ResponsiveContainer width="100%" height="100%">
           <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
             <defs>
               <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                 <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
               </linearGradient>
             </defs>
             <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} dy={10} />
             <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} dx={-10} />
             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
             <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }}
                itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 500 }}
                cursor={{ stroke: 'hsl(var(--muted-foreground))', strokeWidth: 1, strokeDasharray: '4 4' }}
             />
             <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
           </AreaChart>
         </ResponsiveContainer>
       </div>
    </div>
  )
}
