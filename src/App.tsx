import { useState } from 'react'
import { QuizQuestion } from './QuizQuestion'
import { Results } from './Results'
import { questions, calculateScores, type ArchetypeScores, type Question } from './quiz-data'
import styles from './App.module.css'

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<Record<number, number>>({})
  const [scores, setScores] = useState<ArchetypeScores | null>(null)
  const [started, setStarted] = useState(false)

  const handleAnswer = (questionId: number, value: number) => {
    const newResponses = { ...responses, [questionId]: value }
    setResponses(newResponses)

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        setScores(calculateScores(newResponses))
      }
    }, 300)
  }

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setResponses({})
    setScores(null)
    setStarted(false)
  }

  if (!started) {
    return (
      <main className={styles.main}>
        <div className={styles.landing}>
          <h1 className={styles.title}>What is your mythic flaw?</h1>
          <p className={styles.subtitle}>
            33 questions. Three archetypes. Find your mortal compass — discover
            whether you burn like Icarus, endure like Sisyphus, or reflect like
            Narcissus.
          </p>
          <button className={styles.startButton} onClick={() => setStarted(true)}>
            Begin the Quiz
          </button>
        </div>
      </main>
    )
  }

  if (scores) {
    return (
      <main className={styles.main}>
        <Results scores={scores} onRestart={handleRestart} />
      </main>
    )
  }

  const currentQuestion: Question = questions[currentQuestionIndex]

  return (
    <main className={styles.main}>
      <QuizQuestion
        question={currentQuestion}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        onAnswer={handleAnswer}
        onBack={handleBack}
        canGoBack={currentQuestionIndex > 0}
        selectedValue={responses[currentQuestion.id]}
      />
    </main>
  )
}
