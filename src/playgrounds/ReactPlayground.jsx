import { useEffect, useRef, useState } from 'react'
import * as React from 'react'
import { createRoot } from 'react-dom/client'

/**
 * Babel standalone is a bundled dependency, not a CDN script — the app must not
 * stop working because a third-party host is slow or blocked.
 *
 * It is also ~3 MB minified, an order of magnitude larger than everything else
 * here. A static import would put that in the main bundle and make every reader
 * download a JSX compiler to read a paragraph of prose. This dynamic import
 * makes Vite emit it as its own chunk, fetched the first time someone actually
 * presses Render. The promise is cached at module scope so later playgrounds on
 * the same page reuse it.
 */
let babelPromise = null
function loadBabel() {
  if (!babelPromise) babelPromise = import('@babel/standalone')
  return babelPromise
}

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
    let cancelled = false

    ;(async () => {
      let Babel
      try {
        const mod = await loadBabel()
        // The UMD build interops as either the namespace or its default.
        Babel = typeof mod.transform === 'function' ? mod : mod.default
      } catch {
        if (!cancelled) setError('Could not load the JSX compiler. Reload the page and try again.')
        return
      }
      if (cancelled) return

      let root = rootRef.current
      try {
        const compiled = Babel.transform(code, {
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
    })()

    return () => { cancelled = true }
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
