import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripHorizontal, Maximize2, Trash2, Columns } from 'lucide-react';
import { motion } from 'motion/react';
import { Key, ReactNode } from 'react';

export function SortableBlock({ id, className, children, onFocus, onDelete, onResize, type }: { key?: Key, id: string, className?: string, children: ReactNode, onFocus: () => void, onDelete: () => void, onResize: () => void, type?: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <motion.div 
      ref={setNodeRef} 
      style={style} 
      className={`${className} relative group cursor-default`}
      layout
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    >
      <div className="absolute inset-0 z-20 border-2 border-transparent group-hover:border-violet-500/30 rounded-2xl transition-all pointer-events-none group-hover:shadow-[0_0_20px_rgba(124,58,237,0.1)]"></div>
      
      {/* Drag Handle */}
      <div 
        {...attributes} 
        {...listeners}
        className="absolute top-3 left-3 z-30 bg-[#0a0a0a]/90 border border-[#333] text-white/50 hover:text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-xl backdrop-blur-sm cursor-grab active:cursor-grabbing pointer-events-auto"
      >
        <GripHorizontal size={16} />
      </div>

      {/* Top Right Buttons */}
      <div className="absolute top-3 right-3 z-30 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all pointer-events-auto">
        <button
          onClick={(e) => { e.stopPropagation(); onResize(); }}
          className="bg-[#0a0a0a]/90 border border-[#333] text-white/50 hover:text-emerald-400 hover:border-emerald-500/50 p-2 rounded-lg shadow-xl backdrop-blur-sm transition-colors"
          title="Cycle Width"
        >
          <Columns size={16} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onFocus(); }}
          className="bg-[#0a0a0a]/90 border border-[#333] text-white/50 hover:text-white border-transparent hover:border-white/30 p-2 rounded-lg shadow-xl backdrop-blur-sm transition-colors"
          title="Fullscreen Mode"
        >
          <Maximize2 size={16} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="bg-[#0a0a0a]/90 border border-[#333] text-white/50 hover:text-red-400 hover:border-red-500/50 p-2 rounded-lg shadow-xl backdrop-blur-sm transition-colors"
          title="Remove Block"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Metadata Badge */}
      <div className="absolute bottom-3 left-3 z-30 bg-[#0a0a0a]/90 border border-[#333] text-[9px] uppercase tracking-widest text-[#888] font-mono px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all shadow-xl backdrop-blur-sm pointer-events-none flex items-center gap-2">
        <span className="text-violet-400 font-bold">{type || 'BLOCK'}</span>
        <span className="opacity-40">|</span>
        <span className="opacity-70">{id}</span>
      </div>

      <div className="h-full pointer-events-auto">
        {children}
      </div>
    </motion.div>
  );
}
