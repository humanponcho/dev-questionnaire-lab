import { useEffect, useRef, useState } from 'react'
import * as React from 'react'
import { createRoot } from 'react-dom/client'

/**
 * A live React playground. The student writes a component and we compile the
 * JSX in-browser with Babel standalone, then mount it into an isolated root.
 * The code must define a component named `App` (default export style not needed).
 * This powers every React topic: hooks, controlled/uncontrolled inputs,
 * props/state, useEffect, and the two coding challenges.
 */
export default function ReactPlayground({ name = 'App.jsx', initial = '', height = 220 }) {
  const [code, setCode] = useState(initial)
  const [error, setError] = useState(null)
  const [runKey, setRunKey] = useState(0)
  const mountRef = useRef(null)
  const rootRef = useRef(null)

  function run() {
    setError(null)
    setRunKey((k) => k + 1)
  }

  useEffect(() => {
    if (runKey === 0) return
    let root = rootRef.current
    try {
      const compiled = window.Babel.transform(code, {
        presets: ['react'],
      }).code

      // Expose React + hooks to the compiled code via a Function scope.
      const factory = new Function(
        'React', 'useState', 'useEffect', 'useRef', 'useReducer',
        'useCallback', 'useMemo', 'useContext', 'createContext',
        `${compiled}\n; return typeof App !== 'undefined' ? App : null;`
      )
      const App = factory(
        React, React.useState, React.useEffect, React.useRef, React.useReducer,
        React.useCallback, React.useMemo, React.useContext, React.createContext
      )
      if (!App) {
        setError('Define a component called `App` — that is what gets rendered.')
        return
      }
      if (!root) {
        root = createRoot(mountRef.current)
        rootRef.current = root
      }
      root.render(React.createElement(App))
    } catch (err) {
      setError(`${err.name}: ${err.message}`)
    }
  }, [runKey]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => {
    // Defer unmount to avoid React "synchronous unmount during render" warning.
    const root = rootRef.current
    if (root) setTimeout(() => root.unmount(), 0)
  }, [])

  return (
    <div className="pg">
      <div className="pg-bar">
        <div className="pg-dots"><span className="pg-dot r" /><span className="pg-dot y" /><span className="pg-dot g" /></div>
        <span className="pg-name">{name}</span>
        <div className="pg-actions">
          <button className="btn" onClick={() => { setCode(initial); setError(null) }}>Reset</button>
          <button className="btn run" onClick={run}>▶ Render</button>
        </div>
      </div>
      <textarea
        className="pg-editor"
        style={{ minHeight: height }}
        spellCheck={false}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      {error && (
        <>
          <div className="pg-out-label">Error</div>
          <div className="pg-out"><span className="log-err">✕ {error}</span></div>
        </>
      )}
      {runKey > 0 && !error && (
        <>
          <div className="pg-out-label">Live preview</div>
          <div className="pg-preview" ref={mountRef} />
        </>
      )}
    </div>
  )
}
