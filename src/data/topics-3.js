// Section 3: Advanced React

export const section3 = [
  {
    id: 'context',
    group: 'Advanced React',
    title: 'Context API',
    blocks: [
      { type: 'p', text: 'The **Context API** shares values (state, functions, theme, auth) across the component tree **without passing props through every level** — it solves **prop drilling**.' },
      { type: 'ul', items: [
        '`createContext()` makes a context; a `<Provider value={...}>` supplies it; `useContext()` reads it.',
        'Use it for data many components at different depths need: **auth**, **theme**, **locale**.',
        'You will meet Context in every large app — directly, or inside libraries that use it under the hood.',
      ]},
      { type: 'callout', kind: 'warn', text: 'Not a full state manager. Every consumer re-renders when the value changes, so avoid stuffing rapidly-changing state into one giant context.' },
      { type: 'h2', text: 'Theme via context (no prop drilling)', tag: 'live' },
      { type: 'react', name: 'Context.jsx', height: 300, code: `const ThemeContext = createContext('light');

function DeeplyNested() {                 // reads context directly
  const theme = useContext(ThemeContext);
  return <span style={{
    padding: '6px 12px', borderRadius: 6,
    background: theme === 'dark' ? '#161b22' : '#eef1f5',
    color: theme === 'dark' ? '#fff' : '#111'
  }}>I am {theme} — no props passed down!</span>;
}

function Middle() { return <DeeplyNested />; }  // passes nothing

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ fontFamily: 'system-ui' }}>
        <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
          Toggle theme
        </button>
        <div style={{ marginTop: 12 }}><Middle /></div>
      </div>
    </ThemeContext.Provider>
  );
}` },
      { type: 'quiz', questions: [
        { q: 'The Context API primarily solves…', options: ['slow rendering', 'prop drilling', 'CSS conflicts', 'async errors'], answer: 1,
          explain: 'It lets deep components read shared values without threading props through every layer.' },
        { q: 'Good candidates for context include…', options: ['a single form input value', 'theme, auth, locale', 'a loop counter', 'CSS class names'], answer: 1,
          explain: 'Cross-cutting, widely-needed values suit context best.' },
      ]},
    ],
  },

  {
    id: 'optimize-components',
    group: 'Advanced React',
    title: 'Optimizing components',
    blocks: [
      { type: 'p', text: 'Optimize **only when you hit a real bottleneck** — the guide is explicit: premature optimization can cost more than the re-render it prevents.' },
      { type: 'ul', items: [
        '**React.memo** — skip re-render when props are unchanged (shallow prop equality check).',
        '**useCallback** — keep a callback identity stable so memoized children don\'t re-render.',
        '**useMemo** — cache an expensive computed value until its deps change.',
        '**Conditional rendering** & **code splitting** — render/ship less.',
        '**useReducer** — consolidate related useState calls.',
        'CSS: animate **transform/opacity** (GPU) rather than box-model props (reflow/repaint).',
        '**Lazy load** images/media; **StrictMode** to surface issues first.',
      ]},
      { type: 'callout', kind: 'tip', text: 'The trio to name in an interview: **React.memo + useCallback + useMemo** — memoize the component, the functions it receives, and the values it computes.' },
      { type: 'quiz', questions: [
        { q: 'React.memo prevents a re-render when…', options: ['state changes', 'props are shallowly equal to last time', 'the parent unmounts', 'an effect runs'], answer: 1,
          explain: 'memo does a shallow props comparison and skips rendering if nothing changed.' },
        { q: 'The guide\'s stance on optimization is…', options: ['always memoize everything', 'apply optimizations only when you hit a bottleneck', 'never optimize', 'optimize CSS only'], answer: 1,
          explain: 'Premature optimization (e.g. memo overhead) can exceed the cost it saves.' },
      ]},
    ],
  },

  {
    id: 'optimize-rerenders',
    group: 'Advanced React',
    title: 'Optimizing re-renders',
    blocks: [
      { type: 'p', text: 'A child re-renders when its parent does — even with identical props — unless you intervene. The fix is memoization plus stable identities.' },
      { type: 'ul', items: [
        '**React.memo** on the child → it skips re-render if props are unchanged.',
        '**useCallback** on handlers passed as props → same function identity between renders, so memo actually works.',
        '**useMemo** for derived/expensive values passed down.',
        '**useReducer** to consolidate related state; **reusable/generalized** components.',
      ]},
      { type: 'callout', kind: 'warn', text: 'Gotcha: `React.memo` alone is useless if you pass a **new inline function** every render — its identity changes, so the memo check always fails. Pair memo with `useCallback`.' },
      { type: 'quiz', questions: [
        { q: 'React.memo on a child fails to help when the parent passes…', options: ['a string prop', 'a new inline function each render', 'a number', 'a memoized value'], answer: 1,
          explain: 'A fresh function identity each render breaks the shallow equality memo relies on — wrap it in useCallback.' },
        { q: 'useCallback exists to…', options: ['cache expensive values', 'keep a function\'s identity stable across renders', 'run side effects', 'replace useState'], answer: 1,
          explain: 'It memoizes the function so it only changes when its deps change.' },
      ]},
    ],
  },

  {
    id: 'architecture',
    group: 'Advanced React',
    title: 'Architecting a large app',
    blocks: [
      { type: 'p', text: 'Structure for **maintainability, performance, scalability**. A layered strategy:' },
      { type: 'ul', items: [
        '**Structure by feature**, not by file type — each feature folder holds its components/hooks/state.',
        '**State, tiered:** local (`useState`/`useReducer`) → contextual (Context for a subtree: theme/auth) → global (Redux/Zustand/Recoil) → **server state** (React Query/SWR for API data, caching, syncing).',
        '**Code-split** with `React.lazy` + `Suspense`; lazy-load routes.',
        '**Composition over prop drilling** — render props, compound components, providers.',
        '**Reusable custom hooks** (`useFetchData`, `useAuth`) to separate logic from UI.',
        '**TypeScript** + unit (Jest/RTL) + integration + E2E (Cypress).',
        '**Error boundaries** with fallbacks; a chosen **styling** solution; **virtualization** (React Window) for long lists.',
      ]},
      { type: 'callout', text: 'Pick the right state tool per need: **local** for UI toggles, **context** for a feature subtree, a **library** for cross-app global state, and a **server-state** library for API data.' },
      { type: 'quiz', questions: [
        { q: 'API data (fetched, cached, synced) is best handled by…', options: ['a single global useState', 'a server-state library like React Query/SWR', 'context only', 'useRef'], answer: 1,
          explain: 'Server-state libraries handle caching, background refetch and syncing, reducing global state.' },
        { q: 'The recommended folder organization is by…', options: ['file type (all components together)', 'feature', 'alphabetical order', 'component size'], answer: 1,
          explain: 'Feature-based structure keeps related code together and scales better.' },
      ]},
    ],
  },

  {
    id: 'redux',
    group: 'Advanced React',
    title: 'Redux & state libraries',
    blocks: [
      { type: 'p', text: 'React manages **local** state well. External libraries help as apps grow. The guide\'s advice: **start with built-in tools, add a library when complexity demands it.**' },
      { type: 'ul', items: [
        '**useState** → simple changing values.',
        '**useReducer** → several related values / complex transitions in one domain.',
        '**Context** → share within a subtree without prop drilling.',
        '**Redux** → strict control, complex transitions, great devtools; more boilerplate.',
        '**Zustand** → lightweight global state, minimal boilerplate. **Recoil** → derived/atom interdependencies.',
      ]},
      { type: 'callout', kind: 'tip', text: 'Progression to say out loud: **useState → useReducer → Context → a library (Redux/Zustand/Recoil)** as scope widens.' },
      { type: 'quiz', questions: [
        { q: 'useReducer is preferred over useState when…', options: ['there is one boolean', 'multiple stateful values are interdependent / one domain', 'you fetch data', 'you need context'], answer: 1,
          explain: 'Reducers shine for complex, related state transitions.' },
        { q: 'The guide recommends reaching for Redux…', options: ['immediately in every app', 'as complexity grows beyond built-in tools', 'never', 'only for styling'], answer: 1,
          explain: 'Begin with React\'s built-ins; adopt Redux when the app\'s complexity justifies it.' },
      ]},
    ],
  },

  {
    id: 'routing',
    group: 'Advanced React',
    title: 'Dynamic routing',
    blocks: [
      { type: 'p', text: '**React Router** handles **client-side** navigation — switching views without a server round-trip per page. **Dynamic routes** match variable URLs via parameters.' },
      { type: 'ul', items: [
        'Define a param route with `:` — e.g. `/products/:id` matches `/products/123` and `/products/456`.',
        'Read the param in the component with the **`useParams`** hook → `{ id: "123" }`.',
        'Use that id to fetch and display the specific product/post.',
      ]},
      { type: 'callout', text: 'Pattern to recite: **`<Route path="/products/:id">` + `const { id } = useParams()` → fetch by id.**' },
      { type: 'js', name: 'routing-shape.js', height: 150, code: `// Conceptual sketch (React Router API):
//
// <Routes>
//   <Route path="/products/:id" element={<Product />} />
// </Routes>
//
// function Product() {
//   const { id } = useParams();     // e.g. "123"
//   // fetch("/api/products/" + id) ...
// }

// Simulate what useParams extracts from a path:
function paramsFrom(pattern, url) {
  const p = pattern.split('/'), u = url.split('/'), out = {};
  p.forEach((seg, i) => { if (seg.startsWith(':')) out[seg.slice(1)] = u[i]; });
  return out;
}
console.log(paramsFrom('/products/:id', '/products/123')); // { id: "123" }` },
      { type: 'quiz', questions: [
        { q: 'Which hook reads dynamic route parameters?', options: ['useState', 'useParams', 'useRoute', 'useEffect'], answer: 1,
          explain: 'useParams returns the matched URL parameters, e.g. { id: "123" }.' },
        { q: 'React Router primarily provides…', options: ['server-side rendering', 'client-side routing without full page reloads', 'CSS', 'state management'], answer: 1,
          explain: 'It swaps views on the client, avoiding a server request per navigation.' },
      ]},
    ],
  },

  {
    id: 'optimize-app',
    group: 'Advanced React',
    title: 'Optimizing the whole app',
    blocks: [
      { type: 'p', text: 'App-wide performance combines the component techniques with build/runtime choices.' },
      { type: 'ul', items: [
        'Animate with **transform/opacity** (GPU), not top/left/visibility (reflow/repaint).',
        '**React.memo** for unchanged props; **useCallback** for handler identity; **useMemo** for expensive computations.',
        'Avoid work on initial render (guard effects); **conditional rendering** to skip unneeded UI.',
        'Ship **production mode** (StrictMode is stripped in prod).',
        '**Specialize vs generalize** components sensibly; **code-split** into multiple files/routes.',
      ]},
      { type: 'callout', kind: 'warn', text: 'Repeat the mantra: **measure first.** Apply these only where a real bottleneck exists — not by default.' },
      { type: 'quiz', questions: [
        { q: 'For smooth animations you should prefer…', options: ['top/left/right', 'transform and opacity (GPU)', 'width/height', 'margin'], answer: 1,
          explain: 'transform/opacity are GPU-accelerated and avoid layout reflow/repaint.' },
        { q: 'Before applying performance optimizations you should…', options: ['apply them all upfront', 'identify an actual bottleneck first', 'disable StrictMode', 'remove all state'], answer: 1,
          explain: 'The guide stresses optimizing only when a bottleneck is measured.' },
      ]},
    ],
  },
]
