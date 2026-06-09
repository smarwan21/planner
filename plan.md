Let's make some changes. first, switch to light-based color theme, and better fonts. then we will make fundementale changes in the app. Change the current 9-step guide into something lighter and more planning based, than a step-by-step coding issue. That would be in 4 stages:

# Stage 1
The first page to display to the student in any selected problem would be a page to show "Why Planning" with the following content:

```
Why Planning:
Software engineers spend up to 70% of their time planning, reading, and reviewing code, and only 30% actually typing it. In the era of AI, your ability to plan logic is your most valuable skill, and the AI is just your typing assistant.

As the Lead Architect, your job is to define the logical steps of the program. Let's start!!
```
This is to explain the importance of planning and signiphies the role of the student as the one planning and making the decisions and not the AI.

# Stage 2
The second page would be the problem statement itself. This would be a rich document, maybe markdown formatted, not just a simple text.

# Stage 3
The third page would be the first step of planning, It would start with an encourging statement telling the student to think about previous coding planning activities/concepts, and let them write down some of these concepts. For example:

```
Think back to previous assignments, labs, or concepts we've covered. Have you solved a similar problem before? (e.g., interacting with a user, checking conditions, parsing a string).
Briefly note down 1 or 2 concepts or functions you've used in the past that might apply here:
```
Then user can add one concept at a time.

# Stage 4
The fourth step would start with a Quote:
```Senior developers never write 100 lines of code all at once. They break a feature down into micro-steps, map out what kind of data flows through those steps, and decide on the logic structure beforehand.```

This is to encourage them to break down the problem into smaller subtasks. these subtasks should be smaller units of logic to help users decompose the bigger logic.
There should be a button "+ Add a subtask" that opens a new card with the following sections for the student to define the new subtask:
`Subtask Description -> Text input`
This is the main subtask. Student writes it down and read it aloud to help their brain think how to achieve/implement this small logic.
Then the need to think about the constraints or elements of this subtask, for example:
- Variables & Data types needed
- Logic & programming concepts
Variables and data types should be similar to how they currently input variables names and types; a dropdown menu for common types and a text input for variable name
Logic & programming concepts should be a check list with common concepts, e.g.:
- Variables and assignment
- Conditionals (if/else)
- Loops (while/for)
- Functions

The goal is to link planning to actuall implementation. Students usually jumps to code without thinking or planning, and research found that students mostly find planning and requirement gathering tedius work that has no value in the actual implementation. Our goal is to make them plan and link their programming concepts to each step of the plan so they learn how to associate logic and planning with programming concepts.
