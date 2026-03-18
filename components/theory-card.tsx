'use client'

interface TheoryCardProps {
  title: string
  content: string
  color?: string
}

export function TheoryCard({ title, content, color = '#378ADD' }: TheoryCardProps) {
  return (
    <div className="flex gap-3 sm:gap-4 rounded-lg border border-border bg-muted p-3 sm:p-4">
      <div
        className="w-2 h-2 rounded-full flex-shrink-0 mt-1 sm:mt-1.5"
        style={{ backgroundColor: color }}
      />
      <div className="flex-1 min-w-0">
        <div className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {title}
        </div>
        <p className="text-sm text-foreground leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  )
}
