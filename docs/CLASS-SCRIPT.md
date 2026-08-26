# Dev Questionnaire Lab — Full Class Script

An instructor's script for teaching every topic in this repository. Read it start to
finish, or follow it live while the class works through the app.

It covers **29 topics across 8 sections**, in the same order the app presents them, so
the numbering here (`01` … `29`) matches the numbers in the app's sidebar.

---

## How to use this script

Every topic follows the same five beats. Once the class feels the rhythm, they stop
needing you to signpost it:

| Beat | What it is | Roughly |
|------|-----------|---------|
| **Say this** | The spoken explanation. Speak it, don't read it. | 2–4 min |
| **On the board** | The bullets that must end up in their notes. | 1 min |
| **Run it** | The playground in the app. They type, you narrate. | 3–6 min |
| **Check** | The self-check questions, asked out loud before they click. | 2 min |
| **Soundbite** | The one sentence they'd give in an interview. | 30 sec |

Formatting conventions used below:

- **Say this** blocks are in quote marks — they are a script, not a summary. Paraphrase freely.
- ▶ marks a moment where you switch to the app and run something.
- ⚠ marks a mistake learners reliably make. Say it *before* they make it.
- 💬 is the interview soundbite. Have the class repeat it back.

### The one rule of the class

> **Nobody watches. Everybody types.**

The app is built so every answer is executable. A learner who only reads the topic and
clicks "understood" has learned roughly nothing. Insist that they break each demo at
least once — a broken demo teaches more than a working one.

---

## Before the first session

### Room / call setup

- Your screen shared with the app on one side, an editor on the other. Font size up.
- Learners each need the app running locally (or the deployed GitHub Pages URL).
- Ask everyone to open their browser devtools console once, at the start. Some will
  never have opened it.

### Getting the app running

```bash
npm install
npm run dev
```

Vite prints a URL (default `http://localhost:5173`) and opens it. For a production check:

```bash
npm run build && npm run preview
```

### What the app gives you

- **Sidebar** — all 29 topics grouped by section, with a progress bar. Progress is stored
  in `localStorage`, so it survives a refresh but is per-browser.
- **JS playground** — runs the code in a sandboxed async function with `console.*`
  captured into an output panel. Top-level `await` and real `fetch` both work.
- **React playground** — compiles the JSX with Babel, mounts a component named `App`.
  `useState`, `useEffect`, `useRef`, `useReducer`, `useCallback`, `useMemo`, `useContext`
  and `createContext` are all in scope. Babel is ~3 MB and loads lazily on the first
  **Render** — warn the class about the one-off pause.
- **Self-check** — locks after answering and explains why. One attempt per question per
  page load; a refresh resets it.

⚠ Two things reliably bite in a live room: the first **Render** click is slow (Babel
chunk downloading), and the topics that call `fetch` need working internet. If the venue
wifi is unreliable, pre-load topics 08 and 29 before the session.

### Prerequisites for learners

They need to be able to read basic JavaScript — variables, functions, objects, arrays —
and to have seen HTML. They do **not** need prior React. Everything else is built here.

---

## Course shapes

Pick one. All three cover the same 29 topics.

### A. One full day (≈ 6.5 h + breaks)

| Block | Section | Topics | Time |
|-------|---------|--------|------|
| 1 | HTML & CSS | 01–02 | 35 min |
| 2 | Core JavaScript, part 1 | 03–06 | 70 min |
| — | *break* | | 15 min |
| 3 | Core JavaScript, part 2 | 07–11 | 85 min |
| — | *lunch* | | 45 min |
| 4 | React Fundamentals | 12–17 | 90 min |
| — | *break* | | 15 min |
| 5 | Advanced React | 18–24 | 80 min |
| 6 | Tooling, Testing, TypeScript | 25–27 | 45 min |
| 7 | Coding Challenges | 28–29 | 40 min |

### B. Four evening sessions (2 h each)

1. **Foundations** — 01–06 (CSS + scope, equality, hoisting, closures)
2. **Async JavaScript & data** — 07–11 (event loop, promises, array methods, spread, timing)
3. **React** — 12–17 (virtual DOM through useEffect)
4. **Scale & ship** — 18–29 (advanced React, Next.js, testing, TypeScript, challenges)

### C. Self-paced with weekly checkpoints

Learners work the app alone; you run a 45-minute session per section where you only do
the **Check** and **Soundbite** beats, and answer what they got stuck on. Use the
"Questions to ask" list at the end of each section.

---

# Section 1 — HTML & CSS

**Topics 01–02 · ≈ 35 min**

Open with the framing for the whole day:

> "Everything we cover today is a question someone will actually ask you. For each one
> you need three things: an explanation in plain English, a demo you can write on a
> whiteboard, and one sentence you can say when the interviewer says *'in short?'*
> We're going to build all three, 29 times."

---

## 01 · What is Flexbox?

### Say this

> "Flexbox is the CSS Flexible Box module. The single most important word in it is
> **one-dimensional**. You lay items out along *one* axis — a row or a column — and
> Flexbox's job is to decide how the leftover space along that axis gets handed out,
> how the items line up across it, and what order they appear in.
>
> The reason it exists: block layout stacks things vertically, inline layout runs them
> horizontally, and both are opinionated about direction. Flexbox is
> **direction-agnostic** — you tell it the direction, and everything else follows from
> there."

Then the mental model, which is the part that actually sticks:

> "You put `display: flex` on a **container** — a parent. Its *direct children*
> immediately become **flex items**. Nothing else changes; grandchildren are unaffected.
>
> The container now has two axes. The **main axis** is the direction items flow, set by
> `flex-direction`. The **cross axis** is perpendicular to it. That's the whole trick:
> once you know which axis is which, every property tells you which one it works on.
> `justify-content` distributes along the **main** axis. `align-items` aligns on the
> **cross** axis. If you remember only that pairing, you can guess the rest."

### On the board

- `display: flex` on the **container**; direct children become **flex items**.
- **main axis** = direction of flow (`flex-direction`); **cross axis** = perpendicular.
- `justify-content` → **main** axis. `align-items` → **cross** axis.
- `flex` on an item = shorthand for `flex-grow` / `flex-shrink` / `flex-basis` — how it grows and shrinks.
- `gap`, `flex-wrap`, `order` → spacing, multi-line wrapping, visual reordering.
- **One dimension only.** Rows *and* columns aligning together → CSS Grid.

### ▶ Run it — `FlexboxDemo.jsx`

The demo has two dropdowns driving real CSS on three coloured boxes.

Walk them through it in this order — don't let them click randomly:

1. Leave `flex-direction: row`. Change `justify-content` from `flex-start` to `center`,
   then `space-between`, then `space-around`. **Ask before each:** "where does the extra
   space go?" `space-between` puts zero space at the outer edges; `space-around` gives
   each item equal space on both sides, so the outer gaps look half-size.
2. Now switch `flex-direction` to `column` and go through the same four values again.
   **This is the payoff moment.** `justify-content` now moves things *vertically* — the
   property didn't change meaning, the main axis did.
3. Ask them to edit the code directly: add `alignItems: 'center'` and set a taller
   `minHeight`, and watch the cross-axis alignment.

⚠ The single most common confusion: learners memorise "justify = horizontal, align =
vertical". That's only true while `flex-direction: row`. Flip to `column` and the mapping
inverts. Teach axes, never directions.

### Check

**Q1. Which property controls alignment along the cross-axis?**
`justify-content` · **`align-items`** ✓ · `flex-grow` · `order`
→ `justify-content` works on the main axis; `align-items` works on the cross axis.

**Q2. You need a full 2D grid of rows AND columns that align together. Best tool?**
Flexbox · **CSS Grid** ✓ · Floats · Inline-block
→ Flexbox is one-dimensional. Grid is purpose-built for two-dimensional layouts.

### 💬 Soundbite

> "Flexbox is a one-dimensional layout system for distributing space and aligning items
> along a single axis. For two-dimensional layouts I reach for CSS Grid."

---

## 02 · Bootstrap vs Tailwind

### Say this

> "Both of these are CSS frameworks — pre-written CSS you drop into a project instead of
> hand-writing everything. The reason anyone uses one is speed: you get a grid system,
> you get cross-browser quirks smoothed over, and you stop reinventing a button for the
> fortieth time.
>
> They're not free, though, and the interviewer usually wants to hear the cost as well
> as the benefit. Two costs: **code bloat** — you ship CSS for components you never use —
> and **presentational class names** in your HTML, meaning your markup now describes what
> things *look like* rather than what they *are*."

Then contrast them:

> "**Bootstrap is component-first.** It hands you finished things. A navbar, a modal, an
> alert — styled, responsive, done. Twelve-column mobile-first grid, a big library of
> components, utility classes for spacing and text, and deep customisation through Sass
> if you want to rebrand it. You use Bootstrap when you want consistent, ready-made UI
> fast and you don't have strong opinions about the look.
>
> **Tailwind is utility-first.** It hands you building blocks instead — hundreds of tiny
> single-purpose classes like `p-4`, `text-center`, `bg-blue-500` — and you compose them
> in the markup. You almost never write custom CSS; instead a `tailwind.config.js` holds
> your design tokens. Responsive and interactive states are prefixes: `md:text-lg`,
> `hover:bg-blue-700`. And the JIT compiler only generates the classes you actually used,
> so the output stays lean."

### On the board

**Bootstrap — component-first**
- 12-column responsive grid; mobile-first breakpoints.
- Pre-built components: buttons, navbars, modals, forms, alerts.
- Utility classes for margin/padding/text; deep customisation via Sass.
- Best when you want **consistent, ready-made UI fast**.

**Tailwind — utility-first**
- Low-level utility classes (`p-4`, `text-center`, `bg-blue-500`) composed in markup.
- Rarely write custom CSS; `tailwind.config.js` holds your design tokens.
- Responsive + state variants as prefixes: `md:text-lg`, `hover:bg-blue-700`.
- **JIT compiler** emits only the classes you use → lean output.

**The trade-off in one line:** Bootstrap is faster to a *standard* look; Tailwind is
more flexible for a *custom* design system with less unused CSS.

### Discussion instead of a demo

This topic has no playground, so run it as a two-minute discussion. Good prompts:

- "Your team has three weeks to ship an internal admin tool. Which one, and why?"
  (Bootstrap — nobody cares what an internal tool looks like, and finished components win.)
- "Your team has a designer with a full design system in Figma. Which one?"
  (Tailwind — you'd fight Bootstrap's defaults the whole way.)
- "What does a critic mean by 'my HTML is full of presentational classes'?"
  (`class="p-4 text-center bg-blue-500"` describes appearance, not meaning. Tailwind's
  answer is that you extract repeated patterns into components.)

### Check

**Q1. Which phrase best describes Tailwind's approach?**
Component-first · **Utility-first** ✓ · Server-first · Class-free
→ Tailwind composes many small single-purpose utility classes rather than shipping finished components.

**Q2. A common disadvantage of CSS frameworks is…**
No responsive support · **Presentational class names / code bloat** ✓ · They cannot be customized · No grid systems
→ Frameworks can add markup that only controls presentation, and can include more code than a page needs.

### 💬 Soundbite

> "Bootstrap gives you finished components; Tailwind gives you building blocks."

---

### Section 1 — questions to ask if you're running a checkpoint

1. What makes Flexbox one-dimensional, and when does that become a problem?
2. Flip `flex-direction` to `column` — which properties change meaning?
3. Name one benefit and one cost of adopting a CSS framework.

---

# Section 2 — Core JavaScript

**Topics 03–11 · ≈ 2 h 35 min across two blocks**

Open the section:

> "This is the part of the interview where they find out whether you actually know
> JavaScript or whether you know React and have been getting away with it. Every one of
> these nine topics is a question I have personally been asked. They're also the topics
> where a wrong mental model produces bugs you can't debug — so we run all of them."

---

## 03 · var, let, and const

### Say this

> "Three ways to declare a variable, and they differ on exactly three things: **scope**,
> **hoisting and initialisation**, and **re-assignment**. Learn the three axes and you
> never have to memorise a table.
>
> **`var` is function-scoped.** Not block-scoped — function-scoped. Declare it inside an
> `if` block and it's visible throughout the whole function. It's hoisted *and*
> initialised to `undefined`, which means reading it before its line gives you
> `undefined` rather than an error. That's the dangerous part: it fails silently. It can
> also be re-declared, which lets you clobber a variable by accident.
>
> **`let` is block-scoped** — it lives inside the nearest `{ }`. It is hoisted, but it is
> **not initialised**. That gap between the top of the block and the declaration line is
> called the **Temporal Dead Zone**, and touching the variable in that window throws a
> ReferenceError. That's a feature: it turns a silent `undefined` bug into a loud error.
> `let` is re-assignable but not re-declarable.
>
> **`const` is block-scoped too**, same Temporal Dead Zone, but it must be initialised at
> the declaration and the binding can never be re-assigned. And here's the part people
> get wrong: `const` freezes the **binding**, not the value. A `const` object's contents
> can still be mutated. `const arr = []; arr.push(1)` is completely legal."

### On the board

- **var** — *function-scoped*. Hoisted **and** initialised to `undefined`. Re-declarable.
- **let** — *block-scoped*. Hoisted, **not** initialised → **TDZ** → ReferenceError if read early. Re-assignable, not re-declarable.
- **const** — *block-scoped*, same TDZ, **must** be initialised, binding **cannot** be re-assigned. Contents of a const object can still mutate.
- **Default to `const`. Use `let` when the value must change. Avoid `var` in modern code.**
- Principle of Least Exposure: declare in the narrowest scope that works.

### ▶ Run it — `scoping.js`

