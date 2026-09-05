// dice.js
// Random Dice Generator using the crypto module
// Generates random numbers from 1-6 using cryptographically secure randomness.
// Run: node dice.js

const crypto = require('crypto');

function rollDice() {
  // randomInt(min, max) generates a value in [min, max)
  return crypto.randomInt(1, 7);
}

function simulateRolls(times) {
  console.log(`Rolling the dice ${times} time(s)...`);
  for (let i = 1; i <= times; i++) {
    const result = rollDice();
    console.log(`🎲 Roll ${i}: Dice Rolled: ${result}`);
  }
}

simulateRolls(5);
