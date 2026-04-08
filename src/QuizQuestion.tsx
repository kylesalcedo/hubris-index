import type { Question } from './quiz-data'
import styles from './QuizQuestion.module.css'

interface QuizQuestionProps {
  question: Question
  currentQuestion: number
  totalQuestions: number
  onAnswer: (questionId: number, value: number) => void
  onBack?: () => void
  canGoBack?: boolean
  selectedValue?: number
}

const options = [
  { value: 1, label: "Strongly Disagree", className: "optionRed1" },
  { value: 2, label: "Disagree", className: "optionRed2" },
  { value: 3, label: "Neutral", className: "optionNeutral" },
  { value: 4, label: "Agree", className: "optionGreen1" },
  { value: 5, label: "Strongly Agree", className: "optionGreen2" },
] as const

export function QuizQuestion({
  question,
  currentQuestion,
  totalQuestions,
  onAnswer,
  onBack,
  canGoBack = false,
}: QuizQuestionProps) {
  const progress = ((currentQuestion - 1) / totalQuestions) * 100

  return (
    <div className={styles.wrapper}>
      <div className={styles.progress}>
        <div className={styles.progressLabels}>
          <span>Question {currentQuestion} of {totalQuestions}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.questionText}>
          <h2>{question.text}</h2>
        </div>

        <div className={styles.options}>
          {options.map((option) => (
            <button
              key={option.value}
              className={`${styles.optionButton} ${styles[option.className]}`}
              onClick={() => onAnswer(question.id, option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className={`${styles.backSection} ${canGoBack ? styles.backVisible : styles.backHidden}`}>
          <button
            className={styles.backButton}
            onClick={onBack}
            disabled={!canGoBack}
            tabIndex={canGoBack ? 0 : -1}
          >
            &larr; Back
          </button>
        </div>
      </div>
    </div>
  )
}