1. Run it as written. Three lines of output: `var` prints `undefined` before its
   declaration, the `let` read throws a `ReferenceError` caught by the `try`, and
   re-assigning `const` throws a `TypeError`.
2. **Ask before running:** "what will line 2 print?" Most of the room says "an error".
   The answer is `undefined` — and that's precisely why `var` is dangerous.
3. Have them comment out the `let` block entirely and re-run so the contrast is clean.
4. Extra exercise worth two minutes: add
   ```js
   const config = { debug: false };
   config.debug = true;          // works!
   console.log(config);
   ```
   and let them see that `const` didn't stop it.

⚠ "const means constant" is the misconception to kill in this topic. Say it out loud:
**const means the binding cannot be reassigned, not that the value is immutable.**

### Check

**Q1. What does reading a `let` variable before its declaration produce?**
`undefined` · `null` · **A ReferenceError (TDZ)** ✓ · `0`
→ `let`/`const` are hoisted but uninitialised; access before the declaration line throws.

**Q2. Which is true of `const`?**
It is function-scoped · Its object contents can never change · **The variable binding cannot be reassigned** ✓ · It is initialised to `undefined` when hoisted
→ `const` forbids re-assigning the binding, but a const object/array can still be mutated internally.

### 💬 Soundbite

> "`var` is function-scoped and initialised to `undefined` when hoisted; `let` and `const`
> are block-scoped and sit in a temporal dead zone until their line runs. I default to
> `const`, use `let` when it has to change, and don't use `var`."

---

## 04 · == vs ===

### Say this

> "The entire difference is **type coercion**.
>
> `==`, loose equality, will convert the operands to a common type before comparing.
> `===`, strict equality, returns `false` immediately if the types differ — it checks
> value **and** type. That's it. That's the difference.
>
> Where it gets interesting is objects. For objects and arrays, `===` is **identity** —
> are these two references pointing at the same object in memory? Not: do they have the
> same contents. So `[1,2] === [1,2]` is `false`, because those are two different arrays
> that happen to look alike. This surprises people constantly, and it's why React's
> memoisation works the way it does — hold that thought, we'll need it in topic 20.
>
> Two liars you should be able to name. `NaN === NaN` is **false** — NaN is the only
> value in JavaScript not equal to itself, so you test for it with `Number.isNaN()`.
> And `0 === -0` is **true**, even though they're distinguishable; `Object.is()` tells
> them apart.
>
> The recommendation is prefer `===` — but *understand* `==`, because coercion doesn't
> only live in the `==` operator. It shows up in `if` conditions, in `+`, everywhere."

### On the board

- `==` coerces to a common type first. `===` compares **value and type**, no coercion.
- For objects/arrays `===` is **identity** (same reference), not structural. `[1,2] === [1,2]` → `false`.
- `NaN === NaN` → `false`. Use `Number.isNaN()`.
- `0 === -0` → `true`. Use `Object.is()` to distinguish.
- **Prefer `===`.** Understand `==` because coercion appears elsewhere.

### ▶ Run it — `equality.js`

Eight lines, each a small surprise. Run the whole thing, then go line by line:

- `"5" == 5` → `true` (the string coerces to a number).
- `"5" === 5` → `false` (different types, no conversion attempted).
- `0 == false` → `true` (`false` coerces to `0`). Good moment to mention the
  falsy set: `false`, `0`, `""`, `null`, `undefined`, `NaN`.
- `[1,2] === [1,2]` → `false`. **Pause here.** Ask why. Then ask what
  `const a = [1,2]; a === a` gives. (`true` — same reference.)
- `NaN === NaN` → `false`, and `Number.isNaN(NaN)` → `true`.
- `0 === -0` → `true`, and `Object.is(0, -0)` → `false`.

### Check

**Q1. What is the value of `"5" === 5`?**
`true` · **`false`** ✓ · `NaN` · ReferenceError
→ Strict equality does no coercion; a string and a number have different types.

**Q2. How should you reliably compare two NaN-producing values?**
`a === b` · `a == b` · **`Number.isNaN()` on each** ✓ · `a !== b`
→ `NaN === NaN` is `false`; `Number.isNaN()` detects NaN correctly.

### 💬 Soundbite

> "`==` coerces types before comparing; `===` compares value and type with no coercion.
> I use `===` by default, and I remember that for objects it's reference identity, not
> structural equality."

---

## 05 · Hoisting

### Say this

> "Hoisting is the single most mis-taught concept in JavaScript, so let's get the framing
> right first. Hoisting is **not** the engine moving your code to the top of the file.
> Nothing gets moved.
>
> What actually happens: before any of your code runs, the engine does a compilation
> pass over the scope and **registers the declarations it finds**. By the time the first
> line executes, the scope already knows which identifiers exist. The differences between
> `var`, `let` and function declarations are just differences in *what value they're
> registered with*.
>
> `var` is registered **and initialised to `undefined`**. `let` and `const` are
> registered but deliberately left uninitialised — that's the Temporal Dead Zone from the
> last topic. And **function declarations** are registered **and initialised to the whole
> function**, which is why you can call a function above the line where it's written.
>
> The catch is **function expressions**. `var shout = function() {}` is a variable
> declaration with a function on the right-hand side. Only the variable gets hoisted, as
> `undefined`. Call it early and you get a **TypeError** — not a ReferenceError, because
> the variable does exist; it's just `undefined`, and `undefined` is not a function.
>
> Once you think of hoisting as a compile-time scope-setup step, every one of these
> quirks stops being a quirk."

### On the board

- Hoisting = declarations registered at the **top of their scope at compile time**, before execution. Nothing is physically moved.
- **var** → hoisted **and** initialised to `undefined`.
- **let / const** → hoisted, **not** initialised → TDZ → ReferenceError.
- **Function declarations** → hoisted **and** initialised to the function → callable before their line.
- **Function expressions** → only the variable hoists → calling early gives **TypeError**.
- Within a scope, function declarations are registered before variables.

### ▶ Run it — `hoisting.js`

1. **Before running**, ask them to predict all three outputs. Take a show of hands on
   the third one — most people say ReferenceError.
2. Run it. `greet("Ada")` works above its definition. `count` prints `undefined`.
   `shout("hey")` throws **TypeError: shout is not a function**.
3. The teaching moment is the difference between the two errors. Write both on the board:
   - **ReferenceError** — the identifier doesn't exist (or is in the TDZ).
   - **TypeError** — the identifier exists, but its value can't do what you asked.
4. Exercise: change `var shout = function...` to a `function shout()` declaration and
   re-run. It now works. Change it to `const shout = () => ...` and re-run — now it's a
   ReferenceError again, because `const` has a TDZ.

That last exercise is the best thirty seconds in this topic: one line changed, three
different behaviours.

### Check

**Q1. Calling a function *declaration* before it appears in the file…**
throws ReferenceError · **works — declarations are hoisted and initialised** ✓ · returns undefined · throws TypeError

**Q2. A `var x = function(){}` called before its line throws what?**
Nothing, it runs · **TypeError (x is undefined, not a function)** ✓ · SyntaxError · It logs the function

### 💬 Soundbite

> "Hoisting is the engine registering declarations at the top of their scope during
> compilation. `var` is initialised to `undefined`, `let` and `const` are left in the
> temporal dead zone, and function declarations are fully initialised — so only
> declarations are safely callable before their line."

---

## 06 · Closures

### Say this

> "A closure is when a function **remembers and keeps using variables from the scope it
> was defined in, even after that outer function has returned** and the inner function is
> running somewhere else entirely.
>
> Two things have to be true for closures to exist, and JavaScript has both. Functions
> are **first-class** — you can pass them around and return them from other functions.
> And scope is **lexical** — a function's scope chain is determined by where it was
> *written*, not where it's *called*. Put those together and a returned function drags
> its birthplace along with it.
>
> The detail that matters most: a closure captures a **live link**, not a snapshot. It
> isn't copying the value at the moment of creation. If the outer variable changes later,
> the closure sees the new value. Two closures created in the same scope share the same
> variable — change it through one, and the other sees the change.
>
> And closures aren't exotic. Every callback, every event handler, every `setTimeout`
> callback that mentions a surrounding variable is a closure. You've been writing them
> the whole time. The named use cases: module privacy, currying and partial application,
> memoisation, and any kind of counter or toggle that has to persist between calls."

### On the board

- A closure = a function keeping access to its **defining (lexical) scope** after the outer function has returned.
- It's a **live link**, not a snapshot — later changes are visible inside.
- Requires **first-class functions** + **lexical scope**.
- Use cases: callbacks, event handlers, **module privacy**, currying / partial application, **memoisation**, counters and togglers.

### ▶ Run it — `closure.js`

1. Run it as written: `1`, `2`, `1`, then `count is not visible: undefined`, then
   `triple(5) -> 15`.
2. The key line to dwell on is `typeof count` printing `undefined` at the top level.
   **Say it explicitly:** "there is no way to reach that variable from out here. No
   `private` keyword, no class — just a closure. That's real encapsulation."
3. Ask: "`inc` and `dec` — are they looking at the same `count` or two copies?" The same
   one. Then ask what `makeCounter()` called twice gives you — two independent counters,
   because each call creates a fresh scope.
4. Exercise: add a second counter and interleave calls:
   ```js
   const c2 = makeCounter();
   console.log(c.inc(), c2.inc(), c.inc());   // 2 1 3
   ```
5. The `multiplier` example is currying in miniature. Point out that `triple` has
   permanently captured `factor = 3`.

⚠ Learners conflate "closure" with "function that returns a function". Returning a
function is the *clearest demo* of a closure, not the definition. A callback passed into
`addEventListener` that mentions an outer variable is equally a closure.

### Check

**Q1. A closure captures outer variables as…**
a copy/snapshot of their values · **a live reference that reflects later changes** ✓ · only primitives, never objects · nothing — it re-reads globals

**Q2. Which is a classic closure use case?**
Rendering the virtual DOM · **Private module state / encapsulation** ✓ · CSS specificity · Type coercion

### 💬 Soundbite

> "A closure is a function that keeps a live reference to the variables of the scope it
> was defined in, even after that scope has returned. It's how you get private state in
> JavaScript."

---

## 07 · The event loop

*Block 2 usually starts here. Re-anchor the room first: "everything so far was about
where variables live. From here on it's about* when *code runs."*

### Say this

> "JavaScript is **single-threaded**. One call stack, one thing at a time. So the obvious
> question is: how does it do timers, network requests and user events without freezing?
> The answer is the event loop, and it's genuinely four pieces plus a rule.
>
> **The call stack.** Your synchronous code runs here, each call to completion. While
> something is on the stack, nothing else can run — that's what 'blocking the main
> thread' means.
>
> **The Web APIs / background APIs.** `setTimeout`, `fetch`, event listeners — these
> aren't part of the language, they're provided by the environment (browser or Node), and
> the *waiting* happens out there, off the stack. That's the key insight:
> `setTimeout(fn, 1000)` doesn't occupy the stack for a second. It hands the timer to the
> environment and returns immediately.
>
> **The task queue** — sometimes called the callback or macrotask queue. When a
> `setTimeout` fires or a click happens, its callback is parked here.
>
> **The microtask queue.** Promise callbacks and `queueMicrotask` go here instead, and
> this queue has **higher priority**.
>
> And the rule that ties it together: the event loop watches the stack. **When the stack
> is empty**, it first drains the microtask queue — *all* of it — and only then takes
> **one** item from the task queue. Then it checks microtasks again.
>
> That's why `setTimeout(fn, 0)` doesn't mean 'run now'. It means 'run after the current
> synchronous code, and after every pending promise callback'. Zero is a minimum, not a
> promise."

### On the board

- **Call stack** — synchronous calls, run to completion. One at a time.
- **Web/Background APIs** — `setTimeout`, `fetch`, listeners wait *outside* the stack.
- **Task (macrotask) queue** — finished async callbacks, e.g. `setTimeout`.
- **Microtask queue** — **promise** callbacks, `queueMicrotask`. **Higher priority.**
- **Event loop** — when the stack is empty: drain **all** microtasks, then take **one** task.
- Ordering: **synchronous → all microtasks → one macrotask → repeat.**

### ▶ Run it — `event-loop.js`

**Do not run this first.** Put the code on screen and make them commit to an order.
Take a vote. Then run it.

Output:
```
Start
End
Inside Promise
Inside setTimeout
```

Walk it back through the model:

1. `console.log("Start")` — stack, immediate.
2. `setTimeout(..., 0)` — handed to the environment; callback lands in the **task queue**.
3. `Promise.resolve().then(...)` — the promise is already resolved, so the callback goes
   straight to the **microtask queue**.
4. `console.log("End")` — stack, immediate.
5. Stack empties. Event loop drains **microtasks first** → `Inside Promise`.
6. *Then* one macrotask → `Inside setTimeout`.

Exercises worth doing live:

- Change the delay from `0` to `1000`. The order doesn't change. Ask why. (Both are
  macrotasks queued after everything else; the delay only makes it later still.)
- Add a second `.then()` chained onto the first and predict where it lands.
- The blocking demo, if you have thirty seconds spare: a `while` loop spinning for two
  seconds before `console.log("End")`. Nothing else runs. That's single-threaded.

### Check

**Q1. Which runs first after synchronous code finishes?**
`setTimeout(fn, 0)` callback · **A resolved Promise `.then` callback** ✓ · They run in source order · Whichever was registered last

**Q2. JavaScript is…**
multi-threaded by default · **single-threaded with an event loop for async** ✓ · blocking on all I/O · unable to run async code

### 💬 Soundbite

> "JavaScript is single-threaded with one call stack. The event loop waits for the stack
> to empty, drains all microtasks — promise callbacks — and then takes one macrotask like
> a `setTimeout`. That's why a promise resolves before a `setTimeout(fn, 0)`."

