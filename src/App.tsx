import { useState, useRef, useEffect, DragEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal, Activity, Menu, Layout, ChevronRight, User as UserIcon, Send, Code, Database, Radio } from 'lucide-react';
import { ChatMessage } from './types';
import { generateResponse } from './lib/agent';
import { DashboardBlock } from './components/blocks/DashboardBlock';
import { TableBlock } from './components/blocks/TableBlock';
import { KanbanBlock } from './components/blocks/KanbanBlock';
import { TextBlock } from './components/blocks/TextBlock';
import { CompositeBlock } from './components/blocks/CompositeBlock';
import { MapBlock } from './components/blocks/MapBlock';
import { RadarBlock } from './components/blocks/RadarBlock';
import { BudgetVarianceBlock } from './components/blocks/BudgetVarianceBlock';

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(null);
  const [canvasTheme, setCanvasTheme] = useState<'dark' | 'glass' | 'wire'>('dark');
  const sidebarEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        sidebarEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [messages, isGenerating]);

  const handleSubmit = async (e?: FormEvent, presetInput?: string) => {
    if (e) e.preventDefault();
    
    const promptText = presetInput || input.trim();
    if (!promptText || isGenerating) return;

    const newMsgId = Date.now().toString();
    
    setInput('');
    setIsGenerating(true);
    setActiveWorkspaceId(newMsgId); // Set immediately to show "generating" skeleton

    try {
      const response = await generateResponse(promptText);
      const newMsg: ChatMessage = {
        id: newMsgId,
        prompt: promptText,
        response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const activeMessage = messages.find(m => m.id === activeWorkspaceId);

  const renderBlock = (response: ChatMessage['response']) => {
    switch(response.type) {
      case 'dashboard': return <DashboardBlock title={response.title} />;
      case 'table': return <TableBlock title={response.title} />;
      case 'kanban': return <KanbanBlock title={response.title} />;
      case 'map': return <MapBlock title={response.title} />;
      case 'radar': return <RadarBlock title={response.title} />;
      case 'budget_variance': return <BudgetVarianceBlock title={response.title} />;
      case 'composite': return <CompositeBlock components={response.components || []} />;
      case 'text': return (
        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-8 max-w-3xl shadow-lg mt-6">
           <TextBlock content={response.text || ''} />
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[hsl(var(--background))] text-[hsl(var(--foreground))] font-sans overflow-hidden selection:bg-violet-600/30">
      
      {/* Top Navigation - GenOS OS Bar */}
      <nav className="h-14 border-b border-[hsl(var(--border))] flex items-center justify-between px-6 bg-[hsl(var(--card))] relative z-30 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-violet-900/20">
             <Layout size={16} className="text-white" />
          </div>
          <span className="font-semibold tracking-tight text-lg text-white">GenOS <span className="text-[hsl(var(--muted-foreground))] font-normal ml-1 text-sm bg-[hsl(var(--muted))]/50 px-2 py-0.5 rounded-full">v1.4</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[hsl(var(--muted-foreground))] tracking-wide">
          <span className="hover:text-white cursor-pointer transition-colors flex items-center gap-2"><Database size={14} /> Architecture</span>
          <span className="hover:text-white cursor-pointer transition-colors flex items-center gap-2"><Terminal size={14} /> System Logs</span>
          <div className="px-3 py-1.5 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-full text-[11px] text-violet-400 font-mono tracking-widest flex items-center gap-2 shadow-inner">
             <div className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
             </div>
             AGENT ACTIVE
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Background glow for the whole app */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-900/10 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Sidebar: The Conversation */}
        <aside className="w-full md:w-80 lg:w-[400px] border-r border-[hsl(var(--border))] flex flex-col bg-[#080808] z-20 shrink-0 relative transition-transform">
          
          <div className="p-4 border-b border-[hsl(var(--border))] bg-[#0a0a0a]/80 backdrop-blur shrink-0 flex items-center justify-between">
             <h2 className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--muted-foreground))] flex items-center gap-2">
               <Radio size={14} className="text-violet-500" /> Session Thread
             </h2>
             <span className="text-[10px] font-mono text-[hsl(var(--muted-foreground))] opacity-50">#829-QX</span>
          </div>

          <div className="flex-1 p-5 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-[hsl(var(--border))] scrollbar-track-transparent">
            {messages.length === 0 && !isGenerating && (
               <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
                  <Sparkles size={24} className="text-[hsl(var(--muted-foreground))] mb-4" />
                  <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Agent is idle.<br/>Awaiting instructions.</p>
                  <div className="mt-8 flex flex-col gap-2 w-full max-w-[280px]">
                     <button onClick={() => handleSubmit(undefined, "I need to manage the Q4 expansion. Build me a tool to track regional leads and compute the budget variance dynamically.")} className="text-[11px] text-left bg-[hsl(var(--muted))]/30 hover:bg-[hsl(var(--muted))] border border-[hsl(var(--border))] p-3 rounded-lg transition-colors border-dashed text-[hsl(var(--muted-foreground))] hover:text-white">
                        "Manage Q4 expansion..."
                     </button>
                     <button onClick={() => handleSubmit(undefined, "Analyze our e-commerce conversion funnel and cart abandonment.")} className="text-[11px] text-left bg-[hsl(var(--muted))]/30 hover:bg-[hsl(var(--muted))] border border-[hsl(var(--border))] p-3 rounded-lg transition-colors border-dashed text-[hsl(var(--muted-foreground))] hover:text-white">
                        "E-commerce funnel..."
                     </button>
                     <button onClick={() => handleSubmit(undefined, "Generate a security audit and threat matrix dashboard.")} className="text-[11px] text-left bg-[hsl(var(--muted))]/30 hover:bg-[hsl(var(--muted))] border border-[hsl(var(--border))] p-3 rounded-lg transition-colors border-dashed text-[hsl(var(--muted-foreground))] hover:text-white">
                        "Security threat matrix..."
                     </button>
                     <button onClick={() => handleSubmit(undefined, "Show me the technical architecture and infra map.")} className="text-[11px] text-left bg-[hsl(var(--muted))]/30 hover:bg-[hsl(var(--muted))] border border-[hsl(var(--border))] p-3 rounded-lg transition-colors border-dashed text-[hsl(var(--muted-foreground))] hover:text-white">
                        "Technical architecture & infra..."
                     </button>
                  </div>
               </div>
            )}

            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`space-y-4 group cursor-pointer transition-all ${activeWorkspaceId === msg.id ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                onClick={() => setActiveWorkspaceId(msg.id)}
              >
                {/* User Message */}
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground))] font-semibold flex items-center gap-2">
                    <UserIcon size={12} /> Prompt
                  </p>
                  <div className={`p-4 bg-[hsl(var(--input))] border rounded-xl text-sm leading-relaxed text-[hsl(var(--foreground))]/90 shadow-sm transition-colors ${activeWorkspaceId === msg.id ? 'border-violet-500/30' : 'border-[hsl(var(--border))]'}`}>
                    "{msg.prompt}"
                  </div>
                </div>
                
                {/* Agent Response Log */}
                <div className="space-y-2 relative">
                  <div className="absolute left-1.5 top-8 bottom-[-20px] w-px bg-gradient-to-b from-violet-500/50 to-transparent hidden group-last:block"></div>
                  <p className="text-[10px] uppercase tracking-widest text-violet-400 font-semibold flex items-center gap-2">
                    <Sparkles size={12} /> GenOS OS
                  </p>
                  <div className="text-[13px] leading-relaxed text-[hsl(var(--muted-foreground))] pl-4 border-l-2 border-violet-500/20">
                    {msg.response.text ? (
                       <span dangerouslySetInnerHTML={{ __html: msg.response.text.replace(/([^.]+.)(.*)/, '$1 <span class="text-white opacity-90 font-medium">$2</span>') }} />
                    ) : (
                       <span>Composing interface for <span className="text-white italic">Workspace</span>. Initializing hooks...</span>
                    )}
                  </div>
                  {activeWorkspaceId === msg.id && (
                     <div className="mt-2 pl-4 flex items-center gap-2 text-xs font-mono text-emerald-400 opacity-80">
                        <ChevronRight size={12} /> Rendered in Workspace
                     </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Thinking / Generating State */}
            {isGenerating && (
              <div className="space-y-4 opacity-100 mt-6 pt-6 border-t border-[hsl(var(--border))]/50">
                 <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground))] font-semibold">Prompt</p>
                  <div className="p-4 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-xl text-sm leading-relaxed text-[hsl(var(--foreground))]/90 italic opacity-80">
                    "{input || '...'}"
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-widest text-violet-400 font-semibold">Agent Workflow</p>
                  <div className="text-[13px] leading-relaxed text-[hsl(var(--muted-foreground))] pl-4 border-l-2 border-violet-500/30">
                    Synthesizing parameters and scaffolding layout architecture...
                  </div>
                  <div className="flex gap-1.5 pt-3 pl-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={sidebarEndRef} className="h-4" />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-[hsl(var(--border))] bg-[#0a0a0a] relative z-10 shrink-0 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
            <form onSubmit={e => handleSubmit(e)} className="relative flex flex-col gap-2">
               {messages.length === 0 && (
                  <div className="absolute -top-10 left-0 right-0 flex justify-center pointer-events-none">
                     <span className="bg-violet-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg shadow-violet-900/50 animate-bounce">
                        Start Here
                     </span>
                  </div>
               )}
              <div className="relative group flex flex-col focus-within:ring-1 focus-within:ring-violet-500/50 focus-within:border-violet-500/40 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-xl overflow-hidden transition-all shadow-inner">
                <textarea 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Command GenOS to build a tool..."
                  className="w-full bg-transparent border-none outline-none text-[14px] text-[hsl(var(--foreground))] px-4 py-3 placeholder-[hsl(var(--muted-foreground))]/50 resize-none min-h-[60px] max-h-[200px]"
                  disabled={isGenerating}
                  rows={2}
                  onKeyDown={(e) => {
                     if (e.key === 'Enter' && !e.shiftKey) {
                       e.preventDefault();
                       handleSubmit();
                     }
                  }}
                />
                <div className="flex justify-between items-center px-2 py-2 bg-[hsl(var(--card))]/30 border-t border-[hsl(var(--border))]/30">
                   <div className="flex gap-1 opacity-50 px-2">
                      <Code size={14} />
                      <Activity size={14} />
                   </div>
                   <button 
                     type="submit"
                     disabled={!input.trim() || isGenerating}
                     className="bg-white text-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-violet-100 rounded-lg p-2 font-semibold transition-all active:scale-[0.95]"
                   >
                     <Send size={16} />
                   </button>
                </div>
              </div>
            </form>
          </div>
        </aside>

        {/* Main: The Generated UI Canvas */}
        <main 
          className="flex-1 bg-[hsl(var(--background))] overflow-y-auto overflow-x-hidden relative flex flex-col z-10 scrollbar-thin scrollbar-thumb-[hsl(var(--border))] scrollbar-track-transparent"
          onDragOver={(e) => { e.preventDefault(); }}
          onDrop={(e) => {
            if (!activeMessage && !isGenerating) {
              e.preventDefault();
              const newComponentType = e.dataTransfer.getData('newComponentType');
              if (newComponentType) {
                const newWorkspaceId = Date.now().toString();
                const newMsg = {
                  id: newWorkspaceId,
                  prompt: `Added a ${newComponentType} block via drag-and-drop.`,
                  response: {
                    type: 'composite' as const,
                    title: 'Custom Workspace',
                    components: [
                      {
                        id: `comp-${Date.now()}`,
                        type: newComponentType as any,
                        title: `New ${newComponentType.charAt(0).toUpperCase() + newComponentType.slice(1)} Block`,
                        layout: 'col-span-12'
                      }
                    ]
                  },
                  timestamp: new Date()
                };
                setMessages(prev => [...prev, newMsg]);
                setActiveWorkspaceId(newWorkspaceId);
              }
            }
          }}
        >
          
          {/* Floating Component Tool Palette */}
          {activeMessage && !isGenerating && (
            <div className="absolute top-1/2 right-4 -translate-y-1/2 bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-2xl p-2 flex flex-col gap-2 shadow-2xl z-50">
              <div className="text-[10px] text-center font-bold text-[hsl(var(--muted-foreground))] uppercase tracking-widest pb-2 border-b border-white/10 mb-1">Add</div>
              {[
                { type: 'stat', label: 'Stat Block', icon: <Activity size={16} /> },
                { type: 'chart', label: 'Chart', icon: <Layout size={16} /> },
                { type: 'table', label: 'Data Table', icon: <Database size={16} /> },
                { type: 'radar', label: 'Radar Chart', icon: <Radio size={16} /> },
                { type: 'code', label: 'Code Snippet', icon: <Terminal size={16} /> }
              ].map(tool => (
                <div
                  key={tool.type}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('newComponentType', tool.type);
                    e.dataTransfer.effectAllowed = 'copy';
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-violet-500/20 hover:text-violet-400 text-white/70 border border-transparent hover:border-violet-500/30 transition-all cursor-grab active:cursor-grabbing group relative"
                >
                  {tool.icon}
                  <div className="absolute right-full mr-3 px-2 py-1 bg-[#111] text-white text-[10px] uppercase font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap border border-white/10 flex items-center gap-1 shadow-lg translate-x-2 group-hover:translate-x-0 transition-all">
                    Drag {tool.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {isGenerating ? (
             <div className="flex-1 p-8 flex flex-col items-center justify-center opacity-60">
                {/* Skeleton UI for Canvas */}
                <div className="w-full max-w-5xl space-y-8 animate-pulse">
                   <div className="h-10 bg-[hsl(var(--muted))] rounded-lg w-1/3 blur-[2px]"></div>
                   <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-8 bg-[hsl(var(--muted))]/50 h-80 rounded-2xl border border-[hsl(var(--border))]/50"></div>
                      <div className="col-span-4 bg-[hsl(var(--muted))]/50 h-80 rounded-2xl border border-[hsl(var(--border))]/50"></div>
                      <div className="col-span-12 bg-[hsl(var(--muted))]/50 h-64 rounded-2xl border border-[hsl(var(--border))]/50"></div>
                   </div>
                </div>
             </div>
           ) : activeMessage ? (
             <motion.div 
               key={activeMessage.id}
               initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
               animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
               transition={{ duration: 0.4 }}
               className={`flex-[0.98] m-4 md:m-8 p-6 md:p-10 flex flex-col gap-8 max-w-[1400px] mx-auto w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] rounded-[2rem] shadow-2xl relative overflow-hidden transition-all duration-500 z-20 ${
                 canvasTheme === 'glass' 
                   ? 'bg-[#111]/30 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)]' 
                   : canvasTheme === 'wire'
                   ? 'bg-transparent border-2 border-dashed border-white/10'
                   : 'bg-[#030303] border border-white/5 ring-1 ring-white/5 bg-gradient-to-br from-[#0c0c0c] to-[#050505]'
               }`}
             >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
                <div className="absolute top-0 inset-x-20 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>
                <div className="absolute -top-40 right-[-10%] w-[500px] h-[500px] bg-violet-900/10 blur-[120px] rounded-full pointer-events-none"></div>

                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[hsl(var(--border))]/50 pb-6 relative z-10">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-white mb-2 flex items-center gap-3">
                       {activeMessage.response.title || "Generated Workspace"}
                       <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 align-middle tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.2)]">LIVE ITERATION</span>
                    </h1>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] flex items-center gap-2">
                       <Layout size={14} opacity={0.7} /> Exploring multiple design paradigms and structural layouts
                    </p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto">
                    <div className="flex gap-1 bg-[#0a0a0a] p-1 rounded-lg border border-[hsl(var(--border))] shadow-inner self-start sm:self-auto">
                       <button onClick={() => setCanvasTheme('dark')} className={`px-3 md:px-4 py-1.5 rounded-md text-[10px] md:text-[11px] font-semibold tracking-wider transition-all ${canvasTheme === 'dark' ? 'bg-[#1a1a1a]/80 text-white shadow-sm border border-white/5' : 'text-[hsl(var(--muted-foreground))] hover:text-white'}`}>V1 (Dark)</button>
                       <button onClick={() => setCanvasTheme('glass')} className={`px-3 md:px-4 py-1.5 rounded-md text-[10px] md:text-[11px] font-semibold tracking-wider transition-all ${canvasTheme === 'glass' ? 'bg-[#1a1a1a]/80 text-white shadow-sm border border-white/5' : 'text-[hsl(var(--muted-foreground))] hover:text-white'}`}>V2 (Glass)</button>
                       <button onClick={() => setCanvasTheme('wire')} className={`px-3 md:px-4 py-1.5 rounded-md text-[10px] md:text-[11px] font-semibold tracking-wider transition-all ${canvasTheme === 'wire' ? 'bg-[#1a1a1a]/80 text-white shadow-sm border border-white/5' : 'text-[hsl(var(--muted-foreground))] hover:text-white'}`}>V3 (Wire)</button>
                    </div>
                    <div className="flex gap-2 sm:gap-3 w-full sm:w-auto mt-1 sm:mt-2">
                      <button className="flex-1 sm:flex-none px-4 py-2 bg-[#050505] border border-[hsl(var(--border))] rounded-lg text-[10px] md:text-[11px] font-semibold uppercase tracking-wider hover:border-violet-500/50 hover:bg-violet-900/10 transition-colors shadow-sm flex items-center justify-center gap-2 text-[hsl(var(--muted-foreground))] hover:text-white">
                         <Layout size={14} /> Refine View
                      </button>
                      <button className="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white border border-transparent rounded-lg text-[10px] md:text-[11px] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-lg shadow-violet-900/30 flex items-center justify-center gap-2 relative group overflow-hidden">
                         <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out"></div>
                         Deploy Release <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </header>

                <div className="flex-1 pb-10 relative z-10 w-full overflow-hidden">
                   {renderBlock(activeMessage.response)}
                </div>
             </motion.div>
          ) : (
             <div className="flex-[0.98] m-4 md:m-8 border-2 border-dashed border-[hsl(var(--border))] rounded-3xl bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] flex flex-col items-center justify-center text-[hsl(var(--muted-foreground))] opacity-60 hover:opacity-100 hover:border-violet-500/50 hover:bg-violet-900/10 transition-all shadow-inner relative overflow-hidden min-h-[400px] cursor-default">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/80 pointer-events-none"></div>
                <div className="w-20 h-20 rounded-full bg-black/50 border border-white/10 flex items-center justify-center mb-6 relative z-10 shadow-2xl">
                  <Layout size={32} className="opacity-50 text-white" />
                </div>
                <h2 className="text-2xl font-light tracking-tight mb-2 relative z-10 text-white">Visual Canvas Ready</h2>
                <p className="text-sm relative z-10 text-center max-w-md">Use natural language to generate a functional workspace, or <span className="text-violet-400 font-medium font-mono uppercase text-xs tracking-wider">Drag & Drop</span> components from the palette on the right to build manually.</p>
             </div>
          )}

        </main>
      </div>

      {/* Footer Bar */}
      <footer className="h-8 border-t border-[hsl(var(--border))] bg-[#0a0a0a] px-4 sm:px-6 flex items-center justify-between text-[10px] text-[hsl(var(--muted-foreground))] font-mono uppercase tracking-widest z-30 shrink-0">
        <div className="flex gap-4 sm:gap-8 hidden sm:flex">
          <span>Session Hash: {activeWorkspaceId ? activeWorkspaceId.substring(0, 8) : 'IDLE'}</span>
          <span>Compute: Serverless Edge</span>
        </div>
        <div className="flex items-center gap-2.5 ml-auto">
          {isGenerating ? (
             <>
               <div className="w-2 h-2 rounded-full border-2 border-amber-400 border-l-transparent animate-spin"></div>
               <span className="text-amber-400">Compiling Elements...</span>
             </>
          ) : (
             <>
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
               <span className="text-emerald-400">System Ready & Synchronized</span>
             </>
          )}
        </div>
      </footer>
    </div>
  );
}
