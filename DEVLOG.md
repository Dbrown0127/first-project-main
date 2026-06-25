# Devlog

## v0.4.0 - Difficulty System Cleanup

**Feature Summary**

Rebuilt the difficulty system around real Normal, Hard, and Extreme categories and regenerated the static puzzle libraries.

**What Changed**

- Updated `generatePuzzles.js` to classify puzzles as `normal`, `hard`, or `extreme`.
- Replaced the old generated files with `data/normalPuzzles.js`, `data/hardPuzzles.js`, and `data/extremePuzzles.js`.
- Removed stale `data/easyPuzzles.js` and `data/mediumPuzzles.js` during generation.
- Updated the app to load the new libraries directly.
- Updated completed-puzzle tracking to use the new difficulty keys under `numberdle.completedPuzzlesByDifficulty`.
- Updated README and current-state docs to describe the new rules and counts.

**Why It Changed**

The project intentionally broke compatibility with the previous Easy/Medium/Hard internals so the code, data files, puzzle IDs, and user-facing labels all use the same difficulty system.

**Files Touched**

- `generatePuzzles.js`
- `index.html`
- `data/normalPuzzles.js`
- `data/hardPuzzles.js`
- `data/extremePuzzles.js`
- `data/easyPuzzles.js`
- `data/mediumPuzzles.js`
- `README.md`
- `CURRENT_STATE.md`
- `DEVLOG.md`

**Verification**

- Ran JavaScript syntax checks for the generator, inline app script, and generated data files.
- Regenerated the static puzzle libraries.
- Validated puzzle shape, number use, operation coverage, positive whole-number results, duplicate result set prevention, and all difficulty rules.
- Confirmed generated counts: `normal: 5000`, `hard: 5000`, `extreme: 4502`.
- Confirmed only historical documentation still references the old Easy/Medium/internal-label system.

## v0.3.4 - Difficulty Label Rename

**Feature Summary**

Renamed the user-facing difficulty levels without changing the underlying puzzle libraries or classification rules.

**What Changed**

- Updated the difficulty selector and current difficulty display to show Normal, Hard, and Extreme.
- Added a display-only mapping so internal `easy` puzzles appear as Normal, internal `medium` puzzles appear as Hard, and internal `hard` puzzles appear as Extreme.
- Updated displayed puzzle ID prefixes while preserving the stored internal puzzle IDs.
- Updated README and current-state documentation to use the new difficulty names.
- Clarified generator comments so the old internal keys are not confused with the new public labels.

**Why It Changed**

The puzzle needs clearer user-facing difficulty names while preserving the existing generated puzzle categories and repeat-avoidance data.

**Files Touched**

- `index.html`
- `README.md`
- `CURRENT_STATE.md`
- `generatePuzzles.js`
- `DEVLOG.md`

**Verification**

- Checked JavaScript syntax for the inline page script and generator.
- Confirmed in the browser that the selector maps internal `easy` to Normal, `medium` to Hard, and `hard` to Extreme.
- Confirmed displayed puzzle ID prefixes update to `normal`, `hard`, and `extreme`.
- Confirmed the static puzzle library counts remain unchanged.
- Confirmed browser console errors were empty.

## v0.3.3 - Completed Puzzle Tracking

**Feature Summary**

Added local completed-puzzle tracking so solved puzzles are skipped by difficulty on the same device.

**What Changed**

- Added `localStorage` helpers for reading, saving, and safely resetting completed puzzle IDs.
- Updated puzzle selection to choose from puzzles that have not already been completed for the selected difficulty.
- Marked a puzzle completed only after the board reaches the full solved state.
- Cleared only the selected difficulty's completed list when every puzzle in that difficulty has been completed.
- Aligned the puzzle loader with the generated static data files.
- Updated project notes to remove repeat-avoidance as future work.

**Why It Changed**

The app now has difficulty-based static libraries, so users should not repeatedly receive puzzles they have already solved on the same device.

**Files Touched**

- `index.html`
- `README.md`
- `backlog.md`
- `CURRENT_STATE.md`
- `DEVLOG.md`

**Verification**