---

## 08 · Promises, async/await & errors

### Say this

> "A **Promise** is an object representing a value that isn't available yet. It's in one
> of three states: pending, then either fulfilled with a value or rejected with a reason.
> Once it settles, it stays settled.
>
> Before promises we had callbacks, and nesting callbacks inside callbacks produced the
> pyramid of doom. Promises flattened that into `.then()` chains. Then **async/await**
> flattened it again — it is syntactic sugar over promises that lets asynchronous code
> read top to bottom like synchronous code.
>
> The mechanics are small. Mark a function `async` — it now always returns a promise.
> Inside it, `await` suspends **that function** until the promise settles, then continues
> with the resolved value. Crucially it suspends the function, not the thread; everything
> else keeps running.
>
> Error handling is where people get sloppy, and it's what interviewers probe. A rejected
> promise **throws** at the `await`, which means an ordinary `try/catch` catches it. And
> `finally` runs either way — which is exactly where your loading spinner should be
> turned off, because a spinner that spins forever after a failed request is one of the
> most common bugs in front-end code."

### On the board

- A Promise represents a future value: **pending → fulfilled | rejected**.
- `async` marks a function; it always returns a promise.
- `await` **pauses that function** until the promise settles, then resumes with the value.
- A rejected promise **throws** at the `await` → catch it with **`try/catch`**.
- **`finally` always runs** — the right place to clear loading state.
- Benefit over `.then()` chains: flatter, reads like synchronous code.

### ▶ Run it — `async-await.js`

This one hits the network for real — `jsonplaceholder.typicode.com`.

1. Run it as written. It prints the user's name and email, then the `finally` line.
2. **Now break it deliberately.** Change the URL to something invalid, e.g.
   `https://jsonplaceholder.typicode.com/nope/1`. Re-run. The `!res.ok` check throws,
   `catch` prints `Fetch failed: HTTP 404`, and — the point — **`finally` still runs.**
3. Break it harder: mangle the hostname so the request itself fails. Now `fetch` rejects
   before `res` exists, and the same `catch` handles it. Two different failure modes,
   one handler.
4. Say the thing about `res.ok` out loud, because it's a classic interview follow-up:
   **`fetch` does not reject on a 404 or a 500.** It only rejects on a network-level
   failure. An HTTP error is a *successful* request that returned a bad status, so you
   must check `res.ok` yourself.

If you have time, mention `Promise.all` (run in parallel, fail fast) versus
`Promise.allSettled` (wait for everything, collect outcomes) — a very common follow-up.

### Check

**Q1. How do you handle a rejected promise inside an async function?**
`.catch()` only works, not try/catch · **Wrap the `await` in `try/catch`** ✓ · You cannot catch it · Use if/else on the promise

**Q2. What does `await` do?**
Blocks the whole thread · **Pauses the async function until the promise settles, then resumes** ✓ · Converts sync to async · Cancels the promise

### 💬 Soundbite

> "I use async/await with try/catch/finally. `await` unwraps the promise, `catch` handles
> rejections, and `finally` cleans up loading state regardless of outcome."

---

## 09 · map, filter, reduce

### Say this

> "Three array methods that transform data **without mutating the original**. They're the
> backbone of data handling in React, and they're worth knowing precisely rather than
> approximately.
>
> **`map`** transforms every element and returns a **new array of the same length**. One
> in, one out, every time. In React this is how data becomes JSX — you map an array of
> objects to an array of elements.
>
> **`filter`** keeps the elements where the callback returns truthy, and returns an array
> that is the same length or shorter. It doesn't transform anything; it only decides.
>
> **`reduce`** folds an entire array down to a **single value**. You give it a reducer
> function taking an accumulator and the current item, plus an initial value for the
> accumulator. Always pass the initial value — leaving it off changes the behaviour and
> throws on an empty array.
>
> And because each returns a new array, they chain. That's the real skill here: reading
> a chain and knowing the shape of the data at each step."

### On the board

- **map** — transform each item → **new array, same length**. (React: data → JSX.)
- **filter** — keep items where the callback is `true` → **shorter or equal** array.
- **reduce** — fold into a **single value** via an accumulator + an initial value.
- None of the three mutates the source array.
- They chain, because each returns a new array.

### ▶ Run it — `transforms.js`

1. Run it. Four outputs: `map` doubles, `filter` keeps evens, `reduce` sums to 21, and
   the chain gives 35.
2. **Trace the chain out loud, on the board**, writing each intermediate array:
   ```
   [1,2,3,4,5,6]
     .filter(odd)   → [1, 3, 5]
     .map(square)   → [1, 9, 25]
     .reduce(sum,0) → 35
   ```
   Insisting they can name the array at each step is the whole lesson.
3. Exercises, in increasing difficulty:
   - Sum of the *even* numbers instead.
   - `console.log(nums)` after all of it — the original is untouched.
   - Use `reduce` to build an object counting occurrences in
     `['a','b','a','c','b','a']`. This is the one that separates people who've used
     `reduce` from people who've read about it.
   - Re-implement `map` using `reduce`. (`arr.reduce((acc, x) => [...acc, f(x)], [])`)

⚠ `forEach` returns `undefined`. Learners write `const doubled = nums.forEach(...)` and
wonder why it's undefined. If you want a result, use `map`.

### Check

**Q1. Which method always returns an array the SAME length as the input?**
filter · reduce · **map** ✓ · forEach

**Q2. `reduce` collapses an array into…**
a boolean · **a single accumulated value** ✓ · a filtered array · a promise

### 💬 Soundbite

> "`map` transforms one-to-one, `filter` selects a subset, `reduce` folds the array into a
> single value. None of them mutate the original, so they chain."

---

## 10 · Spread & rest (...)

### Say this

> "Same three dots, two opposite jobs, and you tell them apart entirely by **where they
> appear**.
>
> **Spread expands.** It takes an iterable and unpacks it into individual elements. You
> see it on the right-hand side of an assignment, or inside a function call's arguments.
> `[...a, 4, 5]` builds a new array with a's elements followed by 4 and 5.
> `Math.max(...a)` passes each element as a separate argument.
>
> **Rest collects.** It gathers multiple things into one array or object. You see it on
> the left-hand side — in a destructuring pattern — or in a function's parameter list.
> `function sum(...nums)` gathers every argument into one array called `nums`.
>
> Expanding on the right, collecting on the left. That's the whole rule.
>
> Both matter enormously in React. **Spread** passes every property of an object as props
> — `<Item {...item} />` — and it's how you update state immutably:
> `setState({ ...prev, changed: value })` builds a *new* object, which is what React needs
> to detect the change. **Rest** peels one property off and keeps the remainder:
> `const { id, ...rest } = item`.
>
> One caveat to say now and repeat later: spread copies are **shallow**. Nested objects
> are still shared by reference."

### On the board

- **Spread** — *expands* an iterable into individual elements. **Right-hand side** / call arguments.
- **Rest** — *collects* elements into one array/object. **Left-hand side** / parameter list.
- React: **spread** to pass all props (`<Item {...item} />`) and for immutable state updates (`{ ...prev, changed }`); **rest** to peel a prop off and keep the remainder.
- Spread copies are **shallow** — nested objects stay shared.

### ▶ Run it — `spread-rest.js`

1. Run it. Array spread, object spread, `Math.max(...a)`, rest parameters, rest in
   destructuring.
2. For each output ask the same question: **"is that a spread or a rest, and how do you
   know?"** The answer is always "look at which side of the `=` it's on."
3. The shallow-copy demo is worth adding live — it prevents a real bug:
   ```js
   const orig = { name: 'a', tags: ['x'] };
   const copy = { ...orig };
   copy.tags.push('y');
   console.log(orig.tags);   // ['x','y']  ← shared!
   ```
4. Bridge forward explicitly: "the `{ ...prev, field: value }` pattern in the rest
   demo is the exact line you'll write in every React state update this afternoon."

### Check

**Q1. In `function f(...args) {}`, the `...` is…**
spread · **rest — collects args into an array** ✓ · a syntax error · the same as spread here

**Q2. Immutably updating React state uses…**
rest to remove keys · **spread to copy old state into a new object** ✓ · `delete` · `Object.freeze`

### 💬 Soundbite

> "Same syntax, opposite jobs: spread expands an iterable into elements on the right-hand
> side; rest collects elements into an array on the left-hand side or in a parameter list."

---

## 11 · Debounce & throttle

### Say this

> "Both of these **limit how often a function runs** during a high-frequency event —
> typing, scrolling, resizing, dragging. Without them you can fire hundreds of calls a
> second, and if each one hits an API or does layout work, you've built a performance
> problem.
>
> **Debounce waits for quiet.** Every time the event fires, you reset a timer. The
> function only runs once the events have *stopped* for N milliseconds. If the user keeps
> typing, it keeps not running. Search-as-you-type is the canonical case: you want one
> request when they stop typing, not one per keystroke. Also resize-end, and validating a
> field once the user pauses.
>
> **Throttle enforces a cadence.** During a continuous burst it runs at most once every
> N milliseconds — steadily, not just at the end. Scroll position tracking is the
> canonical case: you want updates *while* scrolling, just not sixty times a second.
> Also drag handlers and rate-limited APIs.
>
> The one-line distinction to keep: **debounce fires once at the end of a burst; throttle
> fires at a steady rate throughout it.**"

### On the board

- Both **limit how often a function runs** during high-frequency events.
- **Debounce** — wait for a **quiet period**; fire once events stop for N ms; every new event **resets** the timer. → search-as-you-type, resize-end, validate-on-pause.
- **Throttle** — fire **at most once every N ms** during a burst; steady cadence. → scroll position, drag, rate-limited APIs.

### ▶ Run it — `debounce.js`

1. Read the `debounce` implementation before running it. Four lines, and every one
   matters:
   - `let timer` lives in the closure — **call back to topic 06 here.** This is closures
     doing real work, not a toy.
   - `clearTimeout(timer)` on every call is the reset.
   - The returned arrow function takes `...args` and forwards them — **that's rest, then
     spread**, from topic 10. Two topics ago's material, load-bearing.
2. Run it. Five `search` calls fire in a burst; only `react` — the last one — actually
   searches.
3. Exercises:
   - Change the delay to `0` and re-run. Still only one search fires. Ask why. (The
     timer is reset synchronously each time; even a 0 ms timer can't run until the stack
     clears — **that's topic 07's event loop.**)
   - Add a sixth call after a real pause, using `await new Promise(r => setTimeout(r, 200))`
     between them. Now two searches fire.
4. Read the `throttle` implementation and contrast: it tracks a **timestamp** rather
   than a timer, and it fires the *first* call in a burst immediately rather than the
   last one at the end.

This topic is the natural end of the JavaScript section because it uses closures, rest,
spread, and the event loop all at once. Say so — it makes the section feel like it added
up to something.

### Check

**Q1. Search-as-you-type that waits until the user stops typing uses…**
throttle · **debounce** ✓ · neither · both simultaneously

**Q2. Throttle guarantees the function…**
runs once after events stop · **runs at most once per interval during a burst** ✓ · never runs · runs on every event

### 💬 Soundbite

> "Debounce waits for a quiet period and fires once at the end of a burst; throttle fires
> at most once per interval throughout it. Search-as-you-type is debounce; scroll
> tracking is throttle."

---

### Section 2 — questions to ask if you're running a checkpoint

1. Why does reading a `var` before its line give `undefined`, but a `let` throws?
2. `[1,2] === [1,2]` — what and why? Where does that bite you in React?
3. What's the difference between a ReferenceError and a TypeError here?
4. Where does a closure's captured variable actually live, and is it a copy?
5. Give the output order for sync code, a promise, and a `setTimeout(fn, 0)`.
6. Does `fetch` reject on a 404?
7. Which of map/filter/reduce changes the array length, and which can't?
8. `...` — how do you tell spread from rest without any other context?
9. You're firing an API call per keystroke. Debounce or throttle, and why?

---

# Section 3 — React Fundamentals

**Topics 12–17 · ≈ 90 min**

Open the section:

> "Everything from here on assumes the JavaScript we just did. React isn't a new
> language — it's a library with a strong opinion about one thing: **your UI is a
> function of your state.** You don't tell the DOM what to change. You describe what the
> UI should look like for the current state, and React works out the difference."

---

## 12 · The Virtual DOM

### Say this

> "The Virtual DOM is a **lightweight in-memory representation of the real DOM** — plain
> JavaScript objects describing what the UI should look like.
>
> Here's the cycle. State or props change. React builds a new virtual DOM tree. It
> **diffs** that against the previous tree — the process is called **reconciliation** —
> and works out the minimal set of changes needed. Then it applies **only those changes**
> to the real DOM.
>
> Why bother? Three reasons, and you should be able to give all three.
>
> **Performance.** Real DOM operations are expensive because each one can trigger layout
> reflow and repaint. Touching the DOM a hundred times is far more expensive than
> computing a hundred diffs in JavaScript and touching the DOM twice. React batches the
> work and minimises it.
>
> **Predictability.** You describe *what* the UI should be for a given state. React
> figures out *how* to get there. You're not writing `element.classList.add(...)` in one
> place and forgetting the matching remove somewhere else — which is where most
> hand-written DOM bugs come from.
>
> **Consistency.** The rendering stays reliable as state gets complicated, because
> there's one path from state to UI rather than dozens of imperative mutations."

### On the board

- Virtual DOM = **lightweight in-memory copy** of the real DOM.
- On change: update virtual DOM → **diff** against the previous version (**reconciliation**) → apply the **minimal** real-DOM patch.
- **Performance** — real DOM edits trigger reflow/repaint; batching and minimal updates keep it fast.
- **Predictability** — you describe *what*, React decides *how*. Fewer manual bugs.
- **Consistency** — reliable rendering as state grows complex.

