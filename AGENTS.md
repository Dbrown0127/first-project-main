# Agent Notes

## Project Direction

This project is a small interactive arithmetic puzzle page, currently built as a local-first standalone HTML file.

Users solve five result tiles by entering the matching calculations:

- `3 x 7 = 21`
- `9 + 8 = 17`
- `1 + 2 = 3`
- `6 - 4 = 2`
- `10 / 5 = 2`

The puzzle also has whole-board constraints:

- Each number from `1` through `10` is used exactly once.
- Each operation appears at least once.
- Addition and multiplication should accept either operand order.
- Subtraction and division remain order-sensitive.

## Current Priorities

- Keep the core puzzle interaction clear and approachable.
- Preserve fast local iteration.
- Keep the implementation simple until complexity is genuinely needed.
- Favor usability while users test combinations.
- Document decisions as the puzzle evolves.

## Product Choices Made So Far

- Correct answers should show a visual success cue.
- Correct answers should remain editable instead of locking the input.
- If a previously correct answer is changed, the row should return to unsolved.
- The duplicate `2` result rows are distinct: one expects `6 - 4`, and the other expects `10 / 5`.
- Instructions should tell users about the number-use and operation-use rules, even though those rules are not fully validated in code yet.

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
