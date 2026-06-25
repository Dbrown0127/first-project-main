const fs = require("fs");
const path = require("path");

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const REQUIRED_OPERATIONS = ["+", "-", "x", "/"];
const MAX_PUZZLES_PER_DIFFICULTY = 5000;
const OUTPUT_DIR = path.join(__dirname, "data");
const HARD_EXCLUDED_RESULTS = new Set([11, 13]);
const EASY_TRIGGER_RESULTS = new Set([
  19, 21, 27, 28, 32, 35, 36, 40, 42, 45, 48,
  50, 54, 56, 60, 63, 70, 72, 80, 90
]);

function generatePairings(numbers) {
  if (numbers.length === 0) {
    return [[]];
  }

  const [first, ...rest] = numbers;
  const pairings = [];

  rest.forEach((second, index) => {
    const remaining = rest.filter((_, remainingIndex) => remainingIndex !== index);

    generatePairings(remaining).forEach((childPairs) => {
      pairings.push([[first, second], ...childPairs]);
    });
  });

  return pairings;
}

function getEquationChoices(a, b) {
  const lower = Math.min(a, b);
  const higher = Math.max(a, b);
  const equations = [
    { a: lower, op: "+", b: higher, result: lower + higher },
    { a: higher, op: "-", b: lower, result: higher - lower },
    { a: lower, op: "x", b: higher, result: lower * higher }
  ];

  if (higher % lower === 0) {
    equations.push({ a: higher, op: "/", b: lower, result: higher / lower });
  }

  return equations;
}

function usesAllOperations(equations) {
  const operations = new Set(equations.map((equation) => equation.op));
  return REQUIRED_OPERATIONS.every((operation) => operations.has(operation));
}

// Active classification rules. Internal keys are still easy/medium/hard.
// The UI displays those libraries as Normal/Hard/Extreme.
// Internal hard: every result is below 16, at least two are below 10, and none are 11 or 13.
// Internal easy: at least one result appears in EASY_TRIGGER_RESULTS.
// Internal medium: neither internal hard nor internal easy, with at least one result greater than 16.
function isHardPuzzle(results) {
  const hasAtLeastTwoSingleDigitResults = results
    .filter((result) => result < 10)
    .length >= 2;

  return hasAtLeastTwoSingleDigitResults
    && results.every((result) => (
      result < 16
      && !HARD_EXCLUDED_RESULTS.has(result)
    ));
}

function isEasyPuzzle(results) {
  return results.some((result) => EASY_TRIGGER_RESULTS.has(result));
}

function isMediumPuzzle(results) {
  return !isHardPuzzle(results)
    && !isEasyPuzzle(results)
    && results.some((result) => result > 16);
}

function classifyDifficulty(results) {
  // Difficulty priority matters: classify Hard first, then Easy, then finish with Medium.
  if (isHardPuzzle(results)) {
    return "hard";
  }

  if (isEasyPuzzle(results)) {
    return "easy";
  }

  if (isMediumPuzzle(results)) {
    return "medium";
  }

  return null;
}

function getResultKey(results) {
  return [...results].sort((a, b) => a - b).join("-");
}

function hasReachedAllLimits(puzzlesByDifficulty) {
  return Object.values(puzzlesByDifficulty)
    .every((puzzles) => puzzles.length >= MAX_PUZZLES_PER_DIFFICULTY);
}

function createPuzzle(equations, difficulty, idNumber) {
  return {
    id: `${difficulty}-${String(idNumber).padStart(4, "0")}`,
    difficulty,
    results: equations.map((equation) => equation.result),
    equations: equations.map((equation) => ({ ...equation }))
  };
}

function collectPuzzle(equations, puzzlesByDifficulty, seenResultSets) {
  if (!usesAllOperations(equations)) {
    return;
  }

  const results = equations.map((equation) => equation.result);
  const resultKey = getResultKey(results);

  if (seenResultSets.has(resultKey)) {
    return;
  }

  const difficulty = classifyDifficulty(results);

  if (!difficulty) {
    return;
  }

  const targetCollection = puzzlesByDifficulty[difficulty];

  if (targetCollection.length >= MAX_PUZZLES_PER_DIFFICULTY) {
    return;
  }

  seenResultSets.add(resultKey);
  targetCollection.push(createPuzzle(equations, difficulty, targetCollection.length + 1));
}

function combineEquations(pairing, puzzlesByDifficulty, seenResultSets, index = 0, current = []) {
  if (hasReachedAllLimits(puzzlesByDifficulty)) {
    return;
  }

  if (index === pairing.length) {
    collectPuzzle(current, puzzlesByDifficulty, seenResultSets);
    return;
  }

  const [a, b] = pairing[index];

  getEquationChoices(a, b).forEach((equation) => {
    current.push(equation);
    combineEquations(pairing, puzzlesByDifficulty, seenResultSets, index + 1, current);
    current.pop();
  });
}

function generatePuzzleLibrary() {
  const puzzlesByDifficulty = {
    easy: [],
    medium: [],
    hard: []
  };
  const seenResultSets = new Set();

  for (const pairing of generatePairings(NUMBERS)) {
    combineEquations(pairing, puzzlesByDifficulty, seenResultSets);

    if (hasReachedAllLimits(puzzlesByDifficulty)) {
      break;
    }
  }

  return puzzlesByDifficulty;
}

function writePuzzleFile(fileName, variableName, puzzles) {
  const filePath = path.join(OUTPUT_DIR, fileName);
  const content = `const ${variableName} = ${JSON.stringify(puzzles, null, 2)};\n\nif (typeof window !== "undefined") {\n  window.${variableName} = ${variableName};\n}\n\nif (typeof module !== "undefined") {\n  module.exports = { ${variableName} };\n}\n`;

  fs.writeFileSync(filePath, content, "utf8");
}

function writePuzzleLibrary(puzzlesByDifficulty) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  writePuzzleFile("easyPuzzles.js", "easyPuzzles", puzzlesByDifficulty.easy);
  writePuzzleFile("mediumPuzzles.js", "mediumPuzzles", puzzlesByDifficulty.medium);
  writePuzzleFile("hardPuzzles.js", "hardPuzzles", puzzlesByDifficulty.hard);
}

function main() {
  const puzzlesByDifficulty = generatePuzzleLibrary();
  writePuzzleLibrary(puzzlesByDifficulty);

  console.log(JSON.stringify({
    easy: puzzlesByDifficulty.easy.length,
    medium: puzzlesByDifficulty.medium.length,
    hard: puzzlesByDifficulty.hard.length
  }, null, 2));
}

if (require.main === module) {
  main();
}

module.exports = {
  classifyDifficulty,
  generatePuzzleLibrary,
  isEasyPuzzle,
  isHardPuzzle,
  isMediumPuzzle,
  getResultKey
};