### No playground — use the whiteboard

This topic has no demo, so draw one. Two trees side by side, one node different, circle
it, and mark the single real-DOM operation that results. Thirty seconds of drawing beats
three minutes of talking.

Then connect it to yesterday's material: **the diff is why identity matters.** React
compares props with shallow equality — the `[1,2] === [1,2]` problem from topic 04. It's
also why lists need stable `key` props, which comes back in topic 29.

⚠ Don't oversell it. "The virtual DOM is faster than the DOM" is not true as stated — a
hand-optimised direct DOM update is faster than a diff. The honest claim is that it makes
*good-enough* performance the default while keeping the code declarative.

### Check

**Q1. The process of comparing new vs old virtual DOM is called…**
Hydration · **Reconciliation (diffing)** ✓ · Transpilation · Memoization

**Q2. Why is direct real-DOM manipulation slow?**
It uses closures · **Each change can trigger reflow/repaint cycles** ✓ · It runs on the server · It blocks promises

### 💬 Soundbite

> "React diffs a virtual representation of the UI and only touches the parts of the real
> DOM that actually changed."

---

## 13 · React Hooks

### Say this

> "**Hooks are functions that let you hook into React's state and lifecycle features from
> a function component.**
>
> The history matters for about ten seconds: before hooks, only class components could
> hold state or run lifecycle code. Function components were 'dumb' — presentation only.
> Hooks gave function components those powers, and function components won, because
> they're lighter, easier to read, and much easier to share logic between.
>
> The ones you'll use: **`useState`** for a value that changes over time. **`useEffect`**
> for side effects — fetching, subscriptions, timers, direct DOM work — tied to the
> lifecycle. **`useReducer`** when several pieces of state are related and the transitions
> get complex. **`useRef`** for a mutable value or direct DOM access that persists across
> renders **without** causing a re-render. And **`useCallback`** and **`useMemo`** for
> memoising a function or an expensive value — we'll do those properly in the advanced
> section.
>
> Then the real superpower: **custom hooks.** You compose the built-in hooks into
> reusable logic and give it a name starting with `use`. That's the whole mechanism.
> `useToggle`, `useFetch`, `useAuth` — logic extracted from the UI, testable, shareable.
>
> Finally the rules, and these are not stylistic — breaking them breaks React. **Call
> hooks at the top level**, never inside a condition, a loop, or a nested function. And
> **only call them from React functions** — components or other hooks. The reason is that
> React tracks hooks by **call order**. First `useState` is slot one, second is slot two.
> Put one inside an `if` and the slots shift between renders, and your state lands in the
> wrong variable."

### On the board

- Hooks = functions that let function components use **state and lifecycle** features.
- **useState** — a value that changes over time.
- **useEffect** — side effects tied to the lifecycle.
- **useReducer** — complex/related state via reducer + dispatch.
- **useRef** — mutable value / DOM access that persists **without** re-rendering.
- **useCallback / useMemo** — memoise functions / expensive values.
- **Custom hooks** — compose hooks into reusable logic; the name **must** start with `use`.
- **Rules of hooks:** top level only, never in conditions or loops; only from React functions. This keeps the **call order stable** between renders.

### ▶ Run it — `useToggle.jsx`

The first React playground of the day. Warn them the first **Render** click downloads the
Babel chunk and takes a moment.

1. Render it. Click the button — it flips ON/OFF, green/red.
2. Read `useToggle` line by line. It's five lines and it's a complete custom hook:
   it calls `useState`, wraps the setter in `useCallback`, and returns a `[value, setter]`
   pair — deliberately shaped like `useState` itself.
3. **Ask the killer question:** "what makes this a hook rather than a plain function?"
   The answer: it calls other hooks, and its name starts with `use` so React's tooling can
   apply the rules to it. There's no registration, no magic.
4. Exercise: use the hook **twice** in `App` — two independent toggles from one hook.
   This demonstrates that a custom hook shares *logic*, not *state*.
5. Demonstrate a rule violation if the room is confident. Wrap the `useState` in
   `if (someCondition)` and render. The error React gives is explicit and worth seeing
   once in a safe environment.

### Check

**Q1. A custom hook must…**
be a class · **start with the prefix `use`** ✓ · return JSX · use `useEffect`

**Q2. Where may you call a hook?**
Inside an `if` statement · **At the top level of a React function** ✓ · Inside a loop · Anywhere

### 💬 Soundbite

> "Hooks let function components use state and lifecycle features. Custom hooks compose
> them into reusable logic. The rules — top level, React functions only — exist because
> React identifies hooks by call order."

---

## 14 · Props vs State

### Say this

> "Two kinds of data in a component, and the difference is **who owns it**.
>
> **Props** are data passed **from a parent down to a child**. They arrive as a single
> object. They are **immutable in the receiving component** — a child must never modify
> its props. If a child needs a value to change, it asks the parent, usually by calling a
> function the parent passed down.
>
> **State** is data **owned inside** the component. It's mutable through its updater
> function, and updating it **triggers a re-render** of that component and its subtree.
>
> The framing that makes it click: **props pass information down the tree; state changes
> information over time.**
>
> And the architectural consequence: data flows **one way**, downward. When two siblings
> need the same data, you don't wire them together — you move the state up to their
> common parent and pass it down as props. That's called *lifting state up*, and it's the
> single most common structural fix in a React codebase."

### On the board

- **Props** — **immutable** data passed **parent → child**. An object. Configures the child. The child must not change them.
- **State** — **mutable** data owned **inside** a component. Updating it **re-renders** the component and its children.
- **Props pass information down; state changes information over time.**
- **Data flows one way — down.** Siblings share by lifting state to a common parent.

### ▶ Run it — `PropsState.jsx`

1. Render. Click `+1` — the count rises and the `Greeting` child updates.
2. Point at the ownership boundary explicitly: `count` is declared in `App`. `Greeting`
   only *receives* it. It has no `useState` at all.
3. **Break it on purpose.** Inside `Greeting`, add `count = count + 1` before the
   return, and render. Depending on the strictness in play, you get either an error or a
   value that silently fails to stick and vanishes on the next render. Either way, the
   lesson lands: props are not yours to change.
4. Fix it the right way: pass `onIncrement` down as a prop and call it from a button
   inside `Greeting`.
   ```jsx
   function Greeting({ name, count, onIncrement }) {
     return <p>Hi <b>{name}</b> — {count} <button onClick={onIncrement}>+1</button></p>;
   }
   ```
   State stays in the parent; the child gets a function to *ask*. This is the pattern
   they'll use for the rest of their careers.

### Check

**Q1. Can a child component change its own props?**
Yes, freely · **No — props are immutable in the child** ✓ · Only with `useState` · Only objects

**Q2. What happens when a component's state updates?**
Nothing visual · **The component (and children) re-render** ✓ · The page reloads · Props reset

### 💬 Soundbite

> "Props are immutable data passed down from a parent; state is mutable data owned by the
> component. Props pass information down the tree, state changes it over time — and data
> flows one way."

---

## 15 · Controlled vs uncontrolled

### Say this

> "This is a form question, and it comes down to one thing: **who owns the value.**
>
> In a **controlled** component, **React state owns it.** You set `value={state}` and an
> `onChange` handler that writes every keystroke back into state. State is the single
> source of truth, and the input is just a reflection of it. That's predictable — at any
> moment you know the exact value without asking the DOM — and it makes validation,
> formatting, conditional disabling and 'clear the form' trivial. The costs: more code
> per field, and a re-render on every keystroke.
>
> In an **uncontrolled** component, **the DOM owns it.** You let the browser do what it
> has always done, and when you need the value — usually on submit — you read it through
> a **ref**. Much less code, no re-render per keystroke. The costs: validating as they
> type is awkward, and you have less control generally.
>
> The default is **controlled**, for predictability and validation. Reach for
> **uncontrolled** when you only need an occasional read, for file inputs — which are
> always uncontrolled — and when integrating a non-React widget that insists on managing
> its own DOM."

### On the board

- It's about **who owns the form value**.
- **Controlled** — React state owns it; `value={state}` + `onChange` keep them in sync. **Predictable**, easy validation. Cost: more code, a re-render per keystroke.
- **Uncontrolled** — the **DOM** owns it; read it with a **ref** when needed. **Less code**, no per-keystroke re-render. Cost: harder validation, less control.
- **Default to controlled.** Use uncontrolled for occasional reads, file inputs, and non-React widgets.

### ▶ Run it — `Forms.jsx`

Two inputs side by side — the clearest demo in the section.

1. Render. Type in the **controlled** input: the text below updates on every keystroke,
   because state changed and the component re-rendered.
2. Type in the **uncontrolled** input: nothing else on screen changes. Now click **Read
   value** — the alert shows what you typed. The value was there the whole time; React
   just wasn't tracking it.
3. **Prove that state is the source of truth** in the controlled input. Delete the
   `onChange` handler and render again. Now you *cannot type in it at all* — every
   keystroke is immediately overwritten by the unchanged state. That single experiment
   teaches controlled inputs better than any explanation.
4. Add a live-validation touch to the controlled one:
   ```jsx
   {ctrl.length > 0 && ctrl.length < 3 && <span style={{color:'crimson'}}>Too short</span>}
   ```
   Then ask how they'd do the same thing with the uncontrolled input. (They'd have to add
   an `onChange` — at which point they've built a controlled component.)

⚠ Warn them about React's console warning "A component is changing an uncontrolled input
to be controlled." It happens when `value` starts as `undefined` and later becomes a
string. Fix: initialise state to `''`, never `undefined`.

### Check

**Q1. In a controlled component, the input value comes from…**
the DOM · **component state** ✓ · a ref · the URL

**Q2. Uncontrolled inputs are usually read using…**
`useState` · **a ref (`useRef`)** ✓ · `useEffect` · context

### 💬 Soundbite

> "Controlled means React state owns the value with `value` and `onChange`; uncontrolled
> means the DOM owns it and I read it with a ref. I default to controlled for
> predictability and validation."

---

## 16 · useState

### Say this

> "`useState(initial)` adds a piece of state to a function component and returns a pair:
> the **current value** and a **setter**. You destructure it as
> `const [count, setCount] = useState(0)`.
>
> The setter does two things: it records the new value, and it **schedules a re-render**.
> On that re-render, `useState` hands back the latest value. You can call it as many
> times as you like in one component, and state can hold anything — string, number,
> array, object.
>
> Now the part that trips everyone up, and the part interviewers ask about: **when the
> new state depends on the old one, use the functional updater.**
>
> `setCount(count + 1)` reads `count` — the value captured in *this* render's closure.
> Call that twice in one handler and both calls read the same stale value, so you get one
> increment, not two. `setCount(c => c + 1)` instead passes a function; React calls it
> with the most recent value, so two calls give you two increments.
>
> And notice that this isn't a React quirk — it's **closures**, from topic 06. Each render
> is a separate function call with its own captured variables. That's why the mental model
> we built this morning matters."

### On the board

- `useState(initial)` → `[current, setter]`.
- The setter writes the value **and triggers a re-render**; the hook returns the latest value from its internal closure.
- State can be any type. Call `useState` as many times as needed.
- **When new state depends on old state, use the functional updater:** `setCount(c => c + 1)`.
- The reason is stale closures — each render captures its own copy of the value.

### ▶ Run it — `useState.jsx`

Purpose-built for the stale-closure lesson. Two buttons, both claiming to add 2.

1. **Predict first.** "Both buttons call the setter twice. Will both add 2?" Most say
   yes.
2. Render. Click the left one — it adds **1**. Click the right one — it adds **2**.
3. Explain with the closure model, on the board:
   ```
   render #0:  n = 0
   click left: setN(0 + 1)   // n is 0 in this closure
               setN(0 + 1)   // still 0 — same closure!
               → final value 1
   click right: setN(c => c + 1)   // React: c = 0 → 1
                setN(c => c + 1)   // React: c = 1 → 2
                → final value 2
   ```
4. Ask why React doesn't just re-read `n` between the two calls. Because `n` is a
   `const` in this render's scope — there is nothing to re-read. React batches the
   updates and re-renders once at the end.
5. Exercise: add a third button that does `setN(n + 1)` inside a `setTimeout(..., 1000)`,
   then click it and immediately click `+2`. The timeout still uses the old `n`. Same bug,
   later.

⚠ The other classic: **never mutate state directly.** `items.push(x)` then `setItems(items)`
does nothing visible, because it's the same array reference and React's shallow check sees
no change. Use `setItems([...items, x])` — back to spread, topic 10.

### Check

**Q1. `useState` returns…**
a single value · **an array: `[current, updater]`** ✓ · an object with `.value` · a promise

**Q2. When new state depends on old state, you should…**
read the variable directly · **use the functional updater `setX(prev => ...)`** ✓ · use `useEffect` · use a ref

### 💬 Soundbite

> "`useState` returns the current value and a setter that re-renders the component. When
> the new value depends on the old one I use the functional form, `setX(prev => ...)`, to
> avoid stale-closure bugs."

---

## 17 · useEffect & its pitfalls

### Say this

