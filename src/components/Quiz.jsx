import { useState } from 'react'

/**
 * Self-check quiz. One or more questions; each locks after answering and
 * reveals which option was right plus a short "why" tied to the concept.
 */
export default function Quiz({ questions }) {
  return (
    <div className="quiz">
      <div className="quiz-head">Self-check</div>
      {questions.map((q, i) => (
        <Question key={i} q={q} index={i} total={questions.length} />
      ))}
    </div>
  )
}

function Question({ q, index, total }) {
  const [picked, setPicked] = useState(null)
  const answered = picked !== null
  return (
    <div style={{ marginTop: index === 0 ? 6 : 22 }}>
      <div className="quiz-q">
        {total > 1 && <span style={{ color: 'var(--ink-faint)', fontFamily: 'var(--mono)', fontSize: 12, marginRight: 8 }}>{index + 1}/{total}</span>}
        {q.q}
      </div>
      {q.options.map((opt, i) => {
        let state = ''
        if (answered) {
          if (i === q.answer) state = 'correct'
          else if (i === picked) state = 'wrong'
        }
        const mark = answered ? (i === q.answer ? '✓' : i === picked ? '✕' : '·') : String.fromCharCode(65 + i)
        return (
          <button
            key={i}
            className={`quiz-opt ${state} ${answered ? 'disabled' : ''}`}
            disabled={answered}
            onClick={() => setPicked(i)}
          >
            <span className="mark">{mark}</span>{opt}
          </button>
        )
      })}
      {answered && (
        <div className="quiz-explain">
          <strong>{picked === q.answer ? 'Correct. ' : 'Not quite. '}</strong>
          {q.explain}
        </div>
      )}
    </div>
  )
}
