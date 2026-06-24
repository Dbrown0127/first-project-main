# Arithmetic Puzzle

A small local web puzzle where players fill in equations that match five target results.

## How The Puzzle Works

- The page randomly loads one puzzle set.
- Each row shows a target result.
- Enter any valid equation that produces that result.
- A row turns yellow when its equation is valid.
- The whole board turns green only when every row and rule is satisfied.

## Constraints / Rules

- Use each number from `1` through `10` exactly once.
- Use each operation at least once: `+`, `-`, `x`, and `/`.
- Division must produce a whole number.
- Some equations can be valid for a row but still not solve the full puzzle.

## How To Run Locally

Open `index.html` in a web browser.

No install, build step, or local server is required.

## Features

- Random puzzle selection from a generated puzzle list.
- Live row validation as you type.
- Number and operation trackers.
- Warnings for missing or repeated numbers.
- Reset button for starting over.
