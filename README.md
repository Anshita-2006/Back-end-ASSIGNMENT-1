# Smart Utility Toolkit

Lab Assignment 1 — Web Dev III (Node.js & Express Backend), Unit 1.

A collection of mini backend utilities built using only Node.js core
modules (`process`, `http`, `fs`, `crypto`) — no external npm packages
or frameworks.

## Project Structure

```
smart-utility-toolkit/
├── calculator.js
├── app.js
├── server.js
├── fileManager.js
├── dice.js
├── test.txt
├── modules/
│   ├── isEven.js
│   └── logger.js
└── README.md
```

## 1. CLI-Based Calculator (`calculator.js`)

Performs add, subtract, multiply, and divide using command-line arguments.

```
node calculator.js add 10 5
Result: 15
```

## 2. Custom Module Creation & Reusability (`app.js`, `modules/`)

- `modules/isEven.js` — checks if a number is even or odd.
- `modules/logger.js` — reusable logger for consistent console output.
- `app.js` — imports and reuses both modules.

```
node app.js
```

## 3. Basic HTTP Server (`server.js`)

```
node server.js
```

| Route         | Response           |
|---------------|---------------------|
| `/`           | Welcome message     |
| `/about`      | About page          |
| `/contact`    | Contact page        |
| Invalid route | 404 Error Message   |

Visit `http://localhost:3000/` in a browser or test with Postman.

## 4. File Manager (`fileManager.js`)

Performs Create, Read, Update, and Delete operations on `test.txt`
using `writeFile()`, `readFile()`, `appendFile()`, and `unlink()`.

```
node fileManager.js
```

## 5. Random Dice Generator (`dice.js`)

Generates cryptographically random dice values (1–6) using the
`crypto` module, simulating multiple rolls with a loop.

```
node dice.js
```

## Restrictions

- No external npm packages
- No Express.js or third-party frameworks
- No database integration
- Only Node.js built-in modules used
- All programs run using terminal commands
