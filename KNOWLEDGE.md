# LearningVerification — Implementation Knowledge Base

## Design Direction: "The Socratic Workbook"

A warm, editorial workbook aesthetic — not another dark terminal IDE.

### Palette

```css
/* Dark slate background */
--color-bg: #1a1b2e;
--color-bg-elevated: #222438;
--color-bg-card: #2a2c42;

/* Text */
--color-text-primary: #e8e6e3;
--color-text-secondary: #9d9bb0;
--color-text-muted: #6b6980;

/* Accent — warm burnt orange */
--color-accent: #e76f51;
--color-accent-hover: #d65a3a;
--color-accent-subtle: rgba(231, 111, 81, 0.12);

/* Secondary accent — warm clay */
--color-secondary: #d4a373;
--color-secondary-hover: #c49263;

/* Success (for completed steps) */
--color-success: #6b8f71;

/* Code block bg */
--color-code-bg: #131423;
```

### Typography

| Usage | Font | Weight | Notes |
|-------|------|--------|-------|
| Headings (h1-h3) | Playfair Display | 600, 700 | Serif, editorial feel |
| Body text | DM Sans | 400, 500 | Clean sans, not Inter |
| Code / monospace | JetBrains Mono | 400, 600 | Ligatures optional |
| Step numbers | Playfair Display | 900 (italic) | Giant decorative numerals |

### Textures & Effects

- **Noise overlay**: Subtle grain on the background (`data:image/svg+xml` with base64 noise, ~2% opacity)
- **Grid**: Faint dotted grid on cards/bg (`background-image: radial-gradient(circle, #2a2c42 1px, transparent 1px)` size 20px)
- **Focus rings**: Warm orange glow (`box-shadow: 0 0 0 3px rgba(231, 111, 81, 0.4)`)
- **Cards**: Slightly elevated (`bg-elevated`), rounded corners (`8px`), subtle border (`1px solid rgba(255,255,255,0.06)`)

### Motion

- **Page load**: Staggered fade-in on elements using `animation-delay` (0ms, 100ms, 200ms, ...)
- **Step transitions**: Content area fades out/in on step change (200ms)
- **Checkbox/complete**: Subtle scale + color transition on step completion
- **Hover**: Cards lift slightly (translateY -2px) on hover
- **Progress bar**: Smooth width transition on the vertical progress indicator

## Architecture Decisions

### Why no router?
Single-page wizard with a `currentStep` state variable. Steps are rendered via a lookup object `Record<number, StepComponent>`. URL hash updates to `/step-1` etc. for bookmarking but not for routing.

### Why Context + useReducer over Zustand/Redux?
Minimal dependencies. The state shape is simple (one session, one problem). useReducer gives us predictable state transitions without extra libraries.

### Why no component library (shadcn, Mantine)?
The design direction requires a bespoke look. Tailwind + custom components gives full control over every pixel. The app has ~15 components — not worth the overhead of a library.

### Why localStorage and not a backend?
Zero ops. No accounts. No GDPR/compliance issues (in Phase 1). The tradeoff is data doesn't persist across devices, which is acceptable for a classroom tool where each student uses their own machine.

## State Architecture

### State Shape

```typescript
type AppState = {
  phase: 'select-problem' | 'solving' | 'summary';
  selectedProblem: Problem | null;
  session: Session | null;
  customProblems: Problem[];
};
```

### Reducer Actions

```typescript
type Action =
  | { type: 'SELECT_PROBLEM'; problem: Problem }
  | { type: 'RESET' }
  | { type: 'SET_STEP_DATA'; step: number; data: unknown }
  | { type: 'COMPLETE_STEP'; step: number }
  | { type: 'GO_TO_STEP'; step: number }
  | { type: 'FINISH' }
  | { type: 'ADD_CUSTOM_PROBLEM'; problem: Problem }
  | { type: 'REMOVE_CUSTOM_PROBLEM'; id: string };
```

### Persistence

- `session` → `localStorage.setItem('lvs_session', JSON.stringify(session))`
- `customProblems` → `localStorage.setItem('lvs_custom_problems', JSON.stringify(...))`
- Subscribe to store changes via a custom `useLocalStorage` hook

## Data Structures

### Problem

```typescript
interface Problem {
  id: string;              // e.g. "fizzbuzz", "custom-1712345678"
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;        // e.g. "Conditionals", "Loops", "Arrays"
  description: string;     // Markdown
  sampleInputs?: string[];
  sampleOutputs?: string[];
  starterCode?: string;
  hints?: string[];
}
```

### Session

