export function TextBlock({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none text-base text-[hsl(var(--foreground))] opacity-90 leading-relaxed font-sans">
       {content.split('\n').map((line, i) => (
         <p key={i} className="mb-2 last:mb-0">{line}</p>
       ))}
    </div>
  )
}
