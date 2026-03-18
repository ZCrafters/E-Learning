'use client'

interface ChecklistProps {
  items: string[]
  checkedColor?: string
  checkedTextColor?: string
}

export function Checklist({
  items,
  checkedColor = '#EAF3DE',
  checkedTextColor = '#3B6D11',
}: ChecklistProps) {
  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-3 items-start">
          <div
            className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs mt-0.5"
            style={{ backgroundColor: checkedColor, color: checkedTextColor }}
          >
            ✓
          </div>
          <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
        </div>
      ))}
    </div>
  )
}
