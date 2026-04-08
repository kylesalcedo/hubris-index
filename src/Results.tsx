import type { ArchetypeScores } from './quiz-data'
import { getInterpretation } from './quiz-data'
import { TernaryPlot } from './TernaryPlot'
import styles from './Results.module.css'

interface ResultsProps {
  scores: ArchetypeScores
  onRestart: () => void
}

const archetypeImages: Record<string, string> = {
  icarus: '/icarus.png',
  sisyphus: '/sisyphus.png',
  narcissus: '/narcissus.jpg',
}

export function Results({ scores, onRestart }: ResultsProps) {
  const interpretation = getInterpretation(scores)

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <TernaryPlot scores={scores} />

        <div className={styles.interpretation}>
          <h2>Your Interpretation</h2>
          <p>{interpretation}</p>
        </div>

        <div className={styles.scores}>
          {(['icarus', 'sisyphus', 'narcissus'] as const).map((key) => (
            <div key={key} className={styles.scoreItem}>
              <div className={styles.scoreLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</div>
              <div className={styles.scoreValue}>{Math.round(scores[key] * 100)}%</div>
              <div className={styles.scoreImageWrap}>
                <img
                  src={archetypeImages[key]}
                  alt={key}
                  className={styles.scoreImage}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.restartRow}>
        <button className={styles.restartButton} onClick={onRestart}>
          Take Quiz Again
        </button>
      </div>
    </div>
  )
}
