'use client'

interface ProgressTrackerProps {
  current: number
  total: number
}

export function ProgressTracker({ current, total }: ProgressTrackerProps) {
  const percentage = (current / total) * 100

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 rounded-lg border border-border bg-card p-3 sm:p-4">
      <span className="text-xs sm:text-sm font-medium text-muted-foreground whitespace-nowrap">
        Learning Progress
      </span>
      
      <div className="flex-1 w-full sm:w-auto">
        <div className="h-1.5 rounded-full bg-muted border border-border overflow-hidden">
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={current}
            aria-valuemin={0}
            aria-valuemax={total}
          />
        </div>
      </div>
      
      <span className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">
        {current} / {total} chapters
      </span>
    </div>
  )
}