> "`useEffect(fn, deps)` runs **side effects** — anything that reaches outside React's
> render: fetching data, subscriptions, timers, direct DOM work, logging.
>
> The rule: it runs **after** the render is committed, and again whenever a value in the
> **dependency array** changes. The dependency array is the whole ballgame, and it has
> three shapes.
>
> **No array at all** — runs after *every* render. Almost always a mistake.
> **An empty array `[]`** — runs **once**, on mount. This is your 'fetch when the
> component appears'.
> **`[a, b]`** — runs on mount and again whenever `a` or `b` change.
>
> Then **cleanup**. If your effect returns a function, React calls it before the effect
> re-runs and when the component unmounts. That's where you clear intervals, unsubscribe,
> and abort requests. If you set something up in an effect and don't tear it down, you
> have a leak — and with a timer, you stack a new one on every re-run until the app
> crawls.
>
> Three pitfalls to name in an interview. **Missing dependencies** — the effect closes
> over a stale value and quietly uses yesterday's data. **Updating a state that's also in
> the dependency array** — the update triggers the effect, which triggers the update:
> an infinite loop. And **unnecessary re-runs** — a dependency that changes identity every
> render, like an inline object or function, makes an 'on mount' effect run constantly.
>
> One more thing that confuses everyone the first time: in development, **StrictMode
> deliberately runs your effects twice**. That's not a bug — it's React showing you that
> your effect isn't cleaning up properly. If double-running breaks it, it was already
> broken."

### On the board

- `useEffect(fn, deps)` runs **side effects** after render.
- **No deps array** → runs **every render**.
- **`[]`** → runs **once**, on mount.
- **`[a, b]`** → on mount and whenever `a` or `b` change.
- Return a **cleanup function** to tear down subscriptions/timers/requests.
- **Pitfalls:** missing deps → stale values · updating a state that's also a dep → **infinite loop** · unnecessary runs hurt performance · **StrictMode runs effects twice in dev on purpose**.

### ▶ Run it — `useEffect.jsx`

A one-second timer with Pause/Resume — the cleanest cleanup demo there is.

1. Render. The counter ticks. Pause, resume, pause again.
2. Read the effect together:
   - `if (!running) return;` — early exit, no timer while paused.
   - `setInterval` with the **functional updater** `s => s + 1`. Ask why. Because the
     interval callback would otherwise capture the first render's `seconds` forever and
     the counter would freeze at 1. **Topic 16, immediately load-bearing.**
   - `return () => clearInterval(id)` — the cleanup.
   - `[running]` — re-subscribe only when the flag flips.
3. **Break the cleanup.** Delete the `return () => clearInterval(id)` line and render.
   Now pause and resume a few times. The counter accelerates — every resume stacks
   another interval and nothing ever clears them. This is the demo people remember;
   don't skip it.
4. **Cause the infinite loop**, deliberately, so they recognise it in the wild:
   ```jsx
   useEffect(() => { setSeconds(seconds + 1); }, [seconds]);
   ```
   Render and watch it spin. Then remove it. Say clearly: *"if your app hangs after you
   add an effect, this is the first thing to check."*
5. Exercise: change `[running]` to `[]` and predict what breaks. (Pause stops updating
   the subscription — the effect never re-runs, so the timer keeps going regardless of
   the flag.)

### Check

**Q1. An empty dependency array `[]` means the effect runs…**
every render · **once, on mount** ✓ · never · only on unmount

**Q2. A common cause of an infinite render loop is…**
returning a cleanup function · **updating a state variable that is also in the dependency array** ✓ · using an empty deps array · fetching data

### 💬 Soundbite

> "`useEffect` runs side effects after render, controlled by its dependency array — no
> array means every render, `[]` means once on mount, and listed deps mean re-run when
> they change. I return a cleanup function to tear down timers and subscriptions, and I
> watch for updating a state that's also a dependency, which loops forever."

---

### Section 3 — questions to ask if you're running a checkpoint

1. What is reconciliation, and what does React do with the result?
2. Why must hooks be called at the top level? What actually breaks otherwise?
3. A child needs to change a value it received as a prop. What do you do?
4. Remove the `onChange` from a controlled input — what happens, and why?
5. Why does `setN(n+1)` twice only add one?
6. Name three things that go wrong with `useEffect` dependency arrays.
7. Why does StrictMode run effects twice in development?

---

# Section 4 — Advanced React

**Topics 18–24 · ≈ 80 min**

Open the section:

> "Fundamentals get you a working app. This section is about what happens when the app
> gets big: sharing state without threading props through ten layers, stopping needless
> re-renders, and structuring a codebase that five people work in.
>
> One warning up front that applies to four of the next seven topics: **measure first.**
> Every optimisation here has a cost, and applied by reflex they make an app slower and
> harder to read, not faster."

---

## 18 · Context API

### Say this

> "The Context API shares a value across the component tree **without passing props
> through every level in between**. The problem it solves has a name: **prop drilling** —
> threading a prop down through five components that don't care about it, purely to get
> it to the sixth.
>
> Three pieces. `createContext()` creates the context object. A `<Provider value={...}>`
> wraps a subtree and supplies the value. `useContext(TheContext)` reads it from anywhere
> inside that subtree, at any depth.
>
> What belongs in context: values that many components at different depths need and that
> don't change every second. **Authentication state. Theme. Locale.** Those are the three
> canonical examples, and they're canonical because they're read everywhere and written
> rarely.
>
> And the caveat, which is the real interview follow-up: **context is not a state
> manager.** It's a transport mechanism — it moves a value down the tree, and that's all.
> It has no reducers, no devtools, no selectors. More importantly, **every consumer
> re-renders when the value changes.** Put rapidly-changing state into one giant context
> and you've built an app-wide re-render on every keystroke. If that happens, split it
> into several smaller contexts or reach for a proper state library."

### On the board

- Context shares values across the tree **without prop drilling**.
- `createContext()` → `<Provider value={...}>` → `useContext()`.
- Good for: **auth**, **theme**, **locale** — needed widely, changed rarely.
- ⚠ **Not a state manager.** Every consumer re-renders when the value changes; don't put rapidly-changing state in one giant context.

### ▶ Run it — `Context.jsx`

1. Render, click **Toggle theme**. The deeply nested element flips light/dark.
2. **Trace the chain on screen**: `App` holds the state and provides it → `Middle`
   passes *nothing* → `DeeplyNested` reads it with `useContext`. Point at `Middle`
   specifically: "that component doesn't know a theme exists. That's the entire point."
3. Ask what this would look like without context: `Middle` would need a `theme` prop
   purely to forward it. Now imagine six layers.
4. Exercise: add a second consumer at a different depth. Both update from one provider.
5. If the room is strong, demo the re-render cost: add a `console.log` in `Middle` and
   in `DeeplyNested`, and watch what re-renders when the theme flips.

⚠ Two practical failure modes worth naming: reading a context **outside** its provider
silently gives you the default value passed to `createContext()`, which produces
confusing bugs — many teams throw from a custom `useTheme()` hook instead. And passing a
**new object literal** as `value` on every render (`value={{ theme, setTheme }}`) breaks
every consumer's memoisation — `useMemo` it.

### Check

**Q1. The Context API primarily solves…**
slow rendering · **prop drilling** ✓ · CSS conflicts · async errors

**Q2. Good candidates for context include…**
a single form input value · **theme, auth, locale** ✓ · a loop counter · CSS class names

### 💬 Soundbite

> "Context shares values like theme, auth and locale across the tree without prop
> drilling. It's a transport mechanism, not a state manager — every consumer re-renders
> when the value changes."

---

## 19 · Optimizing components

### Say this

> "Before any technique: **optimise only when you hit a real bottleneck.** This app's
> guidance is explicit about it, and so is React's. Premature optimisation costs more
> than the re-render it prevents — `React.memo` isn't free; it runs a comparison on every
> render and holds memory. Wrap everything in it and you've added work everywhere to save
> work nowhere.
>
> With that said, here's the toolkit.
>
> **`React.memo`** wraps a component so it skips re-rendering when its props are
> unchanged. The check is a **shallow** prop comparison.
>
> **`useCallback`** keeps a function's identity stable between renders, so a memoised
> child doesn't see a 'new' prop every time.
>
> **`useMemo`** caches the result of an expensive computation until its dependencies
> change.
>
> Those three are the trio to name in an interview: memoise the **component**, the
> **functions** it receives, and the **values** it computes.
>
> Beyond memoisation: **conditional rendering** and **code splitting** — the cheapest
> render is the one you don't do, and the fastest download is the code you don't ship.
> **`useReducer`** to consolidate a scatter of related `useState` calls. On the CSS side,
> animate **`transform` and `opacity`**, which the GPU handles, rather than box-model
> properties like width, top or margin, which force layout reflow and repaint. **Lazy
> load** images and media. And keep **StrictMode** on in development to surface problems
> early."

### On the board

- **Optimise only when you hit a real bottleneck.** Premature optimisation can cost more than it saves.
- **React.memo** — skip re-render when props are unchanged (**shallow** comparison).
- **useCallback** — stable callback identity so memoised children don't re-render.
- **useMemo** — cache an expensive computed value until deps change.
- **Conditional rendering** & **code splitting** — render less, ship less.
- **useReducer** — consolidate related `useState` calls.
- CSS: animate **transform/opacity** (GPU), not box-model props (reflow/repaint).
- **Lazy load** images/media; keep **StrictMode** on in dev.

### No playground — do it as a decision drill

Give three scenarios and have them pick a tool and justify it:

1. *"A table of 5,000 rows re-renders when an unrelated header state changes."*
   → `React.memo` on the row, plus `useCallback` on any handler passed to it.
2. *"A component sorts and filters a large array on every render, but the array rarely
   changes."* → `useMemo` around the computation.
3. *"A modal's contents are expensive to render and it's closed 95% of the time."*
   → Conditional rendering — don't render it at all until it opens. And possibly
   `React.lazy` so the code isn't even downloaded.

The point of the drill is that the answer isn't always memoisation.

### Check

**Q1. `React.memo` prevents a re-render when…**
state changes · **props are shallowly equal to last time** ✓ · the parent unmounts · an effect runs

**Q2. The guide's stance on optimization is…**
always memoize everything · **apply optimizations only when you hit a bottleneck** ✓ · never optimize · optimize CSS only

### 💬 Soundbite

> "I profile first. Then the trio: `React.memo` for the component, `useCallback` for the
> functions it receives, `useMemo` for the values it computes — plus rendering less and
> shipping less."

---

## 20 · Optimizing re-renders

### Say this

> "Here's the default behaviour that surprises people: **when a parent re-renders, its
> children re-render too** — even if their props are byte-for-byte identical. React
> doesn't check by default, because checking costs more than re-rendering for most
> components.
>
> When that becomes a measured problem, the fix has two halves, and it only works if you
> do both.
>
> Half one: wrap the child in **`React.memo`**. Now React compares props shallowly and
> skips the render if nothing changed.
>
> Half two — and this is where people go wrong — **make sure the props actually compare
> as equal.** If the parent passes a new inline arrow function on every render,
> `onClick={() => save(id)}`, that's a **brand new function object every time**. Shallow
> equality compares by reference. New reference, so the memo check fails, every render,
> forever. You've paid for the comparison and got nothing.
>
> That's `[1,2] === [1,2]` from topic 04, biting you for real money.
>
> So: **`React.memo` on the child, `useCallback` on the functions you pass it,
> `useMemo` on the objects and arrays and computed values you pass it.** All three, or
> none. And `useReducer` where a cluster of related state is causing renders that a single
> consolidated update wouldn't."

### On the board

- A child re-renders when its parent does — even with identical props — unless you intervene.
- **React.memo** on the child → skips re-render when props are unchanged.
- **useCallback** on handlers passed as props → **same function identity** between renders, so memo actually works.
- **useMemo** for derived/expensive values passed down.
- **useReducer** to consolidate related state.
- ⚠ **`React.memo` alone is useless if you pass a new inline function each render.** Identity changes → the memo check always fails. **Pair memo with `useCallback`.**

### No playground — but write the broken version on the board

This topic has no demo in the app, so type this out live. It's four lines and it's the
whole lesson:

```jsx
const Child = React.memo(function Child({ onSave }) {
  console.log('Child rendered');
  return <button onClick={onSave}>Save</button>;
});

function Parent() {
  const [n, setN] = useState(0);
  return (
    <>
      <button onClick={() => setN(n + 1)}>{n}</button>
      <Child onSave={() => console.log('saved')} />   {/* ← new function every render */}
    </>
  );
}
```

Ask: "`Child` is memoised. Does it re-render when `n` changes?" It does — the inline
arrow is a new object each time. Then fix it:

```jsx
const handleSave = useCallback(() => console.log('saved'), []);
// ...
<Child onSave={handleSave} />
```

Now it doesn't. If you have a spare five minutes, paste both versions into a React
playground with `console.log` in the child and let them watch the log stop.

### Check

**Q1. `React.memo` on a child fails to help when the parent passes…**
a string prop · **a new inline function each render** ✓ · a number · a memoized value

**Q2. `useCallback` exists to…**
cache expensive values · **keep a function's identity stable across renders** ✓ · run side effects · replace `useState`

### 💬 Soundbite

> "Children re-render when the parent does. `React.memo` skips that when props are
> shallowly equal — but only if the props keep their identity, so I pair it with
> `useCallback` for functions and `useMemo` for objects."

---

## 21 · Architecting a large app

### Say this