```typescript
interface Session {
  problemId: string;
  startedAt: string;       // ISO date
  currentStep: StepNumber;
  completedSteps: StepNumber[];
  stepData: StepData;
}

interface StepData {
  1: { understanding: string };
  2: { inputs: InputOutputField[] };
  3: { outputs: InputOutputField[] };
  4: { decompositionSteps: string[] };
  5: { types: FieldType[] };
  6: { edgeCases: EdgeCase[] };
  7: { code: string };
  8: { tests: string };
  9: { timeComplexity: string; spaceComplexity: string; alternatives: string };
}

interface InputOutputField {
  id: string;              // nanoid or crypto.randomUUID()
  name: string;
  description: string;
}

interface FieldType {
  fieldId: string;         // references the I/O field
  type: 'int' | 'float' | 'str' | 'list' | 'tuple' | 'dict' | 'bool' | 'None';
}

interface EdgeCase {
  id: string;
  description: string;
  expectedBehavior: string;
}

type StepNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
```

## Component Tree

```
<App>
  <AppProvider>                  // wraps Context providers
    <Header />                    // logo, step counter, reset
    {phase === 'select-problem' && (
      <ProblemSelector>          // problem library grid
        <ProblemCard />*          // per problem
        <CustomProblemForm />     // modal or inline form
      </ProblemSelector>
    )}
    {phase === 'solving' && (
      <div className="solving-layout">
        <StepProgress>           // vertical sidebar
          <StepIndicator />*      // per step, shows ✓ or number
        </StepProgress>
        <main>
          <StepContent>          // renders current step component
            // Renders one of:
            <Step1Understand />
            <Step2Inputs />
            ...
          </StepContent>
          <StepNavigation />     // Back / Next / Complete buttons
        </main>
      </div>
    )}
    {phase === 'summary' && (
      <SummaryView />            // all 9 steps displayed, export button
    )}
  </AppProvider>
</App>
```

## Step Component Interface

Every step component receives the same props:

```typescript
interface StepProps {
  data: Session['stepData'][StepNumber];
  onSave: (data: Partial<Session['stepData'][StepNumber]>) => void;
}

// The parent wraps each step with:
// - Problem context display (for steps 1-6, show the problem statement)
// - Step number and title
// - Navigation
```

## File Structure

```
src/
├── main.tsx                     # ReactDOM.createRoot
├── App.tsx                      # Phase router (select / solving / summary)
├── styles/
│   ├── globals.css              # Design tokens, fonts, base styles
│   └── codemirror-theme.css     # Custom CodeMirror dark theme
├── types/
│   ├── problem.ts               # Problem, difficulty, category
│   └── session.ts               # Session, StepData, related interfaces
├── data/
│   ├── problems/                # JSON files, one per problem
│   │   ├── fizzbuzz.json
│   │   └── ...                  # ~10 problems
│   └── registry.ts              # Imports all, exports as array
├── context/
│   ├── AppContext.tsx            # Combined provider with useReducer
│   └── actions.ts               # Action type definitions
├── hooks/
│   ├── useLocalStorage.ts       # Generic localStorage hook
│   └── useApp.ts                # Convenience hook wrapping useContext
├── components/
│   ├── Header.tsx
│   ├── ProblemSelector.tsx       # Problem library grid
│   ├── ProblemCard.tsx           # Individual problem card
│   ├── CustomProblemForm.tsx     # Form for custom problems
│   ├── StepWizard.tsx            # Layout: sidebar + step content + nav
│   ├── StepProgress.tsx          # Vertical sidebar stepper
│   ├── SummaryView.tsx           # Read-only aggregate of all steps
│   ├── steps/
│   │   ├── Step1Understand.tsx
│   │   ├── Step2Inputs.tsx
│   │   ├── Step3Outputs.tsx
│   │   ├── Step4Decompose.tsx
│   │   ├── Step5Types.tsx
│   │   ├── Step6EdgeCases.tsx
│   │   ├── Step7Implement.tsx
│   │   ├── Step8Verify.tsx
│   │   └── Step9Optimality.tsx
│   └── ui/                       # Shared UI primitives
│       ├── Button.tsx
│       ├── Textarea.tsx
│       ├── Select.tsx
│       ├── Card.tsx
│       └── IconButton.tsx
└── utils/
    ├── exportToMarkdown.ts       # Converts session → Markdown string
    └── ids.ts                    # generateId() helper (crypto.randomUUID)
```

## Build Order

This is the recommended sequence — each step produces something testable:

### Sprint 1: Foundation
1. Scaffold Vite + React + TypeScript project
2. Install deps: `tailwindcss`, `@tailwindcss/typography`, `@codemirror/lang-python`, `@uiw/react-codemirror`
3. Set up `globals.css` with design tokens, fonts (Google Fonts via `@import` or `link` tag), noise/background
4. Create `types/` — all TypeScript interfaces
5. Create `context/AppContext.tsx` with reducer + localStorage persistence
6. Create `hooks/useLocalStorage.ts` and `hooks/useApp.ts`

### Sprint 2: Problem Selection
7. Create 3-5 problem JSON files in `data/problems/`
8. Create `data/registry.ts`
9. Build `ProblemCard.tsx` and `ProblemSelector.tsx`
10. Build `CustomProblemForm.tsx`

