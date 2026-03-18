'use client'

interface MaturityLevel {
  title: string
  items: string[]
  color: string
  bgColor: string
}

interface MaturityLevelsProps {
  levels: MaturityLevel[]
}

export function MaturityLevels({ levels }: MaturityLevelsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border rounded-lg overflow-hidden">
      {levels.map((level, idx) => (
        <div
          key={idx}
          className={`p-4 ${idx < levels.length - 1 ? 'border-r' : ''} border-b sm:border-b-0`}
        >
          <div
            className="text-xs font-medium text-center py-1 px-2 rounded mb-3"
            style={{ backgroundColor: level.bgColor, color: level.color }}
          >
            {level.title}
          </div>
          <ul className="space-y-2">
            {level.items.map((item, i) => (
              <li key={i} className="text-xs text-muted-foreground flex gap-2">
                <span className="flex-shrink-0">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
