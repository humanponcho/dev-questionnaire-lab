// Section 4: Frameworks & Tooling, Testing, TypeScript, Coding Challenges

export const section4 = [
  {
    id: 'nextjs',
    group: 'Frameworks & Tooling',
    title: 'Next.js',
    blocks: [
      { type: 'p', text: 'Next.js is a **React framework** for building web apps with better performance, SEO, and DX. Its headline features are the different **rendering strategies** plus built-in tooling.' },
      { type: 'ul', items: [
        '**SSR** (Server-Side Rendering) — pages rendered on the server per request. Great SEO + fresh content (news, e-commerce).',
        '**SSG** (Static Site Generation) — pages built at build time. Fastest loads for rarely-changing content (docs, marketing).',
        '**ISR** (Incremental Static Regeneration) — static pages re-generated on demand without a full rebuild.',
        '**API routes** — backend endpoints inside the same project (full-stack).',
        '**File-based routing**, **image optimization**, **automatic code splitting**, **TypeScript**, **i18n**, and easy **Vercel** deploys.',
      ]},
      { type: 'callout', text: 'Interview shortcut — know the three rendering modes cold: **SSR = per-request server render; SSG = at build time; ISR = static + on-demand refresh.**' },
      { type: 'quiz', questions: [
        { q: 'SSG (Static Site Generation) renders pages…', options: ['on every request', 'at build time', 'only on the client', 'never'], answer: 1,
          explain: 'SSG pre-builds pages at build time — ideal for content that changes infrequently.' },
        { q: 'Which lets a static page refresh without a full rebuild?', options: ['SSR', 'CSR', 'ISR', 'API routes'], answer: 2,
          explain: 'Incremental Static Regeneration re-generates static pages on demand.' },
      ]},
    ],
  },

  {
    id: 'testing',
    group: 'Testing',
    title: 'How do you test code?',
    blocks: [
      { type: 'p', text: 'Testing assures quality and reliability, before **and** after production. Know the **types**, the **pyramid**, and the **tools**.' },
      { type: 'h2', text: 'The test pyramid' },
      { type: 'ul', items: [
        '**Unit tests** — small pieces (functions/components). Fast, numerous, technology-facing.',
        '**Service/integration tests** — a service or a flow across components, often stubbing collaborators.',
        '**End-to-end tests** — the whole system via the UI (e.g. Cypress). High confidence, but slow/brittle.',
        'The **pyramid**: many unit → fewer service → fewest UI/E2E tests.',
      ]},
      { type: 'h2', text: 'Testing in production' },
      { type: 'ul', items: [
        '**Ping checks** (is it alive), **smoke tests** (does it basically work on deploy), **canary releases** (roll out to a small subset), **synthetic transactions** (fake user journeys), **A/B testing**.',
        '**Contract tests / CDCs** — the consumer defines how it expects the producer to behave; tools like **Pact**.',
      ]},
      { type: 'h2', text: 'React: Vitest + RTL' },
      { type: 'ul', items: [
        '**Vitest** — the runner/framework: `describe` (suite), `it` (case), `expect` (assertion).',
        '**React Testing Library** — renders components and simulates real user interactions; query via `screen`.',
        'Run with `npm run test`; keep two terminals: one watching tests, one running the app.',
      ]},
      { type: 'h2', text: 'A tiny test, running for real', tag: 'live' },
      { type: 'p', text: 'A minimal `expect` so you can watch assertions pass/fail — the exact shape Vitest uses.' },
      { type: 'js', name: 'mini-test.js', height: 200, code: `// A 6-line test harness in the spirit of Vitest:
function expect(actual) {
  return {
    toBe(expected) {
      console.log(actual === expected ? "✓ pass" : "✕ FAIL: " + actual + " !== " + expected);
    },
    toBeTruthy() { console.log(actual ? "✓ pass" : "✕ FAIL: not truthy"); }
  };
}
function it(name, fn) { console.log("• " + name); fn(); }

// The function under test:
const add = (a, b) => a + b;

it("adds two numbers", () => {
  expect(add(2, 3)).toBe(5);
  expect(add(2, 3)).toBeTruthy();
});
it("catches a bug", () => {
  expect(add(2, 2)).toBe(5);   // deliberately wrong -> ✕ FAIL
});` },
      { type: 'quiz', questions: [
        { q: 'The test pyramid says you should have the MOST of which tests?', options: ['End-to-end', 'Unit tests', 'Manual tests', 'Canary tests'], answer: 1,
          explain: 'Many fast unit tests, fewer service tests, fewest slow UI/E2E tests.' },
        { q: 'In Vitest, `describe` / `it` / `expect` are…', options: ['React hooks', 'suite / case / assertion', 'lifecycle methods', 'CSS utilities'], answer: 1,
          explain: 'describe groups a suite, it defines a test case, expect makes assertions.' },
      ]},
    ],
  },

  {
    id: 'typescript',
    group: 'TypeScript',
    title: 'TypeScript vs JavaScript',
    blocks: [
      { type: 'p', text: 'TypeScript is a **superset** of JavaScript — all valid JS is valid TS. Its headline addition is **static typing**.' },
      { type: 'ul', items: [
        '**JS is dynamically typed** — type checks happen at **runtime**; type bugs may not surface until execution.',
        '**TS is statically typed** — checks happen at **compile time in your IDE**, catching errors *before* runtime and shortening the feedback loop.',
        'Benefits: **early error detection**, **readable/self-documenting** code, **safer refactoring**, more **robust** apps.',
        'Costs: a **transpilation** step (TS → JS). It can be **adopted gradually** in an existing JS project.',
      ]},
      { type: 'callout', text: 'One-liner: **“JavaScript is a dynamically typed language; TypeScript is a statically typed superset that catches type errors at compile time and transpiles to JS.”**' },
      { type: 'quiz', questions: [
        { q: 'TypeScript catches type errors…', options: ['only at runtime', 'at compile time / in the IDE', 'never', 'only in production'], answer: 1,
          explain: 'Static typing surfaces type errors before the code runs.' },
        { q: '“TypeScript is a superset of JavaScript” means…', options: ['TS replaces JS entirely', 'all valid JS is valid TS', 'JS is faster', 'they are unrelated'], answer: 1,
          explain: 'TS builds on top of JS; every JS program is already a TS program.' },
      ]},
    ],
  },

  {
    id: 'challenge-js',
    group: 'Coding Challenges',
    title: 'Challenge · Reverse a string',
    blocks: [
      { type: 'p', text: 'A classic warm-up. The idiomatic one-liner: **split into characters → reverse the array → join back**.' },
      { type: 'ul', items: [
        '`str.split("")` → array of characters.',
        '`.reverse()` → reverses the array in place.',
        '`.join("")` → back to a string.',
      ]},
      { type: 'h2', text: 'Solve it live', tag: 'live' },
      { type: 'p', text: 'The reference solution is here and the tests below it run when you hit Run. Try an alternative (a `for` loop, or `[...str]`) and confirm the tests still pass.' },
      { type: 'js', name: 'reverse-string.js', height: 230, code: `function reverseString(str) {
  return str.split("").reverse().join("");
}

// --- tests ---
function check(input, expected) {
  const got = reverseString(input);
  console.log((got === expected ? "✓" : "✕ FAIL") + '  reverse("' + input + '") -> "' + got + '"');
}
check("hello", "olleh");
check("", "");
check("a", "a");
check("racecar", "racecar");
check("React!", "!tcaeR");

// Alternative worth knowing (spread instead of split):
const alt = (s) => [...s].reverse().join("");
console.log("alt matches:", alt("hello") === reverseString("hello"));` },
      { type: 'callout', kind: 'tip', text: 'Follow-up they may ask: this handles spaces and punctuation fine, but for full Unicode (emoji, combining marks) `[...str]` is safer than `split("")` because it splits by code point.' },
      { type: 'quiz', questions: [
        { q: 'Which sequence reverses a string?', options: ['join → reverse → split', 'split("") → reverse() → join("")', 'reverse() → split() → join()', 'map → filter → reduce'], answer: 1,
          explain: 'Characters out (split), flip order (reverse), stitch back (join).' },
        { q: 'For robust Unicode handling, prefer…', options: ['split("") ', '[...str] (spreads by code point)', 'a regex', 'JSON.parse'], answer: 1,
          explain: 'The spread/iterator splits by code point, handling emoji and surrogate pairs better.' },
      ]},
    ],
  },

  {
    id: 'challenge-react',
    group: 'Coding Challenges',
    title: 'Challenge · Fetch & list users',
    blocks: [
      { type: 'p', text: 'The signature React interview task. Requirements from the guide: **functional component**, **fetch on mount with `useEffect`**, **loading state**, **error handling**, and **display the list**.' },
      { type: 'ul', items: [
        '**Three state values:** `users` (data), `loading` (boolean), `error` (message).',
        '`useEffect(..., [])` → fetch once on mount.',
        '`try/catch/finally` → set data, catch errors, always stop loading.',
        '**Conditional rendering:** loading → spinner text; error → message; else → the list/table.',
      ]},
      { type: 'h2', text: 'The full solution — running against the real API', tag: 'live' },
      { type: 'p', text: 'This fetches from `jsonplaceholder.typicode.com/users` live. Read it, then break it on purpose (mistype the URL) to watch the error branch render.' },
      { type: 'react', name: 'UserList.jsx', height: 420, code: `function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;                 // guard against setting state after unmount
    async function fetchUsers() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Request failed: " + res.status);
        const data = await res.json();
        if (active) setUsers(data);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);  // stop loading either way
      }
    }
    fetchUsers();
    return () => { active = false; };
  }, []);                               // [] = run once on mount

  if (loading) return <p style={{ fontFamily: 'system-ui' }}>Loading users…</p>;
  if (error) return <p style={{ fontFamily: 'system-ui', color: '#c0392b' }}>Error: {error}</p>;

  return (
    <table style={{ fontFamily: 'system-ui', borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
          <th style={{ padding: 8 }}>Name</th>
          <th style={{ padding: 8 }}>Email</th>
          <th style={{ padding: 8 }}>City</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: 8 }}>{u.name}</td>
            <td style={{ padding: 8 }}>{u.email}</td>
            <td style={{ padding: 8 }}>{u.address.city}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}` },
      { type: 'callout', kind: 'tip', text: 'Talking points while you code this in an interview: **“Three states — data, loading, error. Fetch in useEffect with an empty dep array so it runs once. try/catch/finally so loading always stops. Each row needs a stable key. I guard against setState-after-unmount.”**' },
      { type: 'quiz', questions: [
        { q: 'Why is the useEffect dependency array `[]`?', options: ['To run on every render', 'So the fetch runs once, on mount', 'To cause a loop', 'It is optional'], answer: 1,
          explain: 'An empty array means no deps change, so the effect fires a single time after mount.' },
        { q: 'Why put `setLoading(false)` in `finally`?', options: ['It looks cleaner', 'So loading stops on both success and failure', 'To catch errors', 'It is required syntax'], answer: 1,
          explain: 'finally always runs, guaranteeing the spinner clears regardless of outcome.' },
        { q: 'Each item rendered from `.map()` needs a…', options: ['ref', 'unique key prop', 'useEffect', 'context'], answer: 1,
          explain: 'Stable keys let React reconcile list items efficiently and correctly.' },
      ]},
    ],
  },
]
