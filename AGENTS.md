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
- Avoid build tooling, package installs, and framework dependencies.
- The page should run by opening `index.html` directly in a browser.
- Add dependencies only when there is a clear reason.

## Development Guidance

- Make small, focused changes.
- Prefer readable code over clever abstractions.
- Keep puzzle logic easy to inspect and revise.
- Do not introduce broader app architecture prematurely.
- When adding validation, keep feedback helpful instead of punitive.
- Preserve mobile-friendly layout and accessible labels.
- Test both correct and incorrect answer flows after behavior changes.
- Always update DEVLOG.md after meaningful changes (see below).
- Always edit CURRENT_STATE.md after meaningful changes (see below).
- Verify when changes would impact a significant portion of the architecture.

## DEVLOG.md Updates

DEVLOG.mg is the changelog for humans and Codex.

Newest entries go at the top.

Each entry should include:

- Version number.
- Feature summary.
- What changed.
- Why it changed.
- Files touched.
- Verification method, if applicable.

## CURRENT_STATE.md

Answers the question "if someone joined the project today, what would they need to know about the project where it stands?"

Sections:
### Executive Summary

- Should be readable in 30 seconds

### Completed features

- Not everything ever discussed or attempted
- Just features that are currently working

### Current Architecture

- What technologies are actually in use
- Frontend and Backend and Hosting

### Current Priorities

- What is the next thing we should work on?

### Long-term Vision

- Ideas for the fully developed version of the project

### Known Issues

- What is still missing?
- Issues don't need to be solved tomorrow, but this helps us develop goals

### Development Phase

- Where are we on the timeline from Prototype to Public Launch?
