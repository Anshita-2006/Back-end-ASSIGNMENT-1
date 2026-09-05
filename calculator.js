// calculator.js
// CLI-Based Calculator using process.argv
// Example: node calculator.js add 10 5

console.log('Reading command-line arguments...');
// console.log("Reading command-line arguments...");
// console.log("Performing calculation...");

const operation = process.argv[2];
const num1 = parseFloat(process.argv[3]);
const num2 = parseFloat(process.argv[4]);

function calculate(op, a, b) {
  switch (op) {
    case 'add':
      return a + b;
    case 'subtract':
      return a - b;
    case 'multiply':
      return a * b;
    case 'divide':
      if (b === 0) {
        throw new Error('Division by zero is not allowed');
      }
      return a / b;
    default:
      throw new Error(`Invalid operation: ${op}`);
  }
}

if (!operation || isNaN(num1) || isNaN(num2)) {
  console.log('Usage: node calculator.js <add|subtract|multiply|divide> <num1> <num2>');
} else {
  try {
    const result = calculate(operation, num1, num2);
    console.log(`Result: ${result}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

// console.log('Finished calculation.');