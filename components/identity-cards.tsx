'use client'

interface IdentityItem {
  icon: string
  title: string
  description: string
  bgColor: string
  iconColor: string
}

interface IdentityCardsProps {
  items: IdentityItem[]
}

export function IdentityCards({ items }: IdentityCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="rounded-lg border border-border bg-card p-3 sm:p-4 transition-all hover:border-border hover:shadow-sm"
        >
          <div
            className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-semibold text-xs sm:text-sm mb-3"
            style={{
              backgroundColor: item.bgColor,
              color: item.iconColor,
            }}
          >
            {item.icon}
          </div>
          
          <h4 className="mb-2 text-sm sm:text-base font-semibold text-foreground">
            {item.title}
          </h4>
          
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  )
}
