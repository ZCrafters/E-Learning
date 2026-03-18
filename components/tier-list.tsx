'use client'

interface Tier {
  badge: string
  badgeColor: string
  badgeBgColor: string
  title: string
  description: string
  tags?: { label: string; color: string; bgColor: string }[]
}

interface TierListProps {
  tiers: Tier[]
}

export function TierList({ tiers }: TierListProps) {
  return (
    <div className="space-y-3">
      {tiers.map((tier, idx) => (
        <div key={idx} className="flex gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
          <div
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium"
            style={{ backgroundColor: tier.badgeBgColor, color: tier.badgeColor }}
          >
            {tier.badge}
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm text-foreground mb-1">{tier.title}</div>
            <div className="text-sm text-muted-foreground leading-relaxed mb-2">{tier.description}</div>
            {tier.tags && tier.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tier.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-2 py-0.5 rounded"
                    style={{ backgroundColor: tag.bgColor, color: tag.color }}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