- Checked JavaScript syntax for the inline page script.
- Verified in the browser that solving a puzzle reaches the full success state and that returning to the same difficulty skips the completed puzzle ID.
- Verified changing difficulty clears inputs, resets progress, and loads a new puzzle from the selected difficulty.
- Tested storage helper behavior for exhausted difficulty pools, corrupted saved data, and immediate completed-ID saving.
- Confirmed browser console errors were empty.

## v0.3.2 - Difficulty Rule Reclassification

**Feature Summary**

Updated the difficulty rules again and regenerated the static puzzle libraries.

**What Changed**

- Updated `classifyDifficulty(results)` in `generatePuzzles.js`.
- Added `19` to the Easy trigger results.
- Updated Hard classification to require all results less than `16`, at least two results less than `10`, and no `11` or `13`.
- Updated Medium classification to require puzzles that are neither Hard nor Easy and have at least one result greater than `16`.
- Regenerated `data/easyPuzzles.js`, `data/mediumPuzzles.js`, and `data/hardPuzzles.js`.
- Updated README and current-state docs with the new rules and counts.

**Why It Changed**

The project difficulty definitions changed again, and the generator plus static puzzle files need to stay in sync with the active rules.

**Files Touched**

- `generatePuzzles.js`
- `data/easyPuzzles.js`
- `data/mediumPuzzles.js`
- `data/hardPuzzles.js`
- `README.md`
- `CURRENT_STATE.md`
- `DEVLOG.md`

**Verification**

- Ran JavaScript syntax checks for the generator and all generated data files.
- Regenerated the static puzzle files.
- Validated puzzle shape, number use, operation coverage, positive whole-number results, duplicate result set avoidance, and the new difficulty classification rules.
- Confirmed generated counts: `easy: 5000`, `medium: 5000`, `hard: 2682`.
- Confirmed no Hard puzzle contains `11` or `13`, every Easy puzzle has an Easy trigger result, and every Medium puzzle is neither Hard nor Easy while having at least one result greater than `16`.

## v0.3.1 - Difficulty Rule Reclassification

**Feature Summary**

Updated puzzle difficulty classification rules and regenerated static puzzle libraries.

**What Changed**

- Replaced the generator difficulty helper with `classifyDifficulty(results)`.
- Added explicit Hard exclusion results and Easy trigger results.
- Regenerated `data/easyPuzzles.js`, `data/mediumPuzzles.js`, and `data/hardPuzzles.js`.
- Updated README and current-state docs with the new difficulty rules and generated counts.

**Why It Changed**

The project difficulty definitions changed, and the generator plus static puzzle libraries needed to stay consistent with the new rules.

**Files Touched**

- `generatePuzzles.js`
- `data/easyPuzzles.js`
- `data/mediumPuzzles.js`
- `data/hardPuzzles.js`
- `README.md`
- `CURRENT_STATE.md`
- `DEVLOG.md`

**Verification**

- Ran JavaScript syntax checks for the generator and all generated data files.
- Regenerated the static puzzle files.
- Validated puzzle shape, number use, operation coverage, positive whole-number results, duplicate result set avoidance, and the new difficulty classification rules.
- Confirmed generated counts: `easy: 5000`, `medium: 5000`, `hard: 2531`.
- Confirmed no Hard puzzle contains `11` or `13`, every Easy puzzle has an Easy trigger result, and every Medium puzzle is neither Hard nor Easy.

## v0.3.0 - Difficulty Selector

**Feature Summary**

Added difficulty selection for Easy, Medium, and Hard puzzle libraries.

**What Changed**

- Added a difficulty selector near the top of the puzzle.
- Added current difficulty and puzzle ID display.
- Loaded puzzles from `data/easyPuzzles.js`, `data/mediumPuzzles.js`, and `data/hardPuzzles.js`.
- Defaulted the page to Easy difficulty.
- Re-rendered and reset puzzle state when the selected difficulty changes.
- Updated README and current-state docs to reflect difficulty selection.

**Why It Changed**

The app now has static puzzle libraries by difficulty, so users need a simple way to choose which difficulty to play.

**Files Touched**

- `index.html`
- `README.md`
- `CURRENT_STATE.md`
- `DEVLOG.md`

**Verification**

