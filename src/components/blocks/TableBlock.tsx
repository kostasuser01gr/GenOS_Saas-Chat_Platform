import { MoreHorizontal } from 'lucide-react';
import { cn } from '../../lib/utils';

export function TableBlock({ title, data }: { title?: string, data?: any }) {
  const users = data || [
    { id: '1', name: 'Alice Cooper', email: 'alice@example.com', status: 'Active', role: 'Admin' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', status: 'Offline', role: 'User' },
    { id: '3', name: 'Charlie Davis', email: 'charlie@example.com', status: 'Active', role: 'Editor' },
    { id: '4', name: 'Diana Prince', email: 'diana@example.com', status: 'Invited', role: 'User' },
  ]

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl overflow-hidden w-full max-w-4xl shadow-xl shadow-black/40">
       <div className="px-6 py-5 border-b border-[hsl(var(--border))]">
          <h3 className="text-lg font-semibold tracking-tight">{title || "User Directory"}</h3>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">Manage team members and roles.</p>
       </div>
       <div className="overflow-x-auto">
         <table className="w-full text-sm text-left text-[hsl(var(--muted-foreground))]">
           <thead className="text-xs uppercase bg-[hsl(var(--muted))/30] text-[hsl(var(--muted-foreground))] border-b border-[hsl(var(--border))]">
             <tr>
               <th className="px-6 py-4 font-semibold tracking-wider">Name</th>
               <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
               <th className="px-6 py-4 font-semibold tracking-wider">Role</th>
               <th className="px-6 py-4 text-right font-semibold tracking-wider">Actions</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-[hsl(var(--border))]">
             {users.map((u: any, i: number) => (
               <tr key={i} className="hover:bg-[hsl(var(--muted))/20] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium shadow-sm">
                          {u.name.charAt(0)}
                       </div>
                       <div>
                         <div className="font-medium text-[hsl(var(--foreground))]">{u.name}</div>
                         <div className="text-xs opacity-70 mt-0.5">{u.email}</div>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className={cn(
                       "px-2.5 py-1 text-[11px] font-medium rounded-full border",
                       u.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                       u.status === 'Invited' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                       'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                     )}>
                       {u.status}
                     </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{u.role}</td>
                  <td className="px-6 py-4 text-right">
                     <button className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] p-2 rounded-md hover:bg-[hsl(var(--muted))] transition-colors">
                        <MoreHorizontal size={18} />
                     </button>
                  </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
    </div>
  )
}
