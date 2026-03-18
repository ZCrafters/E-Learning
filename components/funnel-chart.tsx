'use client'

interface FunnelStage {
  label: string
  description: string
  percentage: number
  color: string
  textColor: string
}

interface FunnelChartProps {
  stages: FunnelStage[]
}

export function FunnelChart({ stages }: FunnelChartProps) {
  const maxPercentage = Math.max(...stages.map(s => s.percentage))

  return (
    <div className="space-y-2">
      {stages.map((stage, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <div className="w-20 text-xs text-muted-foreground text-right flex-shrink-0">
            {stage.label}
          </div>
          <div className="flex-1 h-9 bg-muted rounded-lg overflow-hidden">
            <div
              className="h-full flex items-center px-3 text-xs font-medium transition-all duration-500"
              style={{
                width: `${(stage.percentage / maxPercentage) * 100}%`,
                backgroundColor: stage.color,
                color: stage.textColor,
              }}
            >
              {stage.description}
            </div>
          </div>
          <div className="w-10 text-xs text-muted-foreground flex-shrink-0">
            {stage.percentage}%
          </div>
        </div>
      ))}
    </div>
  )
}
