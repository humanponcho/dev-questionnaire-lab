// Section 2: React Fundamentals

export const section2 = [
  {
    id: 'virtual-dom',
    group: 'React Fundamentals',
    title: 'The Virtual DOM',
    blocks: [
      { type: 'p', text: 'The Virtual DOM is a **lightweight in-memory copy** of the real DOM. When state/props change, React updates the virtual DOM first, **diffs** it against the previous version (**reconciliation**), then applies the **minimal set** of real-DOM changes.' },
      { type: 'ul', items: [
        '**Performance** — real DOM edits trigger reflow/repaint and are slow. Batching + minimal updates keep the UI fast.',
        '**Predictability** — you describe *what* the UI should look like; React figures out *how* to get there. Fewer manual bugs.',
        '**Consistency** — reliable rendering even as complex state changes.',
      ]},
      { type: 'callout', text: 'One-liner: **“React diffs a virtual representation of the UI and only touches the parts of the real DOM that actually changed.”**' },
      { type: 'quiz', questions: [
        { q: 'The process of comparing new vs old virtual DOM is called…', options: ['Hydration', 'Reconciliation (diffing)', 'Transpilation', 'Memoization'], answer: 1,
          explain: 'React reconciles the two trees and computes a minimal patch to the real DOM.' },
        { q: 'Why is direct real-DOM manipulation slow?', options: ['It uses closures', 'Each change can trigger reflow/repaint cycles', 'It runs on the server', 'It blocks promises'], answer: 1,
          explain: 'Layout and paint work is expensive; the virtual DOM batches and minimizes it.' },
      ]},
    ],
  },

  {
    id: 'hooks',
    group: 'React Fundamentals',
    title: 'React Hooks',
    blocks: [
      { type: 'p', text: '**Hooks** are functions that let you “hook into” React state and lifecycle features **from function components**. They gave function components the powers class components had (state, side-effects) — and function components won because they are lighter.' },
      { type: 'ul', items: [
        '**useState** — a value that changes over time.',
        '**useEffect** — run side-effects (fetching, subscriptions, DOM) tied to the lifecycle.',
        '**useReducer** — complex/related state via a reducer + dispatch.',
        '**useRef** — mutable value / direct DOM access that persists across renders without causing re-renders.',
        '**useCallback** / **useMemo** — memoize functions / expensive values.',
        '**Custom hooks** — compose hooks into reusable logic; name must start with `use`.',
      ]},
      { type: 'callout', kind: 'warn', text: 'Rules of hooks: call them **at the top level** (never inside conditions/loops) and **only from React functions**. This keeps the call order stable between renders.' },
      { type: 'h2', text: 'A custom hook you can run', tag: 'live' },
      { type: 'p', text: '`useToggle` composes `useState` + `useCallback` into reusable logic. Click the button.' },
      { type: 'react', name: 'useToggle.jsx', height: 240, code: `function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn(o => !o), []);
  return [on, toggle];
}

function App() {
  const [on, toggle] = useToggle();
  return (
    <div style={{ fontFamily: 'system-ui' }}>
      <button onClick={toggle} style={{
        padding: '10px 18px', borderRadius: 8, cursor: 'pointer',
        border: 'none', color: '#fff', fontWeight: 700,
        background: on ? '#4ec9a7' : '#e06c75'
      }}>
        {on ? 'ON' : 'OFF'}
      </button>
      <p>The button state lives in a reusable custom hook.</p>
    </div>
  );
}` },
      { type: 'quiz', questions: [
        { q: 'A custom hook must…', options: ['be a class', 'start with the prefix `use`', 'return JSX', 'use useEffect'], answer: 1,
          explain: 'The `use` prefix lets React apply the rules of hooks and detect them.' },
        { q: 'Where may you call a hook?', options: ['Inside an if statement', 'At the top level of a React function', 'Inside a loop', 'Anywhere'], answer: 1,
          explain: 'Top-level, in components or other hooks — so call order is stable each render.' },
      ]},
    ],
  },

  {
    id: 'props-state',
    group: 'React Fundamentals',
    title: 'Props vs State',
    blocks: [
      { type: 'ul', items: [
        '**Props** — **immutable** data passed **parent → child**. Received as an object; used to configure a child. A child must not change its props.',
        '**State** — **mutable** data owned **inside** a component. Changing state (via its updater) **re-renders** that component and its children.',
      ]},
      { type: 'callout', text: 'Analogy from the guide: **props pass information down the tree; state changes information over time.** Data flows one way (down).' },
      { type: 'h2', text: 'Parent owns state, child gets props', tag: 'live' },
      { type: 'react', name: 'PropsState.jsx', height: 260, code: `function Greeting({ name, count }) {   // props (read-only here)
  return <p style={{ fontFamily: 'system-ui' }}>
    Hi <b>{name}</b> — clicked <b>{count}</b> times.
  </p>;
}

function App() {
  const [count, setCount] = useState(0);   // state (owned here)
  return (
    <div style={{ fontFamily: 'system-ui' }}>
      <Greeting name="Ada" count={count} />
      <button onClick={() => setCount(c => c + 1)}
        style={{ padding: '8px 16px', borderRadius: 6, cursor: 'pointer' }}>
        +1
      </button>
    </div>
  );
}` },
      { type: 'quiz', questions: [
        { q: 'Can a child component change its own props?', options: ['Yes, freely', 'No — props are immutable in the child', 'Only with useState', 'Only objects'], answer: 1,
          explain: 'Props are read-only in the receiving component; the owner (parent) controls them.' },
        { q: 'What happens when a component\'s state updates?', options: ['Nothing visual', 'The component (and children) re-render', 'The page reloads', 'Props reset'], answer: 1,
          explain: 'State changes trigger a re-render of that component and its subtree.' },
      ]},
    ],
  },

  {
    id: 'controlled',
    group: 'React Fundamentals',
    title: 'Controlled vs uncontrolled',
    blocks: [
      { type: 'p', text: 'It is about **who owns the form value**.' },
      { type: 'ul', items: [
        '**Controlled** — React state owns the value; `value={state}` + `onChange` keep them in sync. **Predictable**, easy validation. Cost: more code, re-render per keystroke.',
        '**Uncontrolled** — the **DOM** owns the value; you read it with a **ref** when needed. **Less code**, no per-keystroke re-render. Cost: harder validation, less control.',
      ]},
      { type: 'callout', text: 'Default to **controlled** for predictability and validation; reach for **uncontrolled** when you want simple, occasional reads (or integrating non-React widgets).' },
      { type: 'h2', text: 'Side by side', tag: 'live' },
      { type: 'react', name: 'Forms.jsx', height: 300, code: `function App() {
  const [ctrl, setCtrl] = useState("");
  const uncontrolledRef = useRef(null);

  return (
    <div style={{ fontFamily: 'system-ui', display: 'grid', gap: 16 }}>
      <div>
        <b>Controlled</b> (state = source of truth)
        <br />
        <input value={ctrl} onChange={e => setCtrl(e.target.value)} />
        <div>state: "{ctrl}"</div>
      </div>
      <div>
        <b>Uncontrolled</b> (DOM holds it; read via ref)
        <br />
        <input ref={uncontrolledRef} defaultValue="" />
        <button onClick={() => alert("ref value: " + uncontrolledRef.current.value)}>
          Read value
        </button>
      </div>
    </div>
  );
}` },
      { type: 'quiz', questions: [
        { q: 'In a controlled component, the input value comes from…', options: ['the DOM', 'component state', 'a ref', 'the URL'], answer: 1,
          explain: 'value={state} ties the input to React state, which is the single source of truth.' },
        { q: 'Uncontrolled inputs are usually read using…', options: ['useState', 'a ref (useRef)', 'useEffect', 'context'], answer: 1,
          explain: 'The DOM owns the value; a ref lets you grab it when needed.' },
      ]},
    ],
  },

  {
    id: 'usestate',
    group: 'React Fundamentals',
    title: 'useState',
    blocks: [
      { type: 'p', text: '`useState(initial)` adds state to a function component and returns a **[current, setter]** pair. The setter (a **state updater function**) writes the new value and triggers a re-render; on re-render the hook returns the latest value from its internal closure.' },
      { type: 'ul', items: [
        'State can be any type — string, number, array, object.',
        'You can call `useState` as many times as you need.',
        'When new state depends on the old, use the **functional updater**: `setCount(c => c + 1)` (avoids stale reads).',
      ]},
      { type: 'h2', text: 'Functional updater matters', tag: 'live' },
      { type: 'p', text: 'The left button uses the stale value; the right uses the functional form. Click each 3× fast to feel the difference.' },
      { type: 'react', name: 'useState.jsx', height: 250, code: `function App() {
  const [n, setN] = useState(0);
  return (
    <div style={{ fontFamily: 'system-ui' }}>
      <h2 style={{ margin: '0 0 12px' }}>{n}</h2>
      <button onClick={() => { setN(n + 1); setN(n + 1); }}>
        +2 the buggy way (setN(n+1) twice)
      </button>{' '}
      <button onClick={() => { setN(x => x + 1); setN(x => x + 1); }}>
        +2 the correct way (functional)
      </button>
      <p>The left adds 1 (stale n); the right truly adds 2.</p>
    </div>
  );
}` },
      { type: 'quiz', questions: [
        { q: 'useState returns…', options: ['a single value', 'an array: [current, updater]', 'an object with .value', 'a promise'], answer: 1,
          explain: 'Destructure it as [state, setState].' },
        { q: 'When new state depends on old state, you should…', options: ['read the variable directly', 'use the functional updater setX(prev => ...)', 'use useEffect', 'use a ref'], answer: 1,
          explain: 'The functional form receives the latest state, avoiding stale-closure bugs.' },
      ]},
    ],
  },

  {
    id: 'useeffect',
    group: 'React Fundamentals',
    title: 'useEffect & its pitfalls',
    blocks: [
      { type: 'p', text: '`useEffect(fn, deps)` runs **side-effects** (fetching, subscriptions, DOM work, timers) tied to the render lifecycle. It runs after the first render, and again whenever a value in the **dependency array** changes.' },
      { type: 'ul', items: [
        'No deps array → runs **every render**.',
        'Empty deps `[]` → runs **once** on mount.',
        '`[a, b]` → runs on mount and whenever `a` or `b` change.',
        'Return a **cleanup** function to tear down subscriptions/timers.',
      ]},
      { type: 'callout', kind: 'warn', text: 'Pitfalls: **missing deps** → stale values; **updating a state that is also a dep** → **infinite loop**; unnecessary runs hurt performance; **StrictMode** intentionally runs effects twice in dev to surface bugs.' },
      { type: 'h2', text: 'Effect with cleanup (a timer)', tag: 'live' },
      { type: 'react', name: 'useEffect.jsx', height: 260, code: `function App() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);   // cleanup on unmount / dep change
  }, [running]);   // re-subscribe only when 'running' flips

  return (
    <div style={{ fontFamily: 'system-ui' }}>
      <h2 style={{ margin: '0 0 10px' }}>{seconds}s</h2>
      <button onClick={() => setRunning(r => !r)}>
        {running ? 'Pause' : 'Resume'}
      </button>
      <p>Cleanup clears the interval so we never stack timers.</p>
    </div>
  );
}` },
      { type: 'quiz', questions: [
        { q: 'An empty dependency array `[]` means the effect runs…', options: ['every render', 'once, on mount', 'never', 'only on unmount'], answer: 1,
          explain: 'With [], there are no changing deps, so it runs a single time after mount.' },
        { q: 'A common cause of an infinite render loop is…', options: ['returning a cleanup function', 'updating a state variable that is also in the dependency array', 'using an empty deps array', 'fetching data'], answer: 1,
          explain: 'The update changes a dep → effect re-runs → updates again → loop.' },
      ]},
    ],
  },
]