> "Now zoom out. The goal of an architecture is three words: **maintainability,
> performance, scalability**. Here's a layered strategy you can actually recite.
>
> **Structure by feature, not by file type.** Not a `components/` folder with two hundred
> files in it — a `checkout/` folder holding its components, its hooks, its state and its
> tests. When you delete a feature, you delete a folder. When you work on one, everything
> you need is adjacent.
>
> **Tier your state.** This is the part interviewers really want, because it shows
> judgement rather than tool knowledge. Four tiers:
> **Local** — `useState` or `useReducer` for state one component owns. A toggle, an input.
> **Contextual** — Context for a subtree: theme, auth, the current locale.
> **Global** — Redux, Zustand or Recoil, when genuinely app-wide state has complex
> transitions.
> **Server state** — and this is the one people miss. Data that comes from an API isn't
> really 'state', it's a **cache** of something that lives on a server. React Query or SWR
> handle fetching, caching, deduplication, background refetching and invalidation. Once
> you use one, most of what people cram into Redux disappears.
>
> **Code-split** with `React.lazy` and `Suspense`, lazy-loading routes so the first page
> doesn't download the whole app.
>
> **Composition over prop drilling** — render props, compound components, providers —
> before you reach for more state machinery.
>
> **Reusable custom hooks** — `useFetchData`, `useAuth` — to separate logic from UI, which
> also makes the logic testable without rendering anything.
>
> **TypeScript**, plus unit tests with Jest or Vitest and React Testing Library,
> integration tests, and end-to-end with Cypress.
>
> And the operational details: **error boundaries** with real fallbacks so one broken
> component doesn't blank the page, one **chosen** styling solution rather than four, and
> **virtualisation** — React Window — for any list long enough to matter."

### On the board

- **Structure by feature**, not by file type.
- **State, tiered:** local (`useState`/`useReducer`) → contextual (Context for a subtree) → global (Redux/Zustand/Recoil) → **server state** (React Query/SWR for API data, caching, syncing).
- **Code-split** with `React.lazy` + `Suspense`; lazy-load routes.
- **Composition over prop drilling** — render props, compound components, providers.
- **Reusable custom hooks** (`useFetchData`, `useAuth`) — logic separate from UI.
- **TypeScript** + unit (Jest/RTL) + integration + E2E (Cypress).
- **Error boundaries** with fallbacks; one **styling** solution; **virtualisation** (React Window) for long lists.

### Exercise — 10 minutes, in pairs

> "Design the folder structure and the state plan for a small e-commerce app: product
> list, product detail, cart, checkout, user login."

Have one pair present. Look for: feature folders; the cart in global or context state;
**product data in a server-state library, not in Redux**; auth in context; routes
code-split. The most common mistake is putting fetched product data into a global store,
and it's the most useful one to correct.

### Check

**Q1. API data (fetched, cached, synced) is best handled by…**
a single global `useState` · **a server-state library like React Query/SWR** ✓ · context only · `useRef`

**Q2. The recommended folder organization is by…**
file type (all components together) · **feature** ✓ · alphabetical order · component size

### 💬 Soundbite

> "Organise by feature, and tier the state: local, contextual, global, and server state.
> API data goes in a server-state library like React Query, not a global store."

---

## 22 · Redux & state libraries

### Say this

> "React handles local state well. External libraries earn their place as the app grows —
> and the advice is deliberately conservative: **start with the built-in tools, add a
> library when complexity demands it.**
>
> The progression, which is worth saying out loud in exactly this order:
>
> **`useState`** — a simple changing value.
> **`useReducer`** — several related values, or transitions complex enough that scattered
> setters get confusing. One reducer, one dispatch, all the transitions in one readable
> place.
> **Context** — the state needs to be read across a subtree without prop drilling.
> **A library** — the state is genuinely app-wide with complex interactions.
>
> Among libraries: **Redux** gives you strict, predictable control, a single store, and
> genuinely excellent devtools — time-travel debugging, action logs. The cost is
> boilerplate, though Redux Toolkit has cut that a lot. **Zustand** is lightweight global
> state with minimal ceremony — a hook and a store, essentially. **Recoil** is built
> around atoms and derived state, which suits graphs of interdependent values.
>
> The mistake to avoid is reaching for Redux on day one out of habit. And notice from the
> last topic: once server data lives in React Query, a lot of apps discover they barely
> need global state at all."

### On the board

- **useState** → simple changing values.
- **useReducer** → several related values / complex transitions in one domain.
- **Context** → share within a subtree without prop drilling.
- **Redux** → strict control, complex transitions, great devtools; more boilerplate.
- **Zustand** → lightweight global state, minimal boilerplate. **Recoil** → derived/atom interdependencies.
- **Progression: useState → useReducer → Context → a library.**

### Optional 5-minute sketch

If the class hasn't seen a reducer, write one:

```js
function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { ...state, count: state.count + 1 };
    case 'reset':     return { ...state, count: 0 };
    default:          return state;
  }
}
const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: 'increment' });
```

Point at the spread — **topic 10 again** — and at the fact that every transition is now
in one place instead of scattered across handlers. That's the argument for `useReducer`
in a sentence, and it's also the mental model for Redux.

### Check

**Q1. `useReducer` is preferred over `useState` when…**
there is one boolean · **multiple stateful values are interdependent / one domain** ✓ · you fetch data · you need context

**Q2. The guide recommends reaching for Redux…**
immediately in every app · **as complexity grows beyond built-in tools** ✓ · never · only for styling

### 💬 Soundbite

> "I go `useState`, then `useReducer` when the values are interdependent, then Context to
> share across a subtree, and only then a library like Redux or Zustand when the app's
> complexity actually justifies it."

---

## 23 · Dynamic routing

### Say this

> "**React Router** provides **client-side** routing — you navigate between views without
> a full page request to the server. The URL changes, the right component renders, no
> reload.
>
> **Dynamic routes** are the part worth knowing precisely: routes that match variable
> URLs. You declare a parameter with a colon — `path="/products/:id"` — and that single
> route now matches `/products/123`, `/products/456`, and everything else in that shape.
>
> Inside the component you read the parameter with the **`useParams`** hook. It returns
> an object of the matched parameters, so `/products/123` gives you `{ id: "123" }`. Note
> that it's a **string** — URLs are text — so convert it if you need a number.
>
> Then you use that id to fetch and render the specific thing. That's the whole pattern,
> and it's the one to be able to write on a whiteboard from memory."

### On the board

- **React Router** = client-side navigation, no server round-trip per page.
- Declare a param with `:` — `/products/:id` matches `/products/123`, `/products/456`, …
- Read it with **`useParams()`** → `{ id: "123" }` (always a **string**).
- Use the id to fetch and display the specific item.
- **The pattern: `<Route path="/products/:id" />` + `const { id } = useParams()` → fetch by id.**

### ▶ Run it — `routing-shape.js`

React Router isn't a dependency of this app, so the playground **simulates** what
`useParams` does rather than running the real router. Say that clearly so nobody thinks
they're using the library.

1. The commented block at the top is the real API shape — read it aloud; that's what they
   must be able to write from memory.
2. Run the file. `paramsFrom('/products/:id', '/products/123')` prints `{ id: "123" }`.
3. Read the implementation: split both strings on `/`, and wherever the pattern segment
   starts with `:`, take the URL segment at the same index. **That is genuinely close to
   what a router does** — pattern matching plus positional extraction.
4. Exercise: make it handle two parameters. Test with
   `paramsFrom('/users/:userId/posts/:postId', '/users/7/posts/42')` → `{ userId: "7", postId: "42" }`.
   It already works, which is a nice moment: ask them to predict before running.
5. Ask what should happen for `/products/` with no id — a real router matches a different
   route or a 404. Good moment to mention that route order and specificity matter.

### Check

**Q1. Which hook reads dynamic route parameters?**
`useState` · **`useParams`** ✓ · `useRoute` · `useEffect`

**Q2. React Router primarily provides…**
server-side rendering · **client-side routing without full page reloads** ✓ · CSS · state management

### 💬 Soundbite

> "A dynamic route declares a parameter with a colon — `/products/:id` — and the component
> reads it with `useParams`, then fetches by that id. It's client-side, so there's no full
> page reload."

---

## 24 · Optimizing the whole app

### Say this

> "This topic ties the component-level techniques to the build and runtime choices — the
> app-wide view.
>
> On the **rendering** side, everything from topics 19 and 20: `React.memo` for unchanged
> props, `useCallback` for handler identity, `useMemo` for expensive computations, and
> conditional rendering so you don't build UI nobody is looking at. Guard effects so you
> aren't doing work on the initial render that could wait.
>
> On the **CSS** side, one rule that pays for itself immediately: animate **`transform`
> and `opacity`**. Those are composited on the GPU and don't touch layout. Animate `top`,
> `left`, `width`, `height` or `margin` and every frame triggers reflow and repaint on the
> main thread — the same thread running your JavaScript. Same visual effect, completely
> different cost.
>
> On the **build** side: ship a **production build**. Development React includes warnings,
> dev-only checks, and StrictMode's double-rendering; all of that is stripped in
> production. People do occasionally profile a dev build and draw conclusions from it,
> and those conclusions are wrong.
>
> **Code-split** across routes and heavy components so the initial download is small.
> And be deliberate about **specialising versus generalising** components — a component
> with fourteen boolean props to cover every case is usually two components.
>
> And the mantra, one more time, because it's the thing that makes the difference between
> someone who's read about performance and someone who's done it: **measure first.**"

### On the board

- Animate **transform/opacity** (GPU), not `top`/`left`/`width`/`visibility` (reflow/repaint).
- **React.memo** for unchanged props; **useCallback** for handler identity; **useMemo** for expensive computations.
- Avoid work on the initial render (guard effects); **conditional rendering** to skip unneeded UI.
- Ship a **production build** (StrictMode and dev warnings are stripped in prod).
- **Specialise vs generalise** components sensibly; **code-split** into routes/chunks.
- ⚠ **Measure first.** Apply these where a real bottleneck exists — not by default.

### Demo — the profiler, 5 minutes

If you can, open React DevTools' **Profiler** tab on the running app, record an
interaction, and show the flame chart of what rendered and how long it took. Even a
thirty-second look changes how people think — it turns "I feel like this is slow" into
"this component rendered 47 times".

If DevTools isn't available, the fallback is a `console.log('X rendered')` at the top of
a component. Crude, free, and it answers the same question.

### Check

**Q1. For smooth animations you should prefer…**
`top`/`left`/`right` · **`transform` and `opacity` (GPU)** ✓ · `width`/`height` · `margin`

**Q2. Before applying performance optimizations you should…**
apply them all upfront · **identify an actual bottleneck first** ✓ · disable StrictMode · remove all state

### 💬 Soundbite

> "Measure first, then: memoise what re-renders needlessly, render and ship less through
> conditional rendering and code splitting, animate transform and opacity rather than
> layout properties, and always profile a production build."

---

### Section 4 — questions to ask if you're running a checkpoint

1. What does Context actually solve, and what does it *not* solve?
2. You wrapped a child in `React.memo` and it still re-renders. What's the first thing you check?
3. Where does fetched API data belong, and why not in Redux?
4. Give the state progression from simplest to most complex.
5. Write the two lines of a dynamic route: the route and the parameter read.
6. Why is animating `transform` cheaper than animating `top`?

---

# Section 5 — Frameworks & Tooling

**Topic 25 · ≈ 15 min**

---

## 25 · Next.js

### Say this

> "Next.js is a **React framework** — React itself is just a view library, and Next
> wraps it with the things a real application needs: routing, rendering strategies,
> bundling, image handling, and a backend.
>
> The headline is the **rendering strategies**, and you need to know three of them cold,
> because 'explain SSR versus SSG' is one of the most asked questions in front-end
> interviews.
>
> **SSR — server-side rendering.** The page is rendered on the server **on every
> request**. The browser gets real HTML immediately. Two benefits: excellent SEO, because
> crawlers see content rather than an empty div, and always-fresh data. Use it where
> content changes per request or per user — news, e-commerce listings, dashboards.
>
> **SSG — static site generation.** The page is rendered **once, at build time**, into
> plain HTML that can sit on a CDN. It's the fastest possible load, because there's no
> server work at request time at all. Use it for content that rarely changes —
> documentation, marketing pages, blogs.
>
> **ISR — incremental static regeneration.** The hybrid, and the one people forget. Pages
> are static, but they can be **re-generated on demand** — after a time interval or when
> triggered — **without rebuilding the whole site**. You get SSG's speed with content that
> can update. For a site with fifty thousand product pages, this is the difference between
> a viable build and an impossible one.
>
> Beyond rendering: **API routes** let you write backend endpoints inside the same
> project, so it's genuinely full-stack. **File-based routing** — a file in the pages or
> app directory *is* a route. Plus **image optimisation**, **automatic code splitting**,
> first-class **TypeScript**, **i18n**, and one-command deploys to Vercel."

### On the board

- Next.js = a **React framework** for performance, SEO and developer experience.
- **SSR** — rendered on the server **per request**. Great SEO + fresh content (news, e-commerce).
- **SSG** — rendered **at build time**. Fastest loads for rarely-changing content (docs, marketing).
- **ISR** — static pages **re-generated on demand**, no full rebuild.
- **API routes** — backend endpoints in the same project (full-stack).
- **File-based routing**, **image optimisation**, **automatic code splitting**, **TypeScript**, **i18n**, easy **Vercel** deploys.

### Quick drill

Call out a page type; class calls back the rendering strategy:

- A marketing home page → **SSG**
- A logged-in dashboard → **SSR** (per-user, per-request)
- A blog with fifty posts → **SSG**
- A product page on a store with 50,000 products and prices that change hourly → **ISR**
- A live search results page → client-side rendering, or SSR

Sixty seconds, and it's exactly the shape the interview question takes.

### Check

**Q1. SSG (Static Site Generation) renders pages…**
on every request · **at build time** ✓ · only on the client · never

**Q2. Which lets a static page refresh without a full rebuild?**
SSR · CSR · **ISR** ✓ · API routes

### 💬 Soundbite

> "SSR renders on the server per request, SSG renders at build time, and ISR is static
> with on-demand regeneration so you don't rebuild the whole site to update one page."

---

# Section 6 — Testing

**Topic 26 · ≈ 25 min**

---

## 26 · How do you test code?

### Say this

