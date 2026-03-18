'use client'

import { ReactNode } from 'react'

interface PointCardProps {
  icon: ReactNode
  title: string
  description: string
  tags?: { label: string; color: string; bgColor: string }[]
}

export function PointCard({ icon, title, description, tags }: PointCardProps) {
  return (
    <div className="flex gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
      <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm text-foreground mb-1">{title}</div>
        <div className="text-sm text-muted-foreground leading-relaxed">{description}</div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, idx) => (
              <span
                key={idx}
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
  )
}