### Sprint 3: Step Wizard Framework
11. Build `StepWizard.tsx` layout (sidebar + content + navigation)
12. Build `StepProgress.tsx` (vertical stepper)
13. Wire up navigation (back / complete step / next)

### Sprint 4: Step Components
14. Build `Step1Understand.tsx`
15. Build `Step2Inputs.tsx` + `Step3Outputs.tsx` (similar dynamic list pattern)
16. Build `Step4Decompose.tsx`
17. Build `Step5Types.tsx`
18. Build `Step6EdgeCases.tsx`
19. Build `Step7Implement.tsx` (CodeMirror integration)
20. Build `Step8Verify.tsx` (CodeMirror, no execution)
21. Build `Step9Optimality.tsx`

### Sprint 5: Polish
22. Build `SummaryView.tsx` with Markdown export
23. Build `Header.tsx`
24. Add remaining problem JSON files (5-10 total)
25. Add animations (staggered reveals, step transitions)
26. Responsive adjustments

## CodeMirror Setup

```tsx
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula'; // or custom

<CodeMirror
  value={code}
  height="400px"
  theme={customTheme}  // or dracula as base
  extensions={[python()]}
  onChange={handleChange}
/>
```

The custom theme should match our palette: dark slate background, warm orange cursor, muted green for strings, etc.

## Markdown Export Format

```markdown
# LearningVerification — [Problem Title]

## 1. Understand the Problem
[student response]

## 2. Inputs
| Name | Description |
|------|-------------|
| ...  | ...         |

## 3. Outputs
[similar table]

## 4. Decomposition
1. ...
2. ...

## 5. Types
| Field | Type |
|-------|------|
| ...   | ...  |

## 6. Edge Cases
| Edge Case | Expected Behavior |
|-----------|------------------|
| ...       | ...              |

## 7. Implementation

\`\`\`python
[code]
\`\`\`

## 8. Verification

\`\`\`python
[tests]
\`\`\`

## 9. Optimality

- Time Complexity: [student answer]
- Space Complexity: [student answer]
- Alternative Approaches: [student answer]
```

## Import Strategy for Problems

Problems can be written as plain TypeScript objects in `registry.ts` rather than JSON files to avoid Vite JSON import quirks:

```typescript
// data/registry.ts
import { Problem } from '../types/problem';

const problems: Problem[] = [
  {
    id: 'fizzbuzz',
    title: 'FizzBuzz',
    difficulty: 'easy',
    category: 'Conditionals',
    description: `Write a program that prints numbers from 1 to **n**...`,
    sampleInputs: ['15'],
    sampleOutputs: ['1\n2\nFizz\n4\nBuzz\nFizz\n7...'],
    starterCode: 'def fizzbuzz(n: int) -> None:\n    pass\n',
  },
  // ... more problems
];
```

## npm Dependencies

```json
{
  "dependencies": {
    "react": "^18.3",
    "react-dom": "^18.3",
    "@uiw/react-codemirror": "^4.23",
    "@codemirror/lang-python": "^6.1",
    "@codemirror/theme-one-dark": "^6.1",
    "nanoid": "^5.0"
  },
  "devDependencies": {
    "@types/react": "^18.3",
    "@types/react-dom": "^18.3",
    "@vitejs/plugin-react": "^4.3",
    "autoprefixer": "^10.4",
    "postcss": "^8.4",
    "tailwindcss": "^3.4",
    "typescript": "^5.5",
    "vite": "^5.4"
  }
}
```

## Tailwind Config Notes

Extend the default theme with custom fonts and colors:

```js
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: { DEFAULT: '#1a1b2e', elevated: '#222438', card: '#2a2c42' },
        text: { primary: '#e8e6e3', secondary: '#9d9bb0', muted: '#6b6980' },
        accent: { DEFAULT: '#e76f51', hover: '#d65a3a' },
        secondary: { DEFAULT: '#d4a373', hover: '#c49263' },
        success: '#6b8f71',
      },
    },
  },
  plugins: [],
};
```

## Key UX Rules

1. **Auto-save**: Every input change is written to localStorage immediately (debounced 500ms for textareas, instant for checkboxes/toggles)
2. **Completion gating**: Student can always go BACK to any step, but can only go FORWARD if current step is completed
3. **Step completion criteria**:
   - Step 1: textarea has at least 20 characters
   - Steps 2-3: at least one item
   - Step 4: at least 2 items
   - Step 5: all fields from steps 2-3 have a type selected
   - Step 6: at least 1 item
   - Step 7: code is non-empty
   - Step 8: tests are non-empty
   - Step 9: all three fields filled
4. **Reset**: Header has a "Reset" button that clears the current session and returns to problem selection (confirmation dialog)
5. **Loading fonts**: Preload Google Fonts in `index.html` to avoid FOUT. Consider using `font-display: swap`
