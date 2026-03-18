'use client'

interface WarningItem {
  title: string
  description: string
}

interface WarningListProps {
  items: WarningItem[]
}

export function WarningList({ items }: WarningListProps) {
  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="flex gap-3 p-3 rounded-lg border bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900"
        >
          <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-500 mt-2" />
          <div>
            <div className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">
              {item.title}
            </div>
            <div className="text-xs text-red-700 dark:text-red-300 leading-relaxed">
              {item.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
