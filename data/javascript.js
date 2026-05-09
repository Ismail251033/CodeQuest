/* ============================================
   CODEQUEST - JAVASCRIPT COURSE DATA
   ============================================ */

const JS_COURSE = {
  id: 'javascript',
  name: 'JavaScript',
  emoji: '🟨',
  color: '#f7df1e',
  colorDark: '#c4a800',
  description: 'The language of the web. Build interactive websites, apps, and more.',

  topics: [
    // ============ TOPIC 1: VARIABLES ============
    {
      id: 'variables',
      title: 'Variables & Data',
      emoji: '📦',
      description: 'Learn how to store and name information in your programs.',
      difficulty: 'beginner',
      xpReward: 100,
      estimatedMinutes: 20,
      prerequisites: [],

      lessons: [
        {
          id: 'var-intro',
          title: 'What is a Variable?',
          content: [
            {
              type: 'explanation',
              title: 'The Box Analogy',
              text: 'Think of a variable as a labeled box. You can put something in the box, give it a name, and find it later by that name. In JavaScript, we create these boxes using special keywords.',
            },
            {
              type: 'code',
              lang: 'javascript',
              label: 'Declaring Variables',
              code: `// Three ways to declare variables:
let age = 25;         // can change later
const name = "Alice"; // cannot change
var city = "Paris";   // old style (avoid)

console.log(age);   // → 25
console.log(name);  // → "Alice"
console.log(city);  // → "Paris"`,
            },
            {
              type: 'explanation',
              title: 'let vs const vs var',
              text: 'Use `const` when the value never changes (like a name or PI). Use `let` when the value might change (like a score or counter). Avoid `var` — it has confusing behaviors.',
            },
            {
              type: 'tip',
              text: '💡 Convention: Variable names use camelCase — `playerScore`, `firstName`, `isLoggedIn`.',
            },
            {
              type: 'code',
              lang: 'javascript',
              label: 'Naming Best Practices',
              code: `// ✅ Good names (descriptive)
let playerScore = 0;
const maxLives = 3;
let isGameOver = false;

// ❌ Bad names (unclear)
let x = 0;
const y = 3;
let z = false;`,
            },
            {
              type: 'quiz',
              question: 'Which keyword should you use for a value that will NEVER change?',
              options: ['let', 'const', 'var', 'val'],
              correct: 1,
              explanation: '`const` declares a constant — a value that cannot be reassigned. Use it for values that should stay the same, like settings or mathematical constants.',
            },
          ],
        },
        {
          id: 'data-types',
          title: 'Data Types',
          content: [
            {
              type: 'explanation',
              title: 'Types of Data in JavaScript',
              text: 'Every value in JavaScript has a "type". The main primitive types are: String (text), Number (numbers), Boolean (true/false), null (empty), undefined (not assigned).',
            },
            {
              type: 'code',
              lang: 'javascript',
              label: 'The 5 Main Types',
              code: `// String — text in quotes
let greeting = "Hello, World!";
let city = 'Paris';

// Number — integers and decimals
let score = 100;
let pi = 3.14159;

// Boolean — only true or false
let isRaining = false;
let hasWon = true;

// null — intentionally empty
let winner = null;

// undefined — not yet assigned
let mystery;  // → undefined

// Check type with typeof
console.log(typeof greeting); // → "string"
console.log(typeof score);    // → "number"
console.log(typeof hasWon);   // → "boolean"`,
            },
            {
              type: 'warning',
              text: '⚠️ JavaScript is "dynamically typed" — the same variable can hold different types. This is a source of bugs! Be careful when mixing types.',
            },
            {
              type: 'code',
              lang: 'javascript',
              label: 'Type Coercion Surprises',
              code: `// Be careful mixing types!
console.log(2 + "2");    // → "22" (not 4!)
console.log(2 - "2");    // → 0 (converts "2" to number)
console.log(true + 1);   // → 2 (true = 1)
console.log(false + 1);  // → 1 (false = 0)

// Always check your types!
let userAge = "25";  // input from user — it's a STRING
let nextYear = userAge + 1;  // → "251" (bug!)
let fixedYear = Number(userAge) + 1;  // → 26 ✅`,
            },
            {
              type: 'quiz',
              question: 'What is the output of: console.log(typeof null)?',
              options: ['"null"', '"object"', '"undefined"', '"boolean"'],
              correct: 1,
              explanation: 'This is a famous JavaScript quirk! `typeof null` returns "object" — this is a historical bug in JavaScript that was never fixed to preserve backward compatibility.',
            },
          ],
        },
      ],

      challenges: [
        {
          id: 'ch-var-1',
          title: 'Fix the Variable',
          type: 'debugging',
          difficulty: 'easy',
          xpReward: 30,
          instructions: 'This code has errors. Fix it so that `name` stores your name and `age` stores a number.',
          starterCode: `// Fix the errors below:
const name = 25;
let age = "Alice";

console.log("My name is " + name + " and I am " + age + " years old.");`,
          expectedOutput: 'My name is Alice and I am 25 years old.',
          solution: `const name = "Alice";
let age = 25;

console.log("My name is " + name + " and I am " + age + " years old.");`,
          hints: [
            'Names should be strings (text in quotes)',
            'Age should be a number (no quotes)',
            'Try swapping the values!',
          ],
          commonMistakes: [
            { pattern: 'const name = 25', explanation: 'A name is text, not a number. Names go in quotes: "Alice"' },
          ],
          explanation: 'Variables store specific types of data. Names are strings (text), ages are numbers. Storing the wrong type causes bugs when you try to use them.',
        },
        {
          id: 'ch-var-2',
          title: 'Type Detective',
          type: 'multiple_choice',
          difficulty: 'easy',
          xpReward: 25,
          instructions: 'What does this code output?',
          code: `let x = "5";
let y = 3;
console.log(x + y);`,
          options: ['8', '"8"', '"53"', 'Error'],
          correctIndex: 2,
          explanation: 'When you add a string and a number with +, JavaScript converts the number to a string and concatenates them. "5" + 3 = "53", not 8.',
          relatedLesson: 'data-types',
        },
        {
          id: 'ch-var-3',
          title: 'Create a Profile',
          type: 'coding',
          difficulty: 'easy',
          xpReward: 40,
          instructions: 'Create variables to store a player profile: name (string), score (number), isActive (boolean). Then log them all.',
          expectedOutputContains: ['name', 'score', 'true'],
          solution: `const playerName = "Alex";
let playerScore = 0;
const isActive = true;

console.log(playerName, playerScore, isActive);`,
          hints: [
            'Use const for values that won\'t change',
            'A boolean is either true or false (no quotes!)',
            'console.log can take multiple arguments separated by commas',
          ],
          explanation: 'Well-named variables make your code readable. Using the right types (string for text, number for numbers, boolean for yes/no) prevents bugs.',
        },
      ],
    },

    // ============ TOPIC 2: CONDITIONS ============
    {
      id: 'conditions',
      title: 'Conditions & Logic',
      emoji: '🔀',
      description: 'Make decisions in your code with if/else and comparison operators.',
      difficulty: 'beginner',
      xpReward: 120,
      estimatedMinutes: 25,
      prerequisites: ['variables'],

      lessons: [
        {
          id: 'if-else',
          title: 'If / Else Statements',
          content: [
            {
              type: 'explanation',
              title: 'Making Decisions in Code',
              text: 'Programs need to make decisions. "If the player has 0 lives, show game over. Otherwise, continue." This is exactly what `if/else` does.',
            },
            {
              type: 'code',
              lang: 'javascript',
              label: 'Basic If/Else',
              code: `let temperature = 28;

if (temperature > 30) {
  console.log("It's hot! 🔥");
} else if (temperature > 20) {
  console.log("It's nice! ☀️");
} else {
  console.log("It's cold! 🥶");
}
// → "It's nice! ☀️"`,
            },
            {
              type: 'explanation',
              title: 'Comparison Operators',
              text: 'Inside `if()`, you use comparison operators to create conditions:',
            },
            {
              type: 'code',
              lang: 'javascript',
              label: 'Comparison Operators',
              code: `let a = 10;

a === 10   // strictly equal (same value AND same type) ✅
a !== 5    // not equal ✅
a > 5      // greater than ✅
a < 20     // less than ✅
a >= 10    // greater or equal ✅
a <= 15    // less or equal ✅

// IMPORTANT: use === not == 
"5" == 5   // → true (converts types — DANGEROUS!)
"5" === 5  // → false (strict — SAFE ✅)`,
            },
            {
              type: 'quiz',
              question: 'What does this code print? let score = 75; if (score >= 90) { console.log("A"); } else if (score >= 75) { console.log("B"); } else { console.log("C"); }',
              options: ['A', 'B', 'C', 'Nothing'],
              correct: 1,
              explanation: 'score (75) is NOT >= 90, so the first condition fails. But 75 >= 75 is true, so we print "B".',
            },
          ],
        },
      ],

      challenges: [
        {
          id: 'ch-cond-1',
          title: 'Grade Calculator',
          type: 'coding',
          difficulty: 'easy',
          xpReward: 45,
          instructions: 'Write a function that takes a score (0-100) and returns the grade: A (90+), B (80+), C (70+), D (60+), F (below 60).',
          starterCode: `function getGrade(score) {
  // Your code here
}

console.log(getGrade(95));  // → "A"
console.log(getGrade(82));  // → "B"
console.log(getGrade(65));  // → "D"`,
          solution: `function getGrade(score) {
  if (score >= 90) return "A";
  else if (score >= 80) return "B";
  else if (score >= 70) return "C";
  else if (score >= 60) return "D";
  else return "F";
}`,
          hints: [
            'Use if/else if/else chain',
            'Check from highest to lowest',
            'Use >= (greater than or equal)',
          ],
          explanation: 'When checking ranges, always start from the most specific (highest) condition and work down.',
        },
        {
          id: 'ch-cond-2',
          title: 'Spot the Bug',
          type: 'debugging',
          difficulty: 'medium',
          xpReward: 50,
          instructions: 'This login checker has a bug. Fix it so it correctly checks if the password matches.',
          starterCode: `const correctPassword = "secret123";
let userInput = "secret123";

if (userInput = correctPassword) {
  console.log("Welcome!");
} else {
  console.log("Wrong password!");
}`,
          expectedOutput: 'Welcome!',
          solution: `const correctPassword = "secret123";
let userInput = "secret123";

if (userInput === correctPassword) {
  console.log("Welcome!");
} else {
  console.log("Wrong password!");
}`,
          hints: [
            'Look carefully at the = sign inside if()',
            'Single = is assignment, === is comparison',
            'Change = to ===',
          ],
          commonMistakes: [
            { pattern: 'userInput = correctPassword', explanation: 'Using = inside if() is an assignment, not a comparison! This always evaluates to true. Use === for comparison.' },
          ],
          explanation: 'One of the most common bugs: using = (assignment) instead of === (comparison) inside conditions. Always double-check your comparison operators!',
        },
      ],
    },

    // ============ TOPIC 3: LOOPS ============
    {
      id: 'loops',
      title: 'Loops',
      emoji: '🔄',
      description: 'Repeat actions efficiently with for and while loops.',
      difficulty: 'beginner',
      xpReward: 140,
      estimatedMinutes: 30,
      prerequisites: ['conditions'],

      lessons: [
        {
          id: 'for-loop',
          title: 'The For Loop',
          content: [
            {
              type: 'explanation',
              title: 'Why Loops?',
              text: 'Imagine printing "Hello" 100 times. You could write 100 console.log() calls... or use a loop! Loops repeat code automatically.',
            },
            {
              type: 'code',
              lang: 'javascript',
              label: 'For Loop Anatomy',
              code: `//   init      condition  update
for (let i = 0; i < 5;    i++) {
  console.log("Step " + i);
}
// → Step 0
// → Step 1
// → Step 2
// → Step 3
// → Step 4`,
            },
            {
              type: 'explanation',
              title: 'Breaking It Down',
              text: '1. `let i = 0` — start counter at 0\n2. `i < 5` — keep going while i is less than 5\n3. `i++` — add 1 to i after each round\n4. The body runs for i = 0, 1, 2, 3, 4 (5 times total)',
            },
            {
              type: 'code',
              lang: 'javascript',
              label: 'Practical Examples',
              code: `// Count up
for (let i = 1; i <= 10; i++) {
  console.log(i); // 1, 2, 3... 10
}

// Count down
for (let i = 10; i > 0; i--) {
  console.log(i); // 10, 9, 8... 1
}

// Step by 2
for (let i = 0; i <= 20; i += 2) {
  console.log(i); // 0, 2, 4... 20
}`,
            },
            {
              type: 'quiz',
              question: 'How many times does this loop run? for (let i = 0; i < 10; i++)',
              options: ['9', '10', '11', 'Infinite'],
              correct: 1,
              explanation: 'The loop runs while i < 10, so i goes: 0,1,2,3,4,5,6,7,8,9 — that\'s 10 iterations total. The loop stops when i reaches 10 because 10 < 10 is false.',
            },
          ],
        },
      ],

      challenges: [
        {
          id: 'ch-loop-1',
          title: 'FizzBuzz Classic',
          type: 'coding',
          difficulty: 'medium',
          xpReward: 60,
          instructions: 'Print numbers 1 to 20. But: print "Fizz" for multiples of 3, "Buzz" for multiples of 5, and "FizzBuzz" for multiples of both.',
          solution: `for (let i = 1; i <= 20; i++) {
  if (i % 15 === 0) console.log("FizzBuzz");
  else if (i % 3 === 0) console.log("Fizz");
  else if (i % 5 === 0) console.log("Buzz");
  else console.log(i);
}`,
          hints: [
            'Use the modulo operator % to check divisibility',
            'x % 3 === 0 means x is divisible by 3',
            'Check for FizzBuzz (divisible by both) FIRST!',
          ],
          explanation: 'FizzBuzz is a classic interview problem. The key insight: check the combined condition (divisible by 15) before the individual ones. Order matters!',
        },
        {
          id: 'ch-loop-2',
          title: 'Sum Calculator',
          type: 'coding',
          difficulty: 'easy',
          xpReward: 40,
          instructions: 'Use a loop to calculate the sum of all numbers from 1 to 100.',
          expectedOutputContains: ['5050'],
          solution: `let sum = 0;
for (let i = 1; i <= 100; i++) {
  sum += i;
}
console.log(sum); // → 5050`,
          hints: [
            'Start with sum = 0',
            'Add i to sum on each iteration',
            'After the loop, log the result',
          ],
          explanation: 'The sum of 1 to 100 is 5050 (Gauss figured this out as a child!). Using a loop, we add each number to a running total.',
        },
      ],
    },

    // ============ TOPIC 4: FUNCTIONS ============
    {
      id: 'functions',
      title: 'Functions',
      emoji: '⚙️',
      description: 'Create reusable blocks of code. The building blocks of programs.',
      difficulty: 'beginner',
      xpReward: 160,
      estimatedMinutes: 35,
      prerequisites: ['loops'],

      lessons: [
        {
          id: 'func-basics',
          title: 'Creating & Calling Functions',
          content: [
            {
              type: 'explanation',
              title: 'What is a Function?',
              text: 'A function is a named, reusable block of code. Think of it like a recipe: you define it once, then "call" it whenever you need it. Functions take inputs (parameters) and produce outputs (return values).',
            },
            {
              type: 'code',
              lang: 'javascript',
              label: 'Function Anatomy',
              code: `// Define the function
function greet(name) {     // parameter: name
  return "Hello, " + name + "!";  // return value
}

// Call the function
let message = greet("Alice");  // argument: "Alice"
console.log(message);  // → "Hello, Alice!"

// Call it again with different input
console.log(greet("Bob"));  // → "Hello, Bob!"`,
            },
            {
              type: 'code',
              lang: 'javascript',
              label: 'Multiple Parameters',
              code: `function add(a, b) {
  return a + b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

console.log(add(3, 4));      // → 7
console.log(power(2, 10));   // → 1024`,
            },
            {
              type: 'tip',
              text: '💡 Arrow functions are a modern shorthand: const add = (a, b) => a + b;',
            },
            {
              type: 'quiz',
              question: 'What does this function return? function mystery(x) { return x * x; } mystery(7)',
              options: ['7', '14', '49', 'undefined'],
              correct: 2,
              explanation: '7 * 7 = 49. The function squares its input. mystery(7) returns 7 * 7 = 49.',
            },
          ],
        },
      ],

      challenges: [
        {
          id: 'ch-func-1',
          title: 'Temperature Converter',
          type: 'coding',
          difficulty: 'easy',
          xpReward: 45,
          instructions: 'Write a function celsiusToFahrenheit(celsius) that converts temperature. Formula: (celsius × 9/5) + 32',
          solution: `function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

console.log(celsiusToFahrenheit(0));   // → 32
console.log(celsiusToFahrenheit(100)); // → 212
console.log(celsiusToFahrenheit(37));  // → 98.6`,
          hints: [
            'Use the formula: (celsius * 9/5) + 32',
            'Don\'t forget to return the result!',
            '0°C = 32°F and 100°C = 212°F',
          ],
          explanation: 'Functions are great for encapsulating formulas. Once defined, you can convert any temperature without rewriting the formula.',
        },
        {
          id: 'ch-func-2',
          title: 'Is Palindrome?',
          type: 'coding',
          difficulty: 'medium',
          xpReward: 70,
          instructions: 'Write a function isPalindrome(str) that returns true if the string reads the same forwards and backwards (e.g., "racecar", "level").',
          solution: `function isPalindrome(str) {
  const reversed = str.split('').reverse().join('');
  return str === reversed;
}

console.log(isPalindrome("racecar")); // → true
console.log(isPalindrome("hello"));   // → false
console.log(isPalindrome("level"));   // → true`,
          hints: [
            'Try: str.split(\'\') to get an array of characters',
            'Then .reverse() to reverse the array',
            'Then .join(\'\') to convert back to string',
            'Compare the original and reversed strings',
          ],
          explanation: 'String manipulation: split into array → reverse → join back. Compare original to reversed. This pattern works for many string problems.',
        },
      ],
    },

    // ============ TOPIC 5: ARRAYS ============
    {
      id: 'arrays',
      title: 'Arrays',
      emoji: '📋',
      description: 'Store collections of data and learn powerful array methods.',
      difficulty: 'beginner',
      xpReward: 180,
      estimatedMinutes: 40,
      prerequisites: ['functions'],

      lessons: [
        {
          id: 'array-basics',
          title: 'Arrays & Array Methods',
          content: [
            {
              type: 'explanation',
              title: 'What is an Array?',
              text: 'An array is an ordered list of items. Like a numbered shopping list. Each item has an "index" starting at 0.',
            },
            {
              type: 'code',
              lang: 'javascript',
              label: 'Creating & Accessing Arrays',
              code: `let fruits = ["apple", "banana", "cherry"];

// Access by index (starts at 0!)
console.log(fruits[0]);  // → "apple"
console.log(fruits[1]);  // → "banana"
console.log(fruits[2]);  // → "cherry"
console.log(fruits[3]);  // → undefined (doesn't exist)

// Array length
console.log(fruits.length);  // → 3

// Last element
console.log(fruits[fruits.length - 1]);  // → "cherry"`,
            },
            {
              type: 'code',
              lang: 'javascript',
              label: 'Essential Array Methods',
              code: `let nums = [3, 1, 4, 1, 5, 9, 2, 6];

// Add/Remove
nums.push(7);        // add to end → [..., 7]
nums.pop();          // remove from end → returns 7
nums.unshift(0);     // add to start → [0, ...]
nums.shift();        // remove from start → returns 0

// Searching
nums.indexOf(5);     // → 4 (index of 5)
nums.includes(9);    // → true

// Transforming (these create new arrays!)
let doubled = nums.map(n => n * 2);
let evens   = nums.filter(n => n % 2 === 0);
let sum     = nums.reduce((acc, n) => acc + n, 0);

// Sorting
nums.sort((a, b) => a - b);  // ascending`,
            },
            {
              type: 'quiz',
              question: 'What is fruits[0] if fruits = ["apple", "banana", "cherry"]?',
              options: ['"banana"', '"cherry"', '"apple"', '1'],
              correct: 2,
              explanation: 'Arrays are zero-indexed! The first element is always at index 0. So fruits[0] = "apple", fruits[1] = "banana", fruits[2] = "cherry".',
            },
          ],
        },
      ],

      challenges: [
        {
          id: 'ch-arr-1',
          title: 'Find the Maximum',
          type: 'coding',
          difficulty: 'easy',
          xpReward: 40,
          instructions: 'Write a function findMax(arr) that returns the largest number in an array without using Math.max.',
          solution: `function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

console.log(findMax([3, 7, 1, 9, 4]));   // → 9
console.log(findMax([-5, -1, -10, -2])); // → -1`,
          hints: [
            'Start by assuming the first element is the max',
            'Loop through the rest and update max if you find something bigger',
            'Return max after the loop',
          ],
          explanation: 'Track the current maximum as you iterate. Start with the first element as the "best so far", and update whenever you find something better.',
        },
        {
          id: 'ch-arr-2',
          title: 'Remove Duplicates',
          type: 'coding',
          difficulty: 'medium',
          xpReward: 65,
          instructions: 'Write a function removeDuplicates(arr) that returns a new array with all duplicates removed.',
          solution: `function removeDuplicates(arr) {
  return [...new Set(arr)];
}

// Or without Set:
function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

console.log(removeDuplicates([1,2,2,3,3,3,4])); // → [1,2,3,4]`,
          hints: [
            'Hint 1: A Set automatically removes duplicates',
            'Hint 2: [...new Set(arr)] converts a Set back to an array',
            'Alternative: Use filter() with indexOf()',
          ],
          explanation: 'The Set approach is elegant: Sets can only contain unique values, so passing an array through Set removes all duplicates. Then spread it back to an array.',
        },
      ],
    },

    // ============ TOPIC 6: OBJECTS ============
    {
      id: 'objects',
      title: 'Objects',
      emoji: '🗂️',
      description: 'Organize related data and methods into structured objects.',
      difficulty: 'intermediate',
      xpReward: 200,
      estimatedMinutes: 45,
      prerequisites: ['arrays'],

      lessons: [
        {
          id: 'obj-basics',
          title: 'Objects & Properties',
          content: [
            {
              type: 'explanation',
              title: 'What is an Object?',
              text: 'An object groups related data together with named keys. Think of it like a form with labeled fields. Objects can also contain functions (called "methods").',
            },
            {
              type: 'code',
              lang: 'javascript',
              label: 'Creating Objects',
              code: `// Object literal
const person = {
  name: "Alice",
  age: 28,
  city: "Paris",
  isStudent: false,
  
  // Method (function inside object)
  greet() {
    return \`Hi, I'm \${this.name} from \${this.city}!\`;
  }
};

// Accessing properties
console.log(person.name);         // → "Alice"
console.log(person["age"]);       // → 28
console.log(person.greet());      // → "Hi, I'm Alice from Paris!"

// Modifying
person.age = 29;
person.email = "alice@example.com";  // add new property`,
            },
            {
              type: 'quiz',
              question: 'How do you access the "name" property of an object called "car"?',
              options: ['car[name]', 'car.name', 'car->name', 'name.car'],
              correct: 1,
              explanation: 'Dot notation (car.name) is the standard way. You can also use bracket notation (car["name"]) which is useful when the property name is stored in a variable.',
            },
          ],
        },
      ],

      challenges: [
        {
          id: 'ch-obj-1',
          title: 'Build a Calculator Object',
          type: 'coding',
          difficulty: 'medium',
          xpReward: 70,
          instructions: 'Create a `calculator` object with methods: add(a,b), subtract(a,b), multiply(a,b), divide(a,b).',
          solution: `const calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => b !== 0 ? a / b : "Cannot divide by zero",
};

console.log(calculator.add(5, 3));      // → 8
console.log(calculator.divide(10, 2));  // → 5
console.log(calculator.divide(5, 0));   // → "Cannot divide by zero"`,
          hints: [
            'Use arrow functions for clean method syntax',
            'For divide, check if b === 0 to prevent errors',
            'Access methods with calculator.add(5, 3)',
          ],
          explanation: 'Objects with methods are a core concept in OOP. Grouping related functions (operations) inside an object keeps code organized.',
        },
      ],
    },

    // ============ TOPIC 7: DOM ============
    {
      id: 'dom',
      title: 'DOM Manipulation',
      emoji: '🌐',
      description: 'Make web pages interactive by controlling HTML with JavaScript.',
      difficulty: 'intermediate',
      xpReward: 220,
      estimatedMinutes: 50,
      prerequisites: ['objects'],

      lessons: [
        {
          id: 'dom-basics',
          title: 'Selecting & Modifying Elements',
          content: [
            {
              type: 'explanation',
              title: 'What is the DOM?',
              text: 'The DOM (Document Object Model) is JavaScript\'s way of seeing and changing your HTML. Every HTML element becomes a JavaScript object you can read and modify.',
            },
            {
              type: 'code',
              lang: 'javascript',
              label: 'Selecting Elements',
              code: `// Select elements
const title = document.getElementById("title");
const buttons = document.querySelectorAll(".btn");
const first = document.querySelector("h1");

// Change content
title.textContent = "New Title!";
title.innerHTML = "<strong>Bold</strong> Title";

// Change styles
title.style.color = "blue";
title.style.fontSize = "2rem";

// Add/remove classes
title.classList.add("highlight");
title.classList.remove("old-class");
title.classList.toggle("active");

// Create new elements
const newDiv = document.createElement("div");
newDiv.textContent = "I'm new!";
document.body.appendChild(newDiv);`,
            },
            {
              type: 'code',
              lang: 'javascript',
              label: 'Event Listeners',
              code: `const button = document.getElementById("myBtn");

button.addEventListener("click", function() {
  console.log("Button clicked!");
});

// Arrow function version
button.addEventListener("mouseover", () => {
  button.style.background = "blue";
});

// With event object
button.addEventListener("click", (event) => {
  console.log("Clicked at:", event.clientX, event.clientY);
});`,
            },
          ],
        },
      ],

      challenges: [
        {
          id: 'ch-dom-1',
          title: 'Color Changer',
          type: 'coding',
          difficulty: 'medium',
          xpReward: 60,
          instructions: 'Write JavaScript that changes the background color of a div (id="box") to a random color each time a button (id="colorBtn") is clicked.',
          solution: `document.getElementById("colorBtn").addEventListener("click", () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  document.getElementById("box").style.background = \`rgb(\${r},\${g},\${b})\`;
});`,
          hints: [
            'Use getElementById to find both elements',
            'addEventListener("click", ...) for the button',
            'Math.random() * 256 gives a random 0-255 value',
            'Math.floor() rounds down to an integer',
          ],
          explanation: 'DOM events let you respond to user actions. Combine getElementById, addEventListener, and style modification to create interactive UI.',
        },
      ],
    },

    // ============ TOPIC 8: ASYNC ============
    {
      id: 'async',
      title: 'Async JavaScript',
      emoji: '⏳',
      description: 'Handle asynchronous operations with Promises and async/await.',
      difficulty: 'advanced',
      xpReward: 250,
      estimatedMinutes: 60,
      prerequisites: ['dom'],

      lessons: [
        {
          id: 'async-basics',
          title: 'Promises & Async/Await',
          content: [
            {
              type: 'explanation',
              title: 'Why Async?',
              text: 'Some operations take time: fetching data from a server, reading files, waiting for input. JavaScript handles these with asynchronous code — code that doesn\'t block everything else.',
            },
            {
              type: 'code',
              lang: 'javascript',
              label: 'Async/Await',
              code: `// Async function — always returns a Promise
async function fetchUser(id) {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    const user = await response.json();
    console.log(user.name);
    return user;
  } catch (error) {
    console.error("Failed:", error.message);
  }
}

fetchUser(1);  // call it — doesn't block!
console.log("This runs IMMEDIATELY");  // runs before fetchUser finishes`,
            },
          ],
        },
      ],

      challenges: [
        {
          id: 'ch-async-1',
          title: 'Promise Chain',
          type: 'multiple_choice',
          difficulty: 'medium',
          xpReward: 55,
          instructions: 'What does this code output first?',
          code: `console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");`,
          options: ['A, B, C', 'A, C, B', 'B, A, C', 'C, A, B'],
          correctIndex: 1,
          explanation: 'Even with a timeout of 0ms, setTimeout is asynchronous. "A" and "C" are synchronous (run immediately), then "B" runs after the current call stack clears. Output: A, C, B.',
          relatedLesson: 'async-basics',
        },
      ],
    },
  ],
};

// Export
if (typeof module !== 'undefined') module.exports = { JS_COURSE };
