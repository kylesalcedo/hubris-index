import type { ArchetypeScores } from './quiz-data'
import styles from './TernaryPlot.module.css'

interface TernaryPlotProps {
  scores: ArchetypeScores
}

// Equilateral triangle vertices in SVG coordinate space (600x560)
const TOP = { x: 300, y: 30 }       // Icarus
const BL  = { x: 35,  y: 490 }      // Narcissus
const BR  = { x: 565, y: 490 }      // Sisyphus

function lerp(a: { x: number; y: number }, b: { x: number; y: number }, t: number) {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }
}

export function TernaryPlot({ scores }: TernaryPlotProps) {
  const basePath = import.meta.env.BASE_URL

  // Barycentric → cartesian (mathematically exact)
  const pointX = TOP.x * scores.icarus + BL.x * scores.narcissus + BR.x * scores.sisyphus
  const pointY = TOP.y * scores.icarus + BL.y * scores.narcissus + BR.y * scores.sisyphus

  // Generate gridlines at 10% intervals
  const gridlines: { x1: number; y1: number; x2: number; y2: number }[] = []
  for (let i = 1; i <= 9; i++) {
    const t = i / 10
    // Lines parallel to each edge
    // Parallel to bottom (BL→BR)
    const pBL1 = lerp(TOP, BL, t)
    const pBR1 = lerp(TOP, BR, t)
    gridlines.push({ x1: pBL1.x, y1: pBL1.y, x2: pBR1.x, y2: pBR1.y })
    // Parallel to left (TOP→BL)
    const pTOP2 = lerp(BR, TOP, t)
    const pBL2 = lerp(BR, BL, t)
    gridlines.push({ x1: pTOP2.x, y1: pTOP2.y, x2: pBL2.x, y2: pBL2.y })
    // Parallel to right (TOP→BR)
    const pTOP3 = lerp(BL, TOP, t)
    const pBR3 = lerp(BL, BR, t)
    gridlines.push({ x1: pTOP3.x, y1: pTOP3.y, x2: pBR3.x, y2: pBR3.y })
  }

  return (
    <div className={styles.container}>
      <svg viewBox="0 0 600 560" className={styles.svg}>
        {/* Gridlines */}
        {gridlines.map((l, i) => (
          <line
            key={i}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="var(--card-border)" strokeWidth="0.5"
          />
        ))}

        {/* Triangle outline */}
        <polygon
          points={`${TOP.x},${TOP.y} ${BL.x},${BL.y} ${BR.x},${BR.y}`}
          fill="none"
          stroke="var(--text-muted)"
          strokeWidth="1.5"
        />

        {/* Pin */}
        <circle cx={pointX} cy={pointY} r="20" fill="#d4a574" opacity="0.2" />
        <circle cx={pointX} cy={pointY} r="12" fill="#d4a574" opacity="0.4" />
        <circle cx={pointX} cy={pointY} r="7" fill="#d4a574" stroke="var(--text)" strokeWidth="2" />
      </svg>

      {/* Corner images */}
      <div className={`${styles.corner} ${styles.cornerTop}`}>
        <img src={`${basePath}icarus.jpg`} alt="Icarus" className={styles.cornerImage} />
        <span className={styles.cornerLabel}>Icarus</span>
      </div>
      <div className={`${styles.corner} ${styles.cornerBL}`}>
        <img src={`${basePath}narcissius.jpg`} alt="Narcissus" className={styles.cornerImage} />
        <span className={styles.cornerLabel}>Narcissus</span>
      </div>
      <div className={`${styles.corner} ${styles.cornerBR}`}>
        <img src={`${basePath}sisyphus.jpg`} alt="Sisyphus" className={styles.cornerImage} />
        <span className={styles.cornerLabel}>Sisyphus</span>
      </div>
    </div>
  )
}
