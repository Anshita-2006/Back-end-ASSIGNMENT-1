// modules/isEven.js
// Custom module: checks whether a given number is even or odd.
// Demonstrates module creation and reusability using module.exports.

function isEven(number) {
  return number % 2 === 0;
}

module.exports = isEven;
