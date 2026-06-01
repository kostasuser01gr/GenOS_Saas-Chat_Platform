import { useState, useEffect, DragEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, Download, Wand2 } from 'lucide-react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { UIComponent } from '../../types';
import { DashboardBlock } from './DashboardBlock';
import { TableBlock } from './TableBlock';
import { KanbanBlock } from './KanbanBlock';
import { MapBlock } from './MapBlock';
import { RadarBlock } from './RadarBlock';
import { BudgetVarianceBlock } from './BudgetVarianceBlock';
import { TextBlock } from './TextBlock';
import { CodeBlock } from './CodeBlock';
import { ChartBlock } from './ChartBlock';
import { StatBlock } from './StatBlock';
import { SortableBlock } from './SortableBlock';
import { optimizeBlockLayout } from '../../lib/agent';

export function CompositeBlock({ components: initialComponents }: { components: UIComponent[] }) {
  const [components, setComponents] = useState(initialComponents);
  const [focusedBlock, setFocusedBlock] = useState<UIComponent | null>(null);

  useEffect(() => {
    setComponents(initialComponents);
  }, [initialComponents]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setComponents((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDelete = (id: string) => {
    setComponents(prev => prev.filter(c => c.id !== id));
  };

  const handleResize = (id: string, currentLayout: string = 'col-span-12 md:col-span-6') => {
    setComponents(prev => prev.map(c => {
      if (c.id === id) {
        let newLayout = 'col-span-12 md:col-span-12';
        if (currentLayout.includes('md:col-span-4')) newLayout = 'col-span-12 md:col-span-6';
        else if (currentLayout.includes('md:col-span-6')) newLayout = 'col-span-12 md:col-span-8';
        else if (currentLayout.includes('md:col-span-8')) newLayout = 'col-span-12 md:col-span-12';
        else if (currentLayout.includes('md:col-span-12') || currentLayout === 'col-span-12') newLayout = 'col-span-12 md:col-span-4';
        
        return { ...c, layout: newLayout };
      }
      return c;
    }));
  };

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(components, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "workspace_config.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const renderSubBlock = (comp: UIComponent) => {
    switch (comp.type) {
      case 'dashboard': return <DashboardBlock title={comp.title} data={comp.data} />;
      case 'table': return <TableBlock title={comp.title} data={comp.data} />;
      case 'kanban': return <KanbanBlock title={comp.title} />;
      case 'map': return <MapBlock title={comp.title} />;
      case 'radar': return <RadarBlock title={comp.title} />;
      case 'budget_variance': return <BudgetVarianceBlock title={comp.title} />;
      case 'text': return <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 shadow-lg shadow-black/40"><TextBlock content={comp.title || ''} /></div>;
      case 'code': return <CodeBlock title={comp.title} code={comp.data} language={comp.language} />;
      case 'chart': return <ChartBlock title={comp.title} data={comp.data} />;
      case 'stat': return <StatBlock title={comp.title} data={comp.data} />;
      default: return null;
    }
  };

  const handleDragOverNative = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDropNative = (e: DragEvent) => {
    e.preventDefault();
    const newComponentType = e.dataTransfer.getData('newComponentType');
    if (newComponentType) {
      const newComponent: UIComponent = {
        id: `comp-${Date.now()}`,
        type: newComponentType as 'stat' | 'chart' | 'table' | 'radar' | 'code',
        title: `New ${newComponentType.charAt(0).toUpperCase() + newComponentType.slice(1)} Block`,
        layout: 'col-span-12 md:col-span-6',
        data: {}
      };
      setComponents(prev => [...prev, newComponent]);
    }
  };

  return (
    <div 
      className="w-full relative group/composite min-h-[200px]"
      onDragOver={handleDragOverNative}
      onDrop={handleDropNative}
    >
      <div className="absolute -top-12 right-0 z-40 opacity-0 group-hover/composite:opacity-100 transition-opacity flex items-center gap-2">
        <button 
          onClick={() => setComponents(optimizeBlockLayout(components))}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#050505] border border-[#333] hover:border-violet-500/50 hover:bg-violet-900/20 text-xs text-[#aaa] hover:text-white rounded-lg shadow-lg transition-all"
        >
          <Wand2 size={14} />
          <span className="font-mono">Auto-Layout</span>
        </button>
        <button 
          onClick={handleDownload}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#050505] border border-[#333] hover:border-emerald-500/50 hover:bg-emerald-900/20 text-xs text-[#aaa] hover:text-white rounded-lg shadow-lg transition-all"
        >
          <Download size={14} />
          <span className="font-mono">Export Config</span>
        </button>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full mt-2"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        animate="show"
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={components.map(c => c.id)}
            strategy={rectSortingStrategy}
          >
            {components.map((comp) => (
              <SortableBlock 
                key={comp.id}
                id={comp.id}
                type={comp.type}
                className={comp.layout || 'col-span-12'}
                onFocus={() => setFocusedBlock(comp)}
                onDelete={() => handleDelete(comp.id)}
                onResize={() => handleResize(comp.id, comp.layout)}
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.95, y: 20 },
                    show: { 
                      opacity: 1, 
                      scale: 1, 
                      y: 0, 
                      transition: { type: 'spring', stiffness: 200, damping: 20 } 
                    }
                  }}
                  layout
                  className="h-full w-full"
                >
                  {renderSubBlock(comp)}
                </motion.div>
              </SortableBlock>
            ))}
          </SortableContext>
        </DndContext>
      </motion.div>

      <AnimatePresence>
        {focusedBlock && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/80 backdrop-blur-sm"
               onClick={() => setFocusedBlock(null)}
             />
             
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.94, y: 20 }}
               transition={{ type: "spring", damping: 25, stiffness: 300 }}
               className="relative w-full max-w-[1600px] h-full max-h-[90vh] bg-[#050505] border border-[hsl(var(--border))] rounded-3xl shadow-2xl flex flex-col z-10 overflow-hidden"
             >
                <div className="h-16 px-6 border-b border-[hsl(var(--border))] flex items-center justify-between bg-[hsl(var(--card))] shrink-0 z-20">
                   <div className="flex items-center gap-3">
                     <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-500/20 text-violet-400 border border-violet-500/30">
                       <Maximize2 size={14} />
                     </span>
                     <div>
                        <h2 className="text-sm font-semibold text-white tracking-wide">{focusedBlock.title || "Interactive View"}</h2>
                        <p className="text-[10px] text-[hsl(var(--muted-foreground))] uppercase tracking-widest font-mono mt-0.5">Focus Mode Active</p>
                     </div>
                   </div>
                   <button 
                     onClick={() => setFocusedBlock(null)}
                     className="p-2 border border-transparent hover:border-[#333] hover:bg-[#111] rounded-lg transition-colors text-[hsl(var(--muted-foreground))] hover:text-white"
                   >
                     <X size={18} />
                   </button>
                </div>

                <div className="flex-1 overflow-auto p-4 md:p-8 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] focused-mode-block relative">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-900/10 blur-[150px] rounded-full pointer-events-none"></div>
                   <div className="w-full h-full relative z-10 text-white">
                      {renderSubBlock(focusedBlock)}
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
