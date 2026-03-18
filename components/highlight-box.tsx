'use client'

import { ReactNode } from 'react'

interface HighlightBoxProps {
  children: ReactNode
  color?: string
  bgColor?: string
}

export function HighlightBox({ children, color = '#378ADD', bgColor = '#E6F1FB' }: HighlightBoxProps) {
  return (
    <div
      className="rounded-lg p-4 text-sm leading-relaxed border-l-4"
      style={{ backgroundColor: bgColor, borderLeftColor: color, color: '#185FA5' }}
    >
      {children}
    </div>
  )
}
