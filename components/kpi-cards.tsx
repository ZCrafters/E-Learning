'use client'

interface KPIItem {
  label: string
  value: string
  description: string
  color: 'blue' | 'green' | 'orange' | 'pink'
}

interface KPICardsProps {
  items: KPIItem[]
}

const colorMap = {
  blue: { top: 'bg-blue-500', bg: 'bg-blue-50 dark:bg-blue-950' },
  green: { top: 'bg-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950' },
  orange: { top: 'bg-amber-500', bg: 'bg-amber-50 dark:bg-amber-950' },
  pink: { top: 'bg-rose-500', bg: 'bg-rose-50 dark:bg-rose-950' },
}

export function KPICards({ items }: KPICardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`rounded-lg border border-border ${colorMap[item.color].bg} p-3 sm:p-4 relative overflow-hidden`}
        >
          <div className={`absolute top-0 left-0 right-0 h-1 ${colorMap[item.color].top}`} />
          
          <div className="mt-2">
            <div className="mb-1 text-xs font-semibold text-muted-foreground">
              {item.label}
            </div>
            <div className="mb-1 text-xl sm:text-2xl font-semibold text-foreground">
              {item.value}
            </div>
            <div className="text-xs text-muted-foreground leading-tight">
              {item.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
