'use client'

import { useState } from 'react'
import { Play, RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react'

interface ScenarioStep {
  id: string
  description: string
  situation: string
  choices: {
    id: string
    text: string
    isCorrect: boolean
    feedback: string
    nextStepId?: string
  }[]
}

interface ScenarioSimulatorProps {
  title: string
  description: string
  steps: ScenarioStep[]
}

export function ScenarioSimulator({ title, description, steps }: ScenarioSimulatorProps) {
  const [currentStepId, setCurrentStepId] = useState<string>(steps[0]?.id)
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [history, setHistory] = useState<{stepId: string, choiceId: string, wasCorrect: boolean}[]>([])

  const currentStep = steps.find(s => s.id === currentStepId)

  const handleChoice = (choiceId: string) => {
    if (showFeedback) return
    
    setSelectedChoice(choiceId)
    setShowFeedback(true)
    
    const choice = currentStep?.choices.find(c => c.id === choiceId)
    if (choice) {
      setHistory([...history, { stepId: currentStepId, choiceId, wasCorrect: choice.isCorrect }])
    }
  }

  const handleNext = () => {
    const choice = currentStep?.choices.find(c => c.id === selectedChoice)
    
    if (choice?.nextStepId) {
      setCurrentStepId(choice.nextStepId)
      setSelectedChoice(null)
      setShowFeedback(false)
    } else {
      setCompleted(true)
    }
  }

  const handleRetry = () => {
    setCurrentStepId(steps[0]?.id)
    setSelectedChoice(null)
    setShowFeedback(false)
    setCompleted(false)
    setHistory([])
  }

  const correctCount = history.filter(h => h.wasCorrect).length
  const totalAnswered = history.length

  if (completed) {
    const percentage = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0
    
    return (
      <div className="border rounded-xl p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
        <div className="text-center">
          <div className="text-5xl mb-4">🎯</div>
          <h3 className="text-xl font-bold text-foreground mb-2">Simulasi Selesai!</h3>
          <div className="text-3xl font-bold text-emerald-600 mb-2">
            {correctCount} / {totalAnswered}
          </div>
          <div className="text-sm text-muted-foreground mb-4">
            Keputusan tepat: {percentage}%
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            {percentage >= 80 
              ? 'Excellent! Anda mengambil keputusan yang sangat baik dalam setiap situasi.' 
              : percentage >= 60 
                ? 'Good! Ada beberapa area yang bisa ditingkatkan.' 
                : 'Keep practicing! Pelajari dari feedback di setiap pilihan.'}
          </p>
          <button
            onClick={handleRetry}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Ulangi Simulasi
          </button>
        </div>
      </div>
    )
  }

  const selectedChoiceData = currentStep?.choices.find(c => c.id === selectedChoice)

  return (
    <div className="border rounded-xl overflow-hidden bg-card">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-4">
        <div className="flex items-center gap-2 text-white mb-1">
          <Play className="w-4 h-4" />
          <span className="text-sm font-medium">Simulasi Skenario</span>
        </div>
        <h3 className="text-white font-bold">{title}</h3>
        <p className="text-emerald-100 text-xs mt-1">{description}</p>
      </div>

      {/* Progress */}
      <div className="px-4 py-2 bg-muted/30 border-b">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Progress Simulasi</span>
          <span>Langkah {history.length + 1}</span>
        </div>
        <div className="mt-1 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 rounded-full transition-all"
            style={{ width: `${(history.length / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {currentStep && (
          <>
            {/* Context */}
            <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-4 rounded-r-lg mb-4">
              <div className="text-xs font-medium text-amber-700 dark:text-amber-300 mb-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Situasi
              </div>
              <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                {currentStep.situation}
              </p>
            </div>

            {/* Question */}
            <div className="mb-4">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Apa yang akan Anda lakukan?
              </div>
              <p className="text-sm font-medium text-foreground leading-relaxed">
                {currentStep.description}
              </p>
            </div>

            {/* Choices */}
            <div className="space-y-2 mb-4">
              {currentStep.choices.map((choice, idx) => {
                const isSelected = selectedChoice === choice.id
                const showResult = showFeedback && isSelected
                
                return (
                  <button
                    key={choice.id}
                    onClick={() => handleChoice(choice.id)}
                    disabled={showFeedback}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      showResult
                        ? choice.isCorrect
                          ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                          : 'border-red-500 bg-red-50 dark:bg-red-950/20'
                        : isSelected
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20'
                          : 'border-muted hover:border-emerald-300 hover:bg-emerald-50/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                        showResult
                          ? choice.isCorrect
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {showResult ? (
                          choice.isCorrect ? <CheckCircle2 className="w-4 h-4" /> : '✗'
                        ) : (
                          String.fromCharCode(65 + idx)
                        )}
                      </div>
                      <span className={`text-sm ${showResult && choice.isCorrect ? 'text-green-700 dark:text-green-300 font-medium' : 'text-foreground'}`}>
                        {choice.text}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Feedback */}
            {showFeedback && selectedChoiceData && (
              <div className={`border-l-4 p-4 rounded-r-lg mb-4 ${
                selectedChoiceData.isCorrect 
                  ? 'bg-green-50 border-green-500 dark:bg-green-950/20' 
                  : 'bg-red-50 border-red-500 dark:bg-red-950/20'
              }`}>
                <div className={`text-xs font-medium mb-1 ${
                  selectedChoiceData.isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                }`}>
                  {selectedChoiceData.isCorrect ? '✓ Keputusan Tepat!' : '✗ Perlu Pertimbangan Ulang'}
                </div>
                <p className={`text-sm leading-relaxed ${
                  selectedChoiceData.isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {selectedChoiceData.feedback}
                </p>
              </div>
            )}

            {/* Next Button */}
            {showFeedback && (
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                >
                  {selectedChoiceData?.nextStepId ? 'Lanjutkan →' : 'Selesai'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
