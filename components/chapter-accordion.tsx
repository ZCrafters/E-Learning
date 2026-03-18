'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface ChapterAccordionProps {
  number: string
  title: string
  subtitle: string
  completed?: boolean
  color: string
  children: React.ReactNode
}

export function ChapterAccordion({
  number,
  title,
  subtitle,
  completed = false,
  color,
  children,
}: ChapterAccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={`overflow-hidden rounded-lg border transition-all ${
        isOpen
          ? 'border-border bg-card'
          : 'border-border bg-card hover:bg-muted'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 sm:px-5 sm:py-4 flex items-center gap-3 sm:gap-4 text-left transition-colors hover:bg-muted"
        aria-expanded={isOpen}
        aria-controls={`chapter-${number}`}
      >
        {/* Color stripe */}
        <div
          className="w-1 rounded-full flex-shrink-0 h-10 sm:h-12"
          style={{ backgroundColor: color }}
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-1">
            Chapter {number}
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1 line-clamp-2">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
            {subtitle}
          </p>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {completed && (
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200">
              ✓ Done
            </span>
          )}
          <ChevronDown
            size={20}
            className={`text-muted-foreground transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Content */}
      {isOpen && (
        <div
          id={`chapter-${number}`}
          className="border-t border-border px-4 py-4 sm:px-5 sm:py-6 bg-card"
        >
          <div className="prose prose-sm max-w-none dark:prose-invert">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
