'use client'

interface DataGridProps {
  items: {
    icon: string
    title: string
    description: string
  }[]
}

export function DataGrid({ items }: DataGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {items.map((item, idx) => (
        <div key={idx} className="border rounded-lg p-4 text-center">
          <div className="text-2xl mb-2">{item.icon}</div>
          <div className="text-xs font-medium text-foreground mb-1">{item.title}</div>
          <div className="text-xs text-muted-foreground leading-relaxed">{item.description}</div>
        </div>
      ))}
    </div>
  )
}
