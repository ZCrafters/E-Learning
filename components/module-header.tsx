'use client'

interface ModuleHeaderProps {
  title: string
  subtitle: string
  tags: string[]
}

export function ModuleHeader({ title, subtitle, tags }: ModuleHeaderProps) {
  return (
    <div className="rounded-lg border border-border bg-muted p-4 sm:p-6 md:p-8">
      <div className="mb-3 sm:mb-2 text-xs sm:text-sm font-semibold tracking-wider text-muted-foreground uppercase">
        FINATRA · Training Module · 2025
      </div>
      
      <h1 className="mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-4xl font-medium leading-tight text-foreground">
        {title}
      </h1>
      
      <p className="mb-4 sm:mb-5 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
        {subtitle}
      </p>
      
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="inline-block rounded-full border border-border bg-background px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
