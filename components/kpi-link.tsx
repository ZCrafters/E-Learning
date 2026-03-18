'use client'

interface KPILinkProps {
  items: {
    title: string
    description: string
    value: string
    color: string
  }[]
}

export function KPILink({ items }: KPILinkProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-3 p-4 rounded-lg border">
          <div
            className="flex-shrink-0 w-1 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <div className="flex-1">
            <div className="font-medium text-sm text-foreground mb-1">{item.title}</div>
            <div className="text-xs text-muted-foreground leading-relaxed mb-2">
              {item.description}
            </div>
            <div className="text-lg font-semibold" style={{ color: item.color }}>
              {item.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
