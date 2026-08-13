import { useState, useEffect, useMemo } from 'react'
import { topics, groups } from './data/topics.js'
import Blocks from './components/Blocks.jsx'

const STORAGE_KEY = 'devquiz.done.v1'

export default function App() {
  // -1 = home screen; 0..n = a topic index
  const [active, setActive] = useState(-1)
  const [done, setDone] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')) }
    catch { return new Set() }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...done]))
  }, [done])

  // Scroll to top on topic change.
  useEffect(() => { window.scrollTo(0, 0) }, [active])

  const pct = Math.round((done.size / topics.length) * 100)
  const topic = active >= 0 ? topics[active] : null

  function toggleDone(i) {
    setDone((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  return (
    <div className="shell">
      <aside className="rail">
        <div className="rail-head">
          <h1 className="brand" onClick={() => setActive(-1)} style={{ cursor: 'pointer' }}>
            Dev Questionnaire <span className="dot">Lab</span>
          </h1>
          <div className="brand-sub">build it · run it · answer it</div>
        </div>
        <div className="progress-wrap">
          <div className="progress-track"><div className="progress-fill" style={{ width: pct + '%' }} /></div>
          <div className="progress-label">{done.size}/{topics.length} topics marked done · {pct}%</div>
        </div>
        {groups.map((g) => (
          <div key={g.name}>
            <div className="rail-group-title">{g.name}</div>
            {g.items.map((it) => (
              <button
                key={it.index}
                className={`rail-item ${active === it.index ? 'active' : ''}`}
                onClick={() => setActive(it.index)}
              >
                <span className="rail-num">{String(it.index + 1).padStart(2, '0')}</span>
                <span>{it.title}</span>
                {done.has(it.index) && <span className="rail-check">✓</span>}
              </button>
            ))}
          </div>
        ))}
      </aside>

      <main className="main">
        {active === -1
          ? <Home onStart={() => setActive(0)} total={topics.length} doneCount={done.size} />
          : (
            <div className="topic-wrap">
              <div className="eyebrow">{topic.group} · {String(active + 1).padStart(2, '0')} / {topics.length}</div>
              <h1 className="topic-title">{topic.title}</h1>
              <Blocks blocks={topic.blocks} />

              <button
                className={`done-btn ${done.has(active) ? 'done' : ''}`}
                onClick={() => toggleDone(active)}
              >
                {done.has(active) ? '✓ Marked as understood' : 'Mark as understood'}
              </button>

              <nav className="topic-nav">
                <button className="nav-btn" disabled={active === 0} onClick={() => setActive(active - 1)}>
                  <span className="nav-dir">← Previous</span>
                  <span className="nav-ttl">{active > 0 ? topics[active - 1].title : '—'}</span>
                </button>
                <button className="nav-btn next" disabled={active === topics.length - 1} onClick={() => setActive(active + 1)}>
                  <span className="nav-dir">Next →</span>
                  <span className="nav-ttl">{active < topics.length - 1 ? topics[active + 1].title : '—'}</span>
                </button>
              </nav>
            </div>
          )}
      </main>
    </div>
  )
}

function Home({ onStart, total, doneCount }) {
  const groupCount = useMemo(() => groups.length, [])
  return (
    <div className="home">
      <div className="eyebrow">Front-end interview prep · hands-on</div>
      <h1 className="home-hero">Don't read the answers.<br /><em>Run</em> them.</h1>
      <p className="home-lead">
        Every question from the questionnaire, rebuilt as a live lab. Each topic pairs a
        tight explanation with an editable playground you actually execute, and a self-check
        quiz. Edit the code, break it, re-run it — that's how the answers stick.
      </p>
      <div className="home-grid">
        <div className="home-card">
          <div className="n">01</div>
          <h3>Read the concept</h3>
          <p>Interview-ready explanations with the exact one-liners to say out loud.</p>
        </div>
        <div className="home-card">
          <div className="n">02</div>
          <h3>Run the code</h3>
          <p>Live JavaScript and React playgrounds. Real fetches, real console output, real re-renders.</p>
        </div>
        <div className="home-card">
          <div className="n">03</div>
          <h3>Test yourself</h3>
          <p>Instant-feedback quizzes on the traps interviewers actually probe.</p>
        </div>
      </div>
      <p className="home-lead" style={{ fontSize: 14 }}>
        {total} topics across {groupCount} sections — HTML/CSS, core JS, React, advanced React,
        Next.js, testing, TypeScript, and both coding challenges.
        {doneCount > 0 && ` You've marked ${doneCount} done.`}
      </p>
      <button className="btn run home-start" onClick={onStart} style={{ fontSize: 14, padding: '10px 20px' }}>
        {doneCount > 0 ? '▶ Keep going' : '▶ Start with Flexbox'}
      </button>
    </div>
  )
}
