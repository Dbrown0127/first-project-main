# Agent Notes

## Project Direction

This project is a small interactive arithmetic puzzle page, currently built as a local-first standalone HTML file.

Users solve five result tiles by entering calculations that produce the target results. The original seed example was:

- `3 x 7 = 21`
- `9 + 8 = 17`
- `1 + 2 = 3`
- `6 - 4 = 2`
- `10 / 5 = 2`

The puzzle also has whole-board constraints:

- Each number from `1` through `10` is used exactly once.
- Each operation appears at least once.
- Row validation is result-based, not based on one predefined intended equation.
- Addition and multiplication naturally accept either operand order because the expression is evaluated.
- Subtraction and division remain order-sensitive because the expression is evaluated as written.

## Current Priorities

- Keep the core puzzle interaction clear and approachable.
- Preserve fast local iteration.
- Keep the implementation simple until complexity is genuinely needed.
- Favor usability while users test combinations.
- Document decisions as the puzzle evolves.

## Product Choices Made So Far

- Mathematically valid equations that produce a row's target result should show a visual success cue.
- Correct answers should remain editable instead of locking the input.
- If a previously correct answer is changed, the row should return to unsolved.
- Duplicate result rows can be solved by any valid equation that evaluates to that displayed result.
- A board is only solved when all rows are valid and the global number-use and operation-use rules are satisfied.
- The tracker should show used, missing, and duplicate numbers, plus used and missing operations.

## Technical Choices Made So Far

- Use vanilla HTML, CSS, and JavaScript.
- Keep the app as a single `index.html` file for now.
- Avoid build tooling, package installs, and framework dependencies.
- The page should run by opening `index.html` directly in a browser.
- Add dependencies only when there is a clear reason and the user agrees.

## Development Guidance

- Make small, focused changes.
- Prefer readable code over clever abstractions.
- Keep puzzle logic easy to inspect and revise.
- Do not introduce broader app architecture prematurely.
- When adding validation, keep feedback helpful instead of punitive.
- Preserve mobile-friendly layout and accessible labels.
- Test both correct and incorrect answer flows after behavior changes.