- Checked JavaScript syntax for the updated inline page script.
- Verified default Easy loading, Medium and Hard switching, current difficulty display, puzzle ID display, state reset on difficulty change, incorrect row validation, correct full-board validation, reset behavior, and browser console logs.

## v0.2.0 - Static Puzzle Library Generation

**Feature Summary**

Added a one-time puzzle generation system that creates static puzzle files by difficulty.

**What Changed**

- Created `generatePuzzles.js`.
- Generated `data/easyPuzzles.js`, `data/mediumPuzzles.js`, and `data/hardPuzzles.js`.
- Each generated puzzle includes `id`, `difficulty`, `results`, and `equations`.
- Deduplicated puzzles by sorted result set so reordered result lists do not produce duplicates.
- Kept the current UI unchanged.
- Updated `CURRENT_STATE.md` to document the new static library files and generator.

**Why It Changed**

The project needs a static puzzle library so puzzles do not need to be generated in the browser and can later support difficulty-based selection.

**Files Touched**

- `generatePuzzles.js`
- `data/easyPuzzles.js`
- `data/mediumPuzzles.js`
- `data/hardPuzzles.js`
- `CURRENT_STATE.md`
- `DEVLOG.md`

**Verification**

- Ran JavaScript syntax checks for the generator and all generated data files.
- Ran the generator successfully.
- Validated generated puzzles for number use, operation coverage, positive whole-number results, difficulty rules, and duplicate result sets.
- Confirmed generated counts: `easy: 5000`, `medium: 4495`, `hard: 4128`.

## v0.1.2 - Current State Format Alignment

**Feature Summary**

Updated the current-state document to match the structure required by `AGENTS.md`.

**What Changed**

- Reorganized `CURRENT_STATE.md` into the required sections: Executive Summary, Completed Features, Current Architecture, Current Priorities, Long-Term Vision, Known Issues, and Development Phase.
- Refocused the content on what a new project contributor needs to know right now.

**Why It Changed**

`AGENTS.md` now defines a specific purpose and structure for `CURRENT_STATE.md`, and the existing file used an older custom structure.

**Files Touched**

- `CURRENT_STATE.md`
- `DEVLOG.md`

**Verification**

- Read `AGENTS.md`, `README.md`, and `backlog.md` before restructuring the current-state document.

## v0.1.1 - Current State Snapshot

**Feature Summary**

Added a concise project snapshot for future reference.

**What Changed**

- Created `CURRENT_STATE.md`.
- Documented the current app behavior, puzzle rules, validation state, tracker behavior, project files, known issue, and technical choices.

**Why It Changed**

The project now has enough moving parts that a current-state document helps humans and Codex understand what exists before making future changes.

**Files Touched**

- `CURRENT_STATE.md`
- `DEVLOG.md`

**Verification**

- Read `AGENTS.md`, `README.md`, `backlog.md`, `DEVLOG.md`, `index.html`, and `PuzzlesArray.js` to align the snapshot with the current project.

## v0.1.0 - Input Parsing and Puzzle Source Cleanup

**Feature Summary**

Improved the puzzle's input handling and simplified the puzzle data source.

**What Changed**

- Unified user input parsing so row validation, number tracking, operation tracking, and global validation all use the same parsing path.
- Normalized multiplication input so `*`, `x`, and the multiplication sign behave the same throughout the app.
- Confirmed that the app only needs `PuzzlesArray.js` for puzzle data.
- Removed the redundant `puzzles.js` file after verifying it was not loaded or required.

**Why It Changed**

The tracker and validation logic had drifted apart, which caused multiplication inputs to behave inconsistently. The puzzle data files were also duplicative, making the project harder to understand.

**Files Touched**

- `index.html`
- `PuzzlesArray.js`
- `puzzles.js`

**Verification**

- Checked JavaScript syntax for `index.html` inline script and `PuzzlesArray.js`.
- Verified in the browser that `7 * 8`, `7 x 8`, and the multiplication-sign version all validate and update trackers consistently.
- Verified that the site still loads puzzle data from `PuzzlesArray.js`.
- Verified solved, globally invalid, reset, and refresh behavior after removing `puzzles.js`.
