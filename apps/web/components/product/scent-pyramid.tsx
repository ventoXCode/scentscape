interface ScentPyramidProps {
  top: string[];
  heart: string[];
  base: string[];
}

export function ScentPyramid({ top, heart, base }: ScentPyramidProps) {
  return (
    <div className="space-y-3">
      <div className="bg-amber-50 p-4 rounded-lg">
        <p className="text-xs uppercase tracking-wider text-amber-800 mb-2 font-medium">
          Top Notes
        </p>
        <div className="flex flex-wrap gap-2">
          {top.map((note) => (
            <span
              key={note}
              className="px-2 py-1 bg-amber-100 text-amber-900 rounded text-sm"
            >
              {note}
            </span>
          ))}
          {top.length === 0 && (
            <span className="text-sm text-amber-700 italic">—</span>
          )}
        </div>
      </div>

      <div className="bg-rose-50 p-4 rounded-lg">
        <p className="text-xs uppercase tracking-wider text-rose-800 mb-2 font-medium">
          Heart Notes
        </p>
        <div className="flex flex-wrap gap-2">
          {heart.map((note) => (
            <span
              key={note}
              className="px-2 py-1 bg-rose-100 text-rose-900 rounded text-sm"
            >
              {note}
            </span>
          ))}
          {heart.length === 0 && (
            <span className="text-sm text-rose-700 italic">—</span>
          )}
        </div>
      </div>

      <div className="bg-stone-100 p-4 rounded-lg">
        <p className="text-xs uppercase tracking-wider text-stone-600 mb-2 font-medium">
          Base Notes
        </p>
        <div className="flex flex-wrap gap-2">
          {base.map((note) => (
            <span
              key={note}
              className="px-2 py-1 bg-stone-200 text-stone-800 rounded text-sm"
            >
              {note}
            </span>
          ))}
          {base.length === 0 && (
            <span className="text-sm text-stone-600 italic">—</span>
          )}
        </div>
      </div>
    </div>
  );
}
