'use client'

interface ExampleCardProps {
  tag: string
  content: React.ReactNode
}

export function ExampleCard({ tag, content }: ExampleCardProps) {
  return (
    <div className="rounded-lg border bg-muted/50 p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">
        {tag}
      </div>
      <div className="text-sm text-foreground leading-relaxed">{content}</div>
    </div>
  )
}
