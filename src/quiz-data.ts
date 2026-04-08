export type Archetype = "icarus" | "sisyphus" | "narcissus"

export interface Question {
  id: number
  text: string
  archetype: Archetype
}

export const questions: Question[] = [
  // Icarus - Ambition & Overreach
  { id: 1, text: "I often take bold risks when pursuing my ideas.", archetype: "icarus" },
  { id: 2, text: "I feel most alive when pushing beyond my limits.", archetype: "icarus" },
  { id: 3, text: "I'm more interested in innovation than stability.", archetype: "icarus" },
  { id: 4, text: "I'd rather fail spectacularly than never try.", archetype: "icarus" },
  { id: 5, text: "Rules and conventions often feel like cages.", archetype: "icarus" },
  { id: 6, text: "I'm drawn to things that others say are impossible.", archetype: "icarus" },
  { id: 7, text: "My creativity sometimes outpaces my discipline.", archetype: "icarus" },
  { id: 8, text: "I get restless when progress feels slow.", archetype: "icarus" },
  { id: 9, text: "I chase inspiration even if it costs me comfort.", archetype: "icarus" },
  { id: 10, text: "Success without passion feels meaningless.", archetype: "icarus" },
  { id: 11, text: "I believe breaking boundaries is essential to growth.", archetype: "icarus" },

  // Sisyphus - Discipline & Endurance
  { id: 12, text: "I take pride in showing up every day, no matter what.", archetype: "sisyphus" },
  { id: 13, text: "I value consistency over flashes of brilliance.", archetype: "sisyphus" },
  { id: 14, text: "I find meaning in effort itself, not just results.", archetype: "sisyphus" },
  { id: 15, text: "Routine gives me strength and direction.", archetype: "sisyphus" },
  { id: 16, text: "I'd rather build something slowly than chase fast wins.", archetype: "sisyphus" },
  { id: 17, text: "I rarely give up, even when progress is invisible.", archetype: "sisyphus" },
  { id: 18, text: "I believe mastery requires repetition and patience.", archetype: "sisyphus" },
  { id: 19, text: "I am comfortable with delayed gratification.", archetype: "sisyphus" },
  { id: 20, text: "I find satisfaction in solving hard, tedious problems.", archetype: "sisyphus" },
  { id: 21, text: "I tend to keep commitments even when I no longer feel motivated.", archetype: "sisyphus" },
  { id: 22, text: "Discipline is my way of creating freedom.", archetype: "sisyphus" },

  // Narcissus - Reflection & Self-Awareness
  { id: 23, text: "I spend a lot of time thinking about who I am and why.", archetype: "narcissus" },
  { id: 24, text: "I'm sensitive to how others perceive me.", archetype: "narcissus" },
  { id: 25, text: "I find beauty in introspection and self-expression.", archetype: "narcissus" },
  { id: 26, text: "I often evaluate my emotions before acting.", archetype: "narcissus" },
  { id: 27, text: "I value authenticity above all else.", archetype: "narcissus" },
  { id: 28, text: "I tend to analyze my own motives deeply.", archetype: "narcissus" },
  { id: 29, text: "I sometimes get lost in self-reflection.", archetype: "narcissus" },
  { id: 30, text: "I prefer understanding myself to understanding the world.", archetype: "narcissus" },
  { id: 31, text: "I believe self-knowledge is the highest form of wisdom.", archetype: "narcissus" },
  { id: 32, text: "I sometimes hesitate because I'm too self-conscious.", archetype: "narcissus" },
  { id: 33, text: "I feel drawn to mirrors — literal or metaphorical.", archetype: "narcissus" },
]

export interface ArchetypeScores {
  icarus: number
  sisyphus: number
  narcissus: number
}

export function calculateScores(responses: Record<number, number>): ArchetypeScores {
  const scores: ArchetypeScores = {
    icarus: 0,
    sisyphus: 0,
    narcissus: 0,
  }

  questions.forEach((question) => {
    const response = responses[question.id] || 1
    const normalizedScore = (response - 1) / 4
    scores[question.archetype] += normalizedScore
  })

  scores.icarus /= 11
  scores.sisyphus /= 11
  scores.narcissus /= 11

  const total = scores.icarus + scores.sisyphus + scores.narcissus
  scores.icarus /= total
  scores.sisyphus /= total
  scores.narcissus /= total

  return scores
}

export function getInterpretation(scores: ArchetypeScores): string {
  const dominant = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0] as Archetype
  const percentage = Math.round(scores[dominant] * 100)

  const interpretations = {
    icarus: `You embody the spirit of Icarus (${percentage}%), driven by ambition, innovation, and the courage to push boundaries. You thrive on bold risks and creative exploration, even when others counsel caution. Your passion for the impossible fuels your journey, though you may sometimes fly too close to the sun. Channel this energy wisely, and you'll soar to heights others only dream of.`,

    sisyphus: `You carry the strength of Sisyphus (${percentage}%), finding meaning in discipline, persistence, and the daily grind. You understand that true mastery comes from showing up consistently, even when progress feels invisible. Your endurance is your superpower—you build empires one stone at a time. Remember that the journey itself is the destination, and your commitment will outlast any obstacle.`,

    narcissus: `You reflect the depth of Narcissus (${percentage}%), blessed with profound self-awareness and introspective wisdom. You seek authenticity and truth within yourself, understanding that self-knowledge is the foundation of all growth. Your sensitivity to your inner world gives you unique insight, though be mindful not to become lost in your own reflection. Your journey inward illuminates the path forward.`,
  }

  return interpretations[dominant]
}
