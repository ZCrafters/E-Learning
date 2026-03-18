'use client'

interface MatrixItem {
  badge: string
  badgeColor: string
  badgeBgColor: string
  title: string
  description: string
  items: string[]
  bgColor: string
  textColor: string
}

interface MatrixGridProps {
  items: MatrixItem[]
}

export function MatrixGrid({ items }: MatrixGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="p-4 rounded-lg relative"
          style={{ backgroundColor: item.bgColor, color: item.textColor }}
        >
          <span
            className="absolute top-2 right-2 text-xs font-medium px-2 py-0.5 rounded"
            style={{ backgroundColor: item.badgeBgColor, color: item.badgeColor }}
          >
            {item.badge}
          </span>
          <div className="font-medium text-sm mb-1 pr-20">{item.title}</div>
          <div className="text-xs opacity-90 mb-2">{item.description}</div>
          <div className="space-y-1">
            {item.items.map((listItem, i) => (
              <div key={i} className="text-xs opacity-80">
                → {listItem}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
