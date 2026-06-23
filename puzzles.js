const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const REQUIRED_OPERATIONS = ["+", "-", "*", "/"];
const STARTER_SET_LIMIT = 100;

function generatePairings(numbers) {
  if (numbers.length === 0) {
    return [[]];
  }

  const [first, ...rest] = numbers;
  const pairings = [];

  rest.forEach((second, index) => {
    const remaining = rest.filter((_, remainingIndex) => remainingIndex !== index);
    const childPairings = generatePairings(remaining);

    childPairings.forEach((childPairs) => {
      pairings.push([[first, second], ...childPairs]);
    });
  });

  return pairings;
}

function getEquationsForPair(a, b) {
  const lower = Math.min(a, b);
  const higher = Math.max(a, b);
  const equations = [
    { a: lower, op: "+", b: higher, result: lower + higher },
    { a: higher, op: "-", b: lower, result: higher - lower },
    { a: lower, op: "*", b: higher, result: lower * higher }
  ];

  if (higher % lower === 0) {
    equations.push({ a: higher, op: "/", b: lower, result: higher / lower });
  }

  return equations;
}

function usesAllRequiredOperations(equations) {
  const operations = new Set(equations.map((equation) => equation.op));
  return REQUIRED_OPERATIONS.every((operation) => operations.has(operation));
}

function combineEquationChoices(pairing, index = 0, current = [], results = []) {
  if (index === pairing.length) {
    if (usesAllRequiredOperations(current)) {
      results.push({ equations: current.map((equation) => ({ ...equation })) });
    }

    return results;
  }

  const [a, b] = pairing[index];
  const choices = getEquationsForPair(a, b);

  choices.forEach((equation) => {
    current.push(equation);
    combineEquationChoices(pairing, index + 1, current, results);
    current.pop();
  });

  return results;
}

function generateAllValidPuzzleSets() {
  const pairings = generatePairings(NUMBERS);
  const puzzleSets = [];

  pairings.forEach((pairing) => {
    combineEquationChoices(pairing, 0, [], puzzleSets);
  });

  return puzzleSets;
}

const puzzleSets = generateAllValidPuzzleSets().slice(0, STARTER_SET_LIMIT);

if (typeof module !== "undefined") {
  module.exports = {
    generateAllValidPuzzleSets,
    puzzleSets
  };
}
