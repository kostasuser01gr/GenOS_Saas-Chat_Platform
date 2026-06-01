import { MoreHorizontal, Plus } from 'lucide-react';

export function KanbanBlock({ title }: { title?: string }) {
  const columns = [
    { title: 'Backlog', count: 3, items: [{id: 1, title: 'Design System Update', tag: 'Design', priority: 'Medium'}, {id: 2, title: 'API Gateway Specs', tag: 'Backend', priority: 'High'}, {id: 6, title: 'Customer Interviews', tag: 'Research', priority: 'Low'}] },
    { title: 'In Progress', count: 2, items: [{id: 3, title: 'Implement OAuth Config', tag: 'Frontend', priority: 'High'}, {id: 4, title: 'Database Migration', tag: 'Data', priority: 'Critical'}] },
    { title: 'Review', count: 1, items: [{id: 5, title: 'Marketing Landing Page', tag: 'Marketing', priority: 'Medium'}] },
  ]

  const getPriorityColor = (p: string) => {
    switch(p) {
      case 'Critical': return 'text-red-400';
      case 'High': return 'text-orange-400';
      case 'Medium': return 'text-blue-400';
      case 'Low': return 'text-zinc-400';
      default: return 'text-zinc-400';
    }
  }

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl py-6 px-4 sm:px-6 w-full max-w-5xl shadow-xl shadow-black/40 overflow-x-auto">
       <div className="flex items-center justify-between mb-8 min-w-[600px]">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-[hsl(var(--foreground))]">{title || "Sprint Board"}</h3>
          </div>
          <button className="flex items-center gap-1.5 text-sm bg-[hsl(var(--foreground))] text-black px-4 py-2 rounded-lg font-medium hover:bg-white/90 shadow-sm transition-colors">
             <Plus size={16} /> Add Task
          </button>
       </div>
       <div className="flex md:grid grid-cols-1 md:grid-cols-3 gap-6 min-w-[600px]">
          {columns.map(col => (
             <div key={col.title} className="flex flex-col gap-4 w-72 md:w-auto shrink-0">
                <div className="flex items-center justify-between text-sm font-semibold text-[hsl(var(--muted-foreground))] tracking-wide uppercase px-1">
                   <div className="flex items-center gap-2">
                     <span>{col.title}</span>
                     <span className="text-xs bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] px-2 py-0.5 rounded-full">{col.count}</span>
                   </div>
                   <button className="hover:text-[hsl(var(--foreground))] transition-colors p-1 rounded-md hover:bg-[hsl(var(--muted))]"><MoreHorizontal size={16} /></button>
                </div>
                <div className="flex flex-col gap-3 min-h-[150px] bg-[hsl(var(--muted))]/10 rounded-xl p-2 border border-[hsl(var(--border))]/50">
                   {col.items.map(item => (
                      <div key={item.id} className="bg-[hsl(var(--background))] border border-[hsl(var(--border))] p-4 outline-none rounded-lg flex flex-col gap-3 cursor-pointer hover:border-[hsl(var(--muted-foreground))]/50 hover:shadow-lg transition-all shadow-sm group">
                         <div className="text-[14px] font-medium text-[hsl(var(--foreground))] leading-snug group-hover:text-[hsl(var(--primary))] transition-colors">{item.title}</div>
                         <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 px-2 py-1 rounded-md tracking-wider">
                               {item.tag}
                            </span>
                            <span className={`text-[12px] font-medium ${getPriorityColor(item.priority)}`}>
                               {item.priority}
                            </span>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          ))}
       </div>
    </div>
  )
}
