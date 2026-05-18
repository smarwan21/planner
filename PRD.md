# LearningVerification — Product Requirements Document

## Overview

**LearningVerification** is a standalone web app that guides CS students through a structured 9-step problem-solving process. It replaces the reflex of "ask AI, copy code, submit" with deliberate thinking: understand the problem, decompose it, define types, consider edge cases, write code, verify, and reflect on optimality.

Phase 1 is entirely AI-free. Phase 2 (future) adds AI code generation from the student's own problem specification — letting the student act as the reviewer, not the prompter.

## Problem Statement

Students in the AI era are skipping the learning process. They prompt an LLM with a problem, get working code, and submit it without understanding the reasoning behind it. This undermines the educational goal of teaching computational thinking.

The fix is not to ban AI — it's to restructure the assignment so the **process** is the deliverable, not just the code.

## Target Audience

- **Primary**: College/university CS students (CS101 through intermediate courses)
- **Secondary**: Educators who want to assign structured problem-solving exercises without managing accounts or infrastructure

## User Personas

### Sam (Student)
19, first-year CS student. Knows Python basics. Tends to jump straight to coding. Needs a framework that forces her to slow down and think before typing.

### Prof. Chen (Educator)
Wants to assign exercises that reward process thinking, not just correct output. Needs a zero-setup tool students can open in a browser and work through. Downloads student work as Markdown for grading.

## User Flow

```
Landing → Problem Selection → Step-by-Step Wizard → Summary → Export MD
                                  ↑
                            (can revisit steps)
```

1. **Landing**: App title, brief description, "Start" button
2. **Problem Selection**: Grid of built-in problems + "Custom Problem" option
3. **Step Wizard**: 9 steps, navigable via vertical sidebar, each must be completed before advancing
4. **Summary**: Aggregate view of all 9 steps for that problem
5. **Export**: Download as Markdown

## Features — Phase 1

### Problem Library
- 10 curated problems across easy/medium/hard
- Each with: title, description, sample I/O, starter code, difficulty, category
- Displayed as a card grid with difficulty badges

### Custom Problem Input
- Form: title, description, sample I/O, starter code
- JSON paste option for advanced users
- Stored in localStorage alongside built-in problems

### Step Wizard
- 9 sequential steps with a vertical progress sidebar
- Must complete current step before advancing (or use "back" freely)
- All input state persisted to localStorage (resume on refresh)
- Each step has instructions, input area, and a "mark complete" action

### Step Detail

| # | Step | Input Type | Notes |
|---|------|-----------|-------|
| 1 | Understand the Problem | Textarea (rich) | Problem statement displayed, student rephrases in own words |
| 2 | Define Inputs | Dynamic list | Name + description per input, add/remove |
| 3 | Define Outputs | Dynamic list | Name + description per output, add/remove |
| 4 | Decompose | Bullet list | Add/remove/reorder sub-problem steps |
| 5 | Types | Dropdown per field | int, float, str, list, tuple, dict, bool, None |
| 6 | Edge Cases | Card list | Edge case description + expected behavior |
| 7 | Implementation | Code editor (CodeMirror) | Python, syntax highlighting, starter code preloaded |
| 8 | Verification | Code editor (CodeMirror) | Write pytest-style tests (conceptual — no execution) |
| 9 | Optimality | Form | Time complexity, space complexity, alternative approaches |

### Export
- Download entire session as a well-formatted Markdown file
- Includes: problem statement, all 9 step responses, final code, tests

### Persistence
- All session data stored in localStorage
- No accounts, no backend, no cookies
- Student can close browser and resume later

## Out of Scope (Phase 1)

- User accounts / authentication
- Teacher dashboards
- In-browser code execution
- AI integration
- Collaboration / sharing
- Backend infrastructure

## Phase 2 Roadmap

1. AI code generation: Student completes steps 1–6, clicks "Generate Code", LLM produces code from those specs
2. Diff view: Side-by-side comparison of student code vs. AI code
3. AI-powered feedback: Suggestions for edge cases the student missed
4. Scoring rubric: Optional teacher-defined scoring of each step

## Technical Requirements

- **Platform**: Modern web browser (Chrome, Firefox, Safari, Edge — last 2 versions)
- **No backend**: Fully client-side, no server required
- **Offline-capable**: Works without internet after initial load (except fonts/CDN assets)
- **Responsive**: Desktop-first, tablet-capable
- **Performance**: < 2s initial load, smooth animations at 60fps

## Success Metrics

- **Completion rate**: % of students who complete all 9 steps
- **Step depth**: Average length/quality of responses (especially steps 4, 6, 9)
- **Educator adoption**: Number of instructors assigning problems via the tool
