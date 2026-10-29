export function CategoryPills({ categories, active, onChange }: { categories: string[], active: string, onChange: (c: string) => void }) {
  return (
    <div className="flex overflow-x-auto scrollbar-hide gap-2 py-2">
      {['All', ...categories].map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-pill text-sm whitespace-nowrap transition ${active === cat ? 'bg-brand text-white' : 'bg-white/5 text-muted hover:bg-white/10'}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}