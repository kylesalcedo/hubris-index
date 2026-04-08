import type { ArchetypeScores } from './quiz-data'
import { getInterpretation } from './quiz-data'
import { TernaryPlot } from './TernaryPlot'
import styles from './Results.module.css'

interface ResultsProps {
  scores: ArchetypeScores
  onRestart: () => void
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
          <div className={styles.scoreItem}>
            <div className={styles.scoreLabel}>Icarus</div>
            <div className={styles.scoreValue}>{Math.round(scores.icarus * 100)}%</div>
          </div>
          <div className={styles.scoreItem}>
            <div className={styles.scoreLabel}>Sisyphus</div>
            <div className={styles.scoreValue}>{Math.round(scores.sisyphus * 100)}%</div>
          </div>
          <div className={styles.scoreItem}>
            <div className={styles.scoreLabel}>Narcissus</div>
            <div className={styles.scoreValue}>{Math.round(scores.narcissus * 100)}%</div>
          </div>
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
