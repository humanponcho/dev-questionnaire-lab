// Section 1: HTML & CSS Fundamentals  +  Core JavaScript
// Each topic mirrors a question in the questionnaire, adds a runnable
// playground, and a self-check quiz.

export const section1 = [
  {
    id: 'flexbox',
    group: 'HTML & CSS',
    title: 'What is Flexbox?',
    blocks: [
      { type: 'p', text: 'Flexbox (the **CSS Flexible Box** module) is a **one-dimensional** layout model. You lay items out along a single axis and control how leftover space is distributed, how items align, and what visual order they appear in. It is **direction-agnostic** — unlike block (vertical) or inline (horizontal) flow.' },
      { type: 'h2', text: 'The mental model' },
      { type: 'ul', items: [
        'You set `display: flex` on a **container** (parent). Its direct children become **flex items**.',
        '**main-axis** = the direction items flow (set by `flex-direction`). **cross-axis** = perpendicular to it.',
        '`justify-content` distributes items along the **main** axis; `align-items` aligns them on the **cross** axis.',
        '`flex` on an item is shorthand for `flex-grow` / `flex-shrink` / `flex-basis` — how it grows or shrinks.',
        '`gap`, `flex-wrap`, and `order` handle spacing, multi-line wrapping, and visual reordering.',
      ]},
      { type: 'callout', kind: 'tip', text: 'One-line answer: **Flexbox is a one-dimensional layout system for distributing space and aligning items along a single axis.** For 2D layouts (rows *and* columns together) reach for CSS Grid.' },
      { type: 'h2', text: 'See it', tag: 'live' },
      { type: 'p', text: 'This runs real CSS in the preview. Change `justify-content` to `space-between`, or `flex-direction` to `column`, and re-render.' },
      { type: 'react', name: 'FlexboxDemo.jsx', height: 260, code: `function App() {
  const [justify, setJustify] = useState('flex-start');
  const [dir, setDir] = useState('row');
  const box = (c) => ({
    background: c, color: '#fff', padding: '18px 22px',
    borderRadius: 6, fontFamily: 'monospace', fontWeight: 700
  });
  return (
    <div>
      <div style={{ marginBottom: 10, fontFamily: 'monospace', fontSize: 13 }}>
        justify-content:{' '}
        <select value={justify} onChange={e => setJustify(e.target.value)}>
          <option>flex-start</option><option>center</option>
          <option>space-between</option><option>space-around</option>
        </select>{'  '}
        flex-direction:{' '}
        <select value={dir} onChange={e => setDir(e.target.value)}>
          <option>row</option><option>column</option>
        </select>
      </div>
      <div style={{
        display: 'flex', flexDirection: dir, justifyContent: justify,
        gap: 10, background: '#eef1f5', padding: 14, borderRadius: 8, minHeight: 90
      }}>
        <div style={box('#f5a623')}>1</div>
        <div style={box('#4ec9a7')}>2</div>
        <div style={box('#6cb6ff')}>3</div>
      </div>
    </div>
  );
}` },
      { type: 'quiz', questions: [
        { q: 'Which property controls alignment along the cross-axis?', options: ['justify-content', 'align-items', 'flex-grow', 'order'], answer: 1,
          explain: '`justify-content` works on the main-axis; `align-items` works on the cross-axis.' },
        { q: 'You need a full 2D grid of rows AND columns that align together. Best tool?', options: ['Flexbox', 'CSS Grid', 'Floats', 'Inline-block'], answer: 1,
          explain: 'Flexbox is one-dimensional. Grid is purpose-built for two-dimensional layouts.' },
      ]},
    ],
  },

  {
    id: 'frameworks',
    group: 'HTML & CSS',
    title: 'Bootstrap vs Tailwind',
    blocks: [
      { type: 'p', text: 'Both are **CSS frameworks**: pre-written CSS you drop in instead of hand-writing everything. Frameworks save time, smooth over cross-browser quirks, and ship grid systems — at the cost of possible **code bloat** and **presentational class names** in your HTML.' },
      { type: 'h2', text: 'Bootstrap — component-first' },
      { type: 'ul', items: [
        '12-column responsive **grid system**; mobile-first breakpoints.',
        'Library of **pre-built components**: buttons, navbars, modals, forms, alerts.',
        'Utility classes for margin/padding/text, plus deep customization via Sass.',
        'Best when you want **consistent, ready-made UI fast**.',
      ]},
      { type: 'h2', text: 'Tailwind — utility-first' },
      { type: 'ul', items: [
        'Large set of **low-level utility classes** (`p-4`, `text-center`, `bg-blue-500`) you compose in markup.',
        'You rarely write custom CSS; a `tailwind.config.js` defines your design tokens.',
        'Responsive + state variants via prefixes: `md:text-lg`, `hover:bg-blue-700`.',
        '**JIT compiler** generates only the classes you use → lean output.',
      ]},
      { type: 'callout', text: 'Interview framing: **Bootstrap gives you finished components; Tailwind gives you building blocks.** Bootstrap is faster to a standard look; Tailwind is more flexible for a custom design system with less unused CSS.' },
      { type: 'quiz', questions: [
        { q: 'Which phrase best describes Tailwind\'s approach?', options: ['Component-first', 'Utility-first', 'Server-first', 'Class-free'], answer: 1,
          explain: 'Tailwind composes many small single-purpose utility classes rather than shipping finished components.' },
        { q: 'A common disadvantage of CSS frameworks is…', options: ['No responsive support', 'Presentational class names / code bloat', 'They cannot be customized', 'No grid systems'], answer: 1,
          explain: 'Frameworks can add markup that only controls presentation and can include more code than a page needs (bloat).' },
      ]},
    ],
  },

  {
    id: 'var-let-const',
    group: 'Core JavaScript',
    title: 'var, let, and const',
    blocks: [
      { type: 'p', text: 'The three differ across **scope**, **hoisting/initialization**, and **re-assignment**.' },
      { type: 'ul', items: [
        '**var** — *function-scoped*. Hoisted and initialized to `undefined`, so reading it before its line gives `undefined`, not an error. Can be re-declared.',
        '**let** — *block-scoped*. Hoisted but **not initialized** → reading before declaration throws (the **Temporal Dead Zone**). Re-assignable, not re-declarable.',
        '**const** — *block-scoped*, same TDZ as `let`, but **must be initialized at declaration and cannot be re-assigned**. (The *binding* is fixed; a const object\'s contents can still mutate.)',
      ]},
      { type: 'callout', kind: 'tip', text: 'Default to **const**. Use **let** when the value must change. Avoid **var** in modern code. Rule of thumb: declare in the narrowest scope possible (Principle of Least Exposure).' },
      { type: 'h2', text: 'Prove the TDZ to yourself', tag: 'live' },
      { type: 'p', text: 'Run this as-is (you\'ll get a ReferenceError from the `let`). Then comment out the `let` block and see `var` print `undefined` instead.' },
      { type: 'js', name: 'scoping.js', height: 150, code: `// var is hoisted AND initialized to undefined:
console.log("var before decl:", typeof v, v);
var v = 10;

// let is in the Temporal Dead Zone until its line runs:
try {
  console.log(x);       // throws
  let x = 5;
} catch (e) {
  console.log("Reading let early ->", e.name);
}

// const cannot be reassigned:
const PI = 3.14;
try { PI = 3; } catch (e) { console.log("Reassign const ->", e.name); }` },
      { type: 'quiz', questions: [
        { q: 'What does reading a `let` variable before its declaration produce?', options: ['undefined', 'null', 'A ReferenceError (TDZ)', '0'], answer: 2,
          explain: '`let`/`const` are hoisted but uninitialized; access before the declaration line throws a ReferenceError.' },
        { q: 'Which is true of `const`?', options: ['It is function-scoped', 'Its object contents can never change', 'The variable binding cannot be reassigned', 'It is initialized to undefined when hoisted'], answer: 2,
          explain: 'const forbids re-assigning the binding, but a const object/array can still be mutated internally.' },
      ]},
    ],
  },

  {
    id: 'eq',
    group: 'Core JavaScript',
    title: '== vs ===',
    blocks: [
      { type: 'p', text: 'The difference is **type coercion**. `==` (loose) will convert operands to a common type before comparing. `===` (strict) returns `false` immediately if the types differ — it checks value **and** type.' },
      { type: 'ul', items: [
        'For **objects/arrays**, `===` is **identity** (same reference in memory), not structural. `[1,2] === [1,2]` is `false`.',
        'Two liars to remember: `NaN === NaN` is `false`; `0 === -0` is `true`. Use `Number.isNaN()` and `Object.is()` for those.',
        'Recommendation: prefer `===`, but **understand** `==` because coercion shows up elsewhere (e.g. `if` conditions).',
      ]},
      { type: 'h2', text: 'Coercion in action', tag: 'live' },
      { type: 'js', name: 'equality.js', height: 150, code: `console.log('"5" == 5   ->', "5" == 5);    // true  (coerced)
console.log('"5" === 5  ->', "5" === 5);   // false (types differ)
console.log('0 == false ->', 0 == false);  // true
console.log('[1,2] === [1,2] ->', [1,2] === [1,2]); // false (identity)
console.log('NaN === NaN ->', NaN === NaN);         // false!
console.log('Number.isNaN(NaN) ->', Number.isNaN(NaN)); // true
console.log('0 === -0 ->', 0 === -0);               // true
console.log('Object.is(0,-0) ->', Object.is(0, -0)); // false` },
      { type: 'quiz', questions: [
        { q: 'What is the value of `"5" === 5`?', options: ['true', 'false', 'NaN', 'ReferenceError'], answer: 1,
          explain: 'Strict equality does no coercion; a string and a number have different types → false.' },
        { q: 'How should you reliably compare two NaN-producing values?', options: ['a === b', 'a == b', 'Number.isNaN() on each', 'a !== b'], answer: 2,
          explain: 'NaN === NaN is false. Number.isNaN() detects NaN correctly.' },
      ]},
    ],
  },

  {
    id: 'hoisting',
    group: 'Core JavaScript',
    title: 'Hoisting',
    blocks: [
      { type: 'p', text: 'Hoisting is the JS engine registering declarations at the **top of their scope during compilation**, before any code runs. It is **not** the engine physically re-ordering your code — it prepares the scope so identifiers exist from the start.' },
      { type: 'ul', items: [
        '**var** → hoisted **and** initialized to `undefined`.',
        '**let / const** → hoisted but **not** initialized → TDZ → ReferenceError if accessed early.',
        '**Function declarations** → hoisted **and** auto-initialized to the function, so you can call them before they appear.',
        '**Function *expressions*** (assigned to a var/let) are **not** function-hoisted — only their variable is.',
      ]},
      { type: 'callout', text: 'Order in a scope: function declarations are registered first, then variables. Thinking of hoisting as a *compile-time* operation makes the quirks disappear.' },
      { type: 'h2', text: 'Declarations vs expressions', tag: 'live' },
      { type: 'js', name: 'hoisting.js', height: 160, code: `// Function DECLARATION — callable before its line:
console.log(greet("Ada"));
function greet(name) { return "Hi " + name; }

// var is hoisted as undefined:
console.log("count is", count);
var count = 3;

// Function EXPRESSION — the var is hoisted, the function is not:
try {
  shout("hey");
} catch (e) {
  console.log("Calling expression early ->", e.name, "-", e.message);
}
var shout = function (s) { return s.toUpperCase(); };` },
      { type: 'quiz', questions: [
        { q: 'Calling a function *declaration* before it appears in the file…', options: ['throws ReferenceError', 'works — declarations are hoisted and initialized', 'returns undefined', 'throws TypeError'], answer: 1,
          explain: 'Function declarations are hoisted and auto-initialized to the function reference.' },
        { q: 'A `var x = function(){}` called before its line throws what?', options: ['Nothing, it runs', 'TypeError (x is undefined, not a function)', 'SyntaxError', 'It logs the function'], answer: 1,
          explain: 'Only the var is hoisted (as undefined). Calling undefined() → TypeError.' },
      ]},
    ],
  },

  {
    id: 'closures',
    group: 'Core JavaScript',
    title: 'Closures',
    blocks: [
      { type: 'p', text: 'A **closure** is when a function remembers and keeps accessing variables from its defining (lexical) scope, **even after the outer function has returned** and it runs elsewhere. Closure is a property of functions only.' },
      { type: 'ul', items: [
        'It is a **live link**, not a snapshot — later changes to the captured variable are visible inside the closure.',
        'Requires functions being **first-class** (passable, returnable) + **lexical scope**.',
        'Use cases: **callbacks**, **event handlers**, **module privacy**, **currying/partial application**, **memoization**, and **togglers/counters**.',
      ]},
      { type: 'h2', text: 'A private counter (encapsulation via closure)', tag: 'live' },
      { type: 'p', text: 'The `count` variable is unreachable from outside — only the returned functions close over it. That is data privacy with nothing but a closure.' },
      { type: 'js', name: 'closure.js', height: 170, code: `function makeCounter() {
  let count = 0;                 // private, captured by the closures below
  return {
    inc() { count++; return count; },
    dec() { count--; return count; },
    value() { return count; }
  };
}

const c = makeCounter();
console.log(c.inc()); // 1
console.log(c.inc()); // 2
console.log(c.dec()); // 1
console.log("count is not visible:", typeof count); // undefined outside

// Live-link proof: two closures sharing one variable
function multiplier(factor) {
  return (n) => n * factor;   // remembers 'factor'
}
const triple = multiplier(3);
console.log("triple(5) ->", triple(5)); // 15` },
      { type: 'quiz', questions: [
        { q: 'A closure captures outer variables as…', options: ['a copy/snapshot of their values', 'a live reference that reflects later changes', 'only primitives, never objects', 'nothing — it re-reads globals'], answer: 1,
          explain: 'Closures hold a live link to the variables, so updates in the outer scope are observable inside.' },
        { q: 'Which is a classic closure use case?', options: ['Rendering the virtual DOM', 'Private module state / encapsulation', 'CSS specificity', 'Type coercion'], answer: 1,
          explain: 'Modules use closures so only public methods can touch private variables.' },
      ]},
    ],
  },

  {
    id: 'event-loop',
    group: 'Core JavaScript',
    title: 'The event loop',
    blocks: [
      { type: 'p', text: 'JavaScript is **single-threaded** — one call stack, one thing at a time. The **event loop** is what lets it handle async work (timers, network, events) without blocking.' },
      { type: 'ul', items: [
        '**Call stack** — synchronous calls run here to completion.',
        '**Web/Background APIs** — `setTimeout`, `fetch`, listeners run outside the stack, in the environment.',
        '**Task (callback) queue** — finished async callbacks wait here (e.g. `setTimeout`).',
        '**Microtask queue** — **promise** callbacks and `queueMicrotask`. **Higher priority** than the task queue.',
        '**Event loop** — when the stack is empty, it drains **all microtasks first**, then takes one task.',
      ]},
      { type: 'callout', kind: 'tip', text: 'The famous ordering: synchronous code → **all** microtasks (promises) → **then** macrotasks (setTimeout). That is why a `Promise.then` logged after a `setTimeout(...,0)` still runs *first*.' },
      { type: 'h2', text: 'Predict the output, then Run', tag: 'live' },
      { type: 'js', name: 'event-loop.js', height: 160, code: `console.log("Start");

setTimeout(() => console.log("Inside setTimeout"), 0); // task queue

Promise.resolve().then(() => console.log("Inside Promise")); // microtask

console.log("End");

// Expected order:
// Start
// End
// Inside Promise   (microtasks drain before tasks)
// Inside setTimeout` },
      { type: 'quiz', questions: [
        { q: 'Which runs first after synchronous code finishes?', options: ['setTimeout(fn, 0) callback', 'A resolved Promise .then callback', 'They run in source order', 'Whichever was registered last'], answer: 1,
          explain: 'The microtask queue (promises) is drained fully before the next macrotask (setTimeout).' },
        { q: 'JavaScript is…', options: ['multi-threaded by default', 'single-threaded with an event loop for async', 'blocking on all I/O', 'unable to run async code'], answer: 1,
          explain: 'One call stack; the event loop coordinates async callbacks so nothing blocks the main thread.' },
      ]},
    ],
  },

  {
    id: 'promises-async',
    group: 'Core JavaScript',
    title: 'Promises, async/await & errors',
    blocks: [
      { type: 'p', text: 'A **Promise** represents a future value from an async operation — it resolves (success) or rejects (failure). **async/await** is syntactic sugar over promises that makes async code read like synchronous code.' },
      { type: 'ul', items: [
        'Mark a function `async`; inside it, `await` pauses until a promise settles, then continues with its value.',
        'Handle failures with **try/catch** around the `await` — a rejected promise throws into the `catch`.',
        'Benefit: no nested `.then()` chains or callback pyramids; flatter, more readable flow.',
      ]},
      { type: 'h2', text: 'Real fetch with error handling', tag: 'live' },
      { type: 'p', text: 'This awaits a real API call. Change the URL to something broken to watch the catch block fire.' },
      { type: 'js', name: 'async-await.js', height: 200, code: `async function loadUser(id) {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/" + id);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const user = await res.json();
    console.log("Got:", user.name, "-", user.email);
    return user;
  } catch (err) {
    console.error("Fetch failed:", err.message);
  } finally {
    console.log("(finally always runs — good for stopping a loading spinner)");
  }
}

await loadUser(1);` },
      { type: 'callout', text: 'Interview soundbite: **“I use async/await with try/catch/finally. await unwraps the promise, catch handles rejections, and finally cleans up loading state regardless of outcome.”**' },
      { type: 'quiz', questions: [
        { q: 'How do you handle a rejected promise inside an async function?', options: ['.catch() only works, not try/catch', 'Wrap the await in try/catch', 'You cannot catch it', 'Use if/else on the promise'], answer: 1,
          explain: 'await throws on rejection, so a surrounding try/catch handles the error.' },
        { q: 'What does `await` do?', options: ['Blocks the whole thread', 'Pauses the async function until the promise settles, then resumes', 'Converts sync to async', 'Cancels the promise'], answer: 1,
          explain: 'It suspends only that async function until the awaited promise resolves/rejects.' },
      ]},
    ],
  },

  {
    id: 'map-filter-reduce',
    group: 'Core JavaScript',
    title: 'map, filter, reduce',
    blocks: [
      { type: 'p', text: 'Three array methods for transforming data without mutating the original — the backbone of data handling in React.' },
      { type: 'ul', items: [
        '**map** — transform every item; returns a **new array of the same length**. (In React: turn data into JSX.)',
        '**filter** — keep items where the callback returns `true`; returns a **shorter-or-equal** array.',
        '**reduce** — fold the array into a **single value** using an accumulator + an initial value.',
      ]},
      { type: 'h2', text: 'Chain them', tag: 'live' },
      { type: 'js', name: 'transforms.js', height: 190, code: `const nums = [1, 2, 3, 4, 5, 6];

// map: double each
console.log("map:", nums.map(n => n * 2));

// filter: keep evens
console.log("filter:", nums.filter(n => n % 2 === 0));

// reduce: sum
console.log("reduce sum:", nums.reduce((acc, n) => acc + n, 0));

// chained: sum of squares of the odd numbers
const result = nums
  .filter(n => n % 2 === 1)     // [1,3,5]
  .map(n => n * n)              // [1,9,25]
  .reduce((acc, n) => acc + n, 0); // 35
console.log("chained:", result);` },
      { type: 'quiz', questions: [
        { q: 'Which method always returns an array the SAME length as the input?', options: ['filter', 'reduce', 'map', 'forEach'], answer: 2,
          explain: 'map transforms each element 1:1, so the length is preserved.' },
        { q: 'reduce collapses an array into…', options: ['a boolean', 'a single accumulated value', 'a filtered array', 'a promise'], answer: 1,
          explain: 'reduce applies a reducer against an accumulator to produce one final value.' },
      ]},
    ],
  },

  {
    id: 'spread-rest',
    group: 'Core JavaScript',
    title: 'Spread & rest (...)',
    blocks: [
      { type: 'p', text: 'Same syntax `...`, opposite jobs — told apart by **where** they appear.' },
      { type: 'ul', items: [
        '**Spread** — *expands* an iterable into individual elements. Appears on the **right-hand side** / in call arguments. Copies array/object contents.',
        '**Rest** — *collects* multiple elements into one array/object. Appears on the **left-hand side** / in a parameter list.',
      ]},
      { type: 'callout', text: 'React uses: **spread** to pass all props (`<Item {...item} />`) and to update state immutably (`setState({...prev, changed})`); **rest** to peel off a prop and keep the remainder (`const { id, ...rest } = item`).' },
      { type: 'h2', text: 'Both sides', tag: 'live' },
      { type: 'js', name: 'spread-rest.js', height: 190, code: `// SPREAD — expand
const a = [1, 2, 3];
console.log("array spread:", [...a, 4, 5]);
const obj1 = { a: 1, b: 2 };
console.log("object spread:", { ...obj1, c: 3 });
console.log("Math.max(...a):", Math.max(...a));

// REST — collect
function sum(...nums) {          // gather all args into an array
  return nums.reduce((t, n) => t + n, 0);
}
console.log("rest params:", sum(1, 2, 3, 4));

const { a: first, ...others } = { a: 1, b: 2, c: 3 };
console.log("rest destructure -> first:", first, "others:", others);` },
      { type: 'quiz', questions: [
        { q: 'In `function f(...args) {}`, the `...` is…', options: ['spread', 'rest — collects args into an array', 'a syntax error', 'the same as spread here'], answer: 1,
          explain: 'On the left/in a parameter list, `...` collects → it is the rest operator.' },
        { q: 'Immutably updating React state uses…', options: ['rest to remove keys', 'spread to copy old state into a new object', 'delete', 'Object.freeze'], answer: 1,
          explain: '`{ ...prev, field: value }` spreads the previous state into a fresh object.' },
      ]},
    ],
  },

  {
    id: 'debounce-throttle',
    group: 'Core JavaScript',
    title: 'Debounce & throttle',
    blocks: [
      { type: 'p', text: 'Both **limit how often a function runs** during high-frequency events (typing, scroll, resize), protecting performance.' },
      { type: 'ul', items: [
        '**Debounce** — wait for a **quiet period**; only fire once the events stop for N ms. If another event lands, the timer resets. Great for **search-as-you-type**, resize-end, validation-on-pause.',
        '**Throttle** — fire at most **once every N ms** during a burst — steady cadence. Great for scroll position, drag, rate-limited APIs.',
      ]},
      { type: 'h2', text: 'Build a debounce', tag: 'live' },
      { type: 'p', text: 'Simulated rapid keystrokes — only the final one triggers the "search". Change the pattern to see the timer reset.' },
      { type: 'js', name: 'debounce.js', height: 210, code: `function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);               // reset on every call
    timer = setTimeout(() => fn(...args), delay);
  };
}

const search = debounce((q) => console.log("🔎 searching for:", q), 100);

// Simulate a user typing quickly — only the last call survives the reset:
search("r");
search("re");
search("rea");
search("reac");
search("react");
console.log("(typed 5 times fast — watch how many searches actually fire)");

// throttle for comparison:
function throttle(fn, interval) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= interval) { last = now; fn(...args); }
  };
}
console.log("throttle would fire at most once per interval during a burst.");` },
      { type: 'quiz', questions: [
        { q: 'Search-as-you-type that waits until the user stops typing uses…', options: ['throttle', 'debounce', 'neither', 'both simultaneously'], answer: 1,
          explain: 'Debounce waits for a quiet period, so it fires once after typing stops.' },
        { q: 'Throttle guarantees the function…', options: ['runs once after events stop', 'runs at most once per interval during a burst', 'never runs', 'runs on every event'], answer: 1,
          explain: 'Throttle enforces a steady maximum rate during continuous events.' },
      ]},
    ],
  },
]
