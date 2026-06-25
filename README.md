# Arithmetic Puzzle

Fill in equations that match five target results.

## How It Works

- The page randomly loads one puzzle set.
- Refreshing the page loads a new puzzle.
- Players can choose Normal, Hard, or Extreme difficulty.
- Completed puzzles are skipped on the same device until that difficulty's pool has been used.
- Each row shows a target result (should be a whole number).
- Enter any valid equation that produces that result.
- A row turns yellow when its equation is valid.
- The whole board turns green only when every row and rule is satisfied.

## Constraints / Rules

- Use each number from `1` through `10` exactly once.
- Use each operation at least once: `+`, `-`, `x`, and `/`.
- Some equations can be valid for a row but still not solve the full puzzle.

## How To Run Locally

Open `index.html` in a web browser.

No install, build step, or local server is required.

## GitHub Pages

- url deployed
  https://dbrown0127.github.io/first-project-main/

## Puzzle Difficulty
- Normal: at least one result is in the Normal trigger list: `19`, `21`, `27`, `28`, `32`, `36`, `40`, `42`, `45`, `48`, `50`, `54`, `56`, `60`, `63`, `70`, `72`, `80`, or `90`.
- Hard: any puzzle that is not Normal or Extreme and has at least one result greater than `16`.
- Extreme: all five results are less than `16`, with at least two results less than `10`.

## Features

- Random puzzle selection by difficulty.
- Current difficulty and puzzle ID display.
- Live row validation as you type.
- Number and operation trackers.
- Warnings for missing or repeated numbers.
- Local completed-puzzle tracking by difficulty.
- Reset button for starting over.

## To Do

- Generate permanent large result set array.
- Add a "new puzzle" button if users want a new one.
