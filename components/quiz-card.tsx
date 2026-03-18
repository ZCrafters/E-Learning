'use client'

import { useState } from 'react'
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react'

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface QuizCardProps {
  title: string
  questions: QuizQuestion[]
  onComplete?: (score: number, total: number) => void
}

export function QuizCard({ title, questions, onComplete }: QuizCardProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())

  const handleAnswer = (index: number) => {
    if (answeredQuestions.has(currentQuestion)) return
    
    setSelectedAnswer(index)
    setShowExplanation(true)
    
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
    
    setAnsweredQuestions(new Set([...answeredQuestions, currentQuestion]))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setCompleted(true)
      onComplete?.(score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0), questions.length)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const handleRetry = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setCompleted(false)
    setAnsweredQuestions(new Set())
  }

  if (completed) {
    const finalScore = score
    const percentage = Math.round((finalScore / questions.length) * 100)
    
    return (
      <div className="border rounded-xl p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <div className="text-center">
          <div className="text-5xl mb-4">
            {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Quiz Selesai!</h3>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {finalScore} / {questions.length}
          </div>
          <div className="text-sm text-muted-foreground mb-4">
            Skor Anda: {percentage}%
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            {percentage >= 80 
              ? 'Luar biasa! Pemahaman Anda sangat baik.' 
              : percentage >= 60 
                ? 'Bagus! Tingkatkan lagi pemahaman Anda.' 
                : 'Jangan menyerah! Pelajari kembali materinya.'}
          </p>
          <button
            onClick={handleRetry}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const isAnswered = answeredQuestions.has(currentQuestion)

  return (
    <div className="border rounded-xl overflow-hidden bg-card">
      {/* Header */}
      <div className="bg-muted/50 px-4 py-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium">{title}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          Soal {currentQuestion + 1} dari {questions.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-2 bg-muted/30">
        <div className="flex gap-1">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                idx < currentQuestion 
                  ? 'bg-green-500' 
                  : idx === currentQuestion 
                    ? 'bg-blue-500' 
                    : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="p-5">
        <h4 className="text-sm font-medium text-foreground mb-4 leading-relaxed">
          {question.question}
        </h4>

        {/* Options */}
        <div className="space-y-2 mb-4">
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx
            const isCorrect = idx === question.correctAnswer
            const showCorrectness = isAnswered && (isSelected || isCorrect)
            
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${
                  showCorrectness
                    ? isCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                      : isSelected
                        ? 'border-red-500 bg-red-50 dark:bg-red-950/20'
                        : 'border-muted bg-muted/30'
                    : isSelected
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                      : 'border-muted hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    showCorrectness
                      ? isCorrect
                        ? 'border-green-500 bg-green-500'
                        : isSelected
                          ? 'border-red-500 bg-red-500'
                          : 'border-muted'
                      : isSelected
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-muted'
                  }`}>
                    {showCorrectness && (
                      isCorrect 
                        ? <CheckCircle2 className="w-3 h-3 text-white" />
                        : isSelected && <XCircle className="w-3 h-3 text-white" />
                    )}
                    {!showCorrectness && isSelected && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className={showCorrectness && isCorrect ? 'text-green-700 dark:text-green-300 font-medium' : ''}>
                    {option}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-3 rounded-r-lg mb-4">
            <div className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">
              Penjelasan:
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ← Sebelumnya
          </button>
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {currentQuestion === questions.length - 1 ? 'Selesai' : 'Selanjutnya →'}
          </button>
        </div>
      </div>
    </div>
  )
}