> "Testing is how you get quality and reliability — and note the framing this course
> uses: **before *and* after production**. Most people only talk about the 'before' half,
> and mentioning the 'after' half is a genuine differentiator in an interview.
>
> **The test pyramid** first. Three layers, and the shape is the argument.
>
> At the base, **unit tests** — small pieces in isolation: a function, a component. Fast,
> numerous, and technology-facing. You write a lot of these.
>
> In the middle, **service or integration tests** — a service, or a flow across several
> components, often with collaborators stubbed. Fewer of these, and slower.
>
> At the top, **end-to-end tests** — the whole system driven through the UI, with Cypress
> or similar. They give the highest confidence because they test what the user actually
> does, but they're slow and brittle. Fewest of these.
>
> The pyramid says: **many unit, fewer service, fewest UI**. The inverted pyramid — an
> enormous E2E suite over almost no unit tests — is called the ice-cream cone, and it's a
> known anti-pattern: it takes an hour to run and fails for reasons unrelated to your
> change.
>
> **Now testing in production**, because you cannot fully replicate production in a test
> environment. **Ping checks** — is it alive at all. **Smoke tests** — after a deploy,
> does the basic thing work. **Canary releases** — roll the new version out to a small
> subset of users first and watch. **Synthetic transactions** — a fake user journey run
> on a schedule against the live system. **A/B testing** — two versions, real users,
> measured.
>
> And **contract tests**, or consumer-driven contracts, which is the sophisticated answer.
> The consumer of an API declares how it expects the producer to behave; that expectation
> is verified against the producer's build. Now the producer can't break you silently.
> **Pact** is the tool people name.
>
> **For React specifically**: **Vitest** is the test runner. Three functions carry almost
> everything — `describe` groups a suite, `it` defines a case, `expect` makes an
> assertion. **React Testing Library** renders components and simulates real user
> interaction, querying through `screen` — and its philosophy is important: query the way
> a **user** finds things, by visible text and accessible role, not by CSS class. That way
> a refactor of your markup doesn't break every test. Run them with `npm run test`, and
> keep two terminals open: one running the app, one watching the tests."

### On the board

**The test pyramid**
- **Unit** — small pieces (functions/components). Fast, numerous, technology-facing.
- **Service / integration** — a service or a flow across components, often stubbing collaborators.
- **End-to-end** — the whole system through the UI (Cypress). High confidence, slow and brittle.
- **Many unit → fewer service → fewest UI/E2E.**

**Testing in production**
- **Ping checks** (alive), **smoke tests** (works on deploy), **canary releases** (small subset first), **synthetic transactions** (scheduled fake journeys), **A/B testing**.
- **Contract tests / CDCs** — the consumer defines how it expects the producer to behave. Tool: **Pact**.

**React: Vitest + RTL**
- **Vitest** — `describe` (suite), `it` (case), `expect` (assertion).
- **React Testing Library** — render components, simulate real user interaction, query via `screen`.
- `npm run test`; two terminals — one watching tests, one running the app.

### ▶ Run it — `mini-test.js`

A six-line test harness in exactly Vitest's shape. It's the best possible demystifier.

1. Read `expect` before running. It's a function returning an object of matchers, each
   comparing and logging. **That's all a test framework is** at its core — the rest is
   reporting, watching, mocking and parallelism.
2. Run it. Two passes and one deliberate failure:
   ```
   • adds two numbers
   ✓ pass
   ✓ pass
   • catches a bug
   ✕ FAIL: 4 !== 5
   ```
3. **Point at the failing test and say why it's there:** a test suite that has never
   failed is a suite you have no reason to trust. Make a test fail on purpose once, to
   confirm it can.
4. Exercise: add a `toEqual` matcher that deep-compares with
   `JSON.stringify(a) === JSON.stringify(b)`, then test it with two arrays. That's the
   `[1,2] === [1,2]` problem from topic 04 — and it's precisely why every framework has a
   separate `toBe` and `toEqual`. Great callback.
5. Show the real thing next to it so the mapping is obvious:
   ```js
   describe('add', () => {
     it('adds two numbers', () => {
       expect(add(2, 3)).toBe(5);
     });
   });
   ```
   And an RTL test:
   ```js
   render(<Counter />);
   await userEvent.click(screen.getByRole('button', { name: /increment/i }));
   expect(screen.getByText('1')).toBeInTheDocument();
   ```
   Note what it queries by: a **role and a name**, the way a user (or a screen reader)
   would find it.

⚠ This repo has no test runner installed — `npm run test` isn't wired up here. If you
want a live Vitest run, do it in a separate scratch project, or leave it as a
demonstration of shape. Say which you're doing so nobody goes hunting for a script that
doesn't exist.

### Check

**Q1. The test pyramid says you should have the MOST of which tests?**
End-to-end · **Unit tests** ✓ · Manual tests · Canary tests

**Q2. In Vitest, `describe` / `it` / `expect` are…**
React hooks · **suite / case / assertion** ✓ · lifecycle methods · CSS utilities

### 💬 Soundbite

> "Many fast unit tests, fewer integration tests, fewest end-to-end tests — and testing
> doesn't stop at deploy: smoke tests, canary releases, synthetic transactions and
> contract tests cover production. In React I use Vitest with React Testing Library and
> query the way a user would."

---

# Section 7 — TypeScript

**Topic 27 · ≈ 15 min**

---

## 27 · TypeScript vs JavaScript

### Say this

> "TypeScript is a **superset** of JavaScript. That word does real work: **every valid
> JavaScript program is already a valid TypeScript program.** You can rename a `.js` file
> to `.ts` and it compiles. That's what makes gradual adoption possible — you don't
> rewrite an app to adopt TypeScript, you convert it a file at a time.
>
> What it adds, headline: **static typing**.
>
> **JavaScript is dynamically typed.** Types exist, but they're checked at **runtime**. If
> you call `user.nmae` — typo — nothing complains until that line executes, possibly in
> production, possibly on a path your tests never hit. The feedback loop is as long as
> the time between writing the bug and running that exact line.
>
> **TypeScript is statically typed.** Types are checked at **compile time**, and in
> practice **in your editor, as you type**. The typo is underlined in red before you've
> saved the file. The feedback loop goes from hours to milliseconds.
>
> The benefits follow from that. **Early error detection.** **Self-documenting code** —
> a signature tells you what a function needs and returns without reading its body or its
> docs. **Safer refactoring**, which is the one experienced developers care about most:
> rename a field, and the compiler shows you all forty places that need updating instead
> of you grepping and hoping. And overall **more robust** applications.
>
> The costs, honestly stated: there's a **transpilation step**, TypeScript to JavaScript,
> because browsers don't run TypeScript. There's a learning curve, and generics take a
> while. And it is not a runtime guarantee — types are **erased** at compile time, so data
> arriving from an API is still whatever the API actually sent. That's why people validate
> external data at the boundary with something like Zod."

### On the board

- TypeScript is a **superset** of JavaScript — all valid JS is valid TS.
- **JS is dynamically typed** — checked at **runtime**; type bugs may not surface until execution.
- **TS is statically typed** — checked at **compile time in your IDE**, catching errors *before* runtime.
- Benefits: **early error detection**, **readable/self-documenting** code, **safer refactoring**, more **robust** apps.
- Costs: a **transpilation** step (TS → JS); types are erased at runtime.
- Can be **adopted gradually** in an existing JS project.

### Two-minute live demo

Type this in any TypeScript playground or an editor and let them watch the squiggle
appear before you finish the line:

```ts
type User = { id: number; name: string };

function greet(user: User) {
  return `Hi ${user.nmae}`;   // ← red underline immediately: Property 'nmae' does not exist
}

greet({ id: 1 });             // ← Property 'name' is missing
```

Then say the sentence that sells it: *"in JavaScript, both of those bugs ship."*

### Check

**Q1. TypeScript catches type errors…**
only at runtime · **at compile time / in the IDE** ✓ · never · only in production

**Q2. "TypeScript is a superset of JavaScript" means…**
TS replaces JS entirely · **all valid JS is valid TS** ✓ · JS is faster · they are unrelated

### 💬 Soundbite

> "JavaScript is dynamically typed; TypeScript is a statically typed superset that catches
> type errors at compile time and transpiles to JavaScript."

---

# Section 8 — Coding Challenges

**Topics 28–29 · ≈ 40 min**

Frame this section differently from the rest:

> "These two are the practical part of the interview — the bit where they share a screen
> and watch you type. And the thing to understand is that **they are not really testing
> whether you can reverse a string.** They're testing whether you can think out loud,
> handle edge cases without being prompted, and stay coherent while someone watches.
>
> So the rule for this section: **narrate everything.** Silence is the failure mode. Say
> what you're about to do before you do it."

---

## 28 · Challenge · Reverse a string

### Say this

> "A classic warm-up. The idiomatic solution is one line, and it's three steps:
> **split into characters, reverse the array, join back into a string.**
>
> `str.split("")` gives you an array of characters. `.reverse()` reverses that array —
> and note, **in place**, it mutates the array it's called on; that's fine here because
> `split` just made us a fresh one, but it matters elsewhere. `.join("")` stitches it back
> into a string.
>
> Then the follow-ups, because a good candidate raises them before the interviewer does.
>
> **Edge cases**: empty string, single character, and a palindrome that reverses to
> itself. Those three should be in your tests without being asked for.
>
> **Unicode**: this is the follow-up that separates people. `split("")` splits by UTF-16
> **code unit**. Characters outside the basic plane — emoji, some CJK, mathematical
> symbols — are stored as **surrogate pairs**, two code units. Split those apart, reverse
> them, and you've produced garbage. `[...str]` uses the string iterator, which splits by
> **code point**, and handles those correctly. Even that isn't perfect — combining marks
> and emoji with modifiers can still break — but knowing the difference is exactly the
> depth an interviewer is fishing for."

### On the board

- `str.split("")` → array of characters.
- `.reverse()` → reverses the array **in place**.
- `.join("")` → back to a string.
- Edge cases: `""`, one character, a palindrome.
- **Unicode:** prefer `[...str]` — it splits by **code point**, so emoji and surrogate pairs survive.

### ▶ Run it — `reverse-string.js`

1. Run the reference solution with its five test cases. All pass.
2. **Now make them write it a different way.** Two or three minutes, alone or in pairs.
   The tests below stay put and validate whatever they write:
   ```js
   // a for loop
   function reverseString(str) {
     let out = "";
     for (let i = str.length - 1; i >= 0; i--) out += str[i];
     return out;
   }
   // reduce — a callback to topic 09
   const reverseString = (str) => [...str].reduce((acc, ch) => ch + acc, "");
   ```
   The `reduce` version is worth showing even if nobody produces it: `ch + acc` rather
   than `acc + ch` is the entire trick, and it's a lovely reinforcement of the accumulator
   idea.
3. Add a failing case on purpose so they see the harness catch it:
   `check("hello", "hello")` → `✕ FAIL`.
4. Then the Unicode demo — do this one live, it lands every time:
   ```js
   const s = "hi 👋";
   console.log(s.split("").reverse().join(""));   // broken emoji
   console.log([...s].reverse().join(""));        // correct
   ```
5. **Rehearse the narration.** Have one learner solve it out loud as if in an interview:
   *"I'll split into characters, reverse, and join. Let me check the edge cases — empty
   string returns empty, single character returns itself. One thing I'd flag: `split("")`
   breaks on emoji because of surrogate pairs, so I'd use spread if Unicode matters here."*
   That narration is worth more than the code.

### Check

**Q1. Which sequence reverses a string?**
join → reverse → split · **`split("")` → `reverse()` → `join("")`** ✓ · reverse → split → join · map → filter → reduce

**Q2. For robust Unicode handling, prefer…**
`split("")` · **`[...str]` (spreads by code point)** ✓ · a regex · `JSON.parse`

### 💬 Soundbite

> "Split into characters, reverse the array, join it back. If Unicode matters I use
> `[...str]` instead of `split("")`, because the spread splits by code point and doesn't
> break surrogate pairs."

---

## 29 · Challenge · Fetch & list users

**This is the capstone.** Budget 25 minutes and don't rush it — it uses roughly half the
course at once.

### Say this

> "This is *the* React interview task. Some version of 'fetch this and render it' comes
> up almost every time, and the requirements are always the same five: a **functional
> component**, **fetch on mount with `useEffect`**, a **loading state**, **error
> handling**, and **display the list**.
>
> The structure to write from memory: **three pieces of state.** `users` for the data,
> `loading` as a boolean, `error` for a message. Almost every candidate remembers the
> first, and forgetting the other two is the most common way to lose the question.
>
> Fetch inside `useEffect` with an **empty dependency array**, so it runs exactly once on
> mount. Inside, `try/catch/finally`: `try` sets the data, `catch` records the error, and
> **`finally` stops the loading** — so the spinner clears on success *and* on failure.
>
> Then **conditional rendering** in three branches, in this order: loading first, error
> second, data last. Early returns keep it flat and readable.
>
> And two details that make an interviewer's eyebrows go up. First, **`fetch` doesn't
> reject on a 404 or a 500** — so you check `res.ok` and throw yourself. Second, the
> **unmount guard**: if the component unmounts while the request is in flight, calling
> `setState` on a dead component is at best wasted work. An `active` flag flipped in the
> cleanup function handles it. Mention it and you look like someone who has shipped this
> code, not just read about it."

### On the board

- **Three state values:** `users` (data), `loading` (boolean), `error` (message).
- `useEffect(..., [])` → fetch **once on mount**.
- `try/catch/finally` → set data, catch errors, **always** stop loading.
- **Conditional rendering:** loading → message; error → message; else → the list/table.
- `fetch` doesn't reject on HTTP errors → **check `res.ok`**.
- Each `.map()` row needs a **stable `key`**.
- Guard against **setState after unmount** with an `active` flag in the cleanup.

