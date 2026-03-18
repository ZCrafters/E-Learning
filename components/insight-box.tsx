'use client'

interface InsightBoxProps {
  children: React.ReactNode
  color?: string
}

export function InsightBox({ children, color = '#378ADD' }: InsightBoxProps) {
  return (
    <div
      className="rounded-r-lg border-l-4 border-r border-t border-b border-border bg-muted p-3 sm:p-4 my-4 sm:my-6"
      style={{ borderLeftColor: color }}
    >
      <p className="text-sm sm:text-base text-foreground leading-relaxed">
        {children}
      </p>
    </div>
  )
}
