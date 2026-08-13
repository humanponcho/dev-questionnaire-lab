import { useState, useRef } from 'react'

/**
 * A live JavaScript scratchpad.
 * The student edits the code and hits Run. We execute it in a Function
 * sandbox with console.* patched to stream into the output panel, so every
 * concept in the guide (hoisting, closures, the event loop, ==/===, map/filter/
 * reduce, spread/rest, debounce/throttle...) can be *observed*, not just read.
 */
export default function JsPlayground({ name = 'scratch.js', initial = '', height = 150 }) {
  const [code, setCode] = useState(initial)
  const [lines, setLines] = useState([])
  const [ran, setRan] = useState(false)
  const idRef = useRef(0)

  function push(type, args) {
    const text = args
      .map((a) => {
        if (typeof a === 'string') return a
        try { return JSON.stringify(a, null, 2) } catch { return String(a) }
      })
      .join(' ')
    setLines((prev) => [...prev, { id: idRef.current++, type, text }])
  }

  async function run() {
    setLines([])
    setRan(true)
    idRef.current = 0
    const buffer = []
    const collect = (type) => (...args) => buffer.push({ id: idRef.current++, type, text:
      args.map((a) => (typeof a === 'string' ? a : safeStringify(a))).join(' ') })

    const fakeConsole = {
      log: collect('log'),
      info: collect('info'),
      warn: collect('warn'),
      error: collect('error'),
    }

    try {
      // Async wrapper so top-level await works (promises, async/await topics).
      const fn = new Function(
        'console',
        `return (async () => {\n${code}\n})()`
      )
      await fn(fakeConsole)
    } catch (err) {
      buffer.push({ id: idRef.current++, type: 'error', text: `${err.name}: ${err.message}` })
    }
    // Small delay so setTimeout(...,0) callbacks flush into the same run.
    await new Promise((r) => setTimeout(r, 40))
    setLines(buffer.slice())
  }

  return (
    <div className="pg">
      <div className="pg-bar">
        <div className="pg-dots"><span className="pg-dot r" /><span className="pg-dot y" /><span className="pg-dot g" /></div>
        <span className="pg-name">{name}</span>
        <div className="pg-actions">
          <button className="btn" onClick={() => { setCode(initial); setLines([]); setRan(false) }}>Reset</button>
          <button className="btn run" onClick={run}>▶ Run</button>
        </div>
      </div>
      <textarea
        className="pg-editor"
        style={{ minHeight: height }}
        spellCheck={false}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={handleTab}
      />
      {ran && (
        <>
          <div className="pg-out-label">Console</div>
          <div className="pg-out">
            {lines.length === 0
              ? <span className="log-muted">(no output)</span>
              : lines.map((l) => (
                  <div key={l.id} className={cls(l.type)}>{prefix(l.type)}{l.text}</div>
                ))}
          </div>
        </>
      )}
    </div>
  )
}

function handleTab(e) {
  if (e.key === 'Tab') {
    e.preventDefault()
    const el = e.target
    const s = el.selectionStart, en = el.selectionEnd
    el.value = el.value.slice(0, s) + '  ' + el.value.slice(en)
    el.selectionStart = el.selectionEnd = s + 2
    el.dispatchEvent(new Event('input', { bubbles: true }))
  }
}
function cls(t) { return t === 'error' ? 'log-err' : t === 'info' || t === 'warn' ? 'log-info' : '' }
function prefix(t) { return t === 'error' ? '✕ ' : t === 'warn' ? '⚠ ' : '' }
function safeStringify(a) { try { return JSON.stringify(a, null, 2) } catch { return String(a) } }
