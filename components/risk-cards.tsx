'use client'

interface RiskCardProps {
  items: {
    label: string
    sublabel: string
    value: string
    percentage: number
    color: string
    description: string
  }[]
}

export function RiskCards({ items }: RiskCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((item, idx) => (
        <div key={idx} className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-sm font-medium text-foreground">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.sublabel}</div>
            </div>
            <div className="text-2xl font-semibold" style={{ color: item.color }}>
              {item.value}
            </div>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-3">
            <div
              className="h-full rounded-full"
              style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
            />
          </div>
          <div className="text-xs text-muted-foreground leading-relaxed pt-2 border-t">
            {item.description}
          </div>
        </div>
      ))}
    </div>
  )
}