### ▶ Run it — `UserList.jsx`

Hits `jsonplaceholder.typicode.com/users` for real.

1. Render it. A table of ten users appears; the "Loading users…" flash is brief but
   real — throttle the network in devtools if you want them to see it properly.
2. **Read it as a group, in execution order, not top to bottom:**
   - three `useState` calls, one per concern;
   - `useEffect` with `[]` — runs once;
   - `let active = true` — the unmount guard;
   - `fetch`, then the `!res.ok` check that throws;
   - `catch` sets the error, `finally` clears loading, each guarded by `active`;
   - `return () => { active = false }` — cleanup, **topic 17**;
   - three render branches;
   - `users.map(...)` with `key={u.id}` — **topic 09** and the virtual DOM from **topic 12**.
3. **Break it four ways.** This is the part that teaches:
   - **Mistype the URL** → the error branch renders in red. Prove the app doesn't crash.
   - **Delete `finally` and put `setLoading(false)` in the `try` only** → then break the
     URL again. Now it's stuck on "Loading users…" forever. *That's the bug `finally`
     prevents, and it's everywhere in real codebases.*
   - **Remove `key={u.id}`** → React warns in the console. Explain: without stable keys,
     the diff can't tell which row is which, so it may re-order or re-create DOM nodes
     and lose input state inside rows.
   - **Remove the `[]` dependency array** → fetch on every render, every fetch sets state,
     every set triggers a render. An infinite loop against a live API. Show it, then undo
     it quickly. **This is topic 17's pitfall, live.**
4. **The mock interview.** Close the app. Give them a blank React playground and fifteen
   minutes to rebuild it from memory, narrating. Walk the room. What to look for, in
   order of how often it's missed: the error state, `res.ok`, `finally`, the key prop.
5. Extensions if the group is fast: a Retry button on the error branch; a search box
   filtering the list — **debounced**, from topic 11; extract the whole thing into a
   `useUsers()` custom hook — topic 13 — and note that `App` becomes purely presentational.
   That extraction is the single best demonstration of why custom hooks exist.

### Check

**Q1. Why is the `useEffect` dependency array `[]`?**
To run on every render · **So the fetch runs once, on mount** ✓ · To cause a loop · It is optional

**Q2. Why put `setLoading(false)` in `finally`?**
It looks cleaner · **So loading stops on both success and failure** ✓ · To catch errors · It is required syntax

**Q3. Each item rendered from `.map()` needs a…**
ref · **unique `key` prop** ✓ · `useEffect` · context

### 💬 Soundbite

> "Three states — data, loading, error. Fetch in `useEffect` with an empty dependency
> array so it runs once. `try/catch/finally` so loading always stops. Each row needs a
> stable key. And I guard against setState after unmount."

---

# Closing the class

## The wrap-up (10 minutes)

Don't summarise all 29 topics — nobody absorbs that. Do this instead:

1. **Ask the room for the three things that surprised them most.** Write them up. It's a
   better recap than yours because it's theirs, and it tells you what to reinforce next
   time.
2. **Re-run the thread.** Say the through-line out loud, because most learners won't have
   noticed it:
   > "Closures explain the stale `useState` bug. Reference equality explains why
   > `React.memo` fails. The event loop explains why debounce works and why a promise beats
   > a `setTimeout(0)`. This wasn't 29 topics — it was about six ideas, each showing up
   > four times."
3. **Point them at the progress bar.** Anything not ticked is their homework list, and
   it's saved in their browser.

## Mock interview drill (20 minutes, optional but the highest-value 20 minutes here)

Pairs. One is the interviewer with the soundbite list, one answers. Five questions, two
minutes each, then swap. Rules:

- No looking at notes while answering.
- The interviewer must ask **one follow-up** — "why?", "when would you not?", "what's the
  cost?" The follow-up is where the actual learning happens.
- Nobody is allowed to answer with just a definition. Every answer needs an example.

Good five-question sets:

**Set A (JavaScript)** — `var`/`let`/`const` · what's a closure · event loop ordering ·
`==` vs `===` · debounce vs throttle
**Set B (React)** — props vs state · what the virtual DOM does · `useEffect` deps ·
controlled vs uncontrolled · why `setN(n+1)` twice adds one
**Set C (senior)** — how you'd structure a large app · where API data lives · when Redux ·
SSR vs SSG vs ISR · what you'd profile first

---

# Reference material

## One-page cheat sheet

Print this, or paste it into the class chat at the end.

| # | Topic | The one line |
|---|-------|--------------|
| 01 | Flexbox | One-dimensional layout along a main axis; `justify-content` = main, `align-items` = cross. Grid for 2D. |
| 02 | Bootstrap vs Tailwind | Bootstrap gives finished components; Tailwind gives building blocks. |
| 03 | var/let/const | `var` function-scoped + `undefined`; `let`/`const` block-scoped + TDZ. Default to `const`. |
| 04 | `==` vs `===` | `==` coerces, `===` compares value **and** type. For objects it's reference identity. |
| 05 | Hoisting | Declarations registered at compile time. Function declarations are callable early; expressions aren't. |
| 06 | Closures | A function keeping a **live** link to its defining scope. How you get private state. |
| 07 | Event loop | Sync → **all** microtasks (promises) → **one** macrotask (`setTimeout`). |
| 08 | Promises / async-await | `await` suspends the function; `try/catch` handles rejection; `finally` always cleans up. |
| 09 | map/filter/reduce | Transform 1:1 / select a subset / fold to one value. No mutation, so they chain. |
| 10 | Spread & rest | Expands on the right, collects on the left. Copies are **shallow**. |
| 11 | Debounce & throttle | Debounce fires once after a burst; throttle fires at a steady rate during it. |
| 12 | Virtual DOM | Diff a virtual tree (reconciliation), apply the minimal real-DOM patch. |
| 13 | Hooks | State + lifecycle in function components. Top level only — React tracks them by call order. |
| 14 | Props vs state | Props come down and are immutable; state is owned and re-renders on change. |
| 15 | Controlled vs uncontrolled | React state owns the value, or the DOM does and you read it with a ref. |
| 16 | useState | `[value, setter]`; setter re-renders. Use `setX(prev => …)` when it depends on the old value. |
| 17 | useEffect | Side effects after render; `[]` = once; return a cleanup; deps bugs cause loops. |
| 18 | Context | Share theme/auth/locale without prop drilling. Every consumer re-renders. |
| 19 | Optimizing components | Measure first, then memo / useCallback / useMemo, and render less. |
| 20 | Optimizing re-renders | `React.memo` only works if prop **identity** is stable — pair it with `useCallback`. |
| 21 | Large-app architecture | Feature folders; state tiered local → context → global → **server state**. |
| 22 | Redux & friends | `useState` → `useReducer` → Context → a library, as complexity grows. |
| 23 | Dynamic routing | `path="/products/:id"` + `const { id } = useParams()`. |
| 24 | App-wide performance | Animate transform/opacity, code-split, ship a production build, **measure first**. |
| 25 | Next.js | SSR = per request; SSG = at build; ISR = static with on-demand regeneration. |
| 26 | Testing | Many unit → fewer integration → fewest E2E, plus testing in production. Vitest + RTL. |
| 27 | TypeScript | A statically typed superset; catches type errors at compile time; adopt gradually. |
| 28 | Reverse a string | `split("")` → `reverse()` → `join("")`; use `[...str]` for Unicode. |
| 29 | Fetch & list users | Three states, `useEffect([])`, `try/catch/finally`, conditional render, stable keys. |

## Glossary

Terms learners hear in this class and are embarrassed to ask about.

- **Binding** — the association between a variable name and its storage. `const` freezes the binding, not the value.
- **Call stack** — the structure tracking which functions are currently executing.
- **Coercion** — automatic conversion between types, e.g. `"5" == 5`.
- **Declarative** — describing the desired result (React) rather than the steps (imperative DOM code).
- **Falsy** — values that become `false` in a boolean context: `false`, `0`, `""`, `null`, `undefined`, `NaN`.
- **Hydration** — attaching React event handlers to server-rendered HTML in the browser.
- **Identity** (referential equality) — whether two references point at the same object. The basis of shallow comparison.
- **Idempotent** — running it twice has the same effect as running it once. What StrictMode checks of your effects.
- **Lexical scope** — scope determined by where code is *written*, not where it's called.
- **Macrotask / task** — a queued callback like `setTimeout` or a DOM event. Lower priority than microtasks.
- **Memoisation** — caching a result so repeated work is skipped.
- **Microtask** — a promise callback or `queueMicrotask`. Drained fully before the next macrotask.
- **Mount / unmount** — a component being added to, or removed from, the tree.
- **Prop drilling** — passing a prop through components that don't use it, purely to reach a descendant.
- **Reconciliation** — React diffing the new virtual tree against the old one.
- **Reflow / repaint** — the browser recalculating layout / redrawing pixels. Expensive.
- **Shallow comparison** — comparing an object's top-level properties by identity, one level deep.
- **Side effect** — anything reaching outside the render: fetching, timers, subscriptions, DOM writes.
- **Stale closure** — a function still using a value captured in an earlier render.
- **Superset** — a language containing another entirely; all JS is valid TS.
- **TDZ (Temporal Dead Zone)** — the window where a `let`/`const` exists but can't be read.
- **Transpilation** — source-to-source compilation, e.g. TypeScript → JavaScript, JSX → `createElement` calls.

## The misconceptions to pre-empt

Learners arrive with these, or invent them during the class. Say the correction *before*
they build on the wrong version.

| They believe | The correction |
|---|---|
| `const` makes the value immutable | It freezes the **binding**. `const` objects and arrays are still mutable. |
| Hoisting moves code to the top | Nothing moves. Declarations are **registered** at compile time. |
| A closure is "a function returning a function" | That's the clearest *demo*. A closure is any function using its defining scope. |
| `setTimeout(fn, 0)` runs immediately | It runs after all synchronous code **and** all pending microtasks. |
| `fetch` rejects on a 404 | It doesn't. Check `res.ok` yourself. |
| `justify-content` is horizontal | Only while `flex-direction: row`. It's the **main axis**, whichever that is. |
| `useState` updates the variable immediately | It schedules a re-render. This render's variable is a `const` and never changes. |
| More `React.memo` = faster | Memo has a cost. Applied by reflex it makes things slower. |
| The virtual DOM is faster than the DOM | It makes *good-enough* performance the default while keeping code declarative. |
| Context is a state manager | It's a transport mechanism. Every consumer re-renders on change. |
| TypeScript checks types at runtime | Types are **erased** at compile time. Validate external data at the boundary. |
| The `key` prop can be the array index | Only for static lists. With re-ordering or insertion it causes real bugs. |

## Troubleshooting the room

| Symptom | Cause | Fix |
|---|---|---|
| First **Render** click hangs for seconds | Babel's ~3 MB chunk downloading lazily | Expected. Pre-warm it before class by opening one React topic. |
| React playground shows nothing | The component isn't named `App` | The playground mounts a component called `App`. Rename it. |
| `fetch` topics fail for everyone | No internet, or a blocked network | Pre-load topics 08 and 29, or demo them from your machine. |
| A learner's quiz won't let them re-answer | Answers lock after one attempt | Refresh the page — the state is per page load. |
| Progress vanished | It's in `localStorage`, per browser and per origin | Expected across machines/private windows. Not recoverable. |
| Blank page after editing content | A syntax error in `src/data/topics-*.js` | Check the browser console; Vite reports the file and line. |
| Styles look wrong after a CSS edit | Contrast/token rules broken | See `STYLE.md`; run `python3 tools/contrast-audit.py src/styles.css` — it must exit 0. |

## Homework

Set these in order; each maps to a topic they've just seen.

1. **Finish the app.** Every unticked topic in the sidebar: read it, run it, break it,
   answer the quiz. Aim for 100% on the progress bar.
2. **Break one demo per topic** and write down, in one sentence, what the error message
   told you. Learning to read error messages is a separate skill from learning React.
3. **Rebuild topic 29 from a blank playground**, no reference. Then diff yours against the
   original and note what you left out.
4. **Write the 29 soundbites out by hand.** Handwriting them beats re-reading them.
5. **Extend the lab.** Add a topic to `src/data/topics-4.js` — a `p`, a `ul`, a `js` or
   `react` playground and a `quiz` block — and it appears in the sidebar automatically.
   Teaching a topic is how you find out you don't know it. Good candidates that this
   syllabus doesn't cover: CSS Grid, `useRef` in its own right, error boundaries,
   accessibility, or `Promise.all` vs `allSettled`.

## Instructor prep checklist

The day before:

- [ ] `npm install && npm run dev` on the machine you'll present from.
- [ ] Open one React topic and click **Render** to pre-download the Babel chunk.
- [ ] Confirm topics 08 and 29 reach `jsonplaceholder.typicode.com` on the venue network.
- [ ] Editor and browser font sizes up; devtools console open and legible.
- [ ] Decide your course shape (A, B or C) and write the timings where you can see them.
- [ ] Skim `README.md` and `STYLE.md` so you can answer questions about the app itself.
- [ ] Pick your breaks in advance — the two natural ones are after topic 06 and after
      topic 17.

During:

- [ ] Nobody watches, everybody types.
- [ ] Predict before running, every single playground.
- [ ] Break at least one demo per topic that has one.
- [ ] Ask the quiz questions out loud *before* anyone clicks.
- [ ] Say the soundbite, then make the room say it back.

---

*This script covers every topic authored in `src/data/topics-1.js` … `topics-4.js`. If
you add a topic there, add a section here — same five beats: Say this, On the board, Run
it, Check, Soundbite.*
