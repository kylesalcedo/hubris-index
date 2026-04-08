import { useState, useEffect, useRef } from 'react'
import { QuizQuestion } from './QuizQuestion'
import { Results } from './Results'
import { questions, calculateScores, type ArchetypeScores, type Question } from './quiz-data'
import styles from './App.module.css'

const DEV_SEQUENCE = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'ArrowUp']

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<Record<number, number>>({})
  const [scores, setScores] = useState<ArchetypeScores | null>(null)
  const [started, setStarted] = useState(false)
  const devKeys = useRef<string[]>([])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      devKeys.current.push(e.key)
      if (devKeys.current.length > DEV_SEQUENCE.length) {
        devKeys.current = devKeys.current.slice(-DEV_SEQUENCE.length)
      }
      if (devKeys.current.length === DEV_SEQUENCE.length &&
          devKeys.current.every((k, i) => k === DEV_SEQUENCE[i])) {
        devKeys.current = []
        setStarted(true)
        setScores({ icarus: 1 / 3, sisyphus: 1 / 3, narcissus: 1 / 3 })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Preload results images during quiz
  useEffect(() => {
    if (started && !scores) {
      const basePath = import.meta.env.BASE_URL
      const images = [`${basePath}ternary-plot.jpeg`, '/icarus.jpg', '/sisyphus.jpg', '/narcissius.jpg']
      images.forEach((src) => {
        const img = new Image()
        img.src = src
      })
    }
  }, [started, scores])

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
