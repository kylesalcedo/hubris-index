import type { ArchetypeScores } from './quiz-data'

interface TernaryPlotProps {
  scores: ArchetypeScores
}

export function TernaryPlot({ scores }: TernaryPlotProps) {
  const imageWidth = 922
  const imageHeight = 898

  const top = { x: 439, y: 189 }
  const bottomLeft = { x: 131, y: 690 }
  const bottomRight = { x: 738, y: 690 }

  const pointX = bottomLeft.x * scores.narcissus + bottomRight.x * scores.sisyphus + top.x * scores.icarus
  const pointY = bottomLeft.y * scores.narcissus + bottomRight.y * scores.sisyphus + top.y * scores.icarus

  const basePath = import.meta.env.BASE_URL

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: '48rem' }}>
        <img
          src={`${basePath}ternary-plot.jpeg`}
          alt="Ternary plot showing Icarus, Narcissus, and Sisyphus archetypes"
          style={{ width: '100%', height: 'auto', borderRadius: '0.5rem' }}
        />
        <svg
          viewBox={`0 0 ${imageWidth} ${imageHeight}`}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          <circle cx={pointX} cy={pointY} r="24" fill="#f59e0b" opacity="0.3" />
          <circle cx={pointX} cy={pointY} r="16" fill="#f59e0b" opacity="0.5" />
          <circle cx={pointX} cy={pointY} r="10" fill="#f59e0b" stroke="white" strokeWidth="3" />
        </svg>
      </div>
    </div>
  )
}
