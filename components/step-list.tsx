'use client'

interface Step {
  number: number | string
  title: string
  description: string
  color?: string
  textColor?: string
}

interface StepListProps {
  steps: Step[]
}

export function StepList({ steps }: StepListProps) {
  return (
    <div className="space-y-3">
      {steps.map((step, idx) => (
        <div key={idx} className="flex gap-3 items-start p-3 rounded-lg border">
          <div
            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium"
            style={{
              backgroundColor: step.color || '#E1F5EE',
              color: step.textColor || '#085041',
            }}
          >
            {step.number}
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm text-foreground mb-1">{step.title}</div>
            <div className="text-sm text-muted-foreground leading-relaxed">{step.description}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
