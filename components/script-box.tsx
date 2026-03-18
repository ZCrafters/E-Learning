'use client'

interface ScriptBoxProps {
  label: string
  script: string
  explanation?: string
  variant?: 'wrong' | 'correct' | 'neutral'
}

export function ScriptBox({ label, script, explanation, variant = 'neutral' }: ScriptBoxProps) {
  const variantStyles = {
    wrong: 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900',
    correct: 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900',
    neutral: 'bg-muted/50',
  }

  const labelStyles = {
    wrong: 'text-red-600',
    correct: 'text-green-600',
    neutral: 'text-muted-foreground',
  }

  return (
    <div className={`rounded-lg border p-4 ${variantStyles[variant]}`}>
      <div className={`text-xs font-medium uppercase tracking-wide mb-2 ${labelStyles[variant]}`}>
        {variant === 'wrong' && '❌ '}{variant === 'correct' && '✓ '}{label}
      </div>
      <blockquote className="text-sm italic text-foreground leading-relaxed mb-3">
        "{script}"
      </blockquote>
      {explanation && (
        <p className="text-xs text-muted-foreground leading-relaxed">{explanation}</p>
      )}
    </div>
  )
}
